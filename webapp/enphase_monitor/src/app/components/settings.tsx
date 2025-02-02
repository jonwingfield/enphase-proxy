"use client";
import { useGlobalState, getBillingCycleDays } from "./GlobalStateContext";
import styles from "./settings.module.css";
import { addDays, format, parse } from "date-fns";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface SettingsProps {   
}

export default function Settings({ }: SettingsProps) {
    const { globalState, setGlobalState } = useGlobalState();

    const handleDateChange = (index: number, newDate: string) => {
        const newDates = [...globalState.billingCycleDates];
        newDates[index] = newDate;
        setGlobalState({ ...globalState, billingCycleDates: newDates });
    };

    const addNewDate = () => {
        const lastDate = globalState.billingCycleDates[globalState.billingCycleDates.length - 1];
        const nextDate = format(
            addDays(parse(lastDate, 'yyyy-MM-dd', new Date()), 30),
            'yyyy-MM-dd'
        );
        setGlobalState({
            ...globalState,
            billingCycleDates: [...globalState.billingCycleDates, nextDate]
        });
    };

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

        <div className={styles.billingDates}>
            <h3>Billing Cycle Dates</h3>
            {globalState.billingCycleDates.map((date, index) => (
                <div key={index} className={styles.setting}>
                    <input 
                        type="date" 
                        value={date}
                        onChange={(e) => handleDateChange(index, e.target.value)}
                    />
                    {getBillingCycleDays(globalState.billingCycleDates, index) !== null && 
                        <span className={styles.cycleDays}>
                            ({getBillingCycleDays(globalState.billingCycleDates, index)} days)
                        </span>
                    }
                </div>
            ))}
            <button onClick={addNewDate} className={styles.addButton}>
                Add Next Billing Date
            </button>
        </div>
    </div>;
}