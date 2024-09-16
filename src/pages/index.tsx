import Head from 'next/head';
import type { NextPage } from 'next';
import { createWeb3Modal } from '@web3modal/wagmi/react';
import {wagmiConfig, projectId} from "src/components/config/wagmiConfig";

import HomePage from 'src/components/pages/home/HomePage';

const Home: NextPage = () => {

  const modal = createWeb3Modal({
    wagmiConfig: wagmiConfig!,
    projectId,
    enableAnalytics: false,
  });

  return (<>
    <Head>
      <title>Lemon Jet</title>
      <meta content="Lemon Jet" name="description" />
    </Head>
    <HomePage />
  </>);
};

export default Home;
