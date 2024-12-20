import { getVueProduction, getVueProductionKwh, VueProductionData } from "@/service/vue";
import { useEffect, useState } from "react";

export function useVue() {
    const [vue, setVue] = useState<VueProductionData[] | null>(null);
    const [vueKwh, setVueKwh] = useState<VueProductionData[] | null>(null);

    useEffect(() => {
        getVueProduction().then(setVue);
        getVueProductionKwh().then(setVueKwh);
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => getVueProduction().then(setVue), 30*1000 /* 30 seconds */);
        return () => clearTimeout(timeout);
    }, [vue]);

    useEffect(() => {
        const timeout = setTimeout(() => getVueProductionKwh().then(setVueKwh), 5*60*1000 /* 5 minutes */);
        return () => clearTimeout(timeout);
    }, [vueKwh]);

    console.log(vueKwh);

    return {
        vue,
        vueKwh,
    };
}

export function calculateGreenhouseUsage(vue: VueProductionData[] | null) {
    return vue?.filter(v => v.device_name.includes('Greenhouse'))?.reduce((sum, v) => sum + v.usage, 0);
}