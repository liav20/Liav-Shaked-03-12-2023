import { useSelector } from "react-redux";
import { RootState } from "~/redux/store/store";
import StatusHandler from "./statusHandler";

export default function FiveDaysForecastSection() {
    const status = useSelector((state: RootState) => (state.weather.fiveDaysForecastStatus));
    const dailyForecasts = useSelector((state: RootState) => (state.weather.fiveDaysForecast?.DailyForecasts));
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const getDayNumberByDate = (date: string) => {
        return new Date(date).getDay()
    }
    return (
        <div>
            <StatusHandler status={status} />
            {dailyForecasts && (
                <div className="flex flex-col sm:flex-row gap-8">
                    {dailyForecasts.map((day) => (
                        <div key={day.Date}>
                            <p>{daysOfWeek[getDayNumberByDate(day.Date)]}</p>
                            <p>{day.Temperature.Minimum.Value}
                                {`-`}
                                {day.Temperature.Maximum.Value}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}