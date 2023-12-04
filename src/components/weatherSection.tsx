import { useSelector } from "react-redux";
import { RootState } from "~/redux/store/store";

export default function WeatherSection() {
    const status = useSelector((state: RootState) => (state.currentWeather.currentWeatherStatus));
    const weatherText = useSelector((state: RootState) => (state.currentWeather.currentWeather?.WeatherText))

    return (
        <div>
            {weatherText}
        </div>
    )
}