import { type AppType } from "next/app";

import { api } from "~/utils/api";

import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import Layout from "~/components/layout";
import { store } from "~/redux/store/store";
import "~/styles/globals.css";
import { useEffect } from "react";
import { setFavoritesCitiesState } from "~/redux/slices/weatherSlice";
// import { fetchCurrentWeather } from "~/redux/slices/weatherSlice";

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
