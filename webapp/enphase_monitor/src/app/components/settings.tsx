"use client";
import { useGlobalState } from "./GlobalStateContext";
import styles from "./settings.module.css";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface SettingsProps {   
}

export default function Settings({ }: SettingsProps) {
    const { globalState, setGlobalState } = useGlobalState();

    return <div>
        <h2>Settings</h2>
        <div className={styles.setting}>
            <label>Rate per kWh under 1000 kWh: </label>
            <input type="text" value={globalState.ratePerKWHUnder1000} onChange={(e) => setGlobalState({ ...globalState, ratePerKWHUnder1000: parseFloat(e.target.value) })} />
        </div>
        <div className={styles.setting}>
            <label>Rate per kWh over 1000 kWh: </label>
            <input type="text" value={globalState.ratePerKWHOver1000} onChange={(e) => setGlobalState({ ...globalState, ratePerKWHOver1000: parseFloat(e.target.value) })} />
        </div>
    </div>;
}