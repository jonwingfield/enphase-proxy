import asyncio
import contextlib
import logging
from dataclasses import dataclass
from datetime import datetime, timedelta
from typing import Optional

import httpx
import tenacity
from quart import Quart

logger = logging.getLogger(__name__)


@dataclass(frozen=True)
class FetchedCredentials:
    expires_at: datetime
    fetched_at: datetime
    token: str


class CredentialsUpdater:

    def __init__(self: "CredentialsUpdater", app: Optional[Quart] = None) -> None:
        # this is how often we will refresh our credentials. we are not
        # actually fetching credentials this often. this is just how often we
        # will check to see if we do need to fetch credentials. credentials
        # are only fetched when they're about to expire.
        self.updater_refresh = 300

        # if this is set to true then we are trying to exit. use an Event
        # instead of a flag so that we can wait on it and exit more quickly.
        self.updater_canceled = asyncio.Event()

        # this is the data that we're going to store/cache and the system for
        # fetching that data.
        self.data_cache: Optional[str] = None
        self.data_manager: Optional[CredentialsManager] = None

        self.app: Optional[Quart] = None
        if app is not None:
            self.init_app(app)

    def init_app(self: "CredentialsUpdater", app: Quart) -> None:
        self.app = app
        self.data_manager = CredentialsManager(
            url=app.config.get("REMOTE_API_URL"),
            username=app.config.get("REMOTE_API_USERNAME"),
            password=app.config.get("REMOTE_API_PASSWORD"),
            serialno=app.config.get("REMOTE_API_SERIALNO"),
            # if this is present then we will not fetch anything
            jwt=app.config.get("LOCAL_API_JWT"),
        )

        @app.before_serving
        async def startup() -> None:
            # first fetch our credentials before the application starts. then
            # we are going to start a background task that will continue to
            # fetch the credentials on a regular basis. we can't start until
            # we have credentials so just crash if we can't fetch them.
            logger.info("fetching initial credentials")
            self.data_cache = await self.data_manager.credentials

            logger.info("registering credentials updater background task")
            app.add_background_task(self._background_looper)

        @app.after_serving
        async def shutdown() -> None:
            # just set the Event flag and the background task will exit. if the
            # background task does not exit within 60 seconds then Quart will
            # send an async cancel event to the task.
            logger.info("signaling credentials updater background task to stop")
            self.updater_canceled.set()

    async def _background_waiter(
        self: "CredentialsUpdater",
        event: asyncio.Event,
        timeout: Optional[int] = 0,
    ) -> bool:
        # suppress TimeoutError because we'll return False in case of timeout
        with contextlib.suppress(asyncio.TimeoutError):
            await asyncio.wait_for(event.wait(), timeout)
        return event.is_set()

    async def _background_looper(self: "CredentialsUpdater") -> None:
        with contextlib.suppress(asyncio.CancelledError):
            while not await self._background_waiter(self.updater_canceled, self.updater_refresh):
                # we need the background task to keep looping and try again
                # so ignore any error that comes out of it and start again
                with contextlib.suppress(Exception):
                    await self._background_task()

        logger.info("credentials updater background task shutting down")

    async def _background_task(self: "CredentialsUpdater") -> None:
        # Randomly wait up to 2^x * 10 seconds between each retry, at least 60
        # seconds until the range reaches 600 seconds, then randomly up to 600
        # seconds afterward. If we were told to cancel then stop retrying.
        @tenacity.retry(
            wait=tenacity.wait_random_exponential(multiplier=10, min=60, max=600),
            stop=tenacity.stop_when_event_set(self.updater_canceled),
            before_sleep=tenacity.before_sleep_log(logger, logging.ERROR),
            reraise=True,
        )
        async def task() -> None:
            try:
                self.data_cache = await self.data_manager.credentials
            except Exception as e:
                logger.exception("unable to fetch credentials: %s", str(e))
                raise

        await task()
        logger.info("finished refreshing credentials")

    @property
    def credentials(self: "CredentialsUpdater") -> Optional[str]:
        return self.data_cache


class CredentialsManager:

    def __init__(
        self: "CredentialsManager",
        url: Optional[str] = None,
        username: Optional[str] = None,
        password: Optional[str] = None,
        serialno: Optional[str] = None,
        jwt: Optional[str] = None,
    ) -> None:
        self.enphase_url = url
        self.enphase_username = username
        self.enphase_password = password
        self.enphase_serialno = serialno
        self.enphase_jwt = jwt

        self.data: Optional[FetchedCredentials] = None
        # {
        #     "fetched": None, # this is when we last fetched the jwt
        #     "expiry": None,  # this is when the jwt alleges to expire
        #     "token": None,   # this is the jwt that can be used for the api
        # }

    @property
    async def credentials(self: "CredentialsManager") -> str:
        if self.enphase_jwt:
            logger.debug("using a locally provided token")
            return self.enphase_jwt

        # we haven't fetched any credentials yet
        if self.data is None:
            logger.info("no credentials known -- fetching new credentials")
            self.data = await self._fetch_credentials()

        # if the credentials are closer to their expiration than to their creation then fetch new ones
        if self.data.expires_at < datetime.now() + timedelta(minutes=1):
            logger.info(
                "credentials will expire at %s -- fetching new credentials",
                self.data.expires_at,
            )
            self.data = await self._fetch_credentials()

        return self.data.token

    async def _fetch_credentials(self: "CredentialsManager") -> FetchedCredentials:
        async with httpx.AsyncClient(base_url=self.enphase_url, headers={"User-Agent": ""}, timeout=60) as client:
            # get the session id
            url = "/login/login.json"
            data = {
                "user[email]": self.enphase_username,
                "user[password]": self.enphase_password,
            }
            result = await client.post(url, data=data)
            result.raise_for_status()
            session_id = result.json()["session_id"]

            # then get the jwt with the session id
            url = f"/entrez-auth-token?serial_num={self.enphase_serialno}"
            headers = {"Cookie": f"_enlighten_4_session={session_id}"}
            result = await client.get(url, headers=headers)
            result.raise_for_status()
            data = result.json()

        return FetchedCredentials(
            # calls to the data dict return "str | None" which is incompatible with the target.
            # so we will ignore that particular type mismatch since we're very sure of what we are doing here.
            fetched_at=datetime.fromtimestamp(float(data["generation_time"])),  # type: ignore[arg-type]
            expires_at=datetime.fromtimestamp(float(data["expires_at"])),  # type: ignore[arg-type]
            token=data["token"],  # type: ignore[arg-type]
        )
