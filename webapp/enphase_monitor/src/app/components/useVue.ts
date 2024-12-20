import { getVueProduction, VueProductionData } from "@/service/vue";
import { useEffect, useState } from "react";

export function useVue() {
    const [vue, setVue] = useState<VueProductionData[] | null>(null);

    useEffect(() => {
        getVueProduction().then(setVue);
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => getVueProduction().then(setVue), 30*1000 /* 30 seconds */);
        return () => clearTimeout(timeout);
    }, [vue]);

    return {
        vue,
    };
}

export function calculateGreenhouseUsage(vue: VueProductionData[] | null) {
    return vue?.filter(v => v.device_name.includes('Greenhouse'))?.reduce((sum, v) => sum + v.usage, 0);
}