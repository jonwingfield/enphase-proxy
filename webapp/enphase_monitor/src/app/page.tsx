"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { useGlobalState } from "./components/GlobalStateContext";
import { _capitalize } from "chart.js/helpers";
import Summary from "./components/summary";

export default function Home() {
  const [autoRefresh, setAutoRefresh] = useState(true);
  const { globalState } = useGlobalState();

  useEffect(() => {
    function handleVisibilityChange() {
      if (document.hidden) {
        setAutoRefresh(false);
      } else {
        setAutoRefresh(true);
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  return (
    <>
        <header className={styles.header}>
            <div className={styles.headerLeft}>
                <h1>Powerflow</h1>
                <h4 className={`status-${globalState.energyState == 'importing' ? 'warning' : 'ok'}`}>{_capitalize(globalState.energyState)}</h4>
            </div>
            <div className={styles.headerRight}>
                <button className={`${styles.autoRefreshButton} ${autoRefresh ? "status-ok" : "status-warning"}`} onClick={() => setAutoRefresh(!autoRefresh)}>{autoRefresh ? "Stop" : "Start"} Auto Refresh</button>
            </div>
        </header>

        <Summary />

    </>
  );
}

