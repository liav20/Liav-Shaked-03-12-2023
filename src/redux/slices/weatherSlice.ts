import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CurrentWeatherApiType } from "../types/currentWeatherApiType";
import { FiveDaysForecastApiType } from "../types/fiveDaysForecastApiType";
import { fetchCityAutoComplete, fetchCurrentWeather, fetchFiveDaysForecast } from "./asyncFunctions";
import { AutoCompleteApiType } from "../types/autoCompleteApiType";


export type RequestState = "pending" | "fulfilled" | "rejected";

type favoriteCities = {
    city: string,
    key: string
}
export const initialCityName = 'Tel Aviv'
export const initialCityKey = '215854'

const initialState = {
    currentWeather: {} as CurrentWeatherApiType,
    fiveDaysForecast: {} as FiveDaysForecastApiType,
    cityAutoComplete: {} as AutoCompleteApiType,
    currentWeatherStatus: 'pending' as RequestState,
    fiveDaysForecastStatus: 'pending' as RequestState,
    cityAutoCompleteStatus: 'pending' as RequestState,
    cityKey: initialCityKey,
    cityName: initialCityName,
    favoritesCities: [] as favoriteCities[],
    isTemperatureCelsius: true,
}


export const WeatherSlice = createSlice({
    name: 'WeatherSlice',
    initialState: initialState,
    reducers: {
        setCityName: (state, action: PayloadAction<string>) => {
            state.cityName = action.payload
        },
        setCityKey: (state, action: PayloadAction<string>) => {
            state.cityKey = action.payload
        },
        setFavoritesCitiesState: (state) => {
            state.favoritesCities = JSON.parse(localStorage.getItem('cities') as string) || []
        },
        setCityToFavorites: (state, action: PayloadAction<{ city: string; key: string }>) => {
            const { city, key } = action.payload;
            const cities = JSON.parse(localStorage.getItem('cities') as string) || [];
            cities.push({ city, key });
            localStorage.setItem('cities', JSON.stringify(cities));

        },
        removeCityFromFavorite: (state, action: PayloadAction<{ city: string; key: string }>) => {
            const { city, key } = action.payload;
            const cities = JSON.parse(localStorage.getItem('cities') as string) || [];
            const indexToRemove = cities.findIndex((c) => c.city === city && c.key === key);
            if (indexToRemove !== -1) {
                cities.splice(indexToRemove, 1);
                localStorage.setItem('cities', JSON.stringify(cities));
            }
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

export const { setCityToFavorites, removeCityFromFavorite, setCityName, setFavoritesCitiesState, setCityKey } = WeatherSlice.actions;