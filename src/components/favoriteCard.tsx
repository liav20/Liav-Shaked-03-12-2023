import { useEffect, useState } from "react";
import { CurrentWeatherApiType } from "~/redux/types/currentWeatherApiType";
import { api } from "~/utils/api";

type favoriteCardProps = {
    city: string;
    cityKey: string;
}


export default function FavoriteCard({ city, cityKey }: favoriteCardProps) {
    const currentWeather = api.weather.currentWeather.useQuery({ cityKey: cityKey });
    return (
        <div>
            <h4>{city}</h4>
            {currentWeather.data &&
            <div>
            <p>{currentWeather.data[0]?.Temperature.Metric.Value}</p>
            <p>{currentWeather.data[0]?.WeatherText}</p>
            </div>
            }
        </div>
    )
}