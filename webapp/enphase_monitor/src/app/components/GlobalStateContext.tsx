"use client";

import { createContext, useContext, useState } from "react";

export interface GlobalState {
    ratePerKWHUnder1000: number;
    ratePerKWHOver1000: number;
    autoRefresh: boolean;
    energyState: "importing" | "exporting";
}

const DefaultGlobalState: GlobalState = {
    ratePerKWHUnder1000: 13.77,
    ratePerKWHOver1000: 15.74,
    autoRefresh: true,
    energyState: "importing",
};

export const GlobalStateContext = createContext<{
    globalState: GlobalState;
    setGlobalState: (state: GlobalState) => void;
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