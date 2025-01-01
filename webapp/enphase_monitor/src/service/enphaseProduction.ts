import { ThemeColors } from "@/app/theme";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material/SvgIcon";

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
        icon?: OverridableComponent<SvgIconTypeMap<object, "svg">>;
        hiddenByDefault?: boolean;
        data: {
            timestamp: number;
            value: number;
        }[];
    }[];
}


async function fetchTodayProductionData(date: Date = new Date(), fill: "previous" | "null" = "null"): Promise<ChartData> {
    const midnightToday = new Date(new Date(date).setHours(0, 0, 0, 0));
    const midnightTomorrow = new Date(new Date(date).setHours(23, 59, 59, 999));
    const response = await fetch("/influxdb/query?" + new URLSearchParams({
        db: "solar",
        q: `SELECT mean("productionWatts") as productionWatts, mean("consumptionWatts") as consumptionWatts 
            FROM "solar"."autogen"."rooftop" 
            WHERE time > '${midnightToday.toISOString()}' and time < '${midnightTomorrow.toISOString()}'
            GROUP BY time(1m) fill(${fill})`
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
        q: `SELECT max("productionWhToday") as productionWatts, max("consumptionWhToday") as consumptionWatts 
            FROM "solar"."autogen"."rooftop" 
            WHERE time > '${begin.toISOString()}' and time < '${end.toISOString()}' and "productionWhToday" < 120000`
    }));
    const data = await response.json();
    return data.results[0].series?.[0]?.values.map((point: [string, number, number, number]) => ({
        timestamp: new Date(point[0]),
        productionWatts: point[1],
        consumptionWatts: point[2],
    })) ?? [];

}

async function fetch7DayProductionData(): Promise<{ timestamp: Date, productionWatts: number, consumptionWatts: number }[]> {
    return await fetchMultiDayProductionData(7, 7);
}

async function fetchMultiDayProductionData(daysAgo: number, numDays: number): Promise<{ timestamp: Date, productionWatts: number, consumptionWatts: number }[]> {
    if (numDays > daysAgo) {
        numDays = daysAgo;
    }

    const midnightToday = new Date(new Date().setHours(0, 0, 0, 0));

    const promises = [];
    for (let i = daysAgo; i >= daysAgo - numDays; i--) {
        promises.push(fetchMaxDataForDay(new Date(midnightToday.getTime() - (i * 24 * 60 * 60 * 1000))));
    }

    return (await Promise.all(promises)).flat();
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

export { fetchProductionData, fetchTodayProductionData, fetch7DayProductionData, fetchComparisonFullDayData, fetchComparisonData, fetchMultiDayProductionData };