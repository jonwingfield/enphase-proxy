"use client";
import Production from "../components/production";
import { useGlobalState } from "../components/GlobalStateContext";
import styles from "./production.module.css";
import { NavBar } from "../components/navBar";
import { useRouter } from "next/navigation";

export default function ProductionPage() {
    const { globalState } = useGlobalState();
    const router = useRouter();

    return <div className={styles.production}>
        <div className={styles.header}>
            <NavBar title="Production" backClicked={() => router.back()} />
        </div>
        <div className={styles.content}>
            <Production autoRefresh={globalState.autoRefresh} visible
                ratePerKWHUnder1000={globalState.ratePerKWHUnder1000} ratePerKWHOver1000={globalState.ratePerKWHOver1000} />
        </div>
    </div>;
}
