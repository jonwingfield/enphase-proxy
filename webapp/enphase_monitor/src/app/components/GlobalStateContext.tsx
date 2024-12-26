"use client";

import { WeatherData } from "@/service/weather";
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

export interface GlobalState {
    ratePerKWHUnder1000: number;
    ratePerKWHOver1000: number;
    autoRefresh: boolean;
    weather: WeatherData | null;
    energyState: "importing" | "exporting" | "idle" | "charging" | "discharging";
    source: "home" | "office";
    batt_percent: number;
    teslaState: 'pluggedIn' | 'charging' | 'unplugged' | 'notHome';
    billingCycleStartDate: string;
}

const DefaultGlobalState: GlobalState = {
    ratePerKWHUnder1000: 13.77,
    ratePerKWHOver1000: 15.74,
    autoRefresh: true,
    weather: null,
    energyState: "idle",
    source: "home",
    batt_percent: 0,
    teslaState: 'unplugged',
    billingCycleStartDate: "2024-11-28",
};

export const GlobalStateContext = createContext<{
    globalState: GlobalState;
    setGlobalState: Dispatch<SetStateAction<GlobalState>>;
}>({
    globalState: DefaultGlobalState,
    setGlobalState: () => {},
});

export function useGlobalState() {
    return useContext(GlobalStateContext);
}

export function GlobalStateProvider({ children }: { children: React.ReactNode }) {
    const [globalState, setGlobalState] = useState<GlobalState>(DefaultGlobalState);

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