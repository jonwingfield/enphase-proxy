import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core';
import Oas from 'oas';
import APICore from 'api/dist/core';
declare class SDK {
    spec: Oas;
    core: APICore;
    constructor();
    /**
     * Optionally configure various options that the SDK allows.
     *
     * @param config Object of supported SDK options and toggles.
     * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
     * should be represented in milliseconds.
     */
    config(config: ConfigOptions): void;
    /**
     * If the API you're using requires authentication you can supply the required credentials
     * through this method and the library will magically determine how they should be used
     * within your API request.
     *
     * With the exception of OpenID and MutualTLS, it supports all forms of authentication
     * supported by the OpenAPI specification.
     *
     * @example <caption>HTTP Basic auth</caption>
     * sdk.auth('username', 'password');
     *
     * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
     * sdk.auth('myBearerToken');
     *
     * @example <caption>API Keys</caption>
     * sdk.auth('myApiKey');
     *
     * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
     * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
     * @param values Your auth credentials for the API; can specify up to two strings or numbers.
     */
    auth(...values: string[] | number[]): this;
    /**
     * If the API you're using offers alternate server URLs, and server variables, you can tell
     * the SDK which one to use with this method. To use it you can supply either one of the
     * server URLs that are contained within the OpenAPI definition (along with any server
     * variables), or you can pass it a fully qualified URL to use (that may or may not exist
     * within the OpenAPI definition).
     *
     * @example <caption>Server URL with server variables</caption>
     * sdk.server('https://{region}.api.example.com/{basePath}', {
     *   name: 'eu',
     *   basePath: 'v14',
     * });
     *
     * @example <caption>Fully qualified server URL</caption>
     * sdk.server('https://eu.api.example.com/v14');
     *
     * @param url Server URL
     * @param variables An object of variables to replace into the server URL.
     */
    server(url: string, variables?: {}): void;
    /**
     * Returns the latest state of a vehicle.
     *
     * If **use_cache** is **true** (default), this call always returns a complete set of data
     * and doesn't impact vehicle sleep. If the vehicle is awake, the data is usually less than
     * 15 seconds old. If the vehicle is asleep, the data is from the time the vehicle went to
     * sleep.
     *
     * If **use_cache** is **false**, this call retrieves data using a live connection, which
     * may return `{"state": "asleep"}` or network errors depending on vehicle connectivity.
     *
     * @summary Get Vehicle
     */
    getState(metadata: types.GetStateMetadataParam): Promise<FetchResponse<200, types.GetStateResponse200>>;
    /**
     * Returns the latest state of all vehicles.
     *
     * This call always returns a complete set of data and doesn't impact vehicle sleep. If the
     * vehicle is awake, the data is usually less than 15 seconds old. If the vehicle is
     * asleep, the data is from the time the vehicle went to sleep.
     *
     * @summary Get All Vehicles
     */
    getVehicles(metadata?: types.GetVehiclesMetadataParam): Promise<FetchResponse<200, types.GetVehiclesResponse200>>;
    /**
     * Returns historical states for a vehicle during a timeframe.
     *
     * If no interval is specified, a sensible interval based on the timeframe is used.
     *
     * @summary Get Historical States
     */
    getHistoricalStates(metadata: types.GetHistoricalStatesMetadataParam): Promise<FetchResponse<200, types.GetHistoricalStatesResponse200>>;
    /**
     * Returns the state of a vehicle's battery.
     *
     * @summary Get Battery
     */
    getBattery(metadata: types.GetBatteryMetadataParam): Promise<FetchResponse<200, types.GetBatteryResponse200>>;
    /**
     * Returns the battery health of all vehicles.
     *
     * @summary Get Battery Health
     */
    getBatteryHealth(metadata?: types.GetBatteryHealthMetadataParam): Promise<FetchResponse<200, types.GetBatteryHealthResponse200>>;
    /**
     * Returns the battery health measurements for a vehicle over time.
     *
     * @summary Get Battery Health Measurements
     */
    getBatteryHealthMeasurements(metadata: types.GetBatteryHealthMeasurementsMetadataParam): Promise<FetchResponse<200, types.GetBatteryHealthMeasurementsResponse200>>;
    /**
     * Returns the coordinates, street address and associated saved location of a vehicle.
     *
     * @summary Get Location
     */
    getLocation(metadata: types.GetLocationMetadataParam): Promise<FetchResponse<200, types.GetLocationResponse200>>;
    /**
     * Returns the list of firmware alerts generated by a vehicle.
     *
     * @summary Get Firmware Alerts
     */
    getFirmwareAlerts(metadata: types.GetFirmwareAlertsMetadataParam): Promise<FetchResponse<200, types.GetFirmwareAlertsResponse200>>;
    /**
     * Returns a map image of a vehicle's location.
     *
     * @summary Get Map
     */
    getMap(metadata: types.GetMapMetadataParam): Promise<FetchResponse<200, types.GetMapResponse200>>;
    /**
     * Returns consumption data since a vehicle was last charged.
     *
     * @summary Get Consumption
     */
    getConsumption(metadata: types.GetConsumptionMetadataParam): Promise<FetchResponse<200, types.GetConsumptionResponse200>>;
    /**
     * Returns the weather forecast around a vehicle.
     *
     * @summary Get Weather
     */
    getWeather(metadata: types.GetWeatherMetadataParam): Promise<FetchResponse<200, types.GetWeatherResponse200>>;
    /**
     * Returns the drives for a vehicle.
     *
     * @summary Get Drives
     */
    getDrives(metadata: types.GetDrivesMetadataParam): Promise<FetchResponse<200, types.GetDrivesResponse200>>;
    /**
     * Returns the driving path of a vehicle during a given timeframe.
     *
     * If no timeframe is specified, returns the driving path for the last 30 days.
     *
     * @summary Get Driving Path
     */
    getDrivingPath(metadata: types.GetDrivingPathMetadataParam): Promise<FetchResponse<200, types.GetDrivingPathResponse200>>;
    /**
     * Sets the tag for a list of drives.
     *
     * @summary Set Drive Tag
     */
    setDriveTag(body: types.SetDriveTagBodyParam, metadata: types.SetDriveTagMetadataParam): Promise<FetchResponse<200, types.SetDriveTagResponse200>>;
    /**
     * Returns the charges for a vehicle.
     *
     * @summary Get Charges
     */
    getCharges(metadata: types.GetChargesMetadataParam): Promise<FetchResponse<200, types.GetChargesResponse200>>;
    /**
     * Returns charging invoices for all vehicles.
     *
     * For fleet accounts only.
     *
     * @summary Get All Charging Invoices
     */
    getFleetChargingInvoices(metadata?: types.GetFleetChargingInvoicesMetadataParam): Promise<FetchResponse<200, types.GetFleetChargingInvoicesResponse200>>;
    /**
     * Sets the cost of a charge.
     *
     * @summary Set Charge Cost
     */
    setChargeCost(body: types.SetChargeCostBodyParam, metadata: types.SetChargeCostMetadataParam): Promise<FetchResponse<200, types.SetChargeCostResponse200>>;
    setChargeCost(metadata: types.SetChargeCostMetadataParam): Promise<FetchResponse<200, types.SetChargeCostResponse200>>;
    /**
     * Returns the idles for a vehicle.
     *
     * A vehicle is considered idle if not driving or charging.
     *
     * @summary Get Idles
     */
    getIdles(metadata: types.GetIdlesMetadataParam): Promise<FetchResponse<200, types.GetIdlesResponse200>>;
    /**
     * Returns data associated with when a vehicle last stopped driving or charging.
     *
     * @summary Get Last Idle State
     */
    getLastIdleState(metadata: types.GetLastIdleStateMetadataParam): Promise<FetchResponse<200, types.GetLastIdleStateResponse200>>;
    /**
     * Returns the tire pressure of a vehicle, measured in bar.
     *
     * Requires firmware 2022.4.5+.
     *
     * @summary Get Tire Pressure
     */
    getTirePressure(metadata: types.GetTirePressureMetadataParam): Promise<FetchResponse<200, types.GetTirePressureResponse200>>;
    /**
     * Returns the status of a vehicle.
     *
     * The status may be `asleep`, `waiting_for_sleep` or `awake`.
     *
     * @summary Get Status
     */
    getStatus(metadata: types.GetStatusMetadataParam): Promise<FetchResponse<200, types.GetStatusResponse200>>;
    /**
     * Wakes the vehicle from sleep.
     *
     * Returns true after the vehicle is awake, or false after a 90 second timeout.
     *
     * @summary Wake
     */
    wake(metadata: types.WakeMetadataParam): Promise<FetchResponse<200, types.WakeResponse200>>;
    /**
     * Locks the vehicle.
     *
     * @summary Lock
     */
    lock(metadata: types.LockMetadataParam): Promise<FetchResponse<200, types.LockResponse200>>;
    /**
     * Unlocks the vehicle.
     *
     * @summary Unlock
     */
    unlock(metadata: types.UnlockMetadataParam): Promise<FetchResponse<200, types.UnlockResponse200>>;
    /**
     * Opens the front trunk.
     *
     * @summary Front Trunk
     */
    activateFrontTrunk(metadata: types.ActivateFrontTrunkMetadataParam): Promise<FetchResponse<200, types.ActivateFrontTrunkResponse200>>;
    /**
     * Opens the rear trunk, or closes it if the trunk is open and the vehicle has a powered
     * trunk.
     *
     * @summary Rear Trunk
     */
    activateRearTrunk(metadata: types.ActivateRearTrunkMetadataParam): Promise<FetchResponse<200, types.ActivateRearTrunkResponse200>>;
    /**
     * Opens the tonneau.
     *
     * @summary Open Tonneau
     */
    openTonneau(metadata: types.OpenTonneauMetadataParam): Promise<FetchResponse<200, types.OpenTonneauResponse200>>;
    /**
     * Closes the tonneau.
     *
     * @summary Close Tonneau
     */
    closeTonneau(metadata: types.CloseTonneauMetadataParam): Promise<FetchResponse<200, types.CloseTonneauResponse200>>;
    /**
     * Vents all windows.
     *
     * @summary Vent Windows
     */
    ventWindows(metadata: types.VentWindowsMetadataParam): Promise<FetchResponse<200, types.VentWindowsResponse200>>;
    /**
     * Closes all windows, if the vehicle supports it.
     *
     * @summary Close Windows
     */
    closeWindows(metadata: types.CloseWindowsMetadataParam): Promise<FetchResponse<200, types.CloseWindowsResponse200>>;
    /**
     * Starts the climate system and preconditions the battery.
     *
     * @summary Start Climate
     */
    startClimate(metadata: types.StartClimateMetadataParam): Promise<FetchResponse<200, types.StartClimateResponse200>>;
    /**
     * Stops the climate system.
     *
     * @summary Stop Climate
     */
    stopClimate(metadata: types.StopClimateMetadataParam): Promise<FetchResponse<200, types.StopClimateResponse200>>;
    /**
     * Sets the cabin temperature.
     *
     * @summary Set Temperature
     */
    setTemperatures(metadata: types.SetTemperaturesMetadataParam): Promise<FetchResponse<200, types.SetTemperaturesResponse200>>;
    /**
     * Sets the seat heating level.
     *
     * @summary Set Seat Heating
     */
    setSeatHeating(metadata: types.SetSeatHeatingMetadataParam): Promise<FetchResponse<200, types.SetSeatHeatingResponse200>>;
    /**
     * Sets the seat cooling level.
     *
     * @summary Set Seat Cooling
     */
    setSeatCooling(metadata: types.SetSeatCoolingMetadataParam): Promise<FetchResponse<200, types.SetSeatCoolingResponse200>>;
    /**
     * Starts defrosting.
     *
     * @summary Start Defrost
     */
    startMaxDefrost(metadata: types.StartMaxDefrostMetadataParam): Promise<FetchResponse<200, types.StartMaxDefrostResponse200>>;
    /**
     * Stops defrosting.
     *
     * @summary Stop Defrost
     */
    stopMaxDefrost(metadata: types.StopMaxDefrostMetadataParam): Promise<FetchResponse<200, types.StopMaxDefrostResponse200>>;
    /**
     * Starts the steering wheel heater.
     *
     * @summary Start Steering Wheel Heater
     */
    startSteeringWheelHeater(metadata: types.StartSteeringWheelHeaterMetadataParam): Promise<FetchResponse<200, types.StartSteeringWheelHeaterResponse200>>;
    /**
     * Stops the steering wheel heater.
     *
     * @summary Stop Steering Wheel Heater
     */
    stopSteeringWheelHeater(metadata: types.StopSteeringWheelHeaterMetadataParam): Promise<FetchResponse<200, types.StopSteeringWheelHeaterResponse200>>;
    /**
     * Sets Bioweapon Defense Mode.
     *
     * @summary Set Bio Defense Mode
     */
    setBioweaponMode(metadata: types.SetBioweaponModeMetadataParam): Promise<FetchResponse<200, types.SetBioweaponModeResponse200>>;
    /**
     * Sets the Climate Keeper mode.
     *
     * @summary Set Climate Keeper Mode
     */
    setClimateKeeperMode(metadata: types.SetClimateKeeperModeMetadataParam): Promise<FetchResponse<200, types.SetClimateKeeperModeResponse200>>;
    /**
     * Starts charging.
     *
     * @summary Start Charging
     */
    startCharging(metadata: types.StartChargingMetadataParam): Promise<FetchResponse<200, types.StartChargingResponse200>>;
    /**
     * Stops charging.
     *
     * @summary Stop Charging
     */
    stopCharging(metadata: types.StopChargingMetadataParam): Promise<FetchResponse<200, types.StopChargingResponse200>>;
    /**
     * Sets the charge limit.
     *
     * @summary Set Charge Limit
     */
    setChargeLimit(metadata: types.SetChargeLimitMetadataParam): Promise<FetchResponse<200, types.SetChargeLimitResponse200>>;
    /**
     * Sets the charging amps.
     *
     * @summary Set Charging Amps
     */
    setChargingAmps(metadata: types.SetChargingAmpsMetadataParam): Promise<FetchResponse<200, types.SetChargingAmpsResponse200>>;
    /**
     * Opens the charge port if it's closed, or unlocks it if it's open.
     *
     * @summary Open Charge Port
     */
    openChargePort(metadata: types.OpenChargePortMetadataParam): Promise<FetchResponse<200, types.OpenChargePortResponse200>>;
    /**
     * Closes the charge port.
     *
     * @summary Close Charge Port
     */
    closeChargePort(metadata: types.CloseChargePortMetadataParam): Promise<FetchResponse<200, types.CloseChargePortResponse200>>;
    /**
     * Flashes the lights.
     *
     * @summary Flash Lights
     */
    flash(metadata: types.FlashMetadataParam): Promise<FetchResponse<200, types.FlashResponse200>>;
    /**
     * Honks the horn.
     *
     * @summary Honk
     */
    honk(metadata: types.HonkMetadataParam): Promise<FetchResponse<200, types.HonkResponse200>>;
    /**
     * Triggers the primary HomeLink device.
     *
     * @summary Trigger HomeLink
     */
    triggerHomelink(metadata: types.TriggerHomelinkMetadataParam): Promise<FetchResponse<200, types.TriggerHomelinkResponse200>>;
    /**
     * Enables keyless driving.
     *
     * Driving must begin within 2 minutes.
     *
     * @summary Enable Keyless Driving
     */
    remoteStart(metadata: types.RemoteStartMetadataParam): Promise<FetchResponse<200, types.RemoteStartResponse200>>;
    /**
     * Vents the sunroof.
     *
     * @summary Vent Sunroof
     */
    ventSunroof(metadata: types.VentSunroofMetadataParam): Promise<FetchResponse<200, types.VentSunroofResponse200>>;
    /**
     * Closes the sunroof.
     *
     * @summary Close Sunroof
     */
    closeSunroof(metadata: types.CloseSunroofMetadataParam): Promise<FetchResponse<200, types.CloseSunroofResponse200>>;
    /**
     * Enables Sentry Mode.
     *
     * @summary Enable Sentry Mode
     */
    enableSentry(metadata: types.EnableSentryMetadataParam): Promise<FetchResponse<200, types.EnableSentryResponse200>>;
    /**
     * Disables Sentry Mode.
     *
     * @summary Disable Sentry Mode
     */
    disableSentry(metadata: types.DisableSentryMetadataParam): Promise<FetchResponse<200, types.DisableSentryResponse200>>;
    /**
     * Enables Valet Mode.
     *
     * @summary Enable Valet Mode
     */
    enableValet(metadata: types.EnableValetMetadataParam): Promise<FetchResponse<200, types.EnableValetResponse200>>;
    /**
     * Disables Valet Mode.
     *
     * @summary Disable Valet Mode
     */
    disableValet(metadata: types.DisableValetMetadataParam): Promise<FetchResponse<200, types.DisableValetResponse200>>;
    /**
     * Schedules a software update.
     *
     * @summary Schedule Software Update
     */
    scheduleSoftwareUpdate(metadata: types.ScheduleSoftwareUpdateMetadataParam): Promise<FetchResponse<200, types.ScheduleSoftwareUpdateResponse200>>;
    /**
     * Cancels any scheduled software update.
     *
     * @summary Cancel Software Update
     */
    cancelSoftwareUpdate(metadata: types.CancelSoftwareUpdateMetadataParam): Promise<FetchResponse<200, types.CancelSoftwareUpdateResponse200>>;
    /**
     * Sets the scheduled charging configuration.
     *
     * For vehicles on 2024.26+, use
     * [add_charge_schedule](https://developer.tessie.com/reference/add-charge-schedule) and
     * [add_precondition_schedule](https://developer.tessie.com/reference/remove-charge-schedule)
     * instead.
     *
     * @summary Set Scheduled Charging
     */
    setScheduledCharging(metadata: types.SetScheduledChargingMetadataParam): Promise<FetchResponse<200, types.SetScheduledChargingResponse200>>;
    /**
     * Sets the scheduled departure configuration.
     *
     * For vehicles on 2024.26+, use
     * [add_charge_schedule](https://developer.tessie.com/reference/add-charge-schedule) and
     * [add_precondition_schedule](https://developer.tessie.com/reference/remove-charge-schedule)
     * instead.
     *
     * @summary Set Scheduled Departure
     */
    setScheduledDeparture(metadata: types.SetScheduledDepartureMetadataParam): Promise<FetchResponse<200, types.SetScheduledDepartureResponse200>>;
    /**
     * Add or update a charging schedule.
     *
     * @summary Add Charge Schedule
     */
    addChargeSchedule(metadata: types.AddChargeScheduleMetadataParam): Promise<FetchResponse<200, types.AddChargeScheduleResponse200>>;
    /**
     * Remove a charging schedule.
     *
     * @summary Remove Charge Schedule
     */
    removeChargeSchedule(metadata: types.RemoveChargeScheduleMetadataParam): Promise<FetchResponse<200, types.RemoveChargeScheduleResponse200>>;
    /**
     * Add or update a preconditioning schedule.
     *
     * @summary Add Precondition Schedule
     */
    addPreconditionSchedule(metadata: types.AddPreconditionScheduleMetadataParam): Promise<FetchResponse<200, types.AddPreconditionScheduleResponse200>>;
    /**
     * Remove a preconditioning schedule.
     *
     * @summary Remove Precondition Schedule
     */
    removePreconditionSchedule(metadata: types.RemovePreconditionScheduleMetadataParam): Promise<FetchResponse<200, types.RemovePreconditionScheduleResponse200>>;
    /**
     * Shares an address, latitude/longitude or video URL to the vehicle.
     *
     * @summary Share
     */
    share(metadata: types.ShareMetadataParam): Promise<FetchResponse<200, types.ShareResponse200>>;
    /**
     * Generates a fart sound.
     *
     * Requires 2022.40.25+.
     *
     * @summary Boombox
     */
    boombox(metadata: types.BoomboxMetadataParam): Promise<FetchResponse<200, types.BoomboxResponse200>>;
    /**
     * Sets the speed limit.
     *
     * @summary Set Speed Limit
     */
    setSpeedLimit(metadata: types.SetSpeedLimitMetadataParam): Promise<FetchResponse<200, types.SetSpeedLimitResponse200>>;
    /**
     * Activates the speed limit.
     *
     * @summary Enable Speed Limit
     */
    enableSpeedLimit(metadata: types.EnableSpeedLimitMetadataParam): Promise<FetchResponse<200, types.EnableSpeedLimitResponse200>>;
    /**
     * Disables the speed limit.
     *
     * @summary Disable Speed Limit
     */
    disableSpeedLimit(metadata: types.DisableSpeedLimitMetadataParam): Promise<FetchResponse<200, types.DisableSpeedLimitResponse200>>;
    /**
     * Removes the speed limit PIN.
     *
     * @summary Clear Speed Limit PIN
     */
    clearSpeedLimitPin(metadata: types.ClearSpeedLimitPinMetadataParam): Promise<FetchResponse<200, types.ClearSpeedLimitPinResponse200>>;
    /**
     * Returns a list of additional drivers.
     *
     * @summary Get Drivers
     */
    getDrivers(metadata: types.GetDriversMetadataParam): Promise<FetchResponse<200, types.GetDriversResponse200>>;
    /**
     * Deletes a driver from the vehicle.
     *
     * @summary Delete Driver
     */
    deleteDriver(body: types.DeleteDriverBodyParam, metadata: types.DeleteDriverMetadataParam): Promise<FetchResponse<200, types.DeleteDriverResponse200>>;
    deleteDriver(metadata: types.DeleteDriverMetadataParam): Promise<FetchResponse<200, types.DeleteDriverResponse200>>;
    /**
     * Enables Guest Mode.
     *
     * @summary Enable Guest Mode
     */
    enableGuest(metadata: types.EnableGuestMetadataParam): Promise<FetchResponse<200, types.EnableGuestResponse200>>;
    /**
     * Disables Guest Mode.
     *
     * @summary Disable Guest Mode
     */
    disableGuest(metadata: types.DisableGuestMetadataParam): Promise<FetchResponse<200, types.DisableGuestResponse200>>;
    /**
     * Returns a list of driver invitations.
     *
     * @summary Get Invitations
     */
    getInvitations(metadata: types.GetInvitationsMetadataParam): Promise<FetchResponse<200, types.GetInvitationsResponse200>>;
    /**
     * Creates a driver invitation.
     *
     * @summary Create an Invitation
     */
    createInvitation(metadata: types.CreateInvitationMetadataParam): Promise<FetchResponse<200, types.CreateInvitationResponse200>>;
    /**
     * Revokes a driver invitation.
     *
     * @summary Revoke an Invitation
     */
    revokeInvitation(metadata: types.RevokeInvitationMetadataParam): Promise<FetchResponse<200, types.RevokeInvitationResponse200>>;
    /**
     * Returns the license plate of the vehicle.
     *
     * @summary Get License Plate
     */
    getPlate(metadata: types.GetPlateMetadataParam): Promise<FetchResponse<200, types.GetPlateResponse200>>;
    /**
     * Sets the license plate for the vehicle.
     *
     * @summary Set License Plate
     */
    setPlate(body: types.SetPlateBodyParam, metadata: types.SetPlateMetadataParam): Promise<FetchResponse<200, types.SetPlateResponse200>>;
    setPlate(metadata: types.SetPlateMetadataParam): Promise<FetchResponse<200, types.SetPlateResponse200>>;
    /**
     * Returns the vehicle's Fleet Telemetry configuration.
     *
     * @summary Get Telemetry Config
     */
    getFleetTelemetryConfig(metadata: types.GetFleetTelemetryConfigMetadataParam): Promise<FetchResponse<200, types.GetFleetTelemetryConfigResponse200>>;
    /**
     * Sets the vehicle's Fleet Telemetry configuration.
     *
     * By default, sets our recommended configuration. Specify a configuration to overwrite it.
     *
     * **Important:** Modifying this configuration may have adverse effects on Tessie platform
     * functionality. For example, omitting the gear field will prevent your vehicle from being
     * tracked.
     *
     * Example configuration:
     *
     * ```json
     * {
     *   "fields": {
     *     "ACChargingPower": {
     *       "interval_seconds": 60
     *     },
     *     "BatteryLevel": {
     *       "interval_seconds": 60
     *     },
     *     "ChargeState": {
     *       "interval_seconds": 60
     *     },
     *     "DCChargingPower": {
     *       "interval_seconds": 60
     *     },
     *     "EnergyRemaining": {
     *       "interval_seconds": 60
     *     },
     *     "Gear": {
     *       "interval_seconds": 60
     *     },
     *     "IdealBatteryRange": {
     *       "interval_seconds": 60
     *     },
     *     "Location": {
     *       "interval_seconds": 60
     *     },
     *     "Odometer": {
     *       "interval_seconds": 60
     *     },
     *     "RatedRange": {
     *       "interval_seconds": 60
     *     }
     *   }
     * }
     * ```
     *
     * The complete list of fields can be found
     * [here](https://github.com/teslamotors/fleet-telemetry/blob/main/protos/vehicle_data.proto).
     *
     *
     * @summary Set Telemetry Config
     */
    setFleetTelemetryConfig(body: types.SetFleetTelemetryConfigBodyParam, metadata: types.SetFleetTelemetryConfigMetadataParam): Promise<FetchResponse<200, types.SetFleetTelemetryConfigResponse200>>;
    setFleetTelemetryConfig(metadata: types.SetFleetTelemetryConfigMetadataParam): Promise<FetchResponse<200, types.SetFleetTelemetryConfigResponse200>>;
    /**
     * Delete the vehicle's Fleet Telemetry configuration.
     *
     * **Important:** Deleting this configuration will disable Tessie platform functionality.
     *
     * @summary Delete Telemetry Config
     */
    deleteFleetTelemetryConfig(body: types.DeleteFleetTelemetryConfigBodyParam, metadata: types.DeleteFleetTelemetryConfigMetadataParam): Promise<FetchResponse<200, types.DeleteFleetTelemetryConfigResponse200>>;
    deleteFleetTelemetryConfig(metadata: types.DeleteFleetTelemetryConfigMetadataParam): Promise<FetchResponse<200, types.DeleteFleetTelemetryConfigResponse200>>;
}
declare const createSDK: SDK;
export = createSDK;