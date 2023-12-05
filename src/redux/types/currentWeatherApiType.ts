export type CurrentWeatherApiType = [{
    LocalObservationDateTime: string
    EpochTime: number
    WeatherText: string
    WeatherIcon: number
    HasPrecipitation: boolean
    PrecipitationType: string
    IsDayTime: boolean
    Temperature: {
        Metric: {
            Value: number
            Unit: string
            UnitType: number
        }
        Imperial: {
            Value: number
            Unit: string
            UnitType: number
        }
    }
    MobileLink: string
    Link: string
}]
