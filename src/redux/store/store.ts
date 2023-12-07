import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { WeatherSlice } from "../slices/weatherSlice"

export const store = configureStore({
    reducer: combineReducers({
        weather: WeatherSlice.reducer,
    })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch