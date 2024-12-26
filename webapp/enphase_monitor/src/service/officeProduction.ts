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
        batt_percent: data.results[0].series[0].values[0][5],
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

export async function getLast12HoursOfficeProduction(): Promise<ChartData> {
    const midnightToday = new Date(new Date().setHours(0, 0, 0, 0));
    const response = await fetch("/influxdb/query?" + new URLSearchParams({
        db: "solar",
        q: `SELECT mean("panel_watts") as panel_watts, mean("load_watts") as load_watts 
            FROM "energy"."two weeks"."energy" 
            WHERE time > '${midnightToday.toISOString()}' and time < now() 
            GROUP BY time(1m)`
    }));
    const data = await response.json();
    return {
        series: [{
            title: "Production",
            color: "#ffcc00",
            data: data.results[0].series[0].values.map((point: [string, number, number]) => ({
                timestamp: new Date(point[0]).getTime(),
                value: point[1],
            })),
        }, {
            title: "Consumption",
            color: "#ff0000",
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
        q: `SELECT max("panel_watts") as panel_watts, max("load_watts") as load_watts 
            FROM "energy"."infinite"."downsampled_energy" 
            WHERE time > '${begin.toISOString()}' and time < '${end.toISOString()}'`
    }));
    const data = await response.json();
    return data.results[0].series[0].values.map((point: [string, number, number, number]) => ({
        timestamp: new Date(point[0]),
        productionWatts: point[1],
        consumptionWatts: point[2],
    })).slice(-1);
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


export async function fetchMultiDayOfficeProductionData(numDays: number): Promise<{ timestamp: Date, productionWatts: number, consumptionWatts: number }[]> {
    const midnightToday = new Date(new Date().setHours(0, 0, 0, 0));

    const lastSevenDays = [];
    for (let i = numDays; i >= 0; i--) {
        lastSevenDays.push(await fetchMaxDataForDay(new Date(midnightToday.getTime() - (i * 24 * 60 * 60 * 1000))));
    }

    return lastSevenDays.flat();
}