import { useEffect, useState } from "react";
import { getWeather, WeatherData } from "@/service/weather";

export function useWeather() {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [outdoorWeather, setOutdoorWeather] = useState<WeatherData | null>(null);

    useEffect(() => {
        getWeather('greenhouse').then(setWeather);
        getWeather('outdoor').then(setOutdoorWeather);
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {
            getWeather('greenhouse').then(setWeather);
            getWeather('outdoor').then(setOutdoorWeather);
        }, 30*1000 /* 30 seconds */);
        return () => clearTimeout(timeout);
    }, [weather]);

    return {
        weather,
        outdoorWeather,
    }
}

export function isWeatherAlert(weather: WeatherData) {
    return weather.tempf < 50.5 || weather.tempf > 93;
}