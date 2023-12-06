const autoCompleteUrl = 'http://dataservice.accuweather.com/locations/v1/cities/autocomplete';
const fiveDaysForecast = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/'
const currentWeather = 'http://dataservice.accuweather.com/currentconditions/v1/'

const apiKeyUrl = `apikey=${process.env.ACCUWEATHER_API_KEY}`
const q = `?q=`

export async function getCityKeyByName(name: string) {
//     try {
//         const res = await fetch(`${autoCompleteUrl}${q}${name.toLowerCase()}&${apiKeyUrl}`)
//             .then(res => res.json());
//         console.log('key', res);
//         console.log('key', res[0].Key);
//         return res[0].Key;
//     }
//     catch (e) {
//         console.log('error', e);
//     }
}


export async function getCurrentWeatherByKey(key: string) {
    try {
        console.log(`${currentWeather}${key}?${apiKeyUrl}`);
        const res =await fetch(`${currentWeather}${key}?${apiKeyUrl}`)
        .then(res=>res.json());
        return res;
    }
    catch (e) {
        console.log('error', e);
    }
}

export async function getFiveDaysForecastByKey(key: string) {
    try {
        const res =await fetch(`${fiveDaysForecast}${key}?${apiKeyUrl}`)
        .then(res=>res.json());
        return res;
    }
    catch (e) {
        console.log('error', e);
    }

}
export async function getAutoCompleteByName(name: string) {
    try {
        const res = await fetch(`${autoCompleteUrl}${q}${name}&${apiKeyUrl}`)
        .then(res => res.json());
        return res;
    }
    catch (e) {
        console.log('error', e);
    }
}
