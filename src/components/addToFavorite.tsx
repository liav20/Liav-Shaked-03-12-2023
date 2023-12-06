import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import { RootState } from "~/redux/store/store";
import { useEffect, useState } from "react";
import { useToast } from "./ui/use-toast";
import { removeCityFromFavorite, setCityToFavorites } from "~/redux/slices/weatherSlice";


export default function AddToFavorite() {
    const city = useSelector((state: RootState) => (state.weather.cityName));
    const key = useSelector((state: RootState) => (state.weather.CityKey));
    const favoritesCities = useSelector((state: RootState) => (state.weather.favoritesCities));
    const dispatch = useDispatch();
    const [isCityFavorite, setIsCityFavorite] = useState(true);
    const { toast } = useToast()
    useEffect(() => {
        const isSaved = favoritesCities.some((c) => c.city === city && c.key === key);
        setIsCityFavorite(isSaved);
    }, [city,key,favoritesCities])
    return (
        <div>
            {isCityFavorite ?
                <Button onClick={() => {
                    dispatch(removeCityFromFavorite({city:city,key:key}));
                    setIsCityFavorite(false);
                    toast({
                        description: "Removed from favorite",
                    })
                }}>
                    Remove from favorite 🗑️
                </Button>
                :
                <Button onClick={() => {
                    dispatch(setCityToFavorites({city:city,key:key}));
                    setIsCityFavorite(true);
                    toast({
                        description: "Saved to favorite",
                    })
                }} className="p-2">Add to favorite ❤️
                </Button>
            }
        </div>
    )
}