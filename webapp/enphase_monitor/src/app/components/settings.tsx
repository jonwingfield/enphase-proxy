import styles from "./settings.module.css";

interface SettingsProps {   
    ratePerKWHUnder1000: number;
    ratePerKWHOver1000: number;
    setRatePerKWHUnder1000: (value: number) => void;
    setRatePerKWHOver1000: (value: number) => void;
}

export default function Settings({ ratePerKWHUnder1000, ratePerKWHOver1000, setRatePerKWHUnder1000, setRatePerKWHOver1000 }: SettingsProps) {
    return <div>
        <h2>Settings</h2>
        <div className={styles.setting}>
            <label>Rate per kWh under 1000 kWh: </label>
            <input type="text" value={ratePerKWHUnder1000} onChange={(e) => setRatePerKWHUnder1000(parseFloat(e.target.value))} />
        </div>
        <div className={styles.setting}>
            <label>Rate per kWh over 1000 kWh: </label>
            <input type="text" value={ratePerKWHOver1000} onChange={(e) => setRatePerKWHOver1000(parseFloat(e.target.value))} />
        </div>
    </div>;
}