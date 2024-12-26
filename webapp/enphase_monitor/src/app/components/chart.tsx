import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  TimeSeriesScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions
} from 'chart.js';
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import styles from "./chart.module.css";
import 'chartjs-adapter-date-fns';
import { ChartData } from "@/service/enphaseProduction";
import { format } from 'date-fns';
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

      console.log(chart.data.datasets);
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

type ChartTimeRange = "1h" | "2h" | "3h" | "6h" | "12h" | "Day";
const ChartTimeRanges: ChartTimeRange[] = ["1h", "2h", "3h", "6h", "12h", "Day"];

export default function Chart(props: { data: ChartData, defaultTimeRange?: ChartTimeRange, highlightMode?: 'max' | 'last' }) {
    const { data, highlightMode } = props;
    const [chartTimeRange, setChartTimeRange] = useState<ChartTimeRange>(props.defaultTimeRange || "6h");
    const [clearedSeries, setClearedSeries] = useState<string[]>([]);
    const filteredData = useMemo(() => {
        let hours = 0;
        if (chartTimeRange !== 'Day') {
            hours = parseInt(chartTimeRange.replace("h", ""), 10) * 1000 * 60 * 60;;
        } else {
            const now = new Date();
            hours = now.getHours() * 1000 * 60 * 60 + now.getMinutes() * 1000 * 60 + now.getSeconds() * 1000;
        }

        return data.series.filter(s => !clearedSeries.includes(s.title)).map(s => {
            return {
                ...s,
                data: s.data.filter(d => d.timestamp > Date.now() - hours && d.timestamp <= Date.now())
            };
        });
    }, [chartTimeRange, data.series, clearedSeries]);
    const chartRef = useRef<any>(null);

    const chartData = {
        datasets: filteredData.map((d, i) => ({
            label: d.title,
            data: d.data.map(d => ({ x: new Date(d.timestamp), y: d.value })),
            fill: i === 0,
            borderColor: d.color,
            backgroundColor: `${d.color}33`, // Add 33 for 20% opacity
            borderWidth: 1,
            tension: 0.1,
            cubicInterpolationMode: 'monotone',
            pointRadius: 0 // Remove points
        }))
    };

    useLayoutEffect(() => {
        if (chartRef.current && chartData.datasets[0]?.data.length > 0 && highlightMode) {
            const datasetIndices = chartData.datasets.length > 1 ? [0, 2] : [0];
            const index = highlightMode === 'max' ? 
                chartData.datasets[0].data.indexOf(chartData.datasets[0].data.reduce((max, d) => d.y > max.y ? d : max, chartData.datasets[0].data[0])) : 
                chartData.datasets[0].data.length - 1;
            setTimeout(() => triggerTooltip(chartRef.current, index, datasetIndices), 100);
        }
    }, [chartRef.current, chartData, highlightMode]);

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
                // text: 'Power Production Over Time'
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
                        return format(new Date(timestamp), 'hh:mm'); // Customize the format as needed
                    },
                    label: function(context: any) {
                        const label = context.dataset.label || '';
                        const value = context.raw.y;
                        if (value) {
                            return formatWatt(value);
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
                position: 'right', // Added this line to move y-axis to right
                title: {
                    display: false,
                },
                adapters: {
                    type: 'linear',
                    ticks: {
                        // autoSkip: true,
                        maxTicksLimit: 7, // Reduced from 10 to 5
                    }
                },
                border: {
                    dash: [2, 2],
                    display: false,
                    // color: '#808080',
                },
                ticks: {
                    callback: function(value: any) {
                        return value / 1000 + ' kW';
                    },
                    color: '#aaaaaa' // Added dark grey color for y-axis
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
                    maxTicksLimit: 8, // Added to limit x-axis ticks
                    callback: function(value: any) {
                        return format(new Date(value), 'HH:mm');
                    },
                    color: '#aaaaaa' // Added dark grey color for y-axis
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
                <Line data={chartData as any} ref={chartRef} options={{...options, maintainAspectRatio: false} as any} />
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

            <div className={styles.chartTimeRange}>
                {ChartTimeRanges.map(range => (
                    <button key={range} className={(chartTimeRange === range ? styles.selected : "") + " " + styles.chartButton} onClick={() => setChartTimeRange(range)}>{range}</button>
                ))}
            </div>
        </div>
    );
}