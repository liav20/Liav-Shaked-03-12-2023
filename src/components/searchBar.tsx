import { useDispatch } from "react-redux";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { fetchCityAutoComplete, fetchCurrentWeather, fetchFiveDaysForecast } from "~/redux/slices/asyncFunctions";
import { RootState, store } from "~/redux/store/store";
import { useSelector } from "react-redux";
import { setCityName } from "~/redux/slices/weatherSlice";
import { useState } from "react";
import StatusHandler from "./statusHandler";
export default function SearchBar() {
    const dispatch = useDispatch();
    const searchRes = useSelector((state: RootState) => (state.weather.cityAutoComplete))
    const status = useSelector((state: RootState) => (state.weather.cityAutoCompleteStatus));
    const [searchValue,setSearchValue]=useState('');
    const [showSearch,setShowSearch]=useState(false);
    return (
        <div className="">
            <>
                <form className="flex sm:flex-row flex-col gap-4"
                    onSubmit={(e) => {
                        e.preventDefault();
                        store.dispatch(fetchCityAutoComplete(searchValue))
                        setShowSearch(true);
                    }}>
                    <Input onChange={(e)=>{
                        setSearchValue(e.target.value)
                    }} type="text" placeholder="City" />
                    <Button type="submit">Search</Button>
                </form>
                {showSearch &&<StatusHandler status={status}/>}
                {status === 'fulfilled' && showSearch &&
                    <div className="bg-gray-200 dark:bg-gray-700 rounded-md text-base">
                        {searchRes.map((res) => (
                            <div key={res.Key}>
                                <button className="hover:font-semibold"
                                onClick={() => {
                                    dispatch(setCityName(res.LocalizedName))
                                    store.dispatch(fetchCurrentWeather(res.LocalizedName))
                                    store.dispatch(fetchFiveDaysForecast(res.LocalizedName))
                                    setShowSearch(false);
                                }}
                                >{res.LocalizedName}
                                </button>
                            </div>
                        ))}
                    </div>}
            </>
        </div>
    )
}