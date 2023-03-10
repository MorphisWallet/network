import Head from 'next/head'
import { SessionProvider } from 'next-auth/react'
import { ProSidebarProvider } from 'react-pro-sidebar'
import { ToastContainer } from 'react-toastify'
import { SWRConfig } from 'swr'
import { WalletProvider } from '@suiet/wallet-kit'
import { Web3Modal } from '@web3modal/react'
import { WagmiConfig } from 'wagmi'
import { ApolloProvider } from '@apollo/client'

import { SuiWalletConnectModalProvider, SuiWalletConnectModal } from '@/components'
import { CyberConnectAuthContextProvider } from '@/context/cyberconnect_auth'

import fetcher from '@/helpers/swr/fetcher'
import { ethereumClient, wagmiClient } from '@/lib/wallet_connect'
import { apolloClient } from '@/lib/apollo'

import type { AppProps } from 'next/app'

import '@suiet/wallet-kit/style.css'
import 'react-toastify/dist/ReactToastify.css'
import '../styles/globals.css'

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => (
  <SWRConfig
    value={{
      fetcher,
    }}
  >
    <WalletProvider autoConnect>
      <SessionProvider session={session}>
        <ProSidebarProvider>
          <ApolloProvider client={apolloClient}>
            <SuiWalletConnectModalProvider>
              <CyberConnectAuthContextProvider>
                <WagmiConfig client={wagmiClient}>
                  <Head>
                    <meta
                      name="viewport"
                      content="width=device-width, initial-scale=1"
                    />
                  </Head>
                  <Component {...pageProps} />
                  <ToastContainer />
                  <SuiWalletConnectModal />
                </WagmiConfig>
                <Web3Modal
                  projectId={process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string}
                  ethereumClient={ethereumClient}
                />
              </CyberConnectAuthContextProvider>
            </SuiWalletConnectModalProvider>
          </ApolloProvider>
        </ProSidebarProvider>
      </SessionProvider>
    </WalletProvider>
  </SWRConfig>
)

export default App
