import { AppProps } from "next/app";
import { AllProviders } from "../context/AllProviders";
import { ReactQueryDevtools } from "react-query/devtools";

import theme from "../theme/config";
import { QueryClient } from "react-query";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AllProviders theme={theme} client={queryClient}>
      <Component {...pageProps}/>
      <ReactQueryDevtools initialIsOpen={false}/>
    </AllProviders>
  );
};

export default MyApp;