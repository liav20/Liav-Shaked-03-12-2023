import { useEffect } from "react";
import { useSelector } from "react-redux";
import FavoriteCard from "~/components/favoriteCard";
import { RootState } from "~/redux/store/store";

export default function Favorites() {
    const favoritesCities = useSelector((state: RootState) => (state.weather.favoritesCities));
    useEffect(() => {

    }, [favoritesCities])
    return (
        <div className="flex flex-wrap flex-row justify-around gap-4">
            {favoritesCities.map((favoriteCity) => (
                <div className="ring-1 p-4 ring-gray-900 dark:ring-gray-200 rounded-lg"
                    key={favoriteCity.key}>
                    <FavoriteCard key={favoriteCity.key} city={favoriteCity.city} />
                </div>
            ))}
        </div>)
}