"use client";
import { useGlobalState, getBillingCycleDays, UtilityRateInfo } from "./GlobalStateContext";
import styles from "./settings.module.css";
import { addDays, format, parse } from "date-fns";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface SettingsProps {   
}

export default function Settings({ }: SettingsProps) {
    const { globalState, setGlobalState } = useGlobalState();

    const handleDateChange = (index: number, newDate: string) => {
        const prevDate = index > 0 ? parse(globalState.billingCycleDates[index - 1], 'yyyy-MM-dd', new Date()) : null;
        const nextDate = index < globalState.billingCycleDates.length - 1 ? parse(globalState.billingCycleDates[index + 1], 'yyyy-MM-dd', new Date()) : null;
        const newDateObj = parse(newDate, 'yyyy-MM-dd', new Date());

        if ((prevDate && newDateObj <= prevDate) || (nextDate && newDateObj >= nextDate)) {
            return; // Invalid date, don't update
        }

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

    const handleRateChange = (date: string, field: keyof UtilityRateInfo, value: number) => {
        const newRates = { ...globalState.billingRates };
        newRates[date] = {
            ...((newRates[date] || {
                ratePerKWHUnder1000: 0,
                ratePerKWHOver1000: 0
            }) as UtilityRateInfo),
            [field]: value
        };
        setGlobalState({ ...globalState, billingRates: newRates });
    };

    const enableRates = (date: string) => {
        // Find the most recent rates before this date
        const previousDate = globalState.billingCycleDates
            .slice(0, globalState.billingCycleDates.indexOf(date))
            .reverse()
            .find(d => globalState.billingRates[d]);

        const defaultRates = previousDate 
            ? globalState.billingRates[previousDate]
            : { ratePerKWHUnder1000: 0, ratePerKWHOver1000: 0 };

        const newRates = { ...globalState.billingRates };
        newRates[date] = defaultRates;
        setGlobalState({ ...globalState, billingRates: newRates });
    };

    return <div>
        <h2>Settings</h2>
        <div className={styles.billingDates}>
            <h3>Billing Cycle Dates and Rates</h3>
            {globalState.billingCycleDates.map((date, index) => (
                <div key={index} className={styles.setting}>
                    <input 
                        type="date" 
                        className={styles.dateInput}
                        value={date}
                        onChange={(e) => handleDateChange(index, e.target.value)}
                    />
                    {getBillingCycleDays(globalState.billingCycleDates, index) !== null && 
                        <span className={styles.cycleDays}>
                            ({getBillingCycleDays(globalState.billingCycleDates, index)} days)
                        </span>
                    }
                    {globalState.billingRates[date] ? (
                        <div className={styles.rateInputs}>
                            <label>
                                Rate under 1000 kWh:
                                <input
                                    type="text"
                                    value={globalState.billingRates[date]?.ratePerKWHUnder1000 || ''}
                                    onChange={(e) => handleRateChange(date, 'ratePerKWHUnder1000', parseFloat(e.target.value))}
                                />
                            </label>
                            <label>
                                Rate over 1000 kWh:
                                <input
                                    type="text"
                                    value={globalState.billingRates[date]?.ratePerKWHOver1000 || ''}
                                    onChange={(e) => handleRateChange(date, 'ratePerKWHOver1000', parseFloat(e.target.value))}
                                />
                            </label>
                        </div>
                    ) : (
                        <button 
                            className={styles.addRatesButton}
                            onClick={() => enableRates(date)}
                            title="Add rates for this billing cycle"
                        >
                            <svg width="16" height="16" viewBox="0 0 16 16">
                                <path d="M8 0a8 8 0 100 16A8 8 0 008 0zm0 14A6 6 0 118 2a6 6 0 010 12zm3-7H9V5a1 1 0 00-2 0v2H5a1 1 0 000 2h2v2a1 1 0 002 0V9h2a1 1 0 000-2z" fill="currentColor"/>
                            </svg>
                        </button>
                    )}
                </div>
            ))}
            <button onClick={addNewDate} className={styles.addButton}>
                Add Next Billing Date
            </button>
        </div>
    </div>;
}