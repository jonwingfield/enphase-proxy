import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  TimeSeriesScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions
} from 'chart.js';
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import styles from "./chart.module.css";
import 'chartjs-adapter-date-fns';
import { ChartData } from "@/service/enphaseProduction";
import { differenceInHours, format } from 'date-fns';
import { formatWatt } from "./useProduction";


const verticalLinePlugin = {
    id: 'verticalLinePlugin',
    beforeDraw(chart: any, args: any, options: any) {
      const tooltip = chart.tooltip;

      if (tooltip && tooltip.opacity > 0) {
        const ctx = chart.ctx;
        const chartArea = chart.chartArea;
        const x = tooltip.caretX; // Tooltip x-coordinate

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x, chartArea.top); // Start at tooltip x and top of chart
        ctx.lineTo(x, chartArea.bottom); // Draw to the bottom
        ctx.lineWidth = 1;
        ctx.strokeStyle = options.lineColor || 'red'; // Use the passed color or default to red
        ctx.setLineDash([0, 2]); 
        ctx.lineCap = 'round';
        ctx.stroke();
        ctx.restore();
      }
    },
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeSeriesScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  verticalLinePlugin
);

(Tooltip.positioners as any)['custom'] = function(items: any) {
    const pos = (Tooltip.positioners as any).average(items);

    // Happens when nothing is found
    if (pos === false) {
      return false;
    }
  
    const chart = this.chart;
  
    return {
      x: pos.x,
      y: chart.chartArea.top,
      xAlign: 'center',
      yAlign: 'bottom',
    };
};

function triggerTooltip(chart: any, index: number, datasetIndices: number[]) {
    const tooltip = chart.tooltip;
    // if (tooltip.getActiveElements().length > 0) {
     // do nothing if it's already active
    //   tooltip.setActiveElements([], {x: 0, y: 0});
    //   console.log(chart.chartArea);
    // } else {
      const chartArea = chart.chartArea;

      tooltip.setActiveElements(datasetIndices.filter(datasetIndex => chart.data.datasets[datasetIndex]?.data.length > index).map(datasetIndex => ({
        datasetIndex,
        index,
      })),
      {
        x: (chartArea.left + chartArea.right) / 2,
        y: (chartArea.top + chartArea.bottom) / 2,
      });
    //   console.log(chartArea);
    // }
  
    chart.update();
  }

type ChartTimeRange = "1h" | "2h" | "3h" | "6h" | "12h" | "Day" | "All";
const ChartTimeRanges: ChartTimeRange[] = ["1h", "2h", "3h", "6h", "12h", "Day", "All"];

type ChartProps = { 
    data: ChartData,    
    defaultTimeRange?: ChartTimeRange, 
    highlightMode?: 'max' | 'last' , 
    hideTimeRange?: boolean, 
    hideAverages?: boolean, 
    suffix?: string,
    type?: 'line' | 'bar'
}

