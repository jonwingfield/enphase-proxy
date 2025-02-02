import { useCallback, useEffect, useRef, useState } from "react";
import { useGlobalState } from "./GlobalStateContext";
import { fetchProductionData, EnphaseProductionData } from "@/service/enphaseProduction";
import { getOfficeProduction, OfficeProductionData } from "@/service/officeProduction";

export interface HomeProductionData {
    panel_watts: number;
    panel_wh: number;
    load_watts: number;
    load_wh: number;
    grid_watts: number;
    grid_wh: number;
}



export function useProduction() {
    const [productionData, setProductionData] = useState<EnphaseProductionData | null>(null);
    const [officeProductionData, setOfficeProductionData] = useState<OfficeProductionData | null>(null);
    const { globalState } = useGlobalState();
    const autoRefreshRef = useRef<boolean>(globalState.autoRefresh);

    const updateProductionData = useCallback(() => {
        if (!autoRefreshRef.current) {
            return;
        }
        fetchProductionData().then(data => {
            setProductionData(data);
        });
    }, []);

    const updateOfficeProductionData = useCallback(() => {
        getOfficeProduction().then(data => {
            setOfficeProductionData(data);
        });
    }, []);

    useEffect(() => {
        if (globalState.autoRefresh) {
            const timeout = setTimeout(() => updateProductionData(), 1000);
            return () => clearTimeout(timeout);
        }
    }, [globalState.autoRefresh, productionData]);

    useEffect(() => {
        if (globalState.autoRefresh && globalState.source === "office") {
            const timeout = setTimeout(() => updateOfficeProductionData(), 1000);
            return () => clearTimeout(timeout);
        }
    }, [globalState.autoRefresh, officeProductionData, globalState.source]);

    const enphaseProductionData = productionData?.production.filter(p => p.type === "eim")[0];
    const enphaseConsumptionData = productionData?.consumption.filter(p => p.measurementType === "total-consumption")[0];

    return { 
        enphaseProductionData,
        enphaseConsumptionData,
        officeRawProductionData: officeProductionData,
        homeProductionData: enphaseProductionData && enphaseConsumptionData ? {
            panel_watts: enphaseProductionData?.wNow,
            panel_wh: enphaseProductionData?.whToday,
            load_watts: enphaseConsumptionData?.wNow,
            load_wh: enphaseConsumptionData?.whToday,
            grid_watts: enphaseConsumptionData?.wNow - enphaseProductionData?.wNow,
            grid_wh: enphaseConsumptionData?.whToday - enphaseProductionData?.whToday,
        } as HomeProductionData : null,
        officeProductionData,
     };
}

export function formatWatt(watt: number, precision?: number, precisionKw?: number) {
    if (precisionKw === undefined) {
        precisionKw = precision === undefined ? 1 : precision;
    }
    if (precision === undefined) {
        precision = 1;
    }

    if (watt === undefined) {
        return "--";
    }
    if (watt >= 1000 || watt <= -1000) {
        return `${(watt / 1000).toFixed(precisionKw)} kW`;
    }
    return `${watt.toFixed(precision)} W`;
}