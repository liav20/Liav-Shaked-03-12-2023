import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { Provider } from "react-redux";
import { store } from "~/redux/store/store";
import { fetchCurrentWeather } from "~/redux/slices/weatherSlice";
// import { fetchCurrentWeather } from "~/redux/slices/weatherSlice";
store.dispatch(fetchCurrentWeather());
const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default api.withTRPC(MyApp);
