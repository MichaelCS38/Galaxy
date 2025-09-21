import React from 'react';
import { Route, Routes, Navigate } from "react-router-dom";
import { WagmiProvider } from 'wagmi'
import {
  arbitrum, base, avalanche, bsc,
  mainnet, optimism, polygon, fantom,
  zkSync, opBNB, dogechain, sei
} from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  getDefaultConfig,
  RainbowKitProvider,
  DisclaimerComponent,
  darkTheme
} from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';

import './App.css';
import Home from './pages/home/index';
import Main from './components/main/Main';
import Perpetual from './pages/perpetual';
import PortfolioPage from './pages/portfolio/index';
import ReferralPage from './pages/referral';
import Spot from './pages/spot';
import { TradingProvider } from './contexts/TradingContext';


function App() {

  const queryClient = new QueryClient()
  const customBsc = {
    ...bsc,
    rpcUrls: {
      ...bsc.rpcUrls,
      default: {
        http: ['https://bsc-dataseed.binance.org/'], // RPC tùy chỉnh
      },
    },
  }

  const configRain = getDefaultConfig({
    appName: 'Example',
    projectId: '5f6c18132c6e21af2b276b34ad0af7ec',
    chains: [customBsc, arbitrum, base, avalanche, mainnet, optimism, polygon, fantom, zkSync, opBNB, dogechain, sei],
    ssr: true,
  });
  const Disclaimer: DisclaimerComponent = ({ Text, Link }) => (
    <Text>
      Bys connecting your wallet, you agree to the{' '}
      <Link href="">Terms of use</Link> and
      acknowledge you have read and understand the protocol{' '}
      <Link href="">Documentation</Link>
    </Text>
  );


  return (
    <WagmiProvider config={configRain}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          appInfo={{
            appName: 'BSCStation',
            disclaimer: Disclaimer,
          }}
          theme={darkTheme({
            accentColor: '#7b3fe4',
            accentColorForeground: 'white',
            borderRadius: 'medium',
            fontStack: 'system',
            overlayBlur: 'small',
          })}>

          <TradingProvider>
            <Main>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/perpetual' element={<Navigate to='/perpetual/v1/BTCUSDT' replace />} />
                <Route path='/perpetual/v1/:pair' element={<Perpetual />} />
                <Route path='/portfolio' element={<PortfolioPage />} />
                <Route path='/referral' element={<ReferralPage />} />
                <Route path='/spot' element={<Navigate to='/spot/v1/BTCUSDT' replace />} />
                <Route path='/spot/v1/:pair' element={<Spot />} />

                {/* <Route path='/token/:id' element={<DetailPage />} /> */}
                {/* <Route path="*" element={<Navigate to='/' replace />} /> */}
              </Routes>
            </Main>
          </TradingProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>

  );
}

export default App;
