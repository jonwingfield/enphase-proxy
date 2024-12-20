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
            device_name: correctDeviceName(series.tags.device_name),
        } as VueProductionData));
        results.sort((a,b) => b.usage - a.usage);
        return results;
    } else {
        return null;
    }
}

export async function getVueProductionKwh(): Promise<VueProductionData[] | null> {
    const startOfDay = new Date().setHours(0, 0, 0, 0);
    const response = await fetch("/influxdb/query?" + new URLSearchParams({
        db: "energy",
        q: `SELECT last("usage") as "last_usage"
            FROM "vue"."autogen"."energy_usage"
            WHERE time > ${startOfDay * 1000 * 1000}
            GROUP BY "device_name", time(1m)
            fill(previous)`
    }));
    const data = await response.json();
    if (data?.results?.[0]?.series?.length) {
        const results: VueProductionData[] = data?.results?.[0]?.series?.map((series: any) => ({
            usage: series.values.reduce((sum: number, value: any) => sum + value[1], 0) / 60,
            device_name: correctDeviceName(series.tags.device_name),
        } as VueProductionData));
        results.sort((a,b) => b.usage - a.usage);
        return results;
    } else {
        return null;
    }
}

function correctDeviceName(device_name: string) {
    if (device_name === 'WingVue-97') {
        return "Dryer";
    }
    if (device_name === 'WingVue-98') {
        return "A/C";
    }
    return device_name;
}