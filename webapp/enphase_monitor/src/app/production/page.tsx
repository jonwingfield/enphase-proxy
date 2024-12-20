"use client";
import Production from "../components/production";
import { useGlobalState } from "../components/GlobalStateContext";
import styles from "./production.module.css";

export default function ProductionPage() {
    const { globalState } = useGlobalState();
    return <div className={styles.production}>
        <Production autoRefresh={globalState.autoRefresh} visible
            ratePerKWHUnder1000={globalState.ratePerKWHUnder1000} ratePerKWHOver1000={globalState.ratePerKWHOver1000} />
    </div>;
}
