import { fetchMultiDayProductionData, fetchTodayProductionData, fetchMaxDataForDay as fetchMaxHomeDataForDay, ChartData } from "@/service/enphaseProduction";
import { useEffect, useMemo } from "react";
import { useState } from "react";
import styles from './usageDetails.module.css';
import { Battery2BarOutlined, CellTowerOutlined, HomeOutlined, WbSunnyOutlined } from "@mui/icons-material";
import { formatWatt, HomeProductionData } from "./useProduction";
import Chart from "./chart";
import { fetchBatteryData, fetchMaxDataForDay as fetchMaxOfficeDataForDay, fetchMultiDayBatteryData, fetchMultiDayOfficeProductionData, getLast12HoursOfficeProduction, OfficeProductionData } from "@/service/officeProduction";
import { SubNavBar } from "./navBar";
import { calculateCost, getBillingCycleStartDate, useGlobalState } from "./GlobalStateContext";
import { differenceInDays, endOfMonth, isToday, startOfMonth } from "date-fns";
import { ThemeColors } from "../theme";
import DateSelection from "./dateSelection";
import { useAsyncState } from "./helpers";
import { getDailyData } from "@/service/pvwatts";

export interface UsageDetailsProps {
    productionData: HomeProductionData | OfficeProductionData | null;
    
}

const timeRanges = ['Day', 'Billing Cycle', 'Month'];
type TimeRange = typeof timeRanges[number];
type Source = 'solar' | 'home' | 'grid' | 'battery';

