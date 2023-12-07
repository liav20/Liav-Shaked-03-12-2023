import { useSelector } from "react-redux";
import { RootState } from "~/redux/store/store";
import StatusHandler from "./statusHandler";


export default function Location() {
    const city = useSelector((state: RootState) => (state.weather.cityName));
    const currentWeatherState = useSelector((state: RootState) => (state.weather.currentWeather));
    const status = useSelector((state: RootState) => (state.weather.currentWeatherStatus));
    const isTemperatureCelsius = useSelector((state: RootState) => state.weather.isTemperatureCelsius);
    return (
        <div className="flex-flex-col gap-4 ring-2 rounded-lg p-4 dark:ring-gray-200 ring-gray-700">
            <p className="font-semibold text-2xl">{city}</p>
            {status === 'fulfilled' && currentWeatherState[0] && typeof(currentWeatherState[0])!== 'undefined' ?
                <>{isTemperatureCelsius ?
                    <p className="font-semibold text-2xl">
                        {currentWeatherState[0].Temperature.Metric.Value}
                        {'°'}{currentWeatherState[0].Temperature.Metric.Unit}
                    </p>
                    :
                    <p className="font-semibold text-2xl">
                        {currentWeatherState[0].Temperature.Imperial.Value}
                        {'°'}{currentWeatherState[0].Temperature.Imperial.Unit}
                    </p>
                }
                </>
                :
                <StatusHandler status={status} />
            }
        </div>
    )
}