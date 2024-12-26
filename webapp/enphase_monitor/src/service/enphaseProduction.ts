export interface EnphaseProductionData {
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

async function fetchProductionData(): Promise<EnphaseProductionData> {
    const response = await fetch("/enphase_api/production.json");
    return response.json();
}

export interface ChartData {
    series: {
        title: string;
        color: string;
        data: {
            timestamp: number;
            value: number;
        }[];
    }[];
}


async function fetchLast12HoursProductionData(): Promise<ChartData> {
    const midnightToday = new Date(new Date().setHours(0, 0, 0, 0));
    const response = await fetch("/influxdb/query?" + new URLSearchParams({
        db: "solar",
        q: `SELECT mean("productionWatts") as productionWatts, mean("consumptionWatts") as consumptionWatts 
            FROM "solar"."autogen"."rooftop" 
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

async function fetchMaxDataForDay(date: Date): Promise<{ timestamp: Date, productionWatts: number, consumptionWatts: number }[]> {
    const begin = new Date(new Date(date.getTime()).setHours(23, 0, 0));
    const end = new Date(new Date(date.getTime()).setHours(23, 59, 0));
    const response = await fetch("/influxdb/query?" + new URLSearchParams({
        db: "solar",
        q: `SELECT max("productionWhToday") as productionWatts, max("consumptionWhToday") as consumptionWatts 
            FROM "solar"."autogen"."rooftop" 
            WHERE time > '${begin.toISOString()}' and time < '${end.toISOString()}'
            GROUP BY time(1d)`
    }));
    const data = await response.json();
    return data.results[0].series[0].values.map((point: [string, number, number, number]) => ({
        timestamp: new Date(point[0]),
        productionWatts: point[1],
        consumptionWatts: point[2],
    })).slice(-1);

}

async function fetch7DayProductionData(): Promise<{ timestamp: Date, productionWatts: number, consumptionWatts: number }[]> {
    const midnightToday = new Date(new Date().setHours(0, 0, 0, 0));

    const lastSevenDays = [];
    for (let i = 1; i < 8; i++) {
        lastSevenDays.push(await fetchMaxDataForDay(new Date(midnightToday.getTime() - (i * 24 * 60 * 60 * 1000))));
    }

    return lastSevenDays.flat();
}

async function fetchComparisonFullDayData(date: Date): Promise<{ timestamp: Date, productionWatts: number, consumptionWatts: number } | undefined> {
    const oneAmOnDate = new Date(new Date(new Date(date).setHours(1, 0, 0, 0)));
    const currentTimeOnDate = new Date(new Date(oneAmOnDate).setHours(new Date().getHours(), new Date().getMinutes()));

    const response = await fetch("/influxdb/query?" + new URLSearchParams({
        db: "solar",
        q: `SELECT max("productionWhToday") as productionWatts, max("consumptionWhToday") as consumptionWatts 
            FROM "solar"."autogen"."rooftop" 
            WHERE time > '${oneAmOnDate.toISOString()}' and time < '${currentTimeOnDate.toISOString()}'`
    }));
    const data = await response.json();
    return data.results[0].series?.[0]?.values.map((point: [string, number, number]) => ({
        timestamp: new Date(point[0]),
        productionWatts: point[1],
        consumptionWatts: point[2],
    }))[0] ?? undefined;
} 

async function fetchComparisonData(date: Date): Promise<{ timestamp: Date, productionWatts: number, consumptionWatts: number }[]> {
    const startDate = new Date(new Date(date.getTime()).setHours(0, 0, 0, 0));
    const endDate = new Date(new Date(date.getTime()).setHours(23, 59, 59, 999));

    const response = await fetch("/influxdb/query?" + new URLSearchParams({
        db: "solar",
        q: `SELECT mean("productionWatts") as productionWatts, mean("consumptionWatts") as consumptionWatts 
            FROM "solar"."autogen"."rooftop" WHERE time > '${startDate.toISOString()}' and time < '${endDate.toISOString()}'
            GROUP BY time(1m)`
    }));
    const data = await response.json();
    return data.results[0].series?.[0]?.values.map((point: [string, number, number]) => ({
        timestamp: new Date(point[0]),
        productionWatts: point[1],
        consumptionWatts: point[2],
    })) ?? [];
}

export { fetchProductionData, fetchLast12HoursProductionData, fetch7DayProductionData, fetchComparisonFullDayData, fetchComparisonData };