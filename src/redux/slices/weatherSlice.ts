import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, clientVanilaTrpc } from "~/utils/api";
import { currentWeatherApiType } from "../types/CurrentWeatherResponseTypes";
import { FiveDaysForecastApiType } from "../types/FiveDaysForecastResponseTypes";


type RequestState = "pending" | "fulfilled" | "rejected";

const initialState = {
    currentWeather: {} as currentWeatherApiType,
    fiveDaysForecast: {} as FiveDaysForecastApiType,
    currentWeatherStatus: 'pending' as RequestState,
    fiveDaysForecastStatus: 'pending' as RequestState,
    city: 'telaviv'
}

export const fetchCurrentWeather = createAsyncThunk(
    "../types/currentWeatherApiType",
    async (city: string) => {
        try {
            const weatherData = await clientVanilaTrpc.weather.currentWeather.query({ city: city }
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
    async (city: string) => {
        try {
            const weatherData = await clientVanilaTrpc.weather.fiveDaysForecasts.query({ city: city }
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

export const WeatherSlice = createSlice({
    name: 'getCurrentWeatherSlice',
    initialState: initialState,
    reducers: {
        setCityToFavorites:()=>{
            
        }
    },
    extraReducers: (builder) => {

        builder.addCase(fetchCurrentWeather.pending, (state, action) => {
            state.currentWeatherStatus = "pending";
        });

        builder.addCase(fetchCurrentWeather.rejected, (state, action) => {
            state.currentWeatherStatus = "rejected";
        });
        builder.addCase(fetchCurrentWeather.fulfilled, (state, action) => {
            state.currentWeatherStatus = "fulfilled";
            state.currentWeather = action.payload as currentWeatherApiType
        });
        

        builder.addCase(fetchFiveDaysForecast.pending, (state, action) => {
            state.fiveDaysForecastStatus = 'pending';
        });
        builder.addCase(fetchFiveDaysForecast.rejected, (state, action) => {
            state.fiveDaysForecastStatus = 'rejected';
        });
        builder.addCase(fetchFiveDaysForecast.fulfilled, (state, action) => {
            state.fiveDaysForecastStatus = 'fulfilled';
            state.fiveDaysForecast = action.payload as FiveDaysForecastApiType
        });
    },

})

// export const{setCurrentWeather}=WeatherSlice.actions;