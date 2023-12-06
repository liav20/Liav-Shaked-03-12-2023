import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FavoriteCard from "~/components/favoriteCard";
import { setFavoritesCitiesState } from "~/redux/slices/weatherSlice";
import { RootState } from "~/redux/store/store";

export default function Favorites() {
    const favoritesCities = useSelector((state: RootState) => (state.weather.favoritesCities));
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setFavoritesCitiesState())
    }, [])
    return (
        <div className="flex flex-wrap flex-row justify-around gap-4">
            {favoritesCities.length>0&& favoritesCities.map((favoriteCity) => (
                <div className="ring-1 p-4 ring-gray-900 dark:ring-gray-200 rounded-lg"
                    key={favoriteCity.key}>
                    <FavoriteCard cityKey={favoriteCity.key} city={favoriteCity.city} />
                </div>
            ))}
        </div>)
}