

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { useMemo, useState } from "react";
import styles from "./chart.module.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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

type ChartTimeRange = "1h" | "2h" | "3h" | "6h" | "12h";
const ChartTimeRanges: ChartTimeRange[] = ["1h", "2h", "3h", "6h", "12h"];

export default function Chart(props: { data: ChartData, defaultTimeRange?: ChartTimeRange }) {
    const { data } = props;
    const [chartTimeRange, setChartTimeRange] = useState<ChartTimeRange>(props.defaultTimeRange || "6h");
    const [clearedSeries, setClearedSeries] = useState<string[]>([]);
    const filteredData = useMemo(() => {
        const hours = parseInt(chartTimeRange.replace("h", ""), 10);
        return data.series.filter(s => !clearedSeries.includes(s.title)).map(s => {
            return {
                ...s,
                data: s.data.filter(d => d.timestamp > Date.now() - 1000 * 60 * 60 * hours && d.timestamp <= Date.now())
            };
        });
    }, [chartTimeRange, data.series, clearedSeries]);

    const chartData = {
        labels: filteredData[0]?.data.map(d => new Date(d.timestamp).toLocaleTimeString()),
        datasets: filteredData.map(d => ({
            label: d.title,
            data: d.data.map(d => ({ x: new Date(d.timestamp), y: d.value })),
            fill: false,
            borderColor: d.color,
            tension: 0.1
        }))
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: 'Power Production Over Time'
            }
        },
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'Watts'
                },
                adapters: {
                    type: 'linear',
                    ticks: {
                        autoSkip: true,
                        maxTicksLimit: 10
                    }
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Time'
                }
            }
        }
    };

    return (
        <div>
            <div className={styles.chart}>
                <Line data={chartData} options={{...options, maintainAspectRatio: false}} />
            </div>
            <div style={{marginBottom: '1rem'}}>
                {data.series.map(s => (
                    <label style={{marginRight: '1rem'}} key={s.title}>
                        <input 
                        type="checkbox" 
                        checked={!clearedSeries.includes(s.title)}
                        onChange={() => setClearedSeries(clearedSeries.includes(s.title) ? clearedSeries.filter(t => t !== s.title) : [...clearedSeries, s.title])}
                        style={{marginRight: '0.5rem'}} />
                        {s.title}
                    </label>
                ))}
            </div>

            <div className={styles.chartTimeRange}>
                {ChartTimeRanges.map(range => (
                    <button key={range} className={chartTimeRange === range ? styles.selected : ""} onClick={() => setChartTimeRange(range)}>{range}</button>
                ))}
            </div>
        </div>
    );
}