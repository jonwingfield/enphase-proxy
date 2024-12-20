"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var oas_1 = __importDefault(require("oas"));
var core_1 = __importDefault(require("api/dist/core"));
var openapi_json_1 = __importDefault(require("./openapi.json"));
var SDK = /** @class */ (function () {
    function SDK() {
        this.spec = oas_1.default.init(openapi_json_1.default);
        this.core = new core_1.default(this.spec, 'tessie/1.0.0 (api/6.1.2)');
    }
    /**
     * Optionally configure various options that the SDK allows.
     *
     * @param config Object of supported SDK options and toggles.
     * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
     * should be represented in milliseconds.
     */
    SDK.prototype.config = function (config) {
        this.core.setConfig(config);
    };
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
    SDK.prototype.auth = function () {
        var _a;
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        (_a = this.core).setAuth.apply(_a, values);
        return this;
    };
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
    SDK.prototype.server = function (url, variables) {
        if (variables === void 0) { variables = {}; }
        this.core.setServer(url, variables);
    };
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
    SDK.prototype.getState = function (metadata) {
        return this.core.fetch('/{vin}/state', 'get', metadata);
    };
    /**
     * Returns the latest state of all vehicles.
     *
     * This call always returns a complete set of data and doesn't impact vehicle sleep. If the
     * vehicle is awake, the data is usually less than 15 seconds old. If the vehicle is
     * asleep, the data is from the time the vehicle went to sleep.
     *
     * @summary Get All Vehicles
     */
    SDK.prototype.getVehicles = function (metadata) {
        return this.core.fetch('/vehicles', 'get', metadata);
    };
    /**
     * Returns historical states for a vehicle during a timeframe.
     *
     * If no interval is specified, a sensible interval based on the timeframe is used.
     *
     * @summary Get Historical States
     */
    SDK.prototype.getHistoricalStates = function (metadata) {
        return this.core.fetch('/{vin}/states', 'get', metadata);
    };
    /**
     * Returns the state of a vehicle's battery.
     *
     * @summary Get Battery
     */
    SDK.prototype.getBattery = function (metadata) {
        return this.core.fetch('/{vin}/battery', 'get', metadata);
    };
    /**
     * Returns the battery health of all vehicles.
     *
     * @summary Get Battery Health
     */
    SDK.prototype.getBatteryHealth = function (metadata) {
        return this.core.fetch('/battery_health', 'get', metadata);
    };
    /**
     * Returns the battery health measurements for a vehicle over time.
     *
     * @summary Get Battery Health Measurements
     */
    SDK.prototype.getBatteryHealthMeasurements = function (metadata) {
        return this.core.fetch('/{vin}/battery_health', 'get', metadata);
    };
    /**
     * Returns the coordinates, street address and associated saved location of a vehicle.
     *
     * @summary Get Location
     */
    SDK.prototype.getLocation = function (metadata) {
        return this.core.fetch('/{vin}/location', 'get', metadata);
    };
    /**
     * Returns the list of firmware alerts generated by a vehicle.
     *
     * @summary Get Firmware Alerts
     */
    SDK.prototype.getFirmwareAlerts = function (metadata) {
        return this.core.fetch('/{vin}/firmware_alerts', 'get', metadata);
    };
    /**
     * Returns a map image of a vehicle's location.
     *
     * @summary Get Map
     */
    SDK.prototype.getMap = function (metadata) {
        return this.core.fetch('/{vin}/map', 'get', metadata);
    };
    /**
     * Returns consumption data since a vehicle was last charged.
     *
     * @summary Get Consumption
     */
    SDK.prototype.getConsumption = function (metadata) {
        return this.core.fetch('/{vin}/consumption_since_charge', 'get', metadata);
    };
    /**
     * Returns the weather forecast around a vehicle.
     *
     * @summary Get Weather
     */
    SDK.prototype.getWeather = function (metadata) {
        return this.core.fetch('/{vin}/weather', 'get', metadata);
    };
    /**
     * Returns the drives for a vehicle.
     *
     * @summary Get Drives
     */
    SDK.prototype.getDrives = function (metadata) {
        return this.core.fetch('/{vin}/drives', 'get', metadata);
    };
    /**
     * Returns the driving path of a vehicle during a given timeframe.
     *
     * If no timeframe is specified, returns the driving path for the last 30 days.
     *
     * @summary Get Driving Path
     */
    SDK.prototype.getDrivingPath = function (metadata) {
        return this.core.fetch('/{vin}/path', 'get', metadata);
    };
    /**
     * Sets the tag for a list of drives.
     *
     * @summary Set Drive Tag
     */
    SDK.prototype.setDriveTag = function (body, metadata) {
        return this.core.fetch('/{vin}/drives/set_tag', 'post', body, metadata);
    };
    /**
     * Returns the charges for a vehicle.
     *
     * @summary Get Charges
     */
    SDK.prototype.getCharges = function (metadata) {
        return this.core.fetch('/{vin}/charges', 'get', metadata);
    };
    /**
     * Returns charging invoices for all vehicles.
     *
     * For fleet accounts only.
     *
     * @summary Get All Charging Invoices
     */
    SDK.prototype.getFleetChargingInvoices = function (metadata) {
        return this.core.fetch('/charging_invoices', 'get', metadata);
    };
    SDK.prototype.setChargeCost = function (body, metadata) {
        return this.core.fetch('/{vin}/charges/{id}/set_cost', 'post', body, metadata);
    };
    /**
     * Returns the idles for a vehicle.
     *
     * A vehicle is considered idle if not driving or charging.
     *
     * @summary Get Idles
     */
    SDK.prototype.getIdles = function (metadata) {
        return this.core.fetch('/{vin}/idles', 'get', metadata);
    };
    /**
     * Returns data associated with when a vehicle last stopped driving or charging.
     *
     * @summary Get Last Idle State
     */
    SDK.prototype.getLastIdleState = function (metadata) {
        return this.core.fetch('/{vin}/last_idle_state', 'get', metadata);
    };
    /**
     * Returns the tire pressure of a vehicle, measured in bar.
     *
     * Requires firmware 2022.4.5+.
     *
     * @summary Get Tire Pressure
     */
    SDK.prototype.getTirePressure = function (metadata) {
        return this.core.fetch('/{vin}/tire_pressure', 'get', metadata);
    };
    /**
     * Returns the status of a vehicle.
     *
     * The status may be `asleep`, `waiting_for_sleep` or `awake`.
     *
     * @summary Get Status
     */
    SDK.prototype.getStatus = function (metadata) {
        return this.core.fetch('/{vin}/status', 'get', metadata);
    };
    /**
     * Wakes the vehicle from sleep.
     *
     * Returns true after the vehicle is awake, or false after a 90 second timeout.
     *
     * @summary Wake
     */
    SDK.prototype.wake = function (metadata) {
        return this.core.fetch('/{vin}/wake', 'post', metadata);
    };
    /**
     * Locks the vehicle.
     *
     * @summary Lock
     */
    SDK.prototype.lock = function (metadata) {
        return this.core.fetch('/{vin}/command/lock', 'post', metadata);
    };
    /**
     * Unlocks the vehicle.
     *
     * @summary Unlock
     */
    SDK.prototype.unlock = function (metadata) {
        return this.core.fetch('/{vin}/command/unlock', 'post', metadata);
    };
    /**
     * Opens the front trunk.
     *
     * @summary Front Trunk
     */
    SDK.prototype.activateFrontTrunk = function (metadata) {
        return this.core.fetch('/{vin}/command/activate_front_trunk', 'post', metadata);
    };
    /**
     * Opens the rear trunk, or closes it if the trunk is open and the vehicle has a powered
     * trunk.
     *
     * @summary Rear Trunk
     */
    SDK.prototype.activateRearTrunk = function (metadata) {
        return this.core.fetch('/{vin}/command/activate_rear_trunk', 'post', metadata);
    };
    /**
     * Opens the tonneau.
     *
     * @summary Open Tonneau
     */
    SDK.prototype.openTonneau = function (metadata) {
        return this.core.fetch('/{vin}/command/open_tonneau', 'post', metadata);
    };
    /**
     * Closes the tonneau.
     *
     * @summary Close Tonneau
     */
    SDK.prototype.closeTonneau = function (metadata) {
        return this.core.fetch('/{vin}/command/close_tonneau', 'post', metadata);
    };
    /**
     * Vents all windows.
     *
     * @summary Vent Windows
     */
    SDK.prototype.ventWindows = function (metadata) {
        return this.core.fetch('/{vin}/command/vent_windows', 'post', metadata);
    };
    /**
     * Closes all windows, if the vehicle supports it.
     *
     * @summary Close Windows
     */
    SDK.prototype.closeWindows = function (metadata) {
        return this.core.fetch('/{vin}/command/close_windows', 'post', metadata);
    };
    /**
     * Starts the climate system and preconditions the battery.
     *
     * @summary Start Climate
     */
    SDK.prototype.startClimate = function (metadata) {
        return this.core.fetch('/{vin}/command/start_climate', 'post', metadata);
    };
    /**
     * Stops the climate system.
     *
     * @summary Stop Climate
     */
    SDK.prototype.stopClimate = function (metadata) {
        return this.core.fetch('/{vin}/command/stop_climate', 'post', metadata);
    };
    /**
     * Sets the cabin temperature.
     *
     * @summary Set Temperature
     */
    SDK.prototype.setTemperatures = function (metadata) {
        return this.core.fetch('/{vin}/command/set_temperatures', 'post', metadata);
    };
    /**
     * Sets the seat heating level.
     *
     * @summary Set Seat Heating
     */
    SDK.prototype.setSeatHeating = function (metadata) {
        return this.core.fetch('/{vin}/command/set_seat_heat', 'post', metadata);
    };
    /**
     * Sets the seat cooling level.
     *
     * @summary Set Seat Cooling
     */
    SDK.prototype.setSeatCooling = function (metadata) {
        return this.core.fetch('/{vin}/command/set_seat_cool', 'post', metadata);
    };
    /**
     * Starts defrosting.
     *
     * @summary Start Defrost
     */
    SDK.prototype.startMaxDefrost = function (metadata) {
        return this.core.fetch('/{vin}/command/start_max_defrost', 'post', metadata);
    };
    /**
     * Stops defrosting.
     *
     * @summary Stop Defrost
     */
    SDK.prototype.stopMaxDefrost = function (metadata) {
        return this.core.fetch('/{vin}/command/stop_max_defrost', 'post', metadata);
    };
    /**
     * Starts the steering wheel heater.
     *
     * @summary Start Steering Wheel Heater
     */
    SDK.prototype.startSteeringWheelHeater = function (metadata) {
        return this.core.fetch('/{vin}/command/start_steering_wheel_heater', 'post', metadata);
    };
    /**
     * Stops the steering wheel heater.
     *
     * @summary Stop Steering Wheel Heater
     */
    SDK.prototype.stopSteeringWheelHeater = function (metadata) {
        return this.core.fetch('/{vin}/command/stop_steering_wheel_heater', 'post', metadata);
    };
    /**
     * Sets Bioweapon Defense Mode.
     *
     * @summary Set Bio Defense Mode
     */
    SDK.prototype.setBioweaponMode = function (metadata) {
        return this.core.fetch('/{vin}/command/set_bioweapon_mode', 'post', metadata);
    };
    /**
     * Sets the Climate Keeper mode.
     *
     * @summary Set Climate Keeper Mode
     */
    SDK.prototype.setClimateKeeperMode = function (metadata) {
        return this.core.fetch('/{vin}/command/set_climate_keeper_mode', 'post', metadata);
    };
    /**
     * Starts charging.
     *
     * @summary Start Charging
     */
    SDK.prototype.startCharging = function (metadata) {
        return this.core.fetch('/{vin}/command/start_charging', 'post', metadata);
    };
    /**
     * Stops charging.
     *
     * @summary Stop Charging
     */
    SDK.prototype.stopCharging = function (metadata) {
        return this.core.fetch('/{vin}/command/stop_charging', 'post', metadata);
    };
    /**
     * Sets the charge limit.
     *
     * @summary Set Charge Limit
     */
    SDK.prototype.setChargeLimit = function (metadata) {
        return this.core.fetch('/{vin}/command/set_charge_limit', 'post', metadata);
    };
    /**
     * Sets the charging amps.
     *
     * @summary Set Charging Amps
     */
    SDK.prototype.setChargingAmps = function (metadata) {
        return this.core.fetch('/{vin}/command/set_charging_amps', 'post', metadata);
    };
    /**
     * Opens the charge port if it's closed, or unlocks it if it's open.
     *
     * @summary Open Charge Port
     */
    SDK.prototype.openChargePort = function (metadata) {
        return this.core.fetch('/{vin}/command/open_charge_port', 'post', metadata);
    };
    /**
     * Closes the charge port.
     *
     * @summary Close Charge Port
     */
    SDK.prototype.closeChargePort = function (metadata) {
        return this.core.fetch('/{vin}/command/close_charge_port', 'post', metadata);
    };
    /**
     * Flashes the lights.
     *
     * @summary Flash Lights
     */
    SDK.prototype.flash = function (metadata) {
        return this.core.fetch('/{vin}/command/flash', 'post', metadata);
    };
    /**
     * Honks the horn.
     *
     * @summary Honk
     */
    SDK.prototype.honk = function (metadata) {
        return this.core.fetch('/{vin}/command/honk', 'post', metadata);
    };
    /**
     * Triggers the primary HomeLink device.
     *
     * @summary Trigger HomeLink
     */
    SDK.prototype.triggerHomelink = function (metadata) {
        return this.core.fetch('/{vin}/command/trigger_homelink', 'post', metadata);
    };
    /**
     * Enables keyless driving.
     *
     * Driving must begin within 2 minutes.
     *
     * @summary Enable Keyless Driving
     */
    SDK.prototype.remoteStart = function (metadata) {
        return this.core.fetch('/{vin}/command/remote_start', 'post', metadata);
    };
    /**
     * Vents the sunroof.
     *
     * @summary Vent Sunroof
     */
    SDK.prototype.ventSunroof = function (metadata) {
        return this.core.fetch('/{vin}/command/vent_sunroof', 'post', metadata);
    };
    /**
     * Closes the sunroof.
     *
     * @summary Close Sunroof
     */
    SDK.prototype.closeSunroof = function (metadata) {
        return this.core.fetch('/{vin}/command/close_sunroof', 'post', metadata);
    };
    /**
     * Enables Sentry Mode.
     *
     * @summary Enable Sentry Mode
     */
    SDK.prototype.enableSentry = function (metadata) {
        return this.core.fetch('/{vin}/command/enable_sentry', 'post', metadata);
    };
    /**
     * Disables Sentry Mode.
     *
     * @summary Disable Sentry Mode
     */
    SDK.prototype.disableSentry = function (metadata) {
        return this.core.fetch('/{vin}/command/disable_sentry', 'post', metadata);
    };
    /**
     * Enables Valet Mode.
     *
     * @summary Enable Valet Mode
     */
    SDK.prototype.enableValet = function (metadata) {
        return this.core.fetch('/{vin}/command/enable_valet', 'post', metadata);
    };
    /**
     * Disables Valet Mode.
     *
     * @summary Disable Valet Mode
     */
    SDK.prototype.disableValet = function (metadata) {
        return this.core.fetch('/{vin}/command/disable_valet', 'post', metadata);
    };
    /**
     * Schedules a software update.
     *
     * @summary Schedule Software Update
     */
    SDK.prototype.scheduleSoftwareUpdate = function (metadata) {
        return this.core.fetch('/{vin}/command/schedule_software_update', 'post', metadata);
    };
    /**
     * Cancels any scheduled software update.
     *
     * @summary Cancel Software Update
     */
    SDK.prototype.cancelSoftwareUpdate = function (metadata) {
        return this.core.fetch('/{vin}/command/cancel_software_update', 'post', metadata);
    };
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
    SDK.prototype.setScheduledCharging = function (metadata) {
        return this.core.fetch('/{vin}/command/set_scheduled_charging', 'post', metadata);
    };
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
    SDK.prototype.setScheduledDeparture = function (metadata) {
        return this.core.fetch('/{vin}/command/set_scheduled_departure', 'post', metadata);
    };
    /**
     * Add or update a charging schedule.
     *
     * @summary Add Charge Schedule
     */
    SDK.prototype.addChargeSchedule = function (metadata) {
        return this.core.fetch('/{vin}/command/add_charge_schedule', 'post', metadata);
    };
    /**
     * Remove a charging schedule.
     *
     * @summary Remove Charge Schedule
     */
    SDK.prototype.removeChargeSchedule = function (metadata) {
        return this.core.fetch('/{vin}/command/remove_charge_schedule', 'post', metadata);
    };
    /**
     * Add or update a preconditioning schedule.
     *
     * @summary Add Precondition Schedule
     */
    SDK.prototype.addPreconditionSchedule = function (metadata) {
        return this.core.fetch('/{vin}/command/add_precondition_schedule', 'post', metadata);
    };
    /**
     * Remove a preconditioning schedule.
     *
     * @summary Remove Precondition Schedule
     */
    SDK.prototype.removePreconditionSchedule = function (metadata) {
        return this.core.fetch('/{vin}/command/remove_precondition_schedule', 'post', metadata);
    };
    /**
     * Shares an address, latitude/longitude or video URL to the vehicle.
     *
     * @summary Share
     */
    SDK.prototype.share = function (metadata) {
        return this.core.fetch('/{vin}/command/share', 'post', metadata);
    };
    /**
     * Generates a fart sound.
     *
     * Requires 2022.40.25+.
     *
     * @summary Boombox
     */
    SDK.prototype.boombox = function (metadata) {
        return this.core.fetch('/{vin}/command/remote_boombox', 'post', metadata);
    };
    /**
     * Sets the speed limit.
     *
     * @summary Set Speed Limit
     */
    SDK.prototype.setSpeedLimit = function (metadata) {
        return this.core.fetch('/{vin}/command/set_speed_limit', 'post', metadata);
    };
    /**
     * Activates the speed limit.
     *
     * @summary Enable Speed Limit
     */
    SDK.prototype.enableSpeedLimit = function (metadata) {
        return this.core.fetch('/{vin}/command/enable_speed_limit', 'post', metadata);
    };
    /**
     * Disables the speed limit.
     *
     * @summary Disable Speed Limit
     */
    SDK.prototype.disableSpeedLimit = function (metadata) {
        return this.core.fetch('/{vin}/command/disable_speed_limit', 'post', metadata);
    };
    /**
     * Removes the speed limit PIN.
     *
     * @summary Clear Speed Limit PIN
     */
    SDK.prototype.clearSpeedLimitPin = function (metadata) {
        return this.core.fetch('/{vin}/command/clear_speed_limit_pin', 'post', metadata);
    };
    /**
     * Returns a list of additional drivers.
     *
     * @summary Get Drivers
     */
    SDK.prototype.getDrivers = function (metadata) {
        return this.core.fetch('/{vin}/drivers', 'get', metadata);
    };
    SDK.prototype.deleteDriver = function (body, metadata) {
        return this.core.fetch('/{vin}/drivers/{id}/delete', 'post', body, metadata);
    };
    /**
     * Enables Guest Mode.
     *
     * @summary Enable Guest Mode
     */
    SDK.prototype.enableGuest = function (metadata) {
        return this.core.fetch('/{vin}/command/enable_guest', 'post', metadata);
    };
    /**
     * Disables Guest Mode.
     *
     * @summary Disable Guest Mode
     */
    SDK.prototype.disableGuest = function (metadata) {
        return this.core.fetch('/{vin}/command/disable_guest', 'post', metadata);
    };
    /**
     * Returns a list of driver invitations.
     *
     * @summary Get Invitations
     */
    SDK.prototype.getInvitations = function (metadata) {
        return this.core.fetch('/{vin}/invitations', 'get', metadata);
    };
    /**
     * Creates a driver invitation.
     *
     * @summary Create an Invitation
     */
    SDK.prototype.createInvitation = function (metadata) {
        return this.core.fetch('/{vin}/invitations', 'post', metadata);
    };
    /**
     * Revokes a driver invitation.
     *
     * @summary Revoke an Invitation
     */
    SDK.prototype.revokeInvitation = function (metadata) {
        return this.core.fetch('/{vin}/invitations/{id}/revoke', 'post', metadata);
    };
    /**
     * Returns the license plate of the vehicle.
     *
     * @summary Get License Plate
     */
    SDK.prototype.getPlate = function (metadata) {
        return this.core.fetch('/{vin}/plate', 'get', metadata);
    };
    SDK.prototype.setPlate = function (body, metadata) {
        return this.core.fetch('/{vin}/plate', 'post', body, metadata);
    };
    /**
     * Returns the vehicle's Fleet Telemetry configuration.
     *
     * @summary Get Telemetry Config
     */
    SDK.prototype.getFleetTelemetryConfig = function (metadata) {
        return this.core.fetch('/{vin}/fleet_telemetry_config', 'get', metadata);
    };
    SDK.prototype.setFleetTelemetryConfig = function (body, metadata) {
        return this.core.fetch('/{vin}/fleet_telemetry_config', 'post', body, metadata);
    };
    SDK.prototype.deleteFleetTelemetryConfig = function (body, metadata) {
        return this.core.fetch('/{vin}/fleet_telemetry_config', 'delete', body, metadata);
    };
    return SDK;
}());
var createSDK = (function () { return new SDK(); })();
module.exports = createSDK;
