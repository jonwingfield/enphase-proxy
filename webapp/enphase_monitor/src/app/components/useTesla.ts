import { getTeslaChargesToday, TeslaState } from "@/service/tesla";

import { useState } from "react";

import { getTeslaState } from "@/service/tesla";
import { useEffect } from "react";

export function useTesla() {
    const [tesla, setTesla] = useState<TeslaState | null>(null);
    const [teslaChargesToday, setTeslaChargesToday] = useState<number | null>(null);

    useEffect(() => {
        getTeslaState().then(setTesla);
        getTeslaChargesToday().then(setTeslaChargesToday);
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => getTeslaState().then(setTesla), 30*1000 /* 30 seconds */);
        return () => clearTimeout(timeout);
    }, [tesla]);

    useEffect(() => {
        const timeout = setTimeout(() => getTeslaChargesToday().then(setTeslaChargesToday), 5*60*1000 /* 5 minutes */);
        return () => clearTimeout(timeout);
    }, [teslaChargesToday]);

    return {
        tesla,
        teslaChargesToday,
    };
}