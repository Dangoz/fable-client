'use client'

import React from 'react'
import PrivyProvider from './_providers/privy-provider'
import Stats from '@/components/common/stats'
import QueryClientProvider from './_providers/query-client-provider'
import { ConnectionProvider } from '@/context/ConnectionContext'
import { Web3Provider } from './_providers/web3-provider'
const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <QueryClientProvider>
        <ConnectionProvider>
          <Web3Provider>
            {children}
            {process.env.NODE_ENV !== 'production' && process.env.NEXT_PUBLIC_STATS !== 'false' && <Stats />}
          </Web3Provider>
        </ConnectionProvider>
      </QueryClientProvider>
    </>
  )
}

export default Providers
