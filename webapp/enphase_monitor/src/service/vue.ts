export interface VueProductionData {
    usage: number;
    device_name: string;
}

export async function getVueProduction(): Promise<VueProductionData[] | null> {
    const response = await fetch("/influxdb/query?" + new URLSearchParams({
        db: "energy",
        q: `SELECT last("usage") as "last_usage", "device_name"
            FROM "vue"."autogen"."energy_usage"
            WHERE time > now() - 3m
            GROUP BY "device_name"`
    }));
    const data = await response.json();

    if (data?.results[0]?.series?.length) {
        const results: VueProductionData[] = data?.results[0]?.series.map((series: any) => ({
            usage: series.values[0][1],
            device_name: series.tags.device_name,
        } as VueProductionData));
        results.sort((a,b) => b.usage - a.usage);
        return results;
    } else {
        return null;
    }
}