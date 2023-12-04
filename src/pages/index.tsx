import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, store } from "~/redux/store/store";
import { api } from "~/utils/api";
import { fetchCurrentWeather } from "~/redux/slices/weatherSlice";
import { Button } from "~/components/button";
import SearchBar from "~/components/searchBar";

export default function Home() {

  const currenWeather = useSelector((state: RootState) => state.currentWeather.currentWeather)
  const status = useSelector((state: RootState) => (state.currentWeather.currentWeatherStatus));
  
  
  useEffect(() => {

  }, [])
  return (
    <div className="flex flex-col justify-center items-center gap-8 p-10">
      <SearchBar/>
      <Button>Click me</Button>
    </div>
  );
}

  