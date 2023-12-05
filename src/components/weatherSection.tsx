import { useSelector } from "react-redux";
import { RootState } from "~/redux/store/store";
import StatusHandler from "./statusHandler";

export default function WeatherSection() {
    const status = useSelector((state: RootState) => (state.currentWeather.currentWeatherStatus));
    const currentWeather = useSelector((state: RootState) => (state.currentWeather.currentWeather[0]))

    return (
        <div>
            <StatusHandler status={status}/>
            {status==='fulfilled'&&(
            <>
            <h3 className="font-semibold text-3xl">{currentWeather.IsDayTime? "Day☀️" :"Night🌙"}</h3>
            <p className="font-semibold text-2xl">{currentWeather.WeatherText}</p>
            </>
            )}
        </div>
    )
}