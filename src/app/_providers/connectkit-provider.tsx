'use client'

import { WagmiProvider } from 'wagmi'
import { wagmiConfig } from '@/config/wagmi-config'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConnectKitProvider as ConnectKitProviderOriginal } from 'connectkit'

const queryClient = new QueryClient()

interface ConnectKitProviderProps {
  children: React.ReactNode
}

const ConnectKitProvider = ({ children }: ConnectKitProviderProps) => {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProviderOriginal>{children}</ConnectKitProviderOriginal>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default ConnectKitProvider
