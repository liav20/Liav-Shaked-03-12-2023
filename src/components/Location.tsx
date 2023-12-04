import { useEffect } from "react";
import { useSelector } from "react-redux"
import { RootState } from "~/redux/store/store"
import StatusHandler from "./statusHandler";


export default function Location() {
    const city = useSelector((state: RootState) => (state.currentWeather.city));
    const temperature = useSelector((state: RootState) => (state.currentWeather.currentWeather?.Temperature))
    const status = useSelector((state: RootState) => (state.currentWeather.currentWeatherStatus));
    
    return (
        <div className="flex-flex-col gap-4">
            <p>{city}</p>
            <StatusHandler status={status} />
            {temperature &&
                <p>{temperature.Metric.Value}{'°'}{temperature.Metric.Unit}</p>
            }
        </div>
    )
}