import "../css/globals.css";
import Head from "next/head";
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient();

const App = ({ Component, pageProps }: any) => {
  return (
    <>
      <Head>
        <title>Next.js EXP Example</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </>
  );
};

export default App;
