import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, store } from "~/redux/store/store";
import { api } from "~/utils/api";
import { fetchCurrentWeather } from "~/redux/slices/weatherSlice";
import { Button } from "~/components/button";
import SearchBar from "~/components/searchBar";
import { useTheme } from "next-themes";
import Location from "~/components/Location";
import WeatherSection from "~/components/weatherSection";
import FiveDaysForecastSection from "~/components/fiveDaysForecastSection";

export default function Home() {

  const currenWeather = useSelector((state: RootState) => state.currentWeather.currentWeather)
  const status = useSelector((state: RootState) => (state.currentWeather.currentWeatherStatus));

  return (
    <div className="flex flex-col justify-center items-center gap-8 p-10 text-xl">
      <SearchBar />
      <div className="flex flex-col w-[60%] gap-8 ring-2 shadow-xl ring-gray-700 rounded-lg p-10">
        <div className="flex w-full justify-between sm:flex-row flex-col">
          <div><Location /></div>
          <div>Add to favorite</div>
        </div>
        <div className="self-center">
          <WeatherSection />
        </div>
        <div className="self-center">
          <FiveDaysForecastSection/>
        </div>
      </div>
    </div>
  );
}

