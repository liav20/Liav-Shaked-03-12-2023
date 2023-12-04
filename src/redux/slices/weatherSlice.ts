import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, clientVanilaTrpc } from "~/utils/api";
import { currentWeatherApiType } from "../types/getCurrentWeatherTypes";

export const fetchCurrentWeather = createAsyncThunk(
    "/types/currentWeatherApiType",
    async () => {
        try{
        const weatherData = await clientVanilaTrpc.weather.currentWeather.query({city:'new'}
        // ,void {
        //     staleTime: 1000 * 60 * 20,
        // }
        );
        console.log('data',weatherData);
        return weatherData
        }
        catch(e){
            console.log('error',e);
        }
    }
)
type RequestState = "pending" | "fulfilled" | "rejected";

const initialState ={
    currentWeather:{} as currentWeatherApiType,
    status:'pending' as RequestState ,
    city:'newyork'
}


export const WeatherSlice = createSlice({
    name: 'getCurrentWeatherSlice',
    initialState: initialState,
    reducers: { 
        // setCurrentWeather:(state,action:PayloadAction<currentWeatherApiType>)=>{
        //     state.currentWeather=action.payload;
        // }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCurrentWeather.pending, (state, action) => {
            state.status = "pending";
        });

        builder.addCase(fetchCurrentWeather.fulfilled, (state, action) => {
            state.status = "fulfilled";
            state.currentWeather = action.payload as currentWeatherApiType
        });

        builder.addCase(fetchCurrentWeather.rejected, (state, action) => {
            state.status = "rejected";
        });
    },

})

// export const{setCurrentWeather}=WeatherSlice.actions;