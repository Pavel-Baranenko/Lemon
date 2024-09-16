import type { AppProps } from 'next/app';
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css';
import 'src/styles/globals.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, webSocket } from 'wagmi';

import { AppProvider } from 'src/context/AppContext';
import { useEffect } from 'react';
import {chains, provider, wagmiConfig, projectId } from "src/components/config/wagmiConfig";

const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {

  useEffect(() => {
    typeof document !== undefined ? require("bootstrap/dist/js/bootstrap.bundle") : null;
  }, []);

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={client}>
        <AppProvider chains={chains} wagmiConfig={wagmiConfig} projectId={projectId}>
          <Component {...pageProps} />
        </AppProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default MyApp;
