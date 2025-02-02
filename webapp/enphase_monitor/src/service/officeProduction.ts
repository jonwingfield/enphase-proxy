import { ThemeColors } from "@/app/theme";
import { ChartData } from "./enphaseProduction";

export interface OfficeProductionData {
    panel_watts: number;
    panel_wh: number;
    load_watts: number;
    load_wh: number;
    batt_percent: number;
    batt_v: number;
    batt_watts: number;
    batt_wh: number;
}

export async function getOfficeProduction(): Promise<OfficeProductionData | null> {
    const response = await fetch("/influxdb/query?" + new URLSearchParams({
        db: "energy",
        q: `SELECT last("panel_watts") as panel_watts, last("panel_kwh") as panel_kwh, 
                    last("load_watts") as load_watts, last("load_kwh") as load_kwh, 
                    last("batt_percent") as batt_percent, last("batt_v") as batt_v 
            FROM "energy"."two weeks"."energy"
            WHERE time > now() - 1m`
    }));
    const data = await response.json();
    const result = data?.results[0]?.series[0].values[0] ? {
        panel_watts: data.results[0].series[0].values[0][1],
        panel_wh: data.results[0].series[0].values[0][2] * 1000.0,
        load_watts: data.results[0].series[0].values[0][3],
        load_wh: data.results[0].series[0].values[0][4] * 1000.0,
        batt_percent: getPercentFromBattV(data.results[0].series[0].values[0][6]/4),
        batt_v: data.results[0].series[0].values[0][6],
        batt_watts: 0,
        batt_wh: 0,
    } as OfficeProductionData : null;

    if (result) {
        result.batt_watts = result.load_watts - result.panel_watts;
        result.batt_wh = result.panel_wh - result.load_wh;
    }
    return result;
}

export async function getLast12HoursOfficeProduction(date: Date = new Date()): Promise<ChartData> {
    const midnightToday = new Date(new Date(date).setHours(0, 0, 0, 0));
    const end = new Date(new Date(date).setHours(23, 59, 59));
    const response = await fetch("/influxdb/query?" + new URLSearchParams({
        db: "solar",
        q: `SELECT mean("panel_watts") as panel_watts, mean("load_watts") as load_watts 
            FROM "energy"."two weeks"."energy" 
            WHERE time > '${midnightToday.toISOString()}' and time < '${end.toISOString()}' 
            GROUP BY time(1m)`
    }));
    const data = await response.json();
    return {
        series: [{
            title: "Production",
            color: ThemeColors.production,
            data: data.results[0].series[0].values.map((point: [string, number, number]) => ({
                timestamp: new Date(point[0]).getTime(),
                value: point[1],
            })),
        }, {
            title: "Consumption",
            color: ThemeColors.consumption,
            data: data.results[0].series[0].values.map((point: [string, number, number]) => ({
                timestamp: new Date(point[0]).getTime(),
                value: point[2],
            })),
        }]
    };
}

export async function fetchMaxDataForDay(date: Date): Promise<{ timestamp: Date, productionWatts: number, consumptionWatts: number }[]> {
    const begin = new Date(new Date(date.getTime()).setHours(1, 0, 0));
    const end = new Date(new Date(date.getTime()).setHours(23, 59, 59));
    const response = await fetch("/influxdb/query?" + new URLSearchParams({
        db: "solar",
        q: `SELECT max("panel_kwh")*1000 as panel_wh, max("load_kwh")*1000 as load_wh 
            FROM "energy"."infinite"."downsampled_energy" 
            WHERE time > '${begin.toISOString()}' and time < '${end.toISOString()}'`
    }));
    const data = await response.json();
    return data.results[0].series?.[0]?.values.map((point: [string, number, number, number]) => ({
        timestamp: new Date(point[0]),
        productionWatts: point[1],
        consumptionWatts: point[2],
    })) ?? [];
}

export async function fetchComparisonFullDayData(date: Date): Promise<{ timestamp: Date, productionWatts: number, consumptionWatts: number } | undefined> {
    const oneAmOnDate = new Date(new Date(new Date(date).setHours(1, 0, 0, 0)));
    const currentTimeOnDate = new Date(new Date(oneAmOnDate).setHours(new Date().getHours(), new Date().getMinutes()));

    const response = await fetch("/influxdb/query?" + new URLSearchParams({
        db: "solar",
        q: `SELECT max("panel_watts") as panel_watts, max("load_watts") as load_watts 
            FROM "energy"."infinite"."downsampled_energy" 
            WHERE time > '${oneAmOnDate.toISOString()}' and time < '${currentTimeOnDate.toISOString()}'`
    }));
    const data = await response.json();
    return data.results[0].series?.[0]?.values.map((point: [string, number, number]) => ({
        timestamp: new Date(point[0]),
        productionWatts: point[1],
        consumptionWatts: point[2],
    }))[0] ?? undefined;
}


