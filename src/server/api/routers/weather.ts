import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { getAutoCompleteByName, getCityKeyByName, getCurrentWeatherByKey, getFiveDaysForecastByKey, } from "../lib/weatherFunctions";


const currentWeatherMock = [{
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
}]

const fiveDaysWeatherMock = {
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

const autoCompleteMock = [
    {
        "Version": 1,
        "Key": "2333525",
        "Type": "City",
        "Rank": 13,
        "LocalizedName": "New Territories",
        "Country": {
            "ID": "HK",
            "LocalizedName": "Hong Kong"
        },
        "AdministrativeArea": {
            "ID": "TW",
            "LocalizedName": "Tsuen Wan"
        }
    },
    {
        "Version": 1,
        "Key": "349727",
        "Type": "City",
        "Rank": 15,
        "LocalizedName": "New York",
        "Country": {
            "ID": "US",
            "LocalizedName": "United States"
        },
        "AdministrativeArea": {
            "ID": "NY",
            "LocalizedName": "New York"
        }
    },
    {
        "Version": 1,
        "Key": "187745",
        "Type": "City",
        "Rank": 21,
        "LocalizedName": "New Delhi",
        "Country": {
            "ID": "IN",
            "LocalizedName": "India"
        },
        "AdministrativeArea": {
            "ID": "DL",
            "LocalizedName": "Delhi"
        }
    },
    {
        "Version": 1,
        "Key": "2515397",
        "Type": "City",
        "Rank": 21,
        "LocalizedName": "New Taipei City",
        "Country": {
            "ID": "TW",
            "LocalizedName": "Taiwan"
        },
        "AdministrativeArea": {
            "ID": "NWT",
            "LocalizedName": "New Taipei City"
        }
    },
    {
        "Version": 1,
        "Key": "298885",
        "Type": "City",
        "Rank": 32,
        "LocalizedName": "Newcastle",
        "Country": {
            "ID": "ZA",
            "LocalizedName": "South Africa"
        },
        "AdministrativeArea": {
            "ID": "KZN",
            "LocalizedName": "Kwazulu-Natal"
        }
    },
    {
        "Version": 1,
        "Key": "12777",
        "Type": "City",
        "Rank": 35,
        "LocalizedName": "Newcastle",
        "Country": {
            "ID": "AU",
            "LocalizedName": "Australia"
        },
        "AdministrativeArea": {
            "ID": "NSW",
            "LocalizedName": "New South Wales"
        }
    },
    {
        "Version": 1,
        "Key": "3588491",
        "Type": "City",
        "Rank": 35,
        "LocalizedName": "New Cairo",
        "Country": {
            "ID": "EG",
            "LocalizedName": "Egypt"
        },
        "AdministrativeArea": {
            "ID": "C",
            "LocalizedName": "Cairo"
        }
    },
    {
        "Version": 1,
        "Key": "348585",
        "Type": "City",
        "Rank": 35,
        "LocalizedName": "New Orleans",
        "Country": {
            "ID": "US",
            "LocalizedName": "United States"
        },
        "AdministrativeArea": {
            "ID": "LA",
            "LocalizedName": "Louisiana"
        }
    },
    {
        "Version": 1,
        "Key": "349530",
        "Type": "City",
        "Rank": 35,
        "LocalizedName": "Newark",
        "Country": {
            "ID": "US",
            "LocalizedName": "United States"
        },
        "AdministrativeArea": {
            "ID": "NJ",
            "LocalizedName": "New Jersey"
        }
    },
    {
        "Version": 1,
        "Key": "329683",
        "Type": "City",
        "Rank": 41,
        "LocalizedName": "Newcastle upon Tyne",
        "Country": {
            "ID": "GB",
            "LocalizedName": "United Kingdom"
        },
        "AdministrativeArea": {
            "ID": "NET",
            "LocalizedName": "Newcastle upon Tyne"
        }
    }
]

export const weatherRouter = createTRPCRouter({
    currentWeather: publicProcedure
        .input(z.object({ cityKey: z.string() }))
        .query(async ({ input }) => {
            // const key = await getCityKeyByName(input.city)
            // console.log('key trpc', key);
            // const currentWeather = await getCurrentWeatherByKey(input.cityKey);
            // console.log('currentWeather', currentWeather);
            // return currentWeather
            return currentWeatherMock;
        }),

    fiveDaysForecasts: publicProcedure
        .input(z.object({ cityKey: z.string() }))
        .query(async ({ input }) => {
            // const key = await getCityKeyByName(input.city)
            // const fiveDaysForecast = await getFiveDaysForecastByKey(input.cityKey);
            // return fiveDaysForecast;
            return fiveDaysWeatherMock;
        }),

    locationAutocomplete: publicProcedure
        .input(z.object({ params: z.string() }))
        .query(async ({ input }) => {
            const res = await getAutoCompleteByName(input.params)
            console.log('res', res);
            return res
            // return autoCompleteMock;
        }),
});
