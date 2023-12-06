import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import { RootState } from "~/redux/store/store";
import { useEffect, useState } from "react";
import { useToast } from "./ui/use-toast";
import { removeCityFromFavorite, setCityToFavorites } from "~/redux/slices/weatherSlice";


export default function AddToFavorite() {
    const city = useSelector((state: RootState) => (state.weather.city));
    const favorites = useSelector((state: RootState) => (state.weather.favoritesCities));
    const dispatch = useDispatch();
    const [isCityFavorite, setIsCityFavorite] = useState<boolean>();
    const { toast } = useToast()
    useEffect(() => {
        setIsCityFavorite(favorites.includes(city))
        console.log('test',favorites.includes(city));
    }, [])
    return (
        <div>
            {isCityFavorite ?
                <Button onClick={() => {
                    dispatch(removeCityFromFavorite(city));
                    setIsCityFavorite(false);
                    toast({
                        description: "Removed from favorite",
                    })
                }}>
                    Remove from favorite 🗑️
                </Button>
                :
                <Button onClick={() => {
                    dispatch(setCityToFavorites(city));
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