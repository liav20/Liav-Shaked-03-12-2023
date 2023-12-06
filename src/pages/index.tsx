import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Location from "~/components/Location";
import AddToFavorite from "~/components/addToFavorite";
import FiveDaysForecastSection from "~/components/fiveDaysForecastSection";
import SearchBar from "~/components/searchBar";
import { Button } from "~/components/ui/button";
import WeatherSection from "~/components/weatherSection";
import { fetchCurrentWeather, fetchFiveDaysForecast } from "~/redux/slices/asyncFunctions";
import { initialCityKey, setFavoritesCitiesState } from "~/redux/slices/weatherSlice";
import { RootState, store } from "~/redux/store/store";

export default function Home() {
  const currenWeather = useSelector((state: RootState) => state.weather.currentWeather)
  const key = useSelector((state: RootState) => state.weather.cityKey);
  const status = useSelector((state: RootState) => (state.weather.cityAutoCompleteStatus));
  const dispatch = useDispatch();
  
  useEffect(() => {
    store.dispatch(fetchFiveDaysForecast(key));
    store.dispatch(fetchCurrentWeather(key));
    dispatch(setFavoritesCitiesState());
  }, [])
  return (
    <div className="flex flex-col justify-center items-center gap-8 p-10 text-xl">
      {key}
      <SearchBar />
      <div className="flex flex-col gap-8 w-fit ring-2 shadow-xl ring-gray-700 rounded-lg p-14">
        <div className="flex w-full justify-between sm:flex-row flex-col">
          <div><Location /></div>
          <div>
            <AddToFavorite/>           
          </div>
        </div>
        <div className="self-center">
          <WeatherSection />
        </div>
        <div className="self-center">
          <FiveDaysForecastSection />
        </div>
      </div>
    </div>
  );
}

