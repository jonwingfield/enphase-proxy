import { fetchMultiDayProductionData, fetchTodayProductionData } from "@/service/enphaseProduction";
import { useEffect, useMemo } from "react";
import { ChartData } from "@/service/enphaseProduction";
import { useState } from "react";
import styles from './usageDetails.module.css';
import { CellTowerOutlined, HomeOutlined, WbSunnyOutlined } from "@mui/icons-material";
import { formatWatt, HomeProductionData } from "./useProduction";
import Chart from "./chart";
import { fetchMultiDayOfficeProductionData, getLast12HoursOfficeProduction, OfficeProductionData } from "@/service/officeProduction";
import { SubNavBar } from "./navBar";
import { calculateCost, useGlobalState } from "./GlobalStateContext";
import { differenceInDays, startOfMonth } from "date-fns";
import { ThemeColors } from "../theme";

export interface UsageDetailsProps {
    productionData: HomeProductionData | OfficeProductionData | null;
    
}

const timeRanges = ['Day', 'Billing Cycle', 'Month'];
type TimeRange = typeof timeRanges[number];
type Source = 'solar' | 'home' | 'grid';

export function UsageDetails({ productionData }: UsageDetailsProps) {
    const { globalState } = useGlobalState();
    const [rooftopChartData, setRooftopChartData] = useState<ChartData>({ series: [
        { title: "Production", color: ThemeColors.production, data: [] },
    ] });
    const [officeChartData, setOfficeChartData] = useState<ChartData>({ series: [
        { title: "Production", color: ThemeColors.production, data: [] },
    ] });
    const [source, setSource] = useState<Source>('solar');
    const [timeRange, setTimeRange] = useState<TimeRange>('Day');

    const fetchData = () => {   
        if (timeRange === 'Day') {
            fetchTodayProductionData().then(({series}) => {
                setRooftopChartData({
                    series: [
                        { title: "Production", color: ThemeColors.production, data: series[0].data },
                        { title: "Consumption", color: ThemeColors.consumption, data: series[1].data },
                        { title: "Grid", color: ThemeColors.grid, data: series[0].data.map((d, i) => ({ timestamp: d.timestamp, value: series[1].data[i].value - d.value })) }
                    ]   
                });
            });
        } else if (timeRange === 'Billing Cycle') {
            const billingStartDate = new Date(globalState.billingCycleStartDate + 'T08:00:00Z');
            const daysAgo = differenceInDays(new Date(), billingStartDate);
            fetchMultiDayProductionData(daysAgo).then(data => {
                setRooftopChartData({
                    series: [
                        { title: "Production", color: ThemeColors.production, data: data.map(d => ({ timestamp: d.timestamp.getTime(), value: d.productionWatts })) },
                        { title: "Consumption", color: ThemeColors.consumption, data: data.map(d => ({ timestamp: d.timestamp.getTime(), value: d.consumptionWatts })) },
                        { title: "Grid", color: ThemeColors.grid, data: data.map(d => ({ timestamp: d.timestamp.getTime(), value: d.consumptionWatts - d.productionWatts })) },
                    ]
                });
            });
        } else if (timeRange === 'Month') {
            const firstDayOfMonth = startOfMonth(new Date());
            const daysAgo = differenceInDays(new Date(), firstDayOfMonth);
            fetchMultiDayProductionData(daysAgo).then(data => {
                setRooftopChartData({
                    series: [
                        { title: "Production", color: ThemeColors.production, data: data.map(d => ({ timestamp: d.timestamp.getTime(), value: d.productionWatts })) },
                        { title: "Consumption", color: ThemeColors.consumption, data: data.map(d => ({ timestamp: d.timestamp.getTime(), value: d.consumptionWatts })) },
                        { title: "Grid", color: ThemeColors.grid, data: data.map(d => ({ timestamp: d.timestamp.getTime(), value: d.consumptionWatts - d.productionWatts })) },
                    ]
                });
            });
        } 

        if (timeRange === 'Day') {
            getLast12HoursOfficeProduction().then(({series}) => {
                setOfficeChartData({
                    series: [
                        { title: "Production", color: "#ffcc00", data: series[0].data },
                        { title: "Consumption", color: "#ff0000", data: series[1].data },
                        { title: "Grid", color: "#4b2fff", data: series[0].data.map((d, i) => ({ timestamp: d.timestamp, value: series[1].data[i].value - d.value })) }
                    ]
                });
            });
        } else if (timeRange === 'Billing Cycle') {
            const billingStartDate = new Date(globalState.billingCycleStartDate + 'T08:00:00Z');
            const daysAgo = differenceInDays(new Date(), billingStartDate);
            fetchMultiDayOfficeProductionData(daysAgo).then(data => {
                setOfficeChartData({
                    series: [
                        { title: "Production", color: ThemeColors.production, data: data.map(d => ({ timestamp: d.timestamp.getTime(), value: d.productionWatts })) },
                        { title: "Consumption", color: ThemeColors.consumption, data: data.map(d => ({ timestamp: d.timestamp.getTime(), value: d.consumptionWatts })) },
                        { title: "Grid", color: ThemeColors.grid, data: data.map(d => ({ timestamp: d.timestamp.getTime(), value: d.consumptionWatts - d.productionWatts })) },
                    ]
                });
            });

        } else if (timeRange === 'Month') {
            const firstDayOfMonth = startOfMonth(new Date());
            const daysAgo = differenceInDays(new Date(), firstDayOfMonth);
            fetchMultiDayOfficeProductionData(daysAgo).then(data => {
                setOfficeChartData({
                    series: [
                        { title: "Production", color: ThemeColors.production, data: data.map(d => ({ timestamp: d.timestamp.getTime(), value: d.productionWatts })) },
                        { title: "Consumption", color: ThemeColors.consumption, data: data.map(d => ({ timestamp: d.timestamp.getTime(), value: d.consumptionWatts })) },
                        { title: "Grid", color: ThemeColors.grid, data: data.map(d => ({ timestamp: d.timestamp.getTime(), value: d.consumptionWatts - d.productionWatts })) },
                    ]
                });
            });

        }
    };

    useEffect(() => { fetchData(); }, [timeRange]);

    const seriesIndex = source === 'solar' ? 0 : source === 'home' ? 1 : 2;

    useEffect(() => {
        const timeout = setTimeout(() => {
            fetchData();
        }, 60 * 1000);

        return () => clearTimeout(timeout);
    }, [rooftopChartData, timeRange]);

    const chartData = globalState.source === 'home' ? rooftopChartData : officeChartData;

    const total = useMemo(() => {
        if (productionData && timeRange === 'Day') {
            if (source === 'solar') {
                return productionData.panel_wh ?? 0;
            } else if (source === 'home') {
                return productionData.load_wh ?? 0;
            } else {
                return (productionData.load_wh ?? 0) - (productionData.panel_wh ?? 0);
            }
        } else if (timeRange !== 'Day') {
            if (globalState.source === 'home') {
                return rooftopChartData.series[seriesIndex].data.reduce((acc, d) => acc + d.value, 0);
            } else {
                return officeChartData.series[seriesIndex].data.reduce((acc, d) => acc + d.value, 0);
            }
        }
        return 0;
    }, [productionData, timeRange, source, rooftopChartData, officeChartData]);

    return (
            <section className={styles.summarySection}>
                <SubNavBar items={timeRanges} selectedItem={timeRange} onItemClicked={setTimeRange} />
                <div className={styles.sourceToggle}>
                    <div className={styles.sourceInfo}>
                            <div>
                                {source === 'solar' && "Total PV Generation"}
                                {source === 'home' && globalState.source === 'home' && "Home Usage"}
                                {source === 'home' && globalState.source === 'office' && "Office Usage"}
                                {source === 'grid' && "Net Power Usage"}
                            </div>
                            {productionData &&
                                <div>
                                    {source === 'solar' && <h4>{formatWatt(total)}h &middot; ${((globalState.ratePerKWHOver1000 / 100) * total / 1000 ).toFixed(2)}</h4>}
                                    {source !== 'solar' && <h4>{formatWatt(total)}h &middot; ${calculateCost(globalState, total)}</h4>}
                                </div>
                            }
                        </div>
                    <WbSunnyOutlined onClick={() => setSource('solar')} className={styles.sourceIcon} style={{ color: source === 'solar' ? ThemeColors.production : undefined }} />
                    <HomeOutlined onClick={() => setSource('home')} className={styles.sourceIcon} style={{ color: source === 'home' ? ThemeColors.consumption : undefined }} />
                    <CellTowerOutlined onClick={() => setSource('grid')} className={styles.sourceIcon} style={{ color: source === 'grid' ? ThemeColors.grid : undefined }} />
                </div>
                <div className={styles.chartContainer}>
                    <Chart data={{ series: [chartData.series[seriesIndex]]}} highlightMode="max" defaultTimeRange="Day" hideAverages={timeRange === 'Day'} hideTimeRange={timeRange !== 'Day'} />
                </div>
            </section>
    );

}