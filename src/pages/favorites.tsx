import { useEffect } from "react";
import { MdOutlineFavoriteBorder } from "react-icons/md";
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
        <div className="flex flex-col py-4">
            <h2 className="self-center flex items-center gap-2 text-3xl font-semibold border-b-2
                dark:border-gray-200 border-gray-700">
                Favorites
                <MdOutlineFavoriteBorder />
            </h2>
            <div className="flex flex-wrap flex-row justify-around py-8 px-8 gap-4">
                {favoritesCities.length > 0 && favoritesCities.map((favoriteCity) => (
                    <div className=""
                        key={favoriteCity.key}>
                        <FavoriteCard cityKey={favoriteCity.key} city={favoriteCity.city} />
                    </div>
                ))}
            </div>
        </div>
    )
}