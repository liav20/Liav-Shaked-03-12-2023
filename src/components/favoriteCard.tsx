import { useEffect } from "react";
import { api } from "~/utils/api";

type favoriteCardProps={
    city:string;
    key:string;
}


export default function FavoriteCard({city,key}:favoriteCardProps){
    const CurrentWeather = api.weather.currentWeather.useQuery({cityKey:key});
    
    useEffect(()=>{

    },[]);
    return(
        <div>
            <h4>{city}</h4>
            <p>{CurrentWeather && CurrentWeather[0].Temperature.Metric.Value}</p>
        </div>
    )
}