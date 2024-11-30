"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import styles from "./production.module.css";
import Chart, { ChartData } from "./chart";

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

async function fetchProductionData(): Promise<ProductionData> {
    const response = await fetch("/enphase_api/production.json");
    return response.json();
}

async function fetchLast12HoursProductionData(): Promise<ChartData> {
    const response = await fetch("/influxdb/query?" + new URLSearchParams({
        db: "solar",
        q: `SELECT mean("productionWatts") as productionWatts, mean("consumptionWatts") as consumptionWatts 
            FROM "solar"."autogen"."rooftop" 
            WHERE time > now() - 12h 
            GROUP BY time(1m)`
    }));
    const data = await response.json();
    return {
        series: [{
            title: "Production",
            color: "green",
            data: data.results[0].series[0].values.map((point: [string, number, number]) => ({
                timestamp: new Date(point[0]).getTime(),
                value: point[1],
            })),
        }, {
            title: "Consumption",
            color: "red",
            data: data.results[0].series[0].values.map((point: [string, number, number]) => ({
                timestamp: new Date(point[0]).getTime(),
                value: point[2],
            })),
        }]
    };
}

async function fetch7DayProductionData(): Promise<{ timestamp: Date, productionWatts: number, consumptionWatts: number }[]> {
    const midnightToday = new Date(new Date().toLocaleDateString('en-US', { timeZone: 'America/New_York', timeZoneName: 'short' } ));
    const midnightSevenDaysAgo = new Date(new Date(midnightToday).setDate(midnightToday.getDate() - 7));

    const response = await fetch("/influxdb/query?" + new URLSearchParams({
        db: "solar",
        q: `SELECT max("productionWhToday") as productionWatts, max("consumptionWhToday") as consumptionWatts 
            FROM "solar"."autogen"."rooftop" 
            WHERE time > '${midnightSevenDaysAgo.toISOString()}' and time < '${midnightToday.toISOString()}'
            GROUP BY time(1d)`
    }));
    const data = await response.json();
    console.log(data);
    return data.results[0].series[0].values.map((point: [string, number, number, number]) => ({
        timestamp: new Date(point[0]),
        productionWatts: point[1],
        consumptionWatts: point[2],
    }));
}

