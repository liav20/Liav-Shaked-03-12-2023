import { $CombinedState } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentWeather } from "~/redux/slices/weatherSlice";
import { RootState } from "~/redux/store/store";


// export function getCurrentWeatherByCity(city: string) {

//     const dispatch = useDispatch();
//     const status = useSelector((state: RootState) => {
//         state.currentWeather.currentWeatherStatus;
//     });
//     const cityStore = useSelector((state: RootState) => (
//         state.currentWeather.city
//     ));
//     const data = useSelector((state: RootState) => state.currentWeather.currentWeather);
//     useEffect(() => {
//         // upon mount or name change, if status is uninitialized, send a request
//         // for the pokemon name
//         if(cityStore!==city){
//         dispatch(fetchCurrentWeather(city));
//         }

//     }, [city]);

//     const isUninitialized = status === undefined;
//     const isLoading = status === "pending" || status === undefined;
//     const isError = status === "rejected";
//     const isSuccess = status === "fulfilled";
// }   