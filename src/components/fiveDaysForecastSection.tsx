import { useSelector } from "react-redux";
import { RootState } from "~/redux/store/store";
import StatusHandler from "./statusHandler";

export default function FiveDaysForecastSection() {
    const status = useSelector((state: RootState) => (state.weather.fiveDaysForecastStatus));
    const dailyForecasts = useSelector((state: RootState) => (state.weather.fiveDaysForecast?.DailyForecasts));
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const isTemperatureCelsius = useSelector((state:RootState)=>state.weather.isTemperatureCelsius);
    const getDayNumberByDate = (date: string) => {
        return new Date(date).getDay()
    }
    function fahrenheitToCelsius(number:number) {
        const celsius = (number - 32) * 5 / 9;
        return Math.round(celsius);
    }

    return (
        <div>
            {dailyForecasts && status === 'fulfilled' ? (
                <div className="flex flex-wrap flex-col sm:flex-row gap-8">
                    {dailyForecasts.map((day) => (
                        <div key={day.Date} className="py-4 px-6 ring-2 ring-gray-700 rounded-lg dark:ring-gray-200">
                            <b>{daysOfWeek[getDayNumberByDate(day.Date)]}</b>
                            <p>{isTemperatureCelsius ?fahrenheitToCelsius(day.Temperature.Minimum.Value):day.Temperature.Minimum.Value}
                                {isTemperatureCelsius ? 'C':'F'}
                                {` - `}
                                {isTemperatureCelsius ?fahrenheitToCelsius(day.Temperature.Maximum.Value):day.Temperature.Maximum.Value}
                                {isTemperatureCelsius ? 'C':'F'}
                            </p>
                        </div>
                    ))}
                </div>
            ) : <StatusHandler status={status} />}
        </div>
    )
}