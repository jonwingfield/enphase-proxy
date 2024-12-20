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