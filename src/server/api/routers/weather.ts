import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

let post = {
    id: 1,
    name: "Hello World",
};

const currentWeatherMock={
    "LocalObservationDateTime": "2023-12-03T05:18:00-05:00",
    "EpochTime": 1701598680,
    "WeatherText": "Rain",
    "WeatherIcon": 18,
    "HasPrecipitation": true,
    "PrecipitationType": "Rain",
    "IsDayTime": false,
    "Temperature": {
        "Metric": {
            "Value": 9.4,
            "Unit": "C",
            "UnitType": 17
        },
        "Imperial": {
            "Value": 49.0,
            "Unit": "F",
            "UnitType": 18
        }
    },
    "MobileLink": "http://www.accuweather.com/en/us/new-york-ny/10021/current-weather/349727?lang=en-us",
    "Link": "http://www.accuweather.com/en/us/new-york-ny/10021/current-weather/349727?lang=en-us"
}

export const weatherRouter = createTRPCRouter({
    currentWeather: publicProcedure
        .input(z.object({ city: z.string() }))
        .query(({}) => {
            return currentWeatherMock;
        }),

    fiveDaysForecasts: publicProcedure
        .input(z.object({ name: z.string().min(1) }))
        .mutation(async ({ input }) => {
            // simulate a slow db call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            post = { id: post.id + 1, name: input.name };
            return post;
        }),

    locationAutocomplete: publicProcedure.query(() => {
        return post;
    }),
});
