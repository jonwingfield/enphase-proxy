"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import styles from "./production.module.css";
import Chart from "./chart";
import { ChartData, EnphaseProductionData, fetch7DayProductionData, fetchComparisonData, fetchComparisonFullDayData, fetchProductionData, fetchTodayProductionData } from "@/service/enphaseProduction";
import DateSelection from "./dateSelection";
import { HistoryOutlined, HomeOutlined, WbSunnyOutlined } from "@mui/icons-material";
import { ThemeColors } from "../theme";

export default function Production({ autoRefresh = true, ratePerKWHUnder1000, ratePerKWHOver1000, visible }: { autoRefresh?: boolean, ratePerKWHUnder1000: number, ratePerKWHOver1000: number, visible: boolean }) {
    const [productionData, setProductionData] = useState<EnphaseProductionData | null>(null);
    const [chartData, setChartData] = useState<ChartData>({
        series: [
            { title: "Production", color: ThemeColors.solar, data: [] },
            { title: "Consumption", color: ThemeColors.consumption, data: [] },
            { title: "Comparison", color: ThemeColors.solarComparison, data: [] }
        ]
    });
    const [sevenDayData, setSevenDayData] = useState<{ timestamp: Date, productionWatts: number, consumptionWatts: number }[]>([]);
    const [comparisonFullDayData, setComparisonFullDayData] = useState<{ timestamp: Date, productionWatts: number, consumptionWatts: number } | undefined>(undefined);
    const autoRefreshRef = useRef<boolean>(autoRefresh);
    const [comparisonDate, setComparisonDate] = useState<Date>(new Date(new Date().setDate(new Date().getDate() - 1)));
    const [comparisonData, setComparisonData] = useState<{ timestamp: Date, productionWatts: number, consumptionWatts: number }[]>([]);

    const updateHistoricalData = useCallback((comparisonDate: Date) => {
        fetchTodayProductionData().then(data => {
            setChartData(data);
        });
        fetch7DayProductionData().then(data => {
            setSevenDayData(data);
        });
        fetchComparisonFullDayData(comparisonDate).then(data => {
            setComparisonFullDayData(data);
        });
    }, []);

    useEffect(() => {
        if (autoRefresh) {
            updateHistoricalData(comparisonDate);
        }
    }, [autoRefresh, comparisonDate]);

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

    // Trigger next update when production data (or autoRefresh) changes
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
                    { ...chartData.series[0], data: [...chartData.series[0].data, { timestamp: productionData.readingTime * 1000, value: productionData.wNow }] },
                    { ...chartData.series[1], data: [...chartData.series[1].data, { timestamp: consumptionData.readingTime * 1000, value: consumptionData.wNow }] }
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
                { ...chartData.series[0], icon: WbSunnyOutlined },
                { ...chartData.series[1], icon: HomeOutlined, hiddenByDefault: true },
                {
                    title: comparisonDate.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }),
                    color: ThemeColors.solarComparison,
                    icon: HistoryOutlined,
                    data: comparisonData.map(x => ({ timestamp: x.timestamp.getTime() + (daysSinceComparisonDate * 24 * 60 * 60 * 1000), value: x.productionWatts }))
                }]
        };
    }, [chartData, comparisonData]);

    return <div className={`${visible ? "" : styles.hidden} ${styles.productionContainer}`}>
        <DateSelection date={comparisonDate} setDate={setComparisonDate} excludeToday />

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
                <tr className={styles.row}>
                    <td className={styles.item}>Now</td>
                    <td className={styles.item}>
                        {Math.round(productionData?.production?.find(p => p.type === "eim")?.wNow ?? 0).toLocaleString()}
                    </td>
                    <td className={styles.item}>
                        {Math.round(productionData?.consumption?.find(p => p.measurementType === "total-consumption")?.wNow ?? 0).toLocaleString()}
                    </td>
                    <td className={styles.item}>
                        {Math.round(productionData?.consumption?.find(p => p.measurementType === "net-consumption")?.wNow ?? 0).toLocaleString()}
                    </td>
                    <td className={styles.item}></td>
                    <td className={styles.item}></td>
                </tr>
                <tr className={styles.row}>
                    <td className={styles.item}>Today</td>
                    <td className={styles.item}>
                        {Math.round(productionData?.production?.find(p => p.type === "eim")?.whToday ?? 0).toLocaleString()}
                    </td>
                    <td className={styles.item}>
                        {Math.round(productionData?.consumption?.find(p => p.measurementType === "total-consumption")?.whToday ?? 0).toLocaleString()}
                    </td>
                    <td className={styles.item}>
                        {productionData ?
                            (Math.round(productionData.consumption.find(p => p.measurementType === "total-consumption")!.whToday - productionData.production.find(p => p.type === "eim")!.whToday) ?? 0).toLocaleString() : 0}
                    </td>
                    <td className={styles.item}>
                        {productionData ?
                            ((Math.round(productionData.consumption.find(p => p.measurementType === "total-consumption")!.whToday - productionData.production.find(p => p.type === "eim")!.whToday) ?? 0) / 1000 * (ratePerKWHUnder1000 / 100)).toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : 0}
                    </td>
                    <td className={styles.item}>
                        {((Math.round(productionData?.production?.find(p => p.type === "eim")?.whToday ?? 0) / 1000 * (ratePerKWHOver1000 / 100))).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                    </td>
                </tr>
                {comparisonFullDayData &&
                    <tr className={styles.row}>
                        <td className={styles.item}>{comparisonDate.toLocaleDateString('en-US', { weekday: 'long' })}</td>
                        <td className={styles.item}>{Math.round(comparisonFullDayData.productionWatts).toLocaleString()}</td>
                        <td className={styles.item}>{Math.round(comparisonFullDayData.consumptionWatts).toLocaleString()}</td>
                        <td className={styles.item}>{Math.round(comparisonFullDayData.consumptionWatts - comparisonFullDayData.productionWatts).toLocaleString()}</td>
                        <td className={styles.item}></td>
                        <td className={styles.item}></td>
                    </tr>
                }
                {sevenDayAverageData &&
                    <tr className={styles.row}>
                        <td className={styles.item}>7 Day Average</td>
                        <td className={styles.item}>{Math.round(sevenDayAverageData.production).toLocaleString()}</td>
                        <td className={styles.item}>{Math.round(sevenDayAverageData.consumption).toLocaleString()}</td>
                        <td className={styles.item}>{Math.round(sevenDayAverageData.consumption - sevenDayAverageData.production).toLocaleString()}</td>
                        <td className={styles.item}>{((sevenDayAverageData.consumption - sevenDayAverageData.production) / 1000 * (ratePerKWHUnder1000 / 100)).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
                        <td className={styles.item}>{(sevenDayAverageData.production / 1000 * (ratePerKWHOver1000 / 100)).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
                    </tr>
                }
                <tr className={styles.row}>
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
                            ((Math.round(productionData.production.find(p => p.type === "eim")!.whLifetime / 1000 * (ratePerKWHOver1000 / 100))).toLocaleString('en-US', { style: 'currency', currency: 'USD' })) : 0}
                    </td>
                </tr>
            </tbody>
        </table>

        <Chart data={chartDataWithComparison} defaultTimeRange="2h" highlightMode="last" hideAverages />
    </div>;
}
