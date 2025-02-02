"use client";

import { WeatherData } from "@/service/weather";
import { addDays, addMonths, isBefore, isSameDay, parse, subDays } from "date-fns";
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";

export interface GlobalState {
    ratePerKWHUnder1000: number;
    ratePerKWHOver1000: number;
    autoRefresh: boolean;
    weather: WeatherData | null;
    energyState: "importing" | "exporting" | "idle" | "charging" | "discharging";
    source: "home" | "office";
    batt_percent: number;
    teslaState: 'pluggedIn' | 'charging' | 'unplugged' | 'notHome';
    billingCycleDates: string[];
}

const DefaultGlobalState: GlobalState = {
    // ratePerKWHUnder1000: 13.77,
    // ratePerKWHOver1000: 15.74,
    ratePerKWHUnder1000: 14.859,
    ratePerKWHOver1000: 17.098,
    autoRefresh: true,
    weather: null,
    energyState: "idle",
    source: "home",
    batt_percent: 0,
    teslaState: 'unplugged',
    /** Must be sorted in ascending order */
    billingCycleDates: ["2024-10-31", "2024-11-28", "2024-12-31", "2025-01-30", "2025-02-28", "2025-03-31", "2025-04-30", "2025-05-31", "2025-06-30", "2025-07-31", "2025-08-31", "2025-09-30", "2025-10-31", "2025-11-30", "2025-12-31"],
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
    const [globalState, setGlobalState] = useState<GlobalState>(
        //typeof localStorage !== "undefined" && localStorage.getItem("globalState") ? JSON.parse(localStorage.getItem("globalState")!) : 
        DefaultGlobalState
    );

    // TODO: server side save
    useEffect(() => {
        // localStorage.setItem("globalState", JSON.stringify(globalState));
    }, [globalState]);

    return <GlobalStateContext.Provider value={{ globalState, setGlobalState }}>{children}</GlobalStateContext.Provider>;
}

export function calculateCost(globalState: GlobalState, totalInWh: number) {
    const totalInKWh = totalInWh / 1000;
    if (totalInWh === 0) {
        return 0;
    } else if (totalInKWh < 1000) {
        return ((globalState.ratePerKWHUnder1000 / 100) * totalInKWh ).toFixed(2);
    } else {
        return (((globalState.ratePerKWHOver1000 / 100) * (totalInKWh - 1000)) + 
            ((globalState.ratePerKWHUnder1000 / 100) * 1000)).toFixed(2);
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

export function getBillingCycleEndDate(startDate: Date) {
    const billingCycleEndDate = addDays(startDate, 30);
    return billingCycleEndDate;
}
