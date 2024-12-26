import tessie from '@api/tessie';
import { GetStateResponse200 } from '@api/tessie/types';

interface ProductionData {
    production: {
        type: "inverters" | "eim";
        activeCount: number;
        readingTime: number;
        wNow: number;
        whLifetime: number;
        whToday: number;
        whLastSevenDays: number;
        vahToday: number;
        varhLeadToday: number;
        varhLagToday: number;
        rmsCurrent: number;
        rmsVoltage: number;
        reactPwr: number;
        apprntPwr: number;
        pwrFactor: number;
    }[];
    consumption: {
        type: "eim";
        measurementType: "total-consumption" | "net-consumption";
        activeCount: number;
        readingTime: number;
        wNow: number;
        whLifetime: number;
        varhLeadLifetime: number;
        varhLagLifetime: number;
        vahLifetime: number;
        rmsCurrent: number;
        rmsVoltage: number;
        reactPwr: number;
        apprntPwr: number;
        pwrFactor: number;
        whToday: number;
        whLastSevenDays: number;
        vahToday: number;
        varhLeadToday: number;
        varhLagToday: number;
    }[];
    storage: {
        type: "acb";
        activeCount: number;
        readingTime: number;
        wNow: number;
        whNow: number;
        state: "idle" | "charging" | "discharging";
    }[];
}

interface PanelData {
    serialNumber: string;
    lastReportDate: number;
    devType: number;
    lastReportWatts: number;
    maxReportWatts: number;
}

interface WattHours {
    today: number;
    yesterday: number;
    week: number;
}

interface Watts {
    now: number;
    nowUsed: number;
    max: number;
}

interface LastReading {
    eid?: number;
    interval_type?: number;
    endDate?: number;
    duration?: number;
    flags?: number;
    flags_hex?: string;
    joulesProduced?: number;
    acVoltageINmV?: number;
    acFrequencyINmHz?: number;
    dcVoltageINmV?: number;
    dcCurrentINmA?: number;
    channelTemp?: number;
    pwrConvErrSecs?: number;
    pwrConvMaxErrCycles?: number;
    joulesUsed?: number;
    leadingVArs?: number;
    laggingVArs?: number;
    acCurrentInmA?: number;
    l1NAcVoltageInmV?: number;
    l2NAcVoltageInmV?: number;
    l3NAcVoltageInmV?: number;
    rssi?: number;
    issi?: number;
}

interface Lifetime {
    createdTime?: number;
    duration?: number;
    joulesProduced?: number;
}

interface Channel {
    chanEid: number;
    created: number;
    wattHours: WattHours;
    watts: Watts;
    lastReading?: LastReading;
    lifetime?: Lifetime;
}

interface Device {
    devName: string;
    sn: string;
    active: boolean;
    modGone: boolean;
    channels: Channel[];
}

interface InverterDetailedData {
    [key: string]: Device | number; // To include "deviceCount" and "deviceDataLimit"
    deviceCount: number;
    deviceDataLimit: number;
}



async function fetchProductionData(): Promise<ProductionData> {
    const response = await fetch("http://pi4:8200/production.json");
    return response.json();
}

async function fetchPanelData(): Promise<PanelData[]> {
    const response = await fetch("http://pi4:8200/api/v1/production/inverters");
    return response.json();
}

async function fetchDetailedInverterData(): Promise<InverterDetailedData> {
    const response = await fetch("http://pi4:8200/ivp/pdm/device_data");
    return response.json();
}

const vin = '5YJ3E1EB0PF675504';

async function fetchTeslaChargeData(hoursInPast: number) {
    const from = Math.floor(new Date().getTime() / 1000) - (hoursInPast*60*60);
    const to = Math.floor(new Date().getTime() / 1000);
    try {
        const response = await tessie.getCharges({
            distance_format: 'mi',
            format: 'json',
            superchargers_only: false,
            exclude_origin: false,
            timezone: 'UTC',
            from,
            to,
            vin
        });
        if (response.status === 200) {
            return response.data.results;
        } else {
            console.error(`Failed to fetch Tesla charge data: ${response.status}`);
            return undefined;
        }
    }
    catch (err) {
        console.error(`Failed to fetch Tesla charge data: ${err}`);
        return undefined;
    }
}

async function fetchTeslaState() {
    try {   
        const response = await tessie.getState({vin});
        if (response.status === 200) {
            return response.data;
        } else {
            console.error(`Failed to fetch Tesla state: ${response.status}`);
            return undefined;
        }
    } catch (err) {
        console.error(`Failed to fetch Tesla state: ${err}`);
        return undefined;
    }
}

interface InfluxDBData {
    production: {
        watts: number;
        whToday: number;
        readingTime: number;
    },
    consumption: {
        watts: number;
        whToday: number;
        readingTime: number;
    };
}

