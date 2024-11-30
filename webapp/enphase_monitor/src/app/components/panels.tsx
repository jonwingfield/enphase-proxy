"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import styles from "./panel.module.css";
import Chart, { ChartData } from "./chart";

interface PanelData {
    serialNumber: string;
    lastReportDate: number;
    devType: number;
    lastReportWatts: number;
    maxReportWatts: number;
}

// const inverters = [
//     "542438024668",
//     "542438022713",
//     "542438024642",
//     "542438022684",
//     "542438022759",
//     "542438022716",
//     "542438027239",
//     "542438024625",
//     "542438026016",
//     "542438025685",
//     "542438024681",
//     "542438025686",
//     "542438022781",
//     "542438022741",
//     "542438024665",
//     "542438027317",
//     "542438022702",
//     "542438025714",
//     "542438022643",
//     "542438022613",
//     "542438027297",
//     "542438024755",
//     "542438026004",
//     "542438027326",
//     "542438022786",
//     "542438024735",
//     "542438022645",
// ]

async function fetchPanelData(): Promise<{ [key: string]: PanelData }> {
    const response = await fetch("/enphase_api/api/v1/production/inverters");
    return response.json().then(data => {
        return Object.fromEntries(data.map((panel: PanelData) => [panel.serialNumber, panel]));
    });
}

async function fetchHistoricalPanelData(serialNumber: string, date?: Date): Promise<PanelData[]> {
    const startDate = new Date((date ?? new Date()));
    startDate.setUTCHours(0, 0, 0, 0);
    const endDate = new Date(startDate);
    endDate.setUTCHours(23, 59, 59, 999);
    console.log(`date: ${date?.toISOString()}, startDate: ${startDate.toISOString()}, endDate: ${endDate.toISOString()}`);
    const response = await fetch("/influxdb/query?" + new URLSearchParams({
        db: "solar",
        q: `SELECT mean("watts") as "watts" FROM "solar"."autogen"."inverter" WHERE time > '${startDate.toISOString()}' 
             and time < '${endDate.toISOString()}' and "serialNumber" = '${serialNumber}' GROUP BY time(1m)`
    }));
    return (await response.json()).results[0].series?.[0]?.values.map((value: any[]) => ({
        lastReportDate: new Date(value[0]).getTime() / 1000,
        lastReportWatts: value[1],
        serialNumber,
    })) ?? [];
}

function calculatePanelStats(historicalPanelData: PanelData[]): { wattHours: number, maxWatts: number } | null {
    if (historicalPanelData.length < 2) {
        return null;
    }

    const nonZeroData = historicalPanelData.filter(p => p.lastReportWatts > 0);

    let totalWattHours = 0;
    let maxWatts = 0;
    for (let i = 1; i < nonZeroData.length; i++) {
        const prev = nonZeroData[i - 1];
        const curr = nonZeroData[i];

        // Time difference in hours
        const hoursDiff = (curr.lastReportDate - prev.lastReportDate) / 3600;

        // Average watts between readings
        const avgWatts = (prev.lastReportWatts + curr.lastReportWatts) / 2;

        // Add watt-hours for this interval
        totalWattHours += avgWatts * hoursDiff;
        maxWatts = Math.max(maxWatts, curr.lastReportWatts);
    }

    return {
        wattHours: Math.round(totalWattHours * 10) / 10, // Round to 2 decimal places
        maxWatts,
    };
}

