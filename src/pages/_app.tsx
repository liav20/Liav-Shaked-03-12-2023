import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { Provider } from "react-redux";
import { store } from "~/redux/store/store";
import { fetchCurrentWeather, fetchFiveDaysForecast } from "~/redux/slices/weatherSlice";
import Layout from "~/components/layout";
import { ThemeProvider } from "next-themes"
// import { fetchCurrentWeather } from "~/redux/slices/weatherSlice";
store.dispatch(fetchCurrentWeather('newyork'));
store.dispatch(fetchFiveDaysForecast('newyork'));
const MyApp: AppType = ({ Component, pageProps }) => {
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