async function postProductionToInfluxDB(data: InfluxDBData) {
    const timestampNs = Math.floor(data.production.readingTime * 1000 * 1000 * 1000);   
    const url = "http://pi4:8086/write?db=solar";
    console.log(`Posting to InfluxDB..., ${timestampNs}`);
    
    try {
        // Post production data
        const response = await fetch(url, {
            method: "POST",
            body: `rooftop,type=system productionWatts=${data.production.watts},consumptionWatts=${data.consumption.watts},productionWhToday=${data.production.whToday},consumptionWhToday=${data.consumption.whToday} ${timestampNs}\n`
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Error posting production data: ${errorText}`);
        }

        console.log("Done posting production data");
    } catch (err) {
        console.error("Failed to post to InfluxDB:", err);
    }
}

async function postPanelDataToInfluxDB(data: PanelData[], detailedData: InverterDetailedData) {
    console.log(`Posting panel data to InfluxDB...`);

    for (const panel of data) {
        const inverterData = detailedData[Object.keys(detailedData).filter(key => (detailedData[key] as Device).sn === panel.serialNumber)[0]] as Device;
        const channel = inverterData?.channels[0];
        const lastReading = channel?.lastReading;
        const wattHours = channel?.wattHours;

        let fields = "";
        if (channel) {
            for (const field of Object.keys(lastReading)) {
                if (field !== "flags_hex" && field !== "endDate" && field !== "interval_type" &&
                    field !== "l1NAcVoltageInmV" && field !== "l2NAcVoltageInmV" && field !== "l3NAcVoltageInmV") {
                    fields += `${field}=${lastReading[field]},`;
                }
            }
            fields += `wattHours=${wattHours.today},`;
        }

        const url = `http://pi4:8086/write?db=solar`;
        const timestampNs = panel.lastReportDate * 1000 * 1000 * 1000;
        try {
            const response = await fetch(url, {
                method: "POST",
                body: `inverter,serialNumber=${panel.serialNumber} ${fields}watts=${panel.lastReportWatts} ${timestampNs}\n`
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error(`Error posting panel data for ${panel.serialNumber}: ${errorText}`);
            }
        } catch (err) {
            console.error(`Failed to post panel data for ${panel.serialNumber}: ${err}`);
        }
    }

    console.log("Done posting panel data");
}

async function postTeslaChargeDataToInfluxDB(data: any) {
    if (!data) {
        console.log(`No Tesla charge data to post`);
        return;
    }
    console.log(`Posting Tesla charge data to InfluxDB...`);
    const url = "http://pi4:8086/write?db=tesla";

    for (const charge of data) {
        const timestampNs = charge.ended_at * 1000 * 1000 * 1000;
        const fieldNames: (keyof typeof charge)[] = ["starting_battery", "ending_battery", "energy_used", "energy_added", "latitude", "longitude", "miles_added", "odometer"];
        const fields = fieldNames.map((field: any) => `${field}=${charge[field]}`).join(",");
        try {
            const response = await fetch(url, {
                method: "POST",
                body: `charge,location='${charge.saved_location}' ${fields} ${timestampNs}\n`
            });
            if (!response.ok) {
                const errorText = await response.text();
                console.error(`Error posting Tesla charge data: ${errorText}`);
            }
        } catch (err) {
            console.error(`Failed to post Tesla charge data: ${err}`);
        }
    }
}

/**
 * The way Tessies responses are typed, they allow basically any fields. We want type checking, 
 * so we exclude index signatures that allow anything.
 */
type ExcludeIndexSignature<T> = {
    [K in keyof T as string extends K ? never : number extends K ? never : K]: T[K] extends object
        ? ExcludeIndexSignature<T[K]>
        : T[K];
};

async function postTeslaStateToInfluxDB(state: ExcludeIndexSignature<GetStateResponse200>) {
    console.log(`Posting Tesla state to InfluxDB...`);
    const url = "http://pi4:8086/write?db=tesla";
    const timestampNs = state.vehicle_state.timestamp * 1000 * 1000;
    const fields = {
        state: '"' + state.state + '"',
        battery_level: state.charge_state.battery_level,
        charger_power: state.charge_state.charger_power,
        charging_state: '"' + state.charge_state.charging_state + '"',
        charger_actual_current: state.charge_state.charger_actual_current,
        charger_voltage: state.charge_state.charger_voltage,
        charge_limit_soc: state.charge_state.charge_limit_soc,
        charge_miles_added_ideal: state.charge_state.charge_miles_added_ideal,
        charge_rate: state.charge_state.charge_rate,
        car_version: '"' + state.vehicle_state.car_version + '"',
        module_temp_min: state.charge_state.module_temp_min,
        module_temp_max: state.charge_state.module_temp_max,
        latitude: state.drive_state.latitude,
        longitude: state.drive_state.longitude,
        odometer: state.vehicle_state.odometer,
        speed: state.drive_state.speed ?? 0,
    }
    try {
        const response = await fetch(url, {
            method: "POST",
            body: `state,vehicle=${state.display_name} ${Object.keys(fields).map((field: any) => `${field}=${fields[field]}`).join(",")} ${timestampNs}\n`
        });
        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Error posting Tesla state: ${errorText}`);
        }
    } catch (err) {
        console.error(`Failed to post Tesla state: ${err}`);
    }
}

let requestCount = 0;

async function fetchAndPostData() {
    console.log("Fetching production data");
    fetchProductionData().then(data => {
        const production = data.production.filter(p => p.type === "eim")[0];
        const consumption = data.consumption.filter(p => p.measurementType === "total-consumption")[0];
        postProductionToInfluxDB({
            production: {
                watts: production.wNow,
                whToday: production.whToday,
                readingTime: production.readingTime
            },
            consumption: {
                watts: consumption.wNow,
                whToday: consumption.whToday,
                readingTime: consumption.readingTime
            }
        });
    });
    console.log("Fetching panel data");
    const detailedDataPromise = fetchDetailedInverterData();
    fetchPanelData().then(data => {
        detailedDataPromise.then(detailedData => {
            postPanelDataToInfluxDB(data, detailedData);
        });
    });

    console.log("Fetching Tesla state");
    fetchTeslaState().then(state => {
        postTeslaStateToInfluxDB(state);
    });
    
    if (requestCount % 30 === 0) {
        console.log("Fetching Tesla charge data");
        fetchTeslaChargeData(24*30).then(data => {
            postTeslaChargeDataToInfluxDB(data);
        });
    }

    requestCount++;
}


tessie.auth(process.env.TESLA_API_KEY);

fetchAndPostData();
setInterval(fetchAndPostData, 60 * 1000);