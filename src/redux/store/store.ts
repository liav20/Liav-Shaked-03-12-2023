import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { pokemonSlice } from "../slices/pokemon/pokemonSlice"
import { WeatherSlice } from "../slices/weatherSlice"

export const store = configureStore({
    reducer: combineReducers({
        pokemon: pokemonSlice.reducer,
        currentWeather: WeatherSlice.reducer,
    })
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch