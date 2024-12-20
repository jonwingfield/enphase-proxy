"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { useGlobalState } from "./components/GlobalStateContext";
import { _capitalize } from "chart.js/helpers";
import Summary from "./components/summary";

export default function Home() {
  const { globalState, setGlobalState} = useGlobalState();

  useEffect(() => {
    function handleVisibilityChange() {
      if (document.hidden) {
        setGlobalState({ ...globalState, autoRefresh: false });
      } else {
        setGlobalState({ ...globalState, autoRefresh: true });
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  const setSource = (source: "home" | "office") => {
    setGlobalState({ ...globalState, source });
  }

  return (
    <>
        <header className={styles.header}>
            <div className={styles.headerLeft}>
                <h1>Powerflow</h1>
                {globalState.source === 'home' &&
                    <h5 className={`status-${globalState.energyState == 'exporting' ? 'ok' : 'warning'}`}>{globalState.energyState !== 'idle' ? _capitalize(globalState.energyState) : <>&nbsp;</>}</h5>
                }

                {globalState.source === 'office' &&
                      <h5>
                          <svg width="24" height="12" viewBox="0 0 24 12" className={styles.batteryLevelIcon}>
                              <rect x="0" y="1" width="20" height="10" rx="2" ry="2" fill="currentColor" stroke="currentColor" strokeWidth="1" />
                              <rect x="21" y="3" width="1" height="6" fill="currentColor" />
                              <rect x="21" y="3" width="2" height="6" rx="2" ry="2" fill="currentColor" />
                              <rect x="1" y="2" width={`${globalState.batt_percent * 16 / 100}`} height="8" rx="1.5" ry="1.5" fill="#00d0a6" />
                          </svg> &nbsp;
                          {globalState.batt_percent}% &middot; <span className={`status-${globalState.energyState === 'charging' ? 'ok' : 'warning'}`}>{globalState.energyState === 'charging' ? 'Charging' : 'Discharging'}</span> 
                      </h5>
                  }
            </div>
            <div className={styles.headerRight}>
                <button className={`${styles.autoRefreshButton} status-ok`} onClick={() => setSource(globalState.source === "home" ? "office" : "home")}>{globalState.source === "home" ? "Home" : "Office"}</button>
            </div>
        </header>

        <Summary />

    </>
  );
}

