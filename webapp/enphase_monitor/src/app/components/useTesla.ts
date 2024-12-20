import { TeslaState } from "@/service/tesla";

import { useState } from "react";

import { getTeslaState } from "@/service/tesla";
import { useEffect } from "react";

export function useTesla() {
    const [tesla, setTesla] = useState<TeslaState | null>(null);

    useEffect(() => {
        getTeslaState().then(setTesla);
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => getTeslaState().then(setTesla), 30*1000 /* 30 seconds */);
        return () => clearTimeout(timeout);
    }, [tesla]);

    return {
        tesla,
    };
}