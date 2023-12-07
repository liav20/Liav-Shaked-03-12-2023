import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCityKey, setCityName } from "~/redux/slices/weatherSlice";
import { CurrentWeatherApiType } from "~/redux/types/currentWeatherApiType";
import { api } from "~/utils/api";
import LoadingAnimation from "./animations/loadingAnimation";
import { RootState } from "~/redux/store/store";

type favoriteCardProps = {
    city: string;
    cityKey: string;
}


export default function FavoriteCard({ city, cityKey }: favoriteCardProps) {
    const currentWeather = api.weather.currentWeather.useQuery({ cityKey: cityKey });
    const dispatch = useDispatch();
    const router = useRouter();
    const isTemperatureCelsius = useSelector((state: RootState) => state.weather.isTemperatureCelsius);
    return (
        <button className="hover:bg-gray-300 flex flex-col items-center gap-2
        hover:scale-105 transition duration-200 ease-in-out bg-gray-200 dark:bg-gray-700
        dark:hover:bg-gray-800 p-8  ring-2 ring-gray-700 dark:ring-gray-200 rounded-lg"
            onClick={() => {
                dispatch(setCityKey(cityKey));
                dispatch(setCityName(city));
                router.push('/');
            }}>
            <h4 className="font-semibold border-b-2 dark:border-gray-200 border-gray-700 text-2xl">{city}</h4>
            {currentWeather.data &&
                <div className="flex flex-col items-center text-xl font-medium justify-center">
                    {currentWeather.data[0]?.IsDayTime ? <p>Day☀️</p> : <p>Night🌙</p>}
                    {isTemperatureCelsius ?
                        <p className="">{currentWeather.data[0]?.Temperature.Metric.Value}{'°'}
                            {currentWeather.data[0]?.Temperature.Metric.Unit}
                        </p>
                        :
                        <p className="">{currentWeather.data[0]?.Temperature.Imperial.Value}{'-'}
                            {currentWeather.data[0]?.Temperature.Imperial.Unit}
                        </p>}
                    <p className="">{currentWeather.data[0]?.WeatherText}</p>
                </div>
            }
            {currentWeather.isFetching && <LoadingAnimation />}
            {currentWeather.isError && <p>Sorry there was an Error.</p>}
        </button>
    )
}