import { useSelector } from "react-redux";
import { RootState } from "~/redux/store/store";
import StatusHandler from "./statusHandler";


export default function Location() {
    const city = useSelector((state: RootState) => (state.weather.city));
    const currentWeatherState = useSelector((state: RootState) => (state.weather.currentWeather))
    const status = useSelector((state: RootState) => (state.weather.currentWeatherStatus));

    return (
        <div className="flex-flex-col gap-4">
            <p>{city}</p>
            {status === 'fulfilled' ?
                <p>
                    {currentWeatherState[0].Temperature.Metric.Value}
                    {'°'}{currentWeatherState[0].Temperature.Metric.Unit}
                </p>
                :
                <StatusHandler status={status} />
            }
        </div>
    )
}