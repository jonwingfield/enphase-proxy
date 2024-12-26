
import { useEffect, useState } from "react";
import { useGlobalState } from "./GlobalStateContext";
import styles from "./summary.module.css";
import { formatWatt, useProduction } from "./useProduction";
import { isWeatherAlert, useWeather } from "./useWeather";
import { WarningAmber } from "@mui/icons-material";
import { useTesla } from "./useTesla";
import { capitalize } from "@mui/material";
import { calculateGreenhouseUsage, useVue } from "./useVue";
import { Devices } from "./devices";
import { UsageDetails } from "./usageDetails";
import { ThemeColors } from "../theme";

export default function Summary() {
    const { homeProductionData, officeProductionData } = useProduction();
    const { weather, outdoorWeather } = useWeather();
    const { tesla, teslaChargesToday } = useTesla();
    const { vue, vueKwh } = useVue();
    const { globalState, setGlobalState } = useGlobalState();
    const [individualVoltage, setIndividualVoltage] = useState(true);
    const [showHome, setShowHome] = useState(false);
    const [weatherType, setWeatherType] = useState<'greenhouse' | 'outdoor'>('greenhouse');

    const productionData = globalState.source === "home" ? homeProductionData : officeProductionData;

    const solar = productionData && productionData.panel_watts > 0;
    const importingAmount = productionData ? productionData.load_watts - productionData.panel_watts : 0;
    const importing = importingAmount > 0;
    const exporting = !importing;
    const energyState = productionData ? (globalState.source === "home" ? 
        (importing ? "importing" : "exporting") : 
        (importing ? "discharging" : "charging")) : "idle";
    const batt_percent = productionData && 'batt_percent' in productionData ? Math.round(productionData.batt_percent) : 0;
    let teslaState: typeof globalState['teslaState'];
    if (tesla) {
        if (tesla.charging_state === 'Charging') {
            teslaState = 'charging';
        } else if (tesla.charging_state === 'Disconnected') {
            if (tesla.location === 'home') {
                teslaState = 'unplugged';
            } else {
                teslaState = 'notHome';
            }
        } else if (tesla.charging_state === 'Stopped' || tesla.charging_state === 'Complete' || tesla.charging_state === 'Connected') {
            teslaState = 'pluggedIn';
        } else {
            teslaState = 'unplugged';
        }
    } else {
        teslaState = 'unplugged';
    }

    useEffect(() => {
        setGlobalState(globalState => ({ ...globalState, energyState, batt_percent, weather, teslaState }));
    }, [energyState, batt_percent, weather, teslaState, setGlobalState]);

    return (
        <>
        <main className={styles.summary}>
            <div className="picture-container">
            <div className={`picture ${teslaState === 'unplugged' ? 'unplugged' : teslaState === 'notHome' ? 'nocar' : ''}`}>
                <picture>
                    {/* <source srcSet="/powerflow-light.png" type="image/png" media="(prefers-color-scheme: light)" /> <source srcSet="/powerflow-dark.png" type="image/png" media="(prefers-color-scheme: dark)" /> */}
                    {/* <img src="/powerflow-light.png" alt="Powerflow" /> */}
                </picture>
            <div className={styles.statusModules}>
                <svg width="200" height="210" className={styles.powerFlowSolar}>
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="-100%" x2="0%" y2="0%">
                            <stop offset="0%" style={{ stopColor: "#646464", stopOpacity: 1 }} />
                            <stop offset="25%" style={{ stopColor: "#646464", stopOpacity: 1 }} />
                            <stop offset="99%" style={{ stopColor: ThemeColors.production, stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: "#646464", stopOpacity: 1 }} />
                            <animate attributeName="y1" values="-100%;100%;" dur="2s" repeatCount="indefinite" />
                            <animate attributeName="y2" values="0%;200%;" dur="2s" repeatCount="indefinite" />
                        </linearGradient>
                    </defs>
                    <path className={styles.powerFlow3d} d="M 6 4 Q 28 20, 28 50 L 28 120" />
                    <path className={styles.powerFlowPath} d="M 8 3 Q 30 20, 30 50 L 30 119" strokeLinecap="round" />
                    {solar && <path className={styles.powerFlowGradient} d="M 8 3 Q 30 20, 30 50 L 30 119" strokeLinecap="round" />}
                </svg>
                {productionData && <div className={`${styles.statusModule} ${styles.solar}`}>
                    <h5>{productionData.panel_watts > 0 ? formatWatt(productionData.panel_watts) : "--"} &middot; {formatWatt(productionData.panel_wh)}h</h5>
                    <small className={styles.small}>Solar</small>
                </div>}
                <svg width="400" height="210" className={styles.powerFlowHome}>
                    <defs>
                        <linearGradient id="gradient2" x1="-100%" y1="0%" x2="0%" y2="-25%">
                            <stop offset="0%" style={{ stopColor: "#646464", stopOpacity: 1 }} />
                            <stop offset="25%" style={{ stopColor: "#646464", stopOpacity: 1 }} />
                            <stop offset="99%" style={{ stopColor: solar ? ThemeColors.production : (globalState.source === 'home' ? "#a6a6a6" : ThemeColors.powerwall), stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: "#646464", stopOpacity: 1 }} />
                            <animate attributeName="x1" values="-100%;100%;" dur="2s" repeatCount="indefinite" />
                            <animate attributeName="x2" values="0%;200%;" dur="2s" repeatCount="indefinite" />
                        </linearGradient>
                        <linearGradient id="gradientGrid" x1="-100%" y1="0%" x2="0%" y2="-25%">
                            <stop offset="0%" style={{ stopColor: "#646464", stopOpacity: 1 }} />
                            <stop offset="25%" style={{ stopColor: "#646464", stopOpacity: 1 }} />
                            <stop offset="99%" style={{ stopColor: globalState.source === "home" ? "#a6a6a6" : ThemeColors.powerwall, stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: "#646464", stopOpacity: 1 }} />
                            <animate attributeName="x1" values="-100%;100%;" dur="2s" repeatCount="indefinite" />
                            <animate attributeName="x2" values="0%;200%;" dur="2s" repeatCount="indefinite" />
                        </linearGradient>
                    </defs>
                    <path className={styles.powerFlow3d} d="M 8 101 L 100 63" strokeLinecap="round" />
                    <path className={styles.powerFlowPath} d="M 8 100 L 100 62" strokeLinecap="round" />
                    <path className={styles.powerFlowGradient2} d="M 8 100 L 100 62" />
                    {solar && importing &&
                        <>
                            <path className={styles.powerFlow3d} d="M 8 108 L 100 70" strokeLinecap="round" />
                            <path className={styles.powerFlowPath} d="M 8 107 L 100 69" strokeLinecap="round" />
                            <path className={styles.powerFlowGradientGrid} d="M 8 107 L 100 69" />
                        </>
                    }
                </svg>
                {productionData && <div className={`${styles.statusModule} ${styles.home}`} onClick={globalState.source === "home" ? () => setShowHome(true) : undefined}>
                    <h5>{formatWatt(productionData.load_watts)} &middot; {formatWatt(productionData.load_wh)}h</h5>
                    <small className={styles.small}>{capitalize(globalState.source)}</small>
                </div>}
                {productionData && ('grid_wh' in productionData) &&
                <>
                    <svg width="400" height="210" className={styles.powerFlowGrid}>
                        <defs>
                            <linearGradient id="gradientExport" x1="-100%" y1="-100%" x2="0%" y2="0%">
                                <stop offset="0%" style={{ stopColor: "#646464", stopOpacity: 1 }} />
                                <stop offset="25%" style={{ stopColor: "#646464", stopOpacity: 1 }} />
                                <stop offset="99%" style={{ stopColor: ThemeColors.production, stopOpacity: 1 }} />
                                <stop offset="100%" style={{ stopColor: "#646464", stopOpacity: 1 }} />
                                <animate attributeName="y1" values="-100%;100%;" dur="2s" repeatCount="indefinite" />
                                <animate attributeName="y2" values="0%;200%;" dur="2s" repeatCount="indefinite" />
                            </linearGradient>
                        </defs>
                        <defs>
                            <linearGradient id="gradientImport" x1="0%" y1="100%" x2="0%" y2="0%">
                                <stop offset="0%" style={{ stopColor: "#646464", stopOpacity: 1 }} />
                                <stop offset="25%" style={{ stopColor: "#646464", stopOpacity: 1 }} />
                                <stop offset="99%" style={{ stopColor: "#a6a6a6", stopOpacity: 1 }} />
                                <stop offset="100%" style={{ stopColor: "#646464", stopOpacity: 1 }} />
                                <animate attributeName="y1" values="200%;0%;" dur="2s" repeatCount="indefinite" />
                                <animate attributeName="y2" values="100%;-100%;" dur="2s" repeatCount="indefinite" />
                            </linearGradient>
                        </defs>
                        <path className={styles.powerFlow3d} d="M 5 3 L 5 30 Q 8 45, 17 50 L 297 200" />
                        <path className={styles.powerFlowPath} d="M 8 3 L 8 30 Q 8 40, 20 50 L 300 200" />
                        {exporting && <path className={styles.powerFlowGradientExport} d="M 8 3 L 8 30 Q 8 40, 20 50 L 300 200" />}
                        {importing && <path className={styles.powerFlowGradientImport} d="M 8 3 L 8 30 Q 8 40, 20 50 L 300 200" />}
                    </svg>

                    <div className={`${styles.statusModule} ${styles.grid}`}>
                        <h5>{formatWatt(productionData.grid_watts)} &middot; {formatWatt(productionData.grid_wh)}h</h5>
                        <small className={styles.small}>Grid</small>
                    </div>
                </>
                }
                {globalState.source === "office" && officeProductionData &&
                    <div className={`${styles.statusModule} ${styles.powerwall}`} onClick={() => setIndividualVoltage(i => !i)} role="button">
                        <h5>{formatWatt(-officeProductionData.batt_watts)} &middot; {formatWatt(officeProductionData.batt_wh)}h</h5>
                        <h5>{Math.round(officeProductionData.batt_percent)}% &middot; {(officeProductionData.batt_v / (individualVoltage ? 4 : 1)).toFixed(2)}V</h5>
                        <small className={styles.small}>Powerwall</small>
                    </div>
                }
                {weather && <div className={`${styles.statusModule} ${styles.weather}`} onClick={() => setWeatherType(type => type === 'greenhouse' ? 'outdoor' : 'greenhouse')}>
                    <h5 className={isWeatherAlert(weather) ? styles.weatherAlert : undefined}>
                        {weatherType === 'greenhouse' ? weather.tempf.toFixed(0) : outdoorWeather?.tempf.toFixed(0)}°F&nbsp;
                        {isWeatherAlert(weather) && (
                            <WarningAmber fontSize="inherit" className={styles.weatherAlertIcon} />
                        )}
                    </h5>
                    <h5 className={styles.weatherTempRange}>{weatherType === 'greenhouse' ? weather.minTempf.toFixed(0) : outdoorWeather?.minTempf.toFixed(0)}°F - {weatherType === 'greenhouse' ? weather.maxTempf.toFixed(0) : outdoorWeather?.maxTempf.toFixed(0)}°F</h5>
                    {vue && <h5>{formatWatt(calculateGreenhouseUsage(vue) ?? 0)} &middot; {formatWatt(calculateGreenhouseUsage(vueKwh) ?? 0)}h</h5>}
                    <small className={styles.small}>{weatherType === 'greenhouse' ? 'Greenhouse' : 'Outdoor'}</small>
                </div>}
                {tesla &&
                <>
                    {(teslaState === 'pluggedIn' || teslaState === 'charging') && <svg width="60" height="60" className={styles.powerFlowTesla}>
                        <defs>
                            <linearGradient id="gradientTesla" x1="100%" y1="0%" x2="0%" y2="0%">
                                <stop offset="0%" style={{ stopColor: "#646464", stopOpacity: 1 }} />
                                <stop offset="25%" style={{ stopColor: "#646464", stopOpacity: 1 }} />
                                <stop offset="80%" style={{ stopColor: "#ffffff", stopOpacity: 1 }} />
                                <stop offset="100%" style={{ stopColor: "#646464", stopOpacity: 1 }} />
                                <animate attributeName="x1" values="200%;0%;" dur="2s" repeatCount="indefinite" />
                                <animate attributeName="x2" values="100%;-100%;" dur="2s" repeatCount="indefinite" />
                            </linearGradient>
                        </defs>
                        <path className={styles.powerFlowPathTesla} d="M 30 10 Q 25 56, 5 3" strokeLinecap="round" />
                        {tesla.charge_rate > 0 && <path className={styles.powerFlowGradientTesla} d="M 30 10 Q 23 56, 5 3" strokeLinecap="round" />}
                        {/* {tesla.charge_rate > 0 && <path className={styles.powerFlowGradientTesla} d="M 8 3 Q 30 20, 30 50 L 30 119" strokeLinecap="round" />} */}
                    </svg>
                    }

                    <div className={`${styles.statusModule} ${styles.tesla}`} onClick={() => window.open('tessie://home', '_blank')}>
                        {teslaState === 'charging' && <h5>{(tesla.charger_actual_current * tesla.charger_voltage / 1000).toFixed(1)}kW &middot; {tesla.charge_rate}mi/hr</h5>}
                        <h5>
                            <svg width="24" height="12" viewBox="0 0 24 12" className={styles.batteryLevelIcon}>
                                <rect x="0" y="1" width="20" height="10" rx="2" ry="2" fill="currentColor" stroke="currentColor" strokeWidth="1" />
                              <rect x="21" y="3" width="1" height="6" fill="currentColor" />
                              <rect x="21" y="3" width="2" height="6" rx="2" ry="2" fill="currentColor" />
                              <rect x="1.5" y="2" width={`${tesla.battery_level * 16 / 100}`} height="8" rx="1.5" ry="1.5" fill="#00d0a6" />
                          </svg>
                          {tesla.battery_level}% &middot; {formatWatt(teslaChargesToday ?? 0)}h
                        </h5>
                        <small className={styles.small}>Tesla</small>
                    </div>
                </>
                }
            </div>
            <div className="fade"> </div>
            </div>
            </div>
            <UsageDetails productionData={productionData} />
        </main>

        {showHome && vue && productionData && 'grid_wh' in productionData &&
        <Devices backClicked={() => setShowHome(false)} vue={vue} 
            vueKwh={vueKwh ?? []} 
            solar={productionData?.panel_watts ?? 0} 
            grid={productionData?.load_watts ?? 0} 
            solarKwh={productionData?.panel_wh ?? 0} 
            gridKwh={productionData?.grid_wh ?? 0}
            tesla={tesla ? (tesla.charger_actual_current * tesla.charger_voltage) : 0} 
            teslaKwh={teslaChargesToday ?? 0} />
        }
        </>
    );
}