export default function Chart(props: ChartProps) {
    const { data, highlightMode, suffix } = props;
    const [chartTimeRange, setChartTimeRange] = useState<ChartTimeRange>(props.defaultTimeRange || "6h");
    const [clearedSeries, setClearedSeries] = useState<string[]>([]);

    const showAllData = useMemo(() => props.defaultTimeRange === 'All', [props.defaultTimeRange]);

    const { filteredData, isSingleDay } = useMemo(() => {
        let hours = 0;

        if (showAllData) {
            return { filteredData: data.series, isSingleDay: false };
        } else if (chartTimeRange !== 'Day') {
            hours = parseInt(chartTimeRange.replace("h", ""), 10) * 1000 * 60 * 60;;
        } else {
            const now = new Date();
            hours = now.getHours() * 1000 * 60 * 60 + now.getMinutes() * 1000 * 60 + now.getSeconds() * 1000;
        }

        const filtered =  data.series.filter(s => !clearedSeries.includes(s.title)).map(s => {
            return {
                ...s,
                data: s.data.filter(d => d.timestamp > Date.now() - hours && d.timestamp <= Date.now())
            };
        });

        const isSingleDay = filtered[0]?.data?.length ? 
            differenceInHours(filtered[0].data[0].timestamp, filtered[0].data[filtered[0].data.length - 1].timestamp) < 24 : false;

        return { filteredData: filtered, isSingleDay };
    }, [chartTimeRange, data.series, clearedSeries, showAllData]);
    const chartRef = useRef<any>(null);

    // Calculate average for each dataset
    const averages = useMemo(() => {
        return filteredData.map(series => {
            const sum = series.data.reduce((acc, point) => acc + point.value, 0);
            return sum / series.data.length;
        });
    }, [filteredData]);

    const chartData = useMemo(() => {
        return {
            datasets: [
                ...filteredData.map((d, i) => ({
                    label: d.title,
                    data: d.data.map(d => ({ x: new Date(d.timestamp), y: d.value })),
                    fill: i === 0,
                    borderColor: d.color,
                    backgroundColor: `${d.color}33`, // Add 33 for 20% opacity
                    borderWidth: 1,
                    tension: 0.1,
                    cubicInterpolationMode: 'monotone',
                    pointRadius: 0 // Remove points
                })),
                ...props.hideAverages ? [] : filteredData.map((d, i) => ({
                    label: `${d.title} Average`,
                    data: d.data.map(d => ({ x: new Date(d.timestamp), y: averages[i] })),
                    type: 'line',
                    borderColor: d.color,
                    borderDash: [5, 5],
                    borderWidth: 1,
                    pointRadius: 0,
                    fill: false
                }))
            ]
        };
    }, [filteredData, averages, props.hideAverages]);

    useLayoutEffect(() => {
        if (chartRef.current && chartData.datasets[0]?.data.length > 0 && highlightMode) {
            const datasetIndices = chartData.datasets.length > 1 ? [0, 2] : [0];
            const index = highlightMode === 'max' ? 
                chartData.datasets[0].data.indexOf(chartData.datasets[0].data.reduce((max, d) => d.y > max.y ? d : max, chartData.datasets[0].data[0])) : 
                chartData.datasets[0].data.length - 1;
            setTimeout(() => triggerTooltip(chartRef.current, index, datasetIndices), 100);
        }
    }, [chartRef.current, data.series[0]?.data, highlightMode]);

    const formatValue = useCallback((value: number) => {
        return suffix === 'h' ? formatWatt(value) + 'h' : 
            (suffix ? (value.toFixed(2) + " "  + suffix) : formatWatt(value));
    }, [suffix]);

    const options = {
        responsive: true,
        layout: {
            padding: {
                top: 100
            }
        },
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: false,
            },
            tooltip: {
                mode: 'index',
                intersect: false,
                position: 'custom',
                yAlign: 'bottom',
                backgroundColor: filteredData?.[0]?.color ?? '#ff000095',
                callbacks: {
                    title: function(context: any) {
                        const timestamp = context[0].raw.x;
                        return format(new Date(timestamp), !isSingleDay ? 'MM/dd' : 'hh:mm');
                    },
                    label: function(context: any) {
                        const label = context.dataset.label || '';
                        const value = context.raw.y;
                        if (value) {
                            if (label.includes('Average')) {
                                return `Average: ${formatValue(value)}`;
                            } else {
                                return formatValue(value);
                            }
                        }
                    }
                }
            },
            verticalLinePlugin: {
                lineColor: filteredData[0]?.color
            },
            crosshair: {
                line: {
                    color: '#808080',
                    width: 1,
                    dashPattern: [5, 5]
                }
            },
        },
        scales: {
            y: {
                position: 'right',
                title: {
                    display: false,
                },
                adapters: {
                    type: 'linear',
                    ticks: {
                        maxTicksLimit: 7,
                    }
                },
                border: {
                    dash: [2, 2],
                    display: false,
                },
                ticks: {
                    callback: function(value: any) {
                        return formatValue(value);
                    },
                    color: '#aaaaaa'
                }
            },
            x: {
                title: {
                    display: false,
                },
                type: 'timeseries',
                grid: {
                    display: false
                },
                ticks: {
                    maxTicksLimit: 8,
                    callback: function(value: any) {
                        return format(new Date(value), !isSingleDay ? 'MM/dd' : 'HH:mm');
                    },
                    color: '#aaaaaa'
                }
            }
        },
        hover: {
            mode: 'index',
            intersect: false
        },
        interaction: {
            mode: 'index',
            intersect: false
        }
    };

    return (
        <div className={styles.chartContainer}>
            <div className={styles.chart}>
                {props.type === 'bar'  ? 
                    <Bar data={chartData as any} ref={chartRef} options={{...options, maintainAspectRatio: false} as any} /> : 
                    <Line data={chartData as any} ref={chartRef} options={{...options, maintainAspectRatio: false} as any} />}
            </div>
            {data.series.length > 1 &&
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
            }

            {!props.hideTimeRange && <div className={styles.chartTimeRange}>
                {ChartTimeRanges.filter(range => range !== 'All').map(range => (
                    <button key={range} className={(chartTimeRange === range ? styles.selected : "") + " " + styles.chartButton} onClick={() => setChartTimeRange(range)}>{range}</button>
                ))}
            </div>}
        </div>
    );
}