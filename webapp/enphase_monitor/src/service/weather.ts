export interface WeatherData {
    tempf: number;
    dewpointf: number;
    minTempf: number;
    maxTempf: number;
}

export async function getWeather(): Promise<WeatherData | null> {
    const lastNight9Pm = (new Date().setHours(0, 0, 0, 0) - 3*60*60*1000) * 1000 * 1000;
    const response = await fetch("/influxdb/query?" + new URLSearchParams({
        db: "weather",
        q: `SELECT last("tempf") as tempf, last("dewpointf") as dewpointf, min("tempf") as minTempf, max("tempf") as maxTempf
            FROM "weather"."autogen"."weather" 
            WHERE time > ${lastNight9Pm} and "sensor" = 'greenhouse'`
    }));
    const data = await response.json();
    return data?.results[0]?.series[0].values[0] ? {
        tempf: data.results[0].series[0].values[0][1],
        dewpointf: data.results[0].series[0].values[0][2],
        minTempf: data.results[0].series[0].values[0][3],
        maxTempf: data.results[0].series[0].values[0][4],
    } : null;
}