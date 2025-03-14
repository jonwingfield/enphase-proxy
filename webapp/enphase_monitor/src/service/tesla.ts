export interface TeslaState {
    state: string;
    battery_level: number;
    charger_power: number;
    charging_state: "Charging" | "Disconnected" | "Connected" | "Starting" | "Stopped" | "Pending" | "Error" | "Complete";
    charger_actual_current: number;
    charger_voltage: number;
    charge_limit_soc: number;
    charge_miles_added_ideal: number;
    charge_rate: number;
    car_version: string;
    module_temp_min: number;
    module_temp_max: number;
    latitude: number;
    longitude: number;
    odometer: number;
    speed: number;
    location: 'home' | 'away';
}

export async function getTeslaState(): Promise<TeslaState | null> {
    const response = await fetch("/influxdb/query?" + new URLSearchParams({
        db: "tesla",
        q: `SELECT last("state") as state, 
                    last("battery_level") as battery_level, 
                    last("charger_power") as charger_power, 
                    last("charging_state") as charging_state, 
                    last("charger_actual_current") as charger_actual_current, 
                    last("charger_voltage") as charger_voltage, 
                    last("charge_limit_soc") as charge_limit_soc, 
                    last("charge_miles_added_ideal") as charge_miles_added_ideal, 
                    last("charge_rate") as charge_rate, 
                    last("car_version") as car_version, 
                    last("module_temp_min") as module_temp_min, 
                    last("module_temp_max") as module_temp_max, 
                    last("latitude") as latitude, 
                    last("longitude") as longitude, 
                    last("odometer") as odometer, 
                    last("speed") as speed 
            FROM "tesla"."autogen"."state"
            WHERE time > now() - 48h`
    }));
    const data = await response.json();
    
    const result = data?.results[0]?.series?.length ? {
        state: data.results[0].series[0].values[0][1],
        battery_level: data.results[0].series[0].values[0][2],
        charger_power: data.results[0].series[0].values[0][3],
        charging_state: data.results[0].series[0].values[0][4],
        charger_actual_current: data.results[0].series[0].values[0][5],
        charger_voltage: data.results[0].series[0].values[0][6],
        charge_limit_soc: data.results[0].series[0].values[0][7],
        charge_miles_added_ideal: data.results[0].series[0].values[0][8],
        charge_rate: data.results[0].series[0].values[0][9],
        car_version: data.results[0].series[0].values[0][10],
        module_temp_min: data.results[0].series[0].values[0][11],
        module_temp_max: data.results[0].series[0].values[0][12],
        latitude: data.results[0].series[0].values[0][13],
        longitude: data.results[0].series[0].values[0][14],
        odometer: data.results[0].series[0].values[0][15],
        speed: data.results[0].series[0].values[0][16],
        location: 'home'
    } as TeslaState : null;

    if (result) {
        /* 28.520249, -82.34597 is home */
        result.location = Math.abs(result.latitude - 28.520) < 0.01 && Math.abs(result.longitude - -82.346) < 0.01 ? 'home' : 'away';
    }

    return result;
}

export async function getTeslaChargesToday(): Promise<number | null> {
    const startOfDay = new Date().setHours(0, 0, 0, 0);
    const response = await fetch("/influxdb/query?" + new URLSearchParams({
        db: "tesla",
        q: `SELECT sum("energy_used") AS "sum_energy_used" 
            FROM "tesla"."autogen"."charge" 
            WHERE time > ${startOfDay * 1000 * 1000}`
    }));
    const data = await response.json();
    return (data?.results[0]?.series?.length ? data.results[0].series[0].values[0][1] : 0) * 1000;
}