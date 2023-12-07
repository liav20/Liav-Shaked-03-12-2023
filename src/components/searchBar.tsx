import { useDispatch } from "react-redux";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { fetchCityAutoComplete, fetchCurrentWeather, fetchFiveDaysForecast } from "~/redux/slices/asyncFunctions";
import { RootState, store } from "~/redux/store/store";
import { useSelector } from "react-redux";
import { setCityKey, setCityName } from "~/redux/slices/weatherSlice";
import { useState } from "react";
import StatusHandler from "./statusHandler";
import { MdSearch } from "react-icons/md";
import LoadingAnimation from "./animations/loadingAnimation";

export default function SearchBar() {
    const dispatch = useDispatch();
    const searchRes = useSelector((state: RootState) => (state.weather.cityAutoComplete))
    const status = useSelector((state: RootState) => (state.weather.cityAutoCompleteStatus));
    const [searchValue, setSearchValue] = useState('');
    const [disableButton, setDisableButton] = useState(true);
    const [showSearch, setShowSearch] = useState(false);

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const englishLettersRegex = /^[A-Za-z]+$/;
        setDisableButton(!englishLettersRegex.test(e.target.value));
        setSearchValue(e.target.value);
    }

    return (
        <div className="">
            <>
                <form className="flex sm:flex-row flex-col gap-4"
                    onSubmit={(e) => {
                        e.preventDefault();
                        store.dispatch(fetchCityAutoComplete(searchValue))
                        setShowSearch(true);
                    }}>
                    <Input
                        onChange={(e) => inputHandler(e)}
                        type="text"
                        placeholder="City" />
                    <Button
                        disabled={disableButton}
                        className="items-center gap-2"
                        type="submit">
                        Search
                        <MdSearch />
                    </Button>
                </form>
                {status === 'pending' && showSearch && <LoadingAnimation />}
                {status === 'rejected' && <p>Oh no, there was an error in the request API.</p>}
                {status === 'fulfilled' && showSearch && searchRes && <p>Oh no, there was an error in the response API.</p>}
                {status === 'fulfilled' && showSearch && searchRes.length > 1 &&
                    <div className="bg-gray-200 dark:bg-gray-700 rounded-md text-base">
                        {searchRes.map((res) => (
                            <div key={res.Key}>
                                <button className="hover:font-semibold"
                                    onClick={() => {
                                        dispatch(setCityName(res.LocalizedName));
                                        dispatch(setCityKey(res.Key));
                                        store.dispatch(fetchCurrentWeather(res.Key))
                                        store.dispatch(fetchFiveDaysForecast(res.Key))
                                        setShowSearch(false);
                                    }}
                                >{res.LocalizedName}
                                </button>
                            </div>
                        ))}
                    </div>
                }
            </>
        </div>
    )
}