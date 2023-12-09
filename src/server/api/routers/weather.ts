import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { getAutoCompleteByName, getCurrentWeatherByKey, getFiveDaysForecastByKey, } from "../lib/weatherFunctions";

export const weatherRouter = createTRPCRouter({
    currentWeather: publicProcedure
        .input(z.object({ cityKey: z.string() }))
        .query(async ({ input }) => {
            const currentWeather = await getCurrentWeatherByKey(input.cityKey);
            return currentWeather;
        }),

    fiveDaysForecasts: publicProcedure
        .input(z.object({ cityKey: z.string() }))
        .query(async ({ input }) => {
            const fiveDaysForecast = await getFiveDaysForecastByKey(input.cityKey);
            return fiveDaysForecast;    
        }),

    locationAutocomplete: publicProcedure
        .input(z.object({ params: z.string() }))
        .query(async ({ input }) => {
            const res = await getAutoCompleteByName(input.params)
            return res;
        }),
});
