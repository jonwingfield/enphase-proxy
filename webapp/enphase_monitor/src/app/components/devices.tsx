"use client";

import { NavBar, SubNavBar } from "./navBar";
import styles from "./devices.module.css";
import { VueProductionData } from "@/service/vue";
import { Computer, AcUnit, LocalFireDepartment, 
    Kitchen, Router, DryCleaningOutlined, WaterDrop, Pool, 
    Microwave, Home, Tv, LocalLaundryService, CleanHands, ElectricMeter, 
    Yard,
    EnergySavingsLeaf} from "@mui/icons-material";
import { useMemo, useState } from "react";
import { formatWatt } from "./useProduction";

// Don't render Plotly on the server side, it causes an error
import dynamic from 'next/dynamic';
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

export type DevicesProps = {
    backClicked: () => void,
    vue: VueProductionData[],
    vueKwh: VueProductionData[],
    solar: number,
    grid: number,
    solarKwh: number,
    gridKwh: number,
    tesla: number,
    teslaKwh: number
}

export function Devices({ backClicked, vue, vueKwh, solar, grid, solarKwh, gridKwh, tesla, teslaKwh }: DevicesProps) {
    const subNavBarItems = ['Current', 'Today', 'Sankey', 'Sankey Today'];
    const [selectedItem, setSelectedItem] = useState<typeof subNavBarItems[number]>('Current');
    const wingVueItems = useMemo(() => 
        vue.filter(v => v.device_name.includes('WingVue')), [vue]);
    const otherItems = useMemo(() => {
        const items = vue.filter(v => !v.device_name.includes('WingVue'));
        if (selectedItem === 'Current') {
            items.sort((a, b) => b.usage - a.usage);
        } else {
            items.sort((a, b) => (vueKwh.find(k => k.device_name === b.device_name)?.usage ?? 0) - (vueKwh.find(k => k.device_name === a.device_name)?.usage ?? 0));
        }
        return items;
    }, [vue, selectedItem, vueKwh]);

    const SankeyCached = useMemo(() => {
        return <Sankey vue={selectedItem === 'Sankey Today' ? vueKwh : vue} 
            solar={selectedItem === 'Sankey Today' ? solarKwh : solar} 
            grid={selectedItem === 'Sankey Today' ? gridKwh : grid} 
            tesla={selectedItem === 'Sankey Today' ? teslaKwh : tesla} />
    // Only re-render when vue changes, not when solar or grid changes, they change too often
    // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [vue, selectedItem]);

    return <>
        <div className={styles.homeDetails}>
            <NavBar title="Devices" backClicked={backClicked}
                rightButton={<a href="https://web.emporiaenergy.com" target="_blank" rel="noopener noreferrer"><EnergySavingsLeaf /></a>} />
            <SubNavBar items={subNavBarItems} selectedItem={selectedItem} onItemClicked={setSelectedItem} />
            <div className={styles.homeDetailsBody}>
                {(selectedItem === 'Sankey' || selectedItem === 'Sankey Today') && SankeyCached}
                {selectedItem !== 'Sankey' && selectedItem !== 'Sankey Today' && <table className={styles.homeDetailsTable}>
                    <tbody>
                        {wingVueItems.map(v => <tr key={v.device_name} className={`${styles.homeDetailsTableRow} ${styles.homeDetailsTableRowBold}`}>
                            <td></td>
                            <td className={`${styles.homeDetailsTableCell} ${styles.homeDetailsTableCellDevice}`}>{v.device_name}</td>
                            {selectedItem === 'Current' && <td className={styles.homeDetailsTableCell}>{formatWatt(v.usage)}</td>}
                            {selectedItem === 'Total' && <td className={styles.homeDetailsTableCell}>{formatWatt(vueKwh?.find(k => k.device_name === v.device_name)?.usage ?? 0)}h</td>}
                        </tr>)}
                        {otherItems.map(v => <tr key={v.device_name} className={styles.homeDetailsTableRow}>
                            <td><DeviceIcon device={v.device_name} className={styles.homeDetailsTableCellDeviceIcon} /></td>
                            <td className={`${styles.homeDetailsTableCell} ${styles.homeDetailsTableCellDevice}`}>{v.device_name}</td>
                            {selectedItem === 'Current' && <td className={styles.homeDetailsTableCell}>{formatWatt(v.usage)}</td>}
                            {selectedItem === 'Total' && <td className={styles.homeDetailsTableCell}>{formatWatt(vueKwh?.find(k => k.device_name === v.device_name)?.usage ?? 0)}h</td>}
                        </tr>)}
                    </tbody>
                </table>}
            </div>

        </div>
        <div className={styles.homeDetailsOverlay} onClick={backClicked} />
    </>
}

function DeviceIcon({ device, className }: { device: string, className? : string }) {
    switch (device) {
        case 'A/C':
        case 'Office AC':
            return <AcUnit className={className} />;
        case 'Greenhouse1':
        case 'Greenhouse2':
            return <Yard className={className} />;
        case 'Kitchen':
            return <Kitchen className={className} />;
        case 'Freezer':
        case 'Fridge':
            return <Kitchen className={className} />;
        case 'NetworkMain':
        case 'NetworkOffice':
            return <Router className={className} />;
        case 'OfficeDesk':
            return <Computer className={className} />;
        case 'Range':
            return <LocalFireDepartment className={className} />;
        case 'WorkPC and TV':
        case 'LivingRoomTV':
            return <Tv className={className} />;
        case 'Washing Machine':
            return <LocalLaundryService className={className} />;
        case 'Dishwasher':
            return <CleanHands className={className} />;
        case 'HouseMisc1':
        case 'HouseMisc2':
            return <Home className={className} />;
        case 'Microwave':
            return <Microwave className={className} />;
        case 'PoolPump':
            return <Pool className={className} />;
        case 'Water Heater':
            return <WaterDrop className={className} />;
        case 'Well':
            return <WaterDrop className={className} />;
        case 'Dryer':
            return <DryCleaningOutlined className={className} />;
        default:
            return <ElectricMeter className={className} />;
    }
}


const nodes = [
        "WingVue",
        "Solar",
        "Grid",

        // Intermediate Nodes
        "Office", 
        "Greenhouse",
        "House",
        "Tesla",

        // Leaf Nodes
        "A/C",
        "Office AC",
        "Greenhouse1",
        "Greenhouse2",
        "Kitchen",
        "Freezer",
        "Fridge",
        "NetworkMain",
        "NetworkOffice",
        "OfficeDesk",
        "Range",
        "WorkPC and TV",
        "LivingRoomTV",
        "Washing Machine",
        "Dishwasher",
        "HouseMisc1",
        "HouseMisc2",
        "Microwave",
        "PoolPump",
        "Water Heater",
        "Well",
        "Dryer"
    ];

function Sankey({ vue, solar, grid, tesla }: {vue: VueProductionData[], solar: number, grid: number, tesla: number}) {
    const windowWidth = window.innerWidth;

    // The below stuff is expensive, but we only do it when vue changes

    const link = (source: string, target: string) => {
        return { source: nodes.indexOf(source), target: nodes.indexOf(target), value: valueForDevice(vue, target) };
    }

    const intermediateLinks = (source: string, intermediate: string, targets: string[]) => {
        return [
            {  source: nodes.indexOf(source), target: nodes.indexOf(intermediate), value: valueForMultipleDevices(vue, targets) },
            ...targets.map(target => link(intermediate, target))
        ];
    }

    const gridLink = grid > 0 ? { source: nodes.indexOf("Grid"), target: nodes.indexOf("WingVue"), value: grid } : { source: nodes.indexOf("Solar"), target: nodes.indexOf("Grid"), value: 0 };
    ;

    const wideLinks = windowWidth > 600 ?
        [gridLink, { source: nodes.indexOf("Solar"), target: nodes.indexOf("WingVue"), value: solar }] :
        [];

    const data = {
        nodes: nodes.map(n => ({ name: n })),
        links: [
            ...intermediateLinks("WingVue", "Office", ["NetworkMain", "NetworkOffice", "OfficeDesk", "WorkPC and TV", "Office AC"]),
            ...intermediateLinks("WingVue", "Greenhouse", ["Greenhouse1", "Greenhouse2"]),
            ...intermediateLinks("WingVue", "House", ["A/C", "Kitchen", "Freezer", "Fridge", "Range", "LivingRoomTV", "Washing Machine", "Dishwasher", "HouseMisc1", "HouseMisc2", "Microwave", "PoolPump", "Water Heater", "Well", "Dryer"]),
            ...wideLinks,
            { source: nodes.indexOf("WingVue"), target: nodes.indexOf("Tesla"), value: tesla }
        ]
    };
    
    return (
        <div style={{ width: '100%', height: '600px' }}>
            <Plot
                data={[{
                    type: "sankey",
                    orientation: "h",
                    node: {
                        pad: 15,
                        thickness: 20,
                        line: { width: 0 }, 
                        label: data.nodes.map(n => n.name),
                        hovertemplate: "%{value:.1f}kW<extra></extra>"
                    },
                    link: {
                        source: data.links.map(l => l.source),
                        target: data.links.map(l => l.target),
                        value: data.links.map(l => l.value),
                        color: "rgba(53, 154, 255, 0.3)",
                        hovertemplate: "%{value:.1f}kW<extra></extra>"
                    }
                }]}
                layout={{
                    font: { size: 10 },
                    width: Math.max(windowWidth - 100, 700),
                    paper_bgcolor: 'transparent',
                    plot_bgcolor: 'transparent'
                }}
                config={{ responsive: true }}
            />
        </div>
    );
}

function valueForDevice(vue: VueProductionData[], device: string) {
    return vue.find(v => v.device_name === device)?.usage ?? 0;
}

function valueForMultipleDevices(vue: VueProductionData[], devices: string[]) {
    return devices.reduce((sum, device) => sum + valueForDevice(vue, device), 0);
}