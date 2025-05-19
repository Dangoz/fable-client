'use client'

import { WagmiProvider, createConfig, http } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConnectKitProvider as ConnectKitProviderOriginal, getDefaultConfig } from 'connectkit'
import { LENS_CHAIN, LENS_CHAIN_RPC } from '@/config/lens'

const config = createConfig(
  getDefaultConfig({
    chains: [LENS_CHAIN],
    transports: {
      [LENS_CHAIN.id]: http(LENS_CHAIN_RPC),
    },
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '',
    appName: 'Fable',
    appDescription: 'Fablexyz, Fantasy Predicetion Market, Decentralized Storytelling',
  }),
)

const queryClient = new QueryClient()

interface ConnectKitProviderProps {
  children: React.ReactNode
}

const ConnectKitProvider = ({ children }: ConnectKitProviderProps) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProviderOriginal>{children}</ConnectKitProviderOriginal>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default ConnectKitProvider
