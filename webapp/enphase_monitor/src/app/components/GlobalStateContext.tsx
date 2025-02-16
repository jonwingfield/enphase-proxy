"use client";

import { WeatherData } from "@/service/weather";
import { isBefore, parse, subDays, differenceInDays } from "date-fns";
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { format } from "date-fns";

export interface UtilityRateInfo {
    ratePerKWHUnder1000: number;
    ratePerKWHOver1000: number;
}

export interface GlobalState {
    autoRefresh: boolean;
    weather: WeatherData | null;
    energyState: "importing" | "exporting" | "idle" | "charging" | "discharging";
    source: "home" | "office";
    batt_percent: number;
    teslaState: 'pluggedIn' | 'charging' | 'unplugged' | 'notHome';
    billingCycleDates: string[];
    billingRates: Record<string, UtilityRateInfo>;
}

const DefaultGlobalState: GlobalState = {
    // ratePerKWHUnder1000: 13.77,
    // ratePerKWHOver1000: 15.74,
    autoRefresh: true,
    weather: null,
    energyState: "idle",
    source: "home",
    batt_percent: 0,
    teslaState: 'unplugged',
    /** Must be sorted in ascending order */
    billingCycleDates: ["2024-10-31", "2024-11-28", "2024-12-31", "2025-01-31", "2025-02-28", "2025-03-31", "2025-04-30", "2025-05-31", "2025-06-30", "2025-07-31", "2025-08-31", "2025-09-30", "2025-10-31", "2025-11-30", "2025-12-31"],
    billingRates: {
        "2024-10-31": {
            ratePerKWHUnder1000: 13.77,
            ratePerKWHOver1000: 15.74,
        },
        "2024-11-28": {
            ratePerKWHUnder1000: 14.859,
            ratePerKWHOver1000: 17.098,
        },
        "2024-12-31": {
            ratePerKWHUnder1000: 13.82,
            ratePerKWHOver1000: 16.318,
        },
        "2025-02-28": {
            ratePerKWHUnder1000: 15.901,
            ratePerKWHOver1000: 17.707,
        },
    },
};

export const GlobalStateContext = createContext<{
    globalState: GlobalState;
    setGlobalState: Dispatch<SetStateAction<GlobalState>>;
}>({
    globalState: DefaultGlobalState,
    setGlobalState: () => {},
});

// console.log(GlobalStateContext);

export function useGlobalState() {
    return useContext(GlobalStateContext);
}

export function GlobalStateProvider({ children }: { children: React.ReactNode }) {
    const [globalState, setGlobalState] = useState<GlobalState>(DefaultGlobalState);

    useEffect(() => {
        // localStorage.setItem("globalState", JSON.stringify(globalState));
    }, [globalState]);

    return <GlobalStateContext.Provider value={{ globalState, setGlobalState }}>{children}</GlobalStateContext.Provider>;
}

export function getBillingRate(globalState: GlobalState, date: Date = new Date()): UtilityRateInfo {
    const dateStr = format(date, 'yyyy-MM-dd');
    
    // Find closest previous date with rates
    const closestPreviousDate = globalState.billingCycleDates
        .filter(date => date <= dateStr)
        .reverse()
        .find(date => globalState.billingRates[date]);
        
    return closestPreviousDate 
        ? globalState.billingRates[closestPreviousDate]
        : Object.values(globalState.billingRates)[0];
}

export function calculateCost(globalState: GlobalState, totalInWh: number) {
    const rates = getBillingRate(globalState, new Date());
    
    if (!rates) {
        return "0.00";
    }

    const totalInKWh = totalInWh / 1000;
    if (totalInWh === 0) {
        return "0.00";
    } else if (totalInKWh < 1000) {
        return ((rates.ratePerKWHUnder1000 / 100) * totalInKWh).toFixed(2);
    } else {
        return (((rates.ratePerKWHOver1000 / 100) * (totalInKWh - 1000)) + 
            ((rates.ratePerKWHUnder1000 / 100) * 1000)).toFixed(2);
    }
}

export function getBillingCycleStartDate(globalState: GlobalState, forDate: Date) {
    const billingCycleDates = globalState.billingCycleDates.filter(billDate => isBefore(parse(billDate, 'yyyy-MM-dd', new Date()), forDate));
    const lastBillingDateString = billingCycleDates.slice(-1)[0];
    
    if (lastBillingDateString === undefined) {
        return [forDate, new Date()];
    }

    const lastBillingDate = parse(lastBillingDateString, 'yyyy-MM-dd', new Date());

    const nextBillingDateIndex = globalState.billingCycleDates.indexOf(lastBillingDateString) + 1;
    if (nextBillingDateIndex >= globalState.billingCycleDates.length) {
        return [lastBillingDate, new Date()];
    }

    const nextBillingDate = parse(globalState.billingCycleDates[nextBillingDateIndex], 'yyyy-MM-dd', new Date());

    if (isBefore(new Date(), nextBillingDate)) {
        return [lastBillingDate, new Date()];
    }

    return [lastBillingDate, subDays(nextBillingDate, 1)];
}

export function getBillingCycleDays(billingCycleDates: string[], endDateIndex: number) {
    if (endDateIndex > billingCycleDates.length - 1 || endDateIndex < 1) return null;
    
    const currentDate = parse(billingCycleDates[endDateIndex - 1], 'yyyy-MM-dd', new Date());
    const nextDate = parse(billingCycleDates[endDateIndex], 'yyyy-MM-dd', new Date());
    
    return differenceInDays(nextDate, currentDate);
}
