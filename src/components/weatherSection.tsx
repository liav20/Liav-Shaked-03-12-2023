import { useSelector } from "react-redux";
import { RootState } from "~/redux/store/store";
import StatusHandler from "./statusHandler";
import NightAnimation from "./animations/nightAnimation";
import SunAnimation from "./animations/sunAnimation";

export default function WeatherSection() {
    const status = useSelector((state: RootState) => (state.weather.currentWeatherStatus));
    const currentWeather = useSelector((state: RootState) => (state.weather.currentWeather))

    return (
        <div>
            {status === 'fulfilled' && typeof(currentWeather[0])!== 'undefined' ? (
                <div className="flex flex-col items-start gap-2 justify-center">
                    {!currentWeather[0].IsDayTime?<NightAnimation/>:<SunAnimation/>}
                    <h3 className="font-semibold text-3xl">{currentWeather[0].IsDayTime ? "Day☀️" : "Night🌙"}</h3>
                    <p className="font-semibold text-2xl">{currentWeather[0].WeatherText}</p>
                </div>
            ):<StatusHandler status={status} />}
        </div>
    )
}