export async function fetchMultiDayOfficeProductionData(daysAgo: number, numDays: number): Promise<{ timestamp: Date, productionWatts: number, consumptionWatts: number }[]> {
    const midnightToday = new Date(new Date().setHours(0, 0, 0, 0));

    const promises = [];
    for (let i = daysAgo; i >= daysAgo - numDays; i--) {
        promises.push(fetchMaxDataForDay(new Date(midnightToday.getTime() - (i * 24 * 60 * 60 * 1000))));
    }

    return (await Promise.all(promises)).flat();
}

export async function fetchBatteryData(date: Date = new Date()): Promise<{ timestamp: Date, value: number }[]> {
    const midnightOnDate = new Date(new Date(date).setHours(0, 0, 0, 0));
    const end = new Date(new Date(date).setHours(23, 59, 59));
    const response = await fetch("/influxdb/query?" + new URLSearchParams({
        db: "solar",
        q: `SELECT last("batt_v")/4 as batt_v 
            FROM "energy"."two weeks"."energy" 
            WHERE time > '${midnightOnDate.toISOString()}' and time < '${end.toISOString()}'
            GROUP BY time(2m) fill(previous)`
    }));
    const data = await response.json();
    return data.results[0].series?.[0]?.values.map((point: [string, number]) => ({
        timestamp: new Date(point[0]),
        value: point[1],
    }));
}

export async function fetchBatteryDataForDay(date: Date) {
    const begin = new Date(new Date(date.getTime()).setHours(1, 0, 0));
    const end = new Date(new Date(date.getTime()).setHours(23, 59, 59));
    const response = await fetch("/influxdb/query?" + new URLSearchParams({
        db: "solar",
        q: `SELECT mean("batt_v") as batt_v
            FROM "energy"."infinite"."downsampled_energy" 
            WHERE time > '${begin.toISOString()}' and time < '${end.toISOString()}'`
    }));
    const data = await response.json();
    return data.results[0].series?.[0]?.values.map((point: [string, number, number, number]) => ({
        timestamp: new Date(point[0]),
        value: getPercentFromBattV(point[1]/4),
    })) ?? [];
}

export async function fetchMultiDayBatteryData(numDays: number): Promise<{ timestamp: Date, value: number }[]> {
    const midnightToday = new Date(new Date().setHours(0, 0, 0, 0));
    const promises = [];
    for (let i = numDays; i >= 0; i--) {
        promises.push(fetchBatteryDataForDay(new Date(midnightToday.getTime() - (i * 24 * 60 * 60 * 1000))));
    }
    return (await Promise.all(promises)).flat();
}

const battVsByPercent = [4.122, 4.108, 4.098, 4.09, 4.085, 4.08, 4.076, 4.073, 4.069, 4.064, 4.058, 
    4.052, 4.044, 4.036, 4.026, 4.016, 4.006, 3.995, 3.985, 3.974, 3.964, 3.954, 3.944, 3.935, 3.926, 
    3.917, 3.909, 3.901, 3.893, 3.885, 3.877, 3.869, 3.861, 3.853, 3.844, 3.834, 3.825, 3.815, 3.805, 
    3.794, 3.783, 3.772, 3.761, 3.75, 3.738, 3.727, 3.717, 3.706, 3.696, 3.686, 3.677, 3.668, 3.659, 
    3.651, 3.644, 3.637, 3.63, 3.624, 3.618, 3.612, 3.606, 3.601, 3.595, 3.59, 3.584, 3.578, 3.573, 
    3.567, 3.56, 3.554, 3.547, 3.54, 3.532, 3.524, 3.516, 3.507, 3.497, 3.487, 3.477, 3.466, 3.454, 
    3.442, 3.429, 3.416, 3.403, 3.391, 3.378, 3.367, 3.356, 3.345, 3.335, 3.325, 3.315, 3.301, 3.282, 
    3.254, 3.212, 3.146, 3.046, 2.898];

function getPercentFromBattV(battV: number): number {
    console.log(battV);
    return 100-battVsByPercent.findIndex(v => v <= battV);
}