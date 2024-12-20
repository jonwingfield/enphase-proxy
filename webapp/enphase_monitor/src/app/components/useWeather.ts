import { useEffect, useState } from "react";
import { getWeather, WeatherData } from "@/service/weather";

export function useWeather() {
    const [weather, setWeather] = useState<WeatherData | null>(null);

    useEffect(() => {
        getWeather().then(setWeather);
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => getWeather().then(setWeather), 30*1000 /* 30 seconds */);
        return () => clearTimeout(timeout);
    }, [weather]);

    return {
        weather,
    }
}

export function isWeatherAlert(weather: WeatherData) {
    return weather.tempf < 52 || weather.tempf > 93;
}