export default function Panels({ autoRefresh = true }: { autoRefresh?: boolean }) {
    const [panelData, setPanelData] = useState<{ [key: string]: PanelData } | undefined>(undefined);
    const [historicalPanelData, setHistoricalPanelData] = useState<PanelData[]>([]);
    const [comparisonPanelData, setComparisonPanelData] = useState<PanelData[]>([]);
    const [selectedPanelSerialNumber, setSelectedPanelSerialNumber] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date(new Date().setDate(new Date().getDate() - 1)));

    const updatePanelData = useCallback(() => {
        return fetchPanelData().then(panelData => {
            setPanelData(panelData);
            if (historicalPanelData.length > 0) {
                const thisPanelData = panelData[historicalPanelData[0].serialNumber];
                setHistoricalPanelData(prev => {
                    if (prev[prev.length - 1].lastReportDate < thisPanelData.lastReportDate) {
                        return [...prev, thisPanelData];
                    }
                    return prev;
                });
            }
        })
    }, [historicalPanelData]);

    useEffect(() => { updatePanelData(); }, [autoRefresh]);

    useEffect(() => {
        if (autoRefresh) {
            const timeout = setTimeout(() => updatePanelData(), 10000);
            return () => clearTimeout(timeout);
        }
    }, [panelData, autoRefresh]); // every time panelData changes, trigger another update in 1 second

    const handlePanelSelect = useCallback((panel: PanelData) => {
        setSelectedPanelSerialNumber(panel.serialNumber);
    }, [selectedDate]);

    useEffect(() => {
        if (selectedPanelSerialNumber) {
            fetchHistoricalPanelData(selectedPanelSerialNumber, new Date()).then(influxData => {
                setHistoricalPanelData(influxData);
            });
            fetchHistoricalPanelData(selectedPanelSerialNumber, selectedDate).then(influxData => {
                setComparisonPanelData(influxData);
            });
        }
    }, [selectedPanelSerialNumber, selectedDate]);

    const panelStats = useMemo(() => calculatePanelStats(historicalPanelData), [historicalPanelData]);

    const chartData: ChartData = useMemo(() => {
        if (historicalPanelData.length === 0) {
            return { series: [] };
        }
        const daysSinceComparisonDate = Math.floor((new Date().getTime() - selectedDate.getTime()) / (24 * 60 * 60 * 1000));
        return {
            series: [{
                title: "Production",
                color: "green",
                data: historicalPanelData.map(p => ({
                    timestamp: p.lastReportDate * 1000,
                    value: p.lastReportWatts,
                })).filter(p => p.value !== null),
            }, {
                title: selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }),
                color: "blue",
                data: comparisonPanelData.map(p => ({
                    timestamp: p.lastReportDate * 1000 + (daysSinceComparisonDate * 24 * 60 * 60 * 1000),
                    value: p.lastReportWatts,
                })).filter(p => p.value !== null),
            }]
        };
    }, [historicalPanelData, comparisonPanelData]);

    return (
        <>
            <h2>Panels</h2>

            <div className={styles.datePicker}>
                <input
                    type="date"
                    onChange={(e) => {
                        const d = e.target.value ? new Date(e.target.value + "T00:00:00Z") : new Date();
                        setSelectedDate(d);
                    }}
                    value={selectedDate.toISOString().split('T')[0]}
                />
            </div>

            {panelData &&
                <div className={styles.panel}>
                    <Panel panel={panelData["542438022702"]} onSelect={handlePanelSelect} isSelected={selectedPanelSerialNumber === "542438022702"} />
                    <Panel panel={panelData["542438026016"]} onSelect={handlePanelSelect} isSelected={selectedPanelSerialNumber === "542438026016"} />
                    <Panel panel={panelData["542438027239"]} onSelect={handlePanelSelect} isSelected={selectedPanelSerialNumber === "542438027239"} />
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <Panel panel={panelData["542438022645"]} onSelect={handlePanelSelect} isSelected={selectedPanelSerialNumber === "542438022645"} />
                    <Panel panel={panelData["542438022643"]} onSelect={handlePanelSelect} isSelected={selectedPanelSerialNumber === "542438022643"} />
                </div>
            }
            {panelData &&
                <>
                <div className={styles.panel7}>
                    <div></div>
                    <div></div>
                    <Panel panel={panelData["542438024668"]} onSelect={handlePanelSelect} isSelected={selectedPanelSerialNumber === "542438024668"} />
                    <Panel panel={panelData["542438022741"]} onSelect={handlePanelSelect} isSelected={selectedPanelSerialNumber === "542438022741"} />
                    <Panel panel={panelData["542438024665"]} onSelect={handlePanelSelect} isSelected={selectedPanelSerialNumber === "542438024665"} />
                    <Panel panel={panelData["542438027317"]} onSelect={handlePanelSelect} isSelected={selectedPanelSerialNumber === "542438027317"} />
                </div>
                <div className={styles.panel}>
                    <div></div>
                    <Panel panel={panelData["542438024625"]} onSelect={handlePanelSelect} isSelected={selectedPanelSerialNumber === "542438024625"} />
                    <Panel panel={panelData["542438027326"]} onSelect={handlePanelSelect} isSelected={selectedPanelSerialNumber === "542438027326"} />
                    <Panel panel={panelData["542438027297"]} onSelect={handlePanelSelect} isSelected={selectedPanelSerialNumber === "542438027297"} />
                    <Panel panel={panelData["542438024681"]} onSelect={handlePanelSelect} isSelected={selectedPanelSerialNumber === "542438024681"} />
                    <Panel panel={panelData["542438022781"]} onSelect={handlePanelSelect} isSelected={selectedPanelSerialNumber === "542438022781"} />
                </div>
                <div className={styles.panel7}>
                    <div></div>
                    <Panel panel={panelData["542438022759"]} onSelect={handlePanelSelect} isSelected={selectedPanelSerialNumber === "542438022759"} />
                    <Panel panel={panelData["542438024755"]} onSelect={handlePanelSelect} isSelected={selectedPanelSerialNumber === "542438024755"} />
                    <Panel panel={panelData["542438024642"]} onSelect={handlePanelSelect} isSelected={selectedPanelSerialNumber === "542438024642"} />
                    <Panel panel={panelData["542438025714"]} onSelect={handlePanelSelect} isSelected={selectedPanelSerialNumber === "542438025714"} />
                    <Panel panel={panelData["542438024735"]} onSelect={handlePanelSelect} isSelected={selectedPanelSerialNumber === "542438024735"} />
                    <Panel panel={panelData["542438022613"]} onSelect={handlePanelSelect} isSelected={selectedPanelSerialNumber === "542438022613"} />
                </div>
                <div className={styles.panel}>
                    <Panel panel={panelData["542438022684"]} onSelect={handlePanelSelect} isSelected={selectedPanelSerialNumber === "542438022684"} />
                    <Panel panel={panelData["542438022713"]} onSelect={handlePanelSelect} isSelected={selectedPanelSerialNumber === "542438022713"} />
                    <Panel panel={panelData["542438025685"]} onSelect={handlePanelSelect} isSelected={selectedPanelSerialNumber === "542438025685"} />
                    <Panel panel={panelData["542438025686"]} onSelect={handlePanelSelect} isSelected={selectedPanelSerialNumber === "542438025686"} />
                    <Panel panel={panelData["542438026004"]} onSelect={handlePanelSelect} isSelected={selectedPanelSerialNumber === "542438026004"} />
                    <Panel panel={panelData["542438022786"]} onSelect={handlePanelSelect} isSelected={selectedPanelSerialNumber === "542438022786"} />
                    <Panel panel={panelData["542438022716"]} onSelect={handlePanelSelect} isSelected={selectedPanelSerialNumber === "542438022716"} />
                </div>
                </>
            }
            {panelStats &&
                <p>{panelStats.wattHours} Wh  <em>({Math.round(panelStats.wattHours / 420.0 * 1000) / 1000} Wh/Watt)</em>. Max: {panelStats.maxWatts}W</p>
            }

            <Chart data={chartData} defaultTimeRange="1h" />
        </>
    );
};

function Panel({ panel, onSelect, isSelected }: { panel: PanelData, onSelect: (panel: PanelData) => void, isSelected: boolean }) {
    return (
        <div className={`${styles.panelItem} ${isSelected ? styles.selected : ""}`} title={`Serial Number: ${panel.serialNumber}\nMax Watts: ${panel.maxReportWatts}`} onClick={() => onSelect(panel)}>
            {isSelected && <span className={styles.serialNumber}>{panel.serialNumber}</span>}
            {panel.lastReportWatts}
        </div>
    );
}
