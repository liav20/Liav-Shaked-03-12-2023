import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCityKey, setCityName } from "~/redux/slices/weatherSlice";
import { CurrentWeatherApiType } from "~/redux/types/currentWeatherApiType";
import { api } from "~/utils/api";

type favoriteCardProps = {
    city: string;
    cityKey: string;
}


export default function FavoriteCard({ city, cityKey }: favoriteCardProps) {
    const currentWeather = api.weather.currentWeather.useQuery({ cityKey: cityKey });
    const dispatch = useDispatch();
    const router = useRouter();
    return (
        <button onClick={() => {
            dispatch(setCityKey(cityKey));
            dispatch(setCityName(city));
            router.push('/');
        }}>
            <h4>{city}</h4>
            {currentWeather.data &&
                <div>
                    <p>{currentWeather.data[0]?.Temperature.Metric.Value}</p>
                    <p>{currentWeather.data[0]?.WeatherText}</p>
                </div>
            }
        </button>
    )
}