async function fetchYesterdayProductionData(): Promise<{ timestamp: Date, productionWatts: number, consumptionWatts: number } | undefined> {
    const oneAmYesterday = new Date(new Date(new Date().setDate(new Date().getDate() - 1)).setHours(1, 0, 0, 0));
    const currentTimeYesterday = new Date(new Date().setDate(new Date().getDate() - 1));
    console.log(oneAmYesterday, currentTimeYesterday);
    
    const response = await fetch("/influxdb/query?" + new URLSearchParams({
        db: "solar",
        q: `SELECT max("productionWhToday") as productionWatts, max("consumptionWhToday") as consumptionWatts 
            FROM "solar"."autogen"."rooftop" 
            WHERE time > '${oneAmYesterday.toISOString()}' and time < '${currentTimeYesterday.toISOString()}'`
    }));
    const data = await response.json();
    return data.results[0].series[0].values.map((point: [string, number, number]) => ({
        timestamp: new Date(point[0]),
        productionWatts: point[1],
        consumptionWatts: point[2],
    }))[0];
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

export default function Production({ autoRefresh = true, ratePerKWHUnder1000, ratePerKWHOver1000, visible }: { autoRefresh?: boolean, ratePerKWHUnder1000: number, ratePerKWHOver1000: number, visible: boolean  }) {
    const [productionData, setProductionData] = useState<ProductionData | null>(null);
    const [chartData, setChartData] = useState<ChartData>({ series: [
        { title: "Production", color: "green", data: [] },
        { title: "Consumption", color: "red", data: [] },
        { title: "Comparison", color: "blue", data: [] }
    ] });
    const [sevenDayData, setSevenDayData] = useState<{ timestamp: Date, productionWatts: number, consumptionWatts: number }[]>([]);
    const [yesterdayData, setYesterdayData] = useState<{ timestamp: Date, productionWatts: number, consumptionWatts: number } | undefined>(undefined);
    const autoRefreshRef = useRef<boolean>(autoRefresh);
    const [comparisonDate, setComparisonDate] = useState<Date>(new Date(new Date().setDate(new Date().getDate() - 1)));
    const [comparisonData, setComparisonData] = useState<{ timestamp: Date, productionWatts: number, consumptionWatts: number }[]>([]);

    const updateHistoricalData = useCallback(() => {
        fetchLast12HoursProductionData().then(data => {
            setChartData(data);
        });
        fetch7DayProductionData().then(data => {
            setSevenDayData(data);
        });
        fetchYesterdayProductionData().then(data => {
            setYesterdayData(data);
        });
    }, []);

    useEffect(() => { 
        if (autoRefresh) { 
            updateHistoricalData(); 
        } 
    }, [autoRefresh]);

    const sevenDayAverageData = useMemo(() => {
        if (sevenDayData.length === 0) {
            return null;
        }
        const nonNullData = sevenDayData.filter(x => x.productionWatts && x.consumptionWatts);
        return {
            production: nonNullData.reduce((acc, x) => acc + x.productionWatts, 0) / nonNullData.length,
            consumption: nonNullData.reduce((acc, x) => acc + x.consumptionWatts, 0) / nonNullData.length,
        };
    }, [sevenDayData]);

    useEffect(() => {
        if (autoRefresh) {
            const timeout = setTimeout(() => updateProductionData(), 1000);
            return () => clearTimeout(timeout);
        }
    }, [autoRefresh, productionData]);

    const updateProductionData = useCallback(() => {
        if (!autoRefreshRef.current) {
            return;
        }
        fetchProductionData().then(data => {
            setProductionData(data);
            const productionData = data.production.filter(p => p.type === "eim")[0];
            const consumptionData = data.consumption.filter(p => p.measurementType === "total-consumption")[0];
            setChartData(chartData => ({
                series: [
                    { ...chartData.series[0], data: [...chartData.series[0].data, { timestamp: productionData.readingTime*1000, value: productionData.wNow }] },
                    { ...chartData.series[1], data: [...chartData.series[1].data, { timestamp: consumptionData.readingTime*1000, value: consumptionData.wNow }] }
                ]
            }));
        });
    }, []);

    useEffect(() => {
        fetchComparisonData(comparisonDate).then(data => {
            setComparisonData(data);
        });
    }, [comparisonDate]);

    const chartDataWithComparison = useMemo(() => {
        const daysSinceComparisonDate = Math.floor((new Date().getTime() - comparisonDate.getTime()) / (24 * 60 * 60 * 1000));
        return {
            series: [
                chartData.series[0], 
                chartData.series[1], 
                { 
                    title: comparisonDate.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }),
                    color: "blue",
                    data: comparisonData.map(x => ({ timestamp: x.timestamp.getTime() + (daysSinceComparisonDate * 24 * 60 * 60 * 1000), value: x.productionWatts }))
                }]
        };
    }, [chartData, comparisonData]);

    console.log(comparisonDate);

    useEffect(() => { updateProductionData(); }, []);
    
    return <div className={visible ? "" : styles.hidden}>

        <div className={styles.datePicker}>
            Compare to: 
            <input
                type="date"
                onChange={(e) => {
                    const d = e.target.value ? new Date(e.target.value + "T12:00:00Z") : new Date();
                    setComparisonDate(d);
                }}
                value={comparisonDate.toISOString().split('T')[0]}
            />
        </div>
        <table className={styles.table}>
            <thead>
                <tr>
                    <th className={styles.item}></th>
                    <th className={styles.item}>Production</th>
                    <th className={styles.item}>Consumption</th>
                    <th className={styles.item}>Net</th>
                    <th className={styles.item}>Cost</th>
                    <th className={styles.item}>Saved</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className={styles.item}>Now</td>
                    <td className={styles.item}> 
                        {Math.round(productionData?.production?.find(p => p.type === "eim")?.wNow ?? 0)}
                    </td>
                    <td className={styles.item}>
                        {Math.round(productionData?.consumption?.find(p => p.measurementType === "total-consumption")?.wNow ?? 0)}
                    </td>
                    <td className={styles.item}>
                        {Math.round(productionData?.consumption?.find(p => p.measurementType === "net-consumption")?.wNow ?? 0)}
                    </td>
                </tr>
                <tr>
                    <td className={styles.item}>Today</td>
                    <td className={styles.item}>
                        {Math.round(productionData?.production?.find(p => p.type === "eim")?.whToday ?? 0)}
                    </td>
                    <td className={styles.item}>
                        {Math.round(productionData?.consumption?.find(p => p.measurementType === "total-consumption")?.whToday ?? 0)}
                    </td>
                    <td className={styles.item}>
                        { productionData ?
                            (Math.round(productionData.consumption.find(p => p.measurementType === "total-consumption")!.whToday -  productionData.production.find(p => p.type === "eim")!.whToday) ?? 0) : 0}
                    </td>
                    <td className={styles.item}>
                        { productionData ?
                            ((Math.round(productionData.consumption.find(p => p.measurementType === "total-consumption")!.whToday -  productionData.production.find(p => p.type === "eim")!.whToday) ?? 0) / 1000 * (ratePerKWHUnder1000 / 100)).toLocaleString('en-US', { style: 'currency', currency: 'USD' })  : 0}
                    </td>
                    <td className={styles.item}>
                        {((Math.round(productionData?.production?.find(p => p.type === "eim")?.whToday ?? 0) / 1000 * (ratePerKWHOver1000 / 100))).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                    </td>
                </tr>
                {yesterdayData && 
                    <tr>
                        <td className={styles.item}>Yesterday</td>
                        <td className={styles.item}>{Math.round(yesterdayData.productionWatts)}</td>
                        <td className={styles.item}>{Math.round(yesterdayData.consumptionWatts)}</td>
                        <td className={styles.item}>{Math.round(yesterdayData.consumptionWatts - yesterdayData.productionWatts)}</td>
                    </tr>
                }
                {sevenDayAverageData &&
                    <tr>
                        <td className={styles.item}>7 Day Average</td>
                        <td className={styles.item}>{Math.round(sevenDayAverageData.production)}</td>
                        <td className={styles.item}>{Math.round(sevenDayAverageData.consumption)}</td>
                        <td className={styles.item}>{Math.round(sevenDayAverageData.consumption - sevenDayAverageData.production)}</td>
                    </tr>
                }
                <tr>
                    <td className={styles.item}>Lifetime</td>
                    <td className={styles.item}>
                        {Math.round(productionData?.production?.find(p => p.type === "eim")?.whLifetime ?? 0) / 1000}
                    </td>
                    <td className={styles.item}>
                        {Math.round(productionData?.consumption?.find(p => p.measurementType === "total-consumption")?.whLifetime ?? 0) / 1000}
                    </td>
                    <td className={styles.item}>
                        {Math.round(productionData?.consumption?.find(p => p.measurementType === "net-consumption")?.whLifetime ?? 0) / 1000}
                    </td>
                    <td className={styles.item}>
                        {(Math.round(productionData?.consumption?.find(p => p.measurementType === "net-consumption")?.whLifetime ?? 0) / 1000 * (ratePerKWHUnder1000 / 100)).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                    </td>
                    <td className={styles.item}>
                        {productionData ?
                            ((Math.round(productionData.production.find(p => p.type === "eim")!.whLifetime / 1000 * (ratePerKWHOver1000 / 100))).toLocaleString('en-US', { style: 'currency', currency: 'USD' }))  : 0}
                    </td>
                </tr>
            </tbody>
        </table>

        <Chart data={chartDataWithComparison} defaultTimeRange="1h" />
    </div>;
}
