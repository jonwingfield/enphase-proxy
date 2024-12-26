import { fetchLast12HoursProductionData } from "@/service/enphaseProduction";
import { useEffect } from "react";
import { ChartData } from "@/service/enphaseProduction";
import { useState } from "react";
import styles from './usageDetails.module.css';
import { CellTowerOutlined, HomeOutlined, WbSunnyOutlined } from "@mui/icons-material";
import { formatWatt, HomeProductionData } from "./useProduction";
import Chart from "./chart";
import { getLast12HoursOfficeProduction, OfficeProductionData } from "@/service/officeProduction";
import { SubNavBar } from "./navBar";
import { useGlobalState } from "./GlobalStateContext";

export interface UsageDetailsProps {
    productionData: HomeProductionData | OfficeProductionData | null;
    
}

const timeRanges = ['Day', 'Billing Cycle', 'Month', 'Year'];
type TimeRange = typeof timeRanges[number];
type Source = 'solar' | 'home' | 'grid';

export function UsageDetails({ productionData }: UsageDetailsProps) {
    const { globalState } = useGlobalState();
    const [rooftopChartData, setRooftopChartData] = useState<ChartData>({ series: [
        { title: "Production", color: "#00FF00", data: [] },
    ] });
    const [officeChartData, setOfficeChartData] = useState<ChartData>({ series: [
        { title: "Production", color: "#00FF00", data: [] },
    ] });
    const [source, setSource] = useState<Source>('solar');
    const [timeRange, setTimeRange] = useState<TimeRange>('Day');

    const fetchData = () => {   
        fetchLast12HoursProductionData().then(data => {
            setRooftopChartData(data);
        });
        getLast12HoursOfficeProduction().then(data => {
            setOfficeChartData(data);
        });
    };

    useEffect(() => { fetchData(); }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {
            fetchData();
        }, 60 * 1000);

        return () => clearTimeout(timeout);
    }, [rooftopChartData]);

    const chartData = globalState.source === 'home' ? rooftopChartData : officeChartData;

    return (
            <section className={styles.summarySection}>
                <SubNavBar items={timeRanges} selectedItem={timeRange} onItemClicked={setTimeRange} />
                <div className={styles.sourceToggle}>
                    <div className={styles.sourceInfo}>
                            <div>
                                {source === 'solar' && "Total PV Generation"}
                                {source === 'home' && "Home Usage"}
                                {source === 'grid' && "Net Power Usage"}
                            </div>
                            {productionData &&
                                <div>
                                    {source === 'solar' && <h4>{formatWatt(productionData.panel_wh ?? 0)}h</h4>}
                                    {source === 'home' && <h4>{formatWatt(productionData.load_wh ?? 0)}h</h4>}
                                    {source === 'grid' && <h4>{formatWatt(productionData.load_wh - productionData.panel_wh)}h</h4>}
                                </div>
                            }
                        </div>
                    <WbSunnyOutlined onClick={() => setSource('solar')} className={styles.sourceIcon} style={{ color: source === 'solar' ? '#ffcc00' : undefined }} />
                    <HomeOutlined onClick={() => setSource('home')} className={styles.sourceIcon} style={{ color: source === 'home' ? '#ff0000' : undefined }} />
                    <CellTowerOutlined onClick={() => setSource('grid')} className={styles.sourceIcon} style={{ color: source === 'grid' ? '#4b2fff' : undefined }} />
                </div>
                <div className={styles.chartContainer}>
                    <Chart data={{ 
                        series: [ source === 'solar' ? 
                            chartData.series[0] : source === 'home' ? 
                                chartData.series[1] : {
                                    data: chartData.series[1].data.map((d, i) => ({ ...d, value: d.value - chartData.series[0].data[i]?.value })),
                                    color: '#4b2fff', 
                                    title: 'Grid',
                                }]
                        }} highlightMode="max" defaultTimeRange="Day" />
                </div>
            </section>
    );

}