import { useState } from "react";
import { useEffect } from "react";

export function useAsyncState<T>(asyncFunction: () => Promise<T>, dependencies: any[]): [T | undefined, boolean, Error | null] {
    const [state, setState] = useState<T | undefined>(undefined);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        setLoading(true);
        asyncFunction().then(setState).catch(setError).finally(() => setLoading(false));
    }, dependencies);

    return [state, loading, error];
}