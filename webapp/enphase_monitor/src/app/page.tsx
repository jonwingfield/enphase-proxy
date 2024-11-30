"use client";

import { useEffect, useState } from "react";
import Panels from "./components/panels";
import Production from "./components/production";
import styles from "./page.module.css";
import Settings from "./components/settings";

export default function Home() {
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [ratePerKWHUnder1000, setRatePerKWHUnder1000] = useState(13.77);
  const [ratePerKWHOver1000, setRatePerKWHOver1000] = useState(15.74);
  const [selectedTab, setSelectedTab] = useState("production");

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
    <div className={styles.page}>
      <main className={styles.main}>
        <header className={styles.header}>
            <button className={`${styles.autoRefreshButton} ${autoRefresh ? styles.active : ""}`} onClick={() => setAutoRefresh(!autoRefresh)}>{autoRefresh ? "Stop" : "Start"} Auto Refresh</button>
        </header>

        <h1>Enphase Monitor</h1>
        <Production autoRefresh={autoRefresh} visible={selectedTab === "production"}
            ratePerKWHUnder1000={ratePerKWHUnder1000} ratePerKWHOver1000={ratePerKWHOver1000} />
        {selectedTab === "panels" && <Panels autoRefresh={autoRefresh} />}
        {selectedTab === "settings" && <Settings ratePerKWHUnder1000={ratePerKWHUnder1000} ratePerKWHOver1000={ratePerKWHOver1000}
            setRatePerKWHUnder1000={setRatePerKWHUnder1000} setRatePerKWHOver1000={setRatePerKWHOver1000} />}
      </main>
      <footer className={styles.footer}>
        <div>
            <a href="#" onClick={() => setSelectedTab("production")}>Production</a>
        </div>
        <div>
            <a href="#" onClick={() => setSelectedTab("panels")}>Panels</a>
        </div>
        <div>
            <a href="#" onClick={() => setSelectedTab("settings")}>Settings</a>
        </div>
      </footer>
    </div>
  );
}

