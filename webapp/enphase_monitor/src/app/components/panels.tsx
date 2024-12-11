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
//     "542436046129",
//     "542436046159",
//     "542436046464",
//     "542436049846",
//     "542436049873",
//     "542436051124",
//     "542436051164",
//     "542436051661",
//     "542436052096",
//     "542436052177",
//     "542436052667",
//     "542436052850",
//     "542436052864",
//     "542436052878",
//     "542436052973",
//     "542436052980",
//     "542436053006",
//     "542436053026",
//     "542436053031",
//     "542436053289",
//     "542436053391",
//     "542436065023",
//     "542436065082",
//     "542436065156",
//     "542436065229",
//     "542436065662",
//     "542436066372",
//     "542436046082"
// ];

const inverterMapping: { [key: string]: string } = {
    "542436049873": "542438022702",
    "542436053289": "542438026016",
    "542436046082": "542438027239",
    "542436065229": "542438022645",
    "542436053006": "542438022643",
    "542436046129": "542438024668",
    "542436052096": "542438022741",
    "542436052973": "542438024665",
    "542436052177": "542438027317",
    "542436052850": "542438024625",
    "542436046464": "542438027326",
    "542436051661": "542438027297",
    "542436052878": "542438024681",
    "542436052667": "542438022781",
    "542436065156": "542438022759",
    "542436049846": "542438024755",
    "542436065023": "542438024642",
    "542436046159": "542438025714",
    "542436052864": "542438024735",
    "542436053031": "542438022613",
    "542436052980": "542438022684",
    "542436053026": "542438022713",
    "542436053391": "542438025685",
    "542436065662": "542438025686",
    "542436065082": "542438026004",
    "542436051124": "542438022786",
    "542436066372": "542438022716",
};

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
                if (influxData.filter(p => p.lastReportWatts != null).length > 0) {
                    setComparisonPanelData(influxData);
                } else {
                    fetchHistoricalPanelData(inverterMapping[selectedPanelSerialNumber], selectedDate).then(influxData => {
                        setComparisonPanelData(influxData);
                    });
                }
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
                    <Panel panel={panelData["542436049873"]} onSelect={handlePanelSelect} isSelected={selectedPanelSerialNumber === "542436049873"} />
                    <Panel panel={panelData["542436053289"]} onSelect={handlePanelSelect} isSelected={selectedPanelSerialNumber === "542436053289"} />
                    <Panel panel={panelData["542436046082"]} onSelect={handlePanelSelect} isSelected={selectedPanelSerialNumber === "542436046082"} />
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <Panel panel={panelData["542436065229"]} onSelect={handlePanelSelect} isSelected={selectedPanelSerialNumber === "542436065229"} />
                    <Panel panel={panelData["542436053006"]} onSelect={handlePanelSelect} isSelected={selectedPanelSerialNumber === "542436053006"} />
                </div>
            }
            {panelData &&
                <>
                <div className={styles.panel7}>
                    <div></div>
                    <div></div>
                    <Panel panel={panelData["542436046129"]} onSelect={handlePanelSelect} isSelected={selectedPanelSerialNumber === "542436046129"} />
                    <Panel panel={panelData["542436052096"]} onSelect={handlePanelSelect} isSelected={selectedPanelSerialNumber === "542436052096"} />
                    <Panel panel={panelData["542436052973"]} onSelect={handlePanelSelect} isSelected={selectedPanelSerialNumber === "542436052973"} />
                    <Panel panel={panelData["542436052177"]} onSelect={handlePanelSelect} isSelected={selectedPanelSerialNumber === "542436052177"} />
                </div>
                <div className={styles.panel}>
                    <div></div>
                    <Panel panel={panelData["542436052850"]} onSelect={handlePanelSelect} isSelected={selectedPanelSerialNumber === "542436052850"} />
                    <Panel panel={panelData["542436046464"]} onSelect={handlePanelSelect} isSelected={selectedPanelSerialNumber === "542436046464"} />
                    <Panel panel={panelData["542436051661"]} onSelect={handlePanelSelect} isSelected={selectedPanelSerialNumber === "542436051661"} />
                    <Panel panel={panelData["542436052878"]} onSelect={handlePanelSelect} isSelected={selectedPanelSerialNumber === "542436052878"} />
                    <Panel panel={panelData["542436052667"]} onSelect={handlePanelSelect} isSelected={selectedPanelSerialNumber === "542436052667"} />
                </div>
                <div className={styles.panel7}>
                    <div></div>
                    <Panel panel={panelData["542436065156"]} onSelect={handlePanelSelect} isSelected={selectedPanelSerialNumber === "542436065156"} />
                    <Panel panel={panelData["542436049846"]} onSelect={handlePanelSelect} isSelected={selectedPanelSerialNumber === "542436049846"} />
                    <Panel panel={panelData["542436065023"]} onSelect={handlePanelSelect} isSelected={selectedPanelSerialNumber === "542436065023"} />
                    <Panel panel={panelData["542436046159"]} onSelect={handlePanelSelect} isSelected={selectedPanelSerialNumber === "542436046159"} />
                    <Panel panel={panelData["542436052864"]} onSelect={handlePanelSelect} isSelected={selectedPanelSerialNumber === "542436052864"} />
                    <Panel panel={panelData["542436053031"]} onSelect={handlePanelSelect} isSelected={selectedPanelSerialNumber === "542436053031"} />
                </div>
                <div className={styles.panel}>
                    <Panel panel={panelData["542436052980"]} onSelect={handlePanelSelect} isSelected={selectedPanelSerialNumber === "542436052980"} />
                    <Panel panel={panelData["542436053026"]} onSelect={handlePanelSelect} isSelected={selectedPanelSerialNumber === "542436053026"} />
                    <Panel panel={panelData["542436053391"]} onSelect={handlePanelSelect} isSelected={selectedPanelSerialNumber === "542436053391"} />
                    <Panel panel={panelData["542436065662"]} onSelect={handlePanelSelect} isSelected={selectedPanelSerialNumber === "542436065662"} />
                    <Panel panel={panelData["542436065082"]} onSelect={handlePanelSelect} isSelected={selectedPanelSerialNumber === "542436065082"} />
                    <Panel panel={panelData["542436051124"]} onSelect={handlePanelSelect} isSelected={selectedPanelSerialNumber === "542436051124"} />
                    <Panel panel={panelData["542436066372"]} onSelect={handlePanelSelect} isSelected={selectedPanelSerialNumber === "542436066372"} />
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
