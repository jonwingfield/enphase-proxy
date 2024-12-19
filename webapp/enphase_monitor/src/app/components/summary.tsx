
import styles from "./summary.module.css";

export default function Summary() {
    return (
        <main className={styles.summary}>
            <div className={styles.statusModules}>
                <svg width="200" height="210" className={styles.powerFlowSolar}>
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="-100%" x2="0%" y2="0%">
                            <stop offset="0%" style={{ stopColor: "#646464", stopOpacity: 1 }} />
                            <stop offset="25%" style={{ stopColor: "#646464", stopOpacity: 1 }} />
                            <stop offset="99%" style={{ stopColor: "yellow", stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: "#646464", stopOpacity: 1 }} />
                            <animate attributeName="y1" values="-100%;100%;" dur="2s" repeatCount="indefinite" />
                            <animate attributeName="y2" values="0%;200%;" dur="2s" repeatCount="indefinite" />
                        </linearGradient>
                    </defs>
                    <path className={styles.powerFlow3d} d="M 6 4 Q 27 20, 27 50 L 27 120" />
                    <path className={styles.powerFlowPath} d="M 8 3 Q 30 20, 30 50 L 30 119" stroke-linecap="round" />
                    <path className={styles.powerFlowGradient} d="M 8 3 Q 30 20, 30 50 L 30 119" stroke-linecap="round" />
                </svg>
                <div className={`${styles.statusModule} ${styles.solar}`}>
                    <h5>4.5 kW</h5>
                    <small className={styles.small}>Solar</small>
                </div>
                <svg width="400" height="210" className={styles.powerFlowHome}>
                    <defs>
                        <linearGradient id="gradient2" x1="-100%" y1="0%" x2="0%" y2="-25%">
                            <stop offset="0%" style={{ stopColor: "#646464", stopOpacity: 1 }} />
                            <stop offset="25%" style={{ stopColor: "#646464", stopOpacity: 1 }} />
                            <stop offset="99%" style={{ stopColor: "yellow", stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: "#646464", stopOpacity: 1 }} />
                            <animate attributeName="x1" values="-100%;100%;" dur="2s" repeatCount="indefinite" />
                            <animate attributeName="x2" values="0%;200%;" dur="2s" repeatCount="indefinite" />
                        </linearGradient>
                    </defs>
                    <path className={styles.powerFlow3d} d="M 9 103 L 100 65" stroke-linecap="round" />
                    <path className={styles.powerFlowPath} d="M 8 100 L 100 62" stroke-linecap="round" />
                    <path className={styles.powerFlowGradient2} d="M 8 100 L 100 62" />
                </svg>
                <div className={`${styles.statusModule} ${styles.home}`}>
                    <h5>1.3 kW</h5>
                    <small className={styles.small}>Home</small>
                </div>
                <svg width="400" height="210" className={styles.powerFlowGrid}>
                    <defs>
                        <linearGradient id="gradient" x1="-100%" y1="-100%" x2="0%" y2="0%">
                            <stop offset="0%" style={{ stopColor: "#646464", stopOpacity: 1 }} />
                            <stop offset="25%" style={{ stopColor: "#646464", stopOpacity: 1 }} />
                            <stop offset="99%" style={{ stopColor: "yellow", stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: "#646464", stopOpacity: 1 }} />
                            <animate attributeName="y1" values="-100%;100%;" dur="2s" repeatCount="indefinite" />
                            <animate attributeName="y2" values="0%;200%;" dur="2s" repeatCount="indefinite" />
                        </linearGradient>
                    </defs>
                    <path className={styles.powerFlow3d} d="M 5 3 L 5 30 Q 8 45, 17 50 L 297 200" />
                    <path className={styles.powerFlowPath} d="M 8 3 L 8 30 Q 8 40, 20 50 L 300 200" />
                    <path className={styles.powerFlowGradient} d="M 8 3 L 8 30 Q 8 40, 20 50 L 300 200" />
                </svg>
                <div className={`${styles.statusModule} ${styles.grid}`}>
                    <h5>1.3 kW</h5>
                    <small className={styles.small}>Grid</small>
                </div>
            </div>
        </main>
    );
}
