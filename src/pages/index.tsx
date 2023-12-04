import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetPokemonByNameQuery } from "~/hooks/hooks";
import { RootState, store } from "~/redux/store/store";
import { api } from "~/utils/api";
import { fetchCurrentWeather } from "~/redux/slices/weatherSlice";

export default function Home() {

  // const { data, isError, isLoading } = useGetPokemonByNameQuery("squirtle");
  const currenWeather = useSelector((state: RootState) => state.currentWeather.currentWeather)
  const status = useSelector((state: RootState) => (state.currentWeather.currentWeatherStatus));
  // console.log('currenWeather', currenWeather);
  const dispatch = useDispatch();
  // const {data} = api.weather.currentWeather.useQuery({ city: '' });

  useEffect(() => {
    // console.log('data',currenWeather);
  }, [])
  return (
    <div>
      {/* {isError ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <>
          <h3>{data.species.name}</h3>
          <img src={data.sprites.front_shiny} alt={data.species.name} />
        </>
      ) : null} */}
      <p className="text-2xl ">
        {status}
        {/* {hello.data ? hello.data.greeting : "Loading tRPC query..."} */}
      </p>
      <p className="text-2xl ">
        {/* {helloWeather.data ? helloWeather.data.greeting : "Loading tRPC query..."} */}
      </p>
    </div>
  );
}
