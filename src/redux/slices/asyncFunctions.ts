import { createAsyncThunk } from "@reduxjs/toolkit";
import { clientVanilaTrpc } from "~/utils/api";

export const fetchCurrentWeather = createAsyncThunk(
    "../types/currentWeatherApiType",
    async (cityKey: string) => {
        try {
            const weatherData = await clientVanilaTrpc.weather.currentWeather.query({ cityKey: cityKey }
                // ,void {
                //     staleTime: 1000 * 60 * 20,
                // }
            );
            console.log('data', weatherData);
            return weatherData
        }
        catch (e) {
            console.log('error', e);
        }
    }
)

export const fetchFiveDaysForecast = createAsyncThunk(
    "../types/FiveDaysForecastResponseTypes",
    async (cityKey: string) => {
        try {
            const weatherData = await clientVanilaTrpc.weather.fiveDaysForecasts.query({ cityKey: cityKey }
                // ,void {
                //     staleTime: 1000 * 60 * 20,
                // }
            );
            console.log('data', weatherData);
            return weatherData
        }
        catch (e) {
            console.log('error', e);
        }
    }
)

export const fetchCityAutoComplete = createAsyncThunk(
    "../types/getAutocompleteTypes",
    async (params: string) => {
        try {
            const cityAutoComplete = await clientVanilaTrpc.weather.locationAutocomplete.query({ params: params }
                // ,void {
                //     staleTime: 1000 * 60 * 20,
                // }
            );
            console.log('data auto', cityAutoComplete);
            return cityAutoComplete
        }
        catch (e) {
            console.log('error', e);
        }
    }
)