export function UsageDetails({ productionData }: UsageDetailsProps) {
    const { globalState } = useGlobalState();
    const [rooftopChartData, setRooftopChartData] = useState<ChartData>({ series: [
        { title: "Production", color: ThemeColors.production, data: [] },
        { title: "Consumption", color: ThemeColors.consumption, data: [] },
        { title: "Grid", color: ThemeColors.grid, data: [] },
    ] });
    const [officeChartData, setOfficeChartData] = useState<ChartData>({ series: [
        { title: "Production", color: ThemeColors.production, data: [] },
        { title: "Consumption", color: ThemeColors.consumption, data: [] },
        { title: "Grid", color: ThemeColors.grid, data: [] },
    ] });
    const [batteryChartData, setBatteryChartData] = useState<ChartData>({ series: [
        { title: "Battery Voltage", color: ThemeColors.powerwall, data: [] },
    ] });
    const [source, setSource] = useState<Source>('solar');
    const [timeRange, setTimeRange] = useState<TimeRange>('Day');
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const selectedDateIsToday = isToday(selectedDate);
    const [chartType, setChartType] = useState<'line' | 'bar'>('line');
    const [maxUsageForDay, setMaxUsageForDay] = useState<number>(0);
    const [enableDailyData, setEnableDailyData] = useState<'none' | 'ideal' | 'shaded' | 'sam'>('none');

    const [dailyData] = useAsyncState(() => 
        enableDailyData !== 'none' ? getDailyData(selectedDate) : Promise.resolve(undefined), 
    [selectedDate, enableDailyData]);

    const fetchData = (type: 'home' | 'office' | 'battery') => {   
        if (type === 'home') {
            if (timeRange === 'Day') {
                fetchTodayProductionData(selectedDate, 'previous').then(({series}) => {
                    setRooftopChartData({
                        series: [
                            { title: "Production", color: ThemeColors.production, data: series[0].data },
                            { title: "Consumption", color: ThemeColors.consumption, data: series[1].data },
                            { title: "Grid", color: ThemeColors.grid, data: series[0].data.map((d, i) => ({ timestamp: d.timestamp, value: series[1].data[i].value - d.value })) }
                        ]   
                    });
                    // NOTE: we set this because we want the chart to re-render when the data changes. Otherwise , we would just check the range when passing the prop for the chart component
                    setChartType('line');
                });
            } else if (timeRange === 'Billing Cycle') {
                const billingStartDate = getBillingCycleStartDate(globalState, selectedDate.getMonth(), selectedDate.getFullYear());
                const daysAgo = differenceInDays(new Date(), billingStartDate);
                fetchMultiDayProductionData(daysAgo, 30).then(data => {
                    setRooftopChartData({
                        series: [
                            { title: "Production", color: ThemeColors.production, data: data.map(d => ({ timestamp: d.timestamp.getTime(), value: d.productionWatts })) },
                            { title: "Consumption", color: ThemeColors.consumption, data: data.map(d => ({ timestamp: d.timestamp.getTime(), value: d.consumptionWatts })) },
                            { title: "Grid", color: ThemeColors.grid, data: data.map(d => ({ timestamp: d.timestamp.getTime(), value: d.consumptionWatts - d.productionWatts })) },
                        ]
                    });
                    setChartType('bar');
                });
            } else if (timeRange === 'Month') {
                const firstDayOfMonth = startOfMonth(selectedDate);
                const daysAgo = differenceInDays(new Date(), firstDayOfMonth);
                fetchMultiDayProductionData(daysAgo, differenceInDays(endOfMonth(selectedDate), firstDayOfMonth)).then(data => {
                    setRooftopChartData({
                        series: [
                            { title: "Production", color: ThemeColors.production, data: data.map(d => ({ timestamp: d.timestamp.getTime(), value: d.productionWatts })) },
                            { title: "Consumption", color: ThemeColors.consumption, data: data.map(d => ({ timestamp: d.timestamp.getTime(), value: d.consumptionWatts })) },
                            { title: "Grid", color: ThemeColors.grid, data: data.map(d => ({ timestamp: d.timestamp.getTime(), value: d.consumptionWatts - d.productionWatts })) },
                        ]
                    });
                    setChartType('bar');
                });
            } 
        }

        if (type === 'office') {
            if (timeRange === 'Day') {
                getLast12HoursOfficeProduction(selectedDate).then(({series}) => {
                    setOfficeChartData({
                        series: [
                            { title: "Production", color: ThemeColors.production, data: series[0].data },
                            { title: "Consumption", color: ThemeColors.consumption, data: series[1].data },
                            { title: "Grid", color: ThemeColors.grid, data: series[0].data.map((d, i) => ({ timestamp: d.timestamp, value: series[1].data[i].value - d.value })) }
                        ]
                    });
                    setChartType('line');
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
                    setChartType('bar');
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
                    setChartType('bar');
                });
            }
        }

        if (type === 'battery') {
            if (timeRange === 'Day') {
                fetchBatteryData(selectedDate).then(data => {
                    setBatteryChartData({
                        series: [{ title: "Battery Voltage", color: ThemeColors.powerwall, data: data.map(d => ({ timestamp: d.timestamp.getTime(), value: d.value })) }],
                    });
                    setChartType('line');
                });
            } else if (timeRange === 'Billing Cycle') {
                const billingStartDate = new Date(globalState.billingCycleStartDate + 'T08:00:00Z');
                const daysAgo = differenceInDays(new Date(), billingStartDate);
                fetchMultiDayBatteryData(daysAgo).then(data => {
                    setBatteryChartData({
                        series: [{ title: "Battery Voltage", color: ThemeColors.powerwall, data: data.map(d => ({ timestamp: d.timestamp.getTime(), value: d.value })) }],
                    });
                    setChartType('bar');
                });
            } else if (timeRange === 'Month') {
                const firstDayOfMonth = startOfMonth(new Date());
                const daysAgo = differenceInDays(new Date(), firstDayOfMonth);
                fetchMultiDayBatteryData(daysAgo).then(data => {
                    setBatteryChartData({
                        series: [{ title: "Battery Voltage", color: ThemeColors.powerwall, data: data.map(d => ({ timestamp: d.timestamp.getTime(), value: d.value })) }],
                    });
                    setChartType('bar');
                });
            }
        }
    };

    useEffect(() => { 
        fetchData(globalState.source === 'home' ? 'home' : source === 'battery' ? 'battery' : 'office'); 
    }, [timeRange, selectedDate, globalState.source, source]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            fetchData(globalState.source === 'home' ? 'home' : source === 'battery' ? 'battery' : 'office');
        }, 60 * 1000);

        return () => clearTimeout(timeout);
    }, [rooftopChartData, timeRange]);

    useEffect(() => {
        if (globalState.source !== 'office' && source === 'battery') {
            setSource('solar');
        }
    }, [globalState.source, source]);

    const seriesIndex = source === 'solar' ? 0 : source === 'home' ? 1 : 2;

    const chartData = globalState.source === 'home' ? rooftopChartData : officeChartData;

    useEffect(() => {
        if (timeRange === 'Day' && globalState.source === 'home') {
            fetchMaxHomeDataForDay(selectedDate).then(data => {
                setMaxUsageForDay(data.reduce((acc, d) => acc + 
                (source === 'solar' ? d.productionWatts : source === 'home' ? d.consumptionWatts : d.consumptionWatts - d.productionWatts), 0));
            });
        } else if (timeRange === 'Day' && globalState.source === 'office') {
            fetchMaxOfficeDataForDay(selectedDate).then(data => {
                setMaxUsageForDay(data.reduce((acc, d) => acc + 
                    (source === 'solar' ? d.productionWatts : source === 'home' ? d.consumptionWatts : d.consumptionWatts - d.productionWatts), 0));
            });
        }
    }, [timeRange, selectedDate, source]);

    const total = useMemo(() => {
        if (productionData && timeRange === 'Day') {
            return maxUsageForDay;
        } else if (timeRange !== 'Day') {
            if (globalState.source === 'home') {
                return rooftopChartData.series[seriesIndex].data.reduce((acc, d) => acc + d.value, 0);
            } else {
                return officeChartData.series[seriesIndex].data.reduce((acc, d) => acc + d.value, 0);
            }
        }
        return 0;
    }, [productionData, timeRange, source, rooftopChartData, officeChartData, seriesIndex]);

    return (
            <section className={styles.summarySection}>
                <SubNavBar items={timeRanges} selectedItem={timeRange} onItemClicked={t => { setTimeRange(t); setSelectedDate(new Date()); }} />
                <div className={styles.sourceToggle}>
                    <div className={styles.sourceInfo}>
                            <div onClick={() => setEnableDailyData(prev => prev === 'none' ? 'ideal' : prev === 'ideal' ? 'shaded' : prev === 'shaded' ? 'sam' : 'none')}>
                                {source === 'solar' && "Total PV Generation"}
                                {source === 'home' && globalState.source === 'home' && "Home Usage"}
                                {source === 'home' && globalState.source === 'office' && "Office Usage"}
                                {source === 'grid' && "Net Power Usage"}
                                {source === 'battery' && "Battery Voltage"}
                            </div>
                            {productionData &&
                                <div>
                                    {source === 'solar' && <h4>{formatWatt(total)}h &middot; ${((globalState.ratePerKWHOver1000 / 100) * total / 1000 ).toFixed(2)}</h4>}
                                    {source !== 'solar' && source !== 'battery' && <h4>{formatWatt(total)}h &middot; ${calculateCost(globalState, total)}</h4>}
                                    {source === 'battery' && 'batt_percent' in productionData && <h4>{productionData.batt_percent.toFixed(0)}% &middot; {(productionData.batt_v.toFixed(2))}V</h4>}
                                </div>
                            }
                            {enableDailyData !== 'none' && dailyData && 
                            <div>
                                {enableDailyData === 'ideal' && <h4>Ideal: {formatWatt(dailyData[0]["Ideal Daily Output (W)"])}h</h4>}
                                {enableDailyData === 'shaded'  && <h4>Shaded: {formatWatt(dailyData[0]["Shaded Daily Output (W)"])}h</h4>}
                                {enableDailyData === 'sam'  && <h4>SAM: {formatWatt(dailyData[0]["SAM Daily Output (W)"])}h</h4>}
                            </div>}
                        </div>
                    <WbSunnyOutlined onClick={() => setSource('solar')} className={styles.sourceIcon} style={{ color: source === 'solar' ? ThemeColors.production : undefined }} />
                    <HomeOutlined onClick={() => setSource('home')} className={styles.sourceIcon} style={{ color: source === 'home' ? ThemeColors.consumption : undefined }} />
                    <CellTowerOutlined onClick={() => setSource('grid')} className={styles.sourceIcon} style={{ color: source === 'grid' ? ThemeColors.grid : undefined }} />
                    {globalState.source === 'office' && <Battery2BarOutlined onClick={() => setSource('battery')} className={styles.sourceIcon} style={{ color: source === 'battery' ? ThemeColors.powerwall : undefined }} />}
                </div>
                <div className={styles.chartContainer}>
                    <Chart data={{ series: source === 'battery' ? batteryChartData.series : [chartData.series[seriesIndex]]}} 
                        highlightMode="max" 
                        defaultTimeRange={chartType === 'line' && selectedDateIsToday ? 'Day' : 'All'} 
                        type={chartType}
                        hideAverages={chartType === 'line'} 
                        hideTimeRange={chartType === 'bar' || !selectedDateIsToday}
                        barData={timeRange === 'Day' && source === 'solar' && dailyData ? { title: "Ideal", color: "#00000015", data: dailyData?.map(x => ({ timestamp: new Date(selectedDate).setHours(x.Hour, 20), value: x[enableDailyData === 'ideal' ? "Ideal" : (enableDailyData === 'shaded' ? "Scaled 2" : "SAM Model Output (W)")] })) ?? [] } : undefined }
                        suffix={source === 'battery' ? (timeRange === 'Day' ? "V" : "%") : (timeRange !== 'Day' ? "h" : undefined)} />
                </div>
                {timeRange === 'Day' && <div className={styles.dateSelectionContainer}>
                    <DateSelection date={selectedDate} setDate={setSelectedDate} />
                </div>}
                {timeRange === 'Billing Cycle' && <div className={styles.dateSelectionContainer}>
                    <DateSelection date={selectedDate} setDate={setSelectedDate} jumpPeriod="30d" />
                </div>}
                {timeRange === 'Month' && <div className={styles.dateSelectionContainer}>
                    <DateSelection date={startOfMonth(selectedDate)} setDate={setSelectedDate} jumpPeriod="1m" />
                </div>}
            </section>
    );

}