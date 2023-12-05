import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CurrentWeatherApiType } from "../types/currentWeatherApiType";
import { FiveDaysForecastApiType } from "../types/fiveDaysForecastApiType";
import { fetchCityAutoComplete, fetchCurrentWeather, fetchFiveDaysForecast } from "./asyncFunctions";
import { AutoCompleteApiType } from "../types/autoCompleteApiType";


export type RequestState = "pending" | "fulfilled" | "rejected";

export const initialCity = 'new york'

const initialState = {
    currentWeather: {} as CurrentWeatherApiType,
    fiveDaysForecast: {} as FiveDaysForecastApiType,
    cityAutoComplete: {} as AutoCompleteApiType,
    currentWeatherStatus: 'pending' as RequestState,
    fiveDaysForecastStatus: 'pending' as RequestState,
    cityAutoCompleteStatus: 'pending' as RequestState,
    city: initialCity,
    favoritesCities:'',
    isTemperatureCelsius: true,
}


export const WeatherSlice = createSlice({
    name: 'WeatherSlice',
    initialState: initialState,
    reducers: {
        setCityName: (state, action: PayloadAction<string>) =>{
            state.city = action.payload
        },
        setFavoritesCitiesState:(state)=>{
            state.favoritesCities=localStorage.getItem('favorites')||''
        },
        setCityToFavorites: (state, action: PayloadAction<string>) => {
            const favorites = localStorage.getItem('favorites');
            if (!favorites) {
                localStorage.setItem('favorites', action.payload)
            } else {
                localStorage.setItem('favorites', favorites + `,${action.payload}`)
            }
        },
        removeCityFromFavorite: (state, action: PayloadAction<string>) => {
            const favorites = localStorage.getItem('favorites');
            if (!favorites) {
                return
            }
            const regex = new RegExp(`\\b${action.payload}\\b`, 'g');
            const newFavorites = favorites.replace(regex, '');
            localStorage.setItem('favorites', newFavorites);
        },
        setTemperatureType: (state) => {
            state.isTemperatureCelsius = !state.isTemperatureCelsius
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
            state.currentWeather = action.payload as CurrentWeatherApiType
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

        builder.addCase(fetchCityAutoComplete.pending, (state, action) => {
            state.cityAutoCompleteStatus = 'pending';
        });
        builder.addCase(fetchCityAutoComplete.rejected, (state, action) => {
            state.cityAutoCompleteStatus = 'rejected';
        });
        builder.addCase(fetchCityAutoComplete.fulfilled, (state, action) => {
            state.cityAutoCompleteStatus = 'fulfilled';
            state.cityAutoComplete = action.payload as AutoCompleteApiType
        });
    },

})

export const { setCityToFavorites, removeCityFromFavorite,setCityName,setFavoritesCitiesState } = WeatherSlice.actions;