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

const fiveDaysWeatherMock={
    "Headline": {
        "EffectiveDate": "2023-12-04T07:00:00-05:00",
        "EffectiveEpochDate": 1701691200,
        "Severity": 5,
        "Text": "Patchy fog will affect the area this morning",
        "Category": "fog",
        "EndDate": "2023-12-04T13:00:00-05:00",
        "EndEpochDate": 1701712800,
        "MobileLink": "http://www.accuweather.com/en/us/new-york-ny/10021/daily-weather-forecast/349727?lang=en-us",
        "Link": "http://www.accuweather.com/en/us/new-york-ny/10021/daily-weather-forecast/349727?lang=en-us"
    },
    "DailyForecasts": [
        {
            "Date": "2023-12-03T07:00:00-05:00",
            "EpochDate": 1701604800,
            "Temperature": {
                "Minimum": {
                    "Value": 45.0,
                    "Unit": "F",
                    "UnitType": 18
                },
                "Maximum": {
                    "Value": 53.0,
                    "Unit": "F",
                    "UnitType": 18
                }
            },
            "Day": {
                "Icon": 18,
                "IconPhrase": "Rain",
                "HasPrecipitation": true,
                "PrecipitationType": "Rain",
                "PrecipitationIntensity": "Light"
            },
            "Night": {
                "Icon": 40,
                "IconPhrase": "Mostly cloudy w/ showers",
                "HasPrecipitation": true,
                "PrecipitationType": "Rain",
                "PrecipitationIntensity": "Light"
            },
            "Sources": [
                "AccuWeather"
            ],
            "MobileLink": "http://www.accuweather.com/en/us/new-york-ny/10021/daily-weather-forecast/349727?lang=en-us",
            "Link": "http://www.accuweather.com/en/us/new-york-ny/10021/daily-weather-forecast/349727?lang=en-us"
        },
        {
            "Date": "2023-12-04T07:00:00-05:00",
            "EpochDate": 1701691200,
            "Temperature": {
                "Minimum": {
                    "Value": 39.0,
                    "Unit": "F",
                    "UnitType": 18
                },
                "Maximum": {
                    "Value": 53.0,
                    "Unit": "F",
                    "UnitType": 18
                }
            },
            "Day": {
                "Icon": 4,
                "IconPhrase": "Intermittent clouds",
                "HasPrecipitation": false
            },
            "Night": {
                "Icon": 36,
                "IconPhrase": "Intermittent clouds",
                "HasPrecipitation": false
            },
            "Sources": [
                "AccuWeather"
            ],
            "MobileLink": "http://www.accuweather.com/en/us/new-york-ny/10021/daily-weather-forecast/349727?day=1&lang=en-us",
            "Link": "http://www.accuweather.com/en/us/new-york-ny/10021/daily-weather-forecast/349727?day=1&lang=en-us"
        },
        {
            "Date": "2023-12-05T07:00:00-05:00",
            "EpochDate": 1701777600,
            "Temperature": {
                "Minimum": {
                    "Value": 35.0,
                    "Unit": "F",
                    "UnitType": 18
                },
                "Maximum": {
                    "Value": 44.0,
                    "Unit": "F",
                    "UnitType": 18
                }
            },
            "Day": {
                "Icon": 3,
                "IconPhrase": "Partly sunny",
                "HasPrecipitation": false
            },
            "Night": {
                "Icon": 7,
                "IconPhrase": "Cloudy",
                "HasPrecipitation": false
            },
            "Sources": [
                "AccuWeather"
            ],
            "MobileLink": "http://www.accuweather.com/en/us/new-york-ny/10021/daily-weather-forecast/349727?day=2&lang=en-us",
            "Link": "http://www.accuweather.com/en/us/new-york-ny/10021/daily-weather-forecast/349727?day=2&lang=en-us"
        },
        {
            "Date": "2023-12-06T07:00:00-05:00",
            "EpochDate": 1701864000,
            "Temperature": {
                "Minimum": {
                    "Value": 30.0,
                    "Unit": "F",
                    "UnitType": 18
                },
                "Maximum": {
                    "Value": 42.0,
                    "Unit": "F",
                    "UnitType": 18
                }
            },
            "Day": {
                "Icon": 29,
                "IconPhrase": "Rain and snow",
                "HasPrecipitation": true,
                "PrecipitationType": "Mixed",
                "PrecipitationIntensity": "Light"
            },
            "Night": {
                "Icon": 35,
                "IconPhrase": "Partly cloudy",
                "HasPrecipitation": false
            },
            "Sources": [
                "AccuWeather"
            ],
            "MobileLink": "http://www.accuweather.com/en/us/new-york-ny/10021/daily-weather-forecast/349727?day=3&lang=en-us",
            "Link": "http://www.accuweather.com/en/us/new-york-ny/10021/daily-weather-forecast/349727?day=3&lang=en-us"
        },
        {
            "Date": "2023-12-07T07:00:00-05:00",
            "EpochDate": 1701950400,
            "Temperature": {
                "Minimum": {
                    "Value": 36.0,
                    "Unit": "F",
                    "UnitType": 18
                },
                "Maximum": {
                    "Value": 40.0,
                    "Unit": "F",
                    "UnitType": 18
                }
            },
            "Day": {
                "Icon": 4,
                "IconPhrase": "Intermittent clouds",
                "HasPrecipitation": false
            },
            "Night": {
                "Icon": 34,
                "IconPhrase": "Mostly clear",
                "HasPrecipitation": false
            },
            "Sources": [
                "AccuWeather"
            ],
            "MobileLink": "http://www.accuweather.com/en/us/new-york-ny/10021/daily-weather-forecast/349727?day=4&lang=en-us",
            "Link": "http://www.accuweather.com/en/us/new-york-ny/10021/daily-weather-forecast/349727?day=4&lang=en-us"
        }
    ]
}

export const weatherRouter = createTRPCRouter({
    currentWeather: publicProcedure
        .input(z.object({ city: z.string() }))
        .query(async ({ input }) => {
            return currentWeatherMock;
        }),

    fiveDaysForecasts: publicProcedure
        .input(z.object({ city: z.string() }))
        .query(async ({ input }) => {
            return fiveDaysWeatherMock;
        }),

    locationAutocomplete: publicProcedure.query(() => {
        return post;
    }),
});
