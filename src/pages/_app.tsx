import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { Provider, useSelector } from "react-redux";
import { RootState, store } from "~/redux/store/store";
import { fetchCurrentWeather, fetchFiveDaysForecast, initialCity } from "~/redux/slices/weatherSlice";
import Layout from "~/components/layout";
import { ThemeProvider } from "next-themes"
import { useEffect } from "react";
// import { fetchCurrentWeather } from "~/redux/slices/weatherSlice";

const MyApp: AppType = ({ Component, pageProps }) => {
  useEffect(() => {
    store.dispatch(fetchFiveDaysForecast(initialCity));
    store.dispatch(fetchCurrentWeather(initialCity));
  }, [])
  return (
    <Provider store={store}>
      <ThemeProvider attribute="class">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </Provider>
  );
};

export default api.withTRPC(MyApp);
