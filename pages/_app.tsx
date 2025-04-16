import "@/styles/globals.css";
import {
  hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => {
    const queryClient = new QueryClient();
    if (pageProps.dehydratedState) {
      hydrate(queryClient, pageProps.dehydratedState);
    }
    return queryClient;
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
