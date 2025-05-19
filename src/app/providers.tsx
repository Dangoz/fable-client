'use client'

import React from 'react'
import Stats from '@/components/common/stats'
import QueryClientProvider from './_providers/query-client-provider'
import { ConnectionProvider } from '@/context/ConnectionContext'
import ConnectKitProvider from './_providers/connectkit-provider'
const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ConnectKitProvider>
        <QueryClientProvider>
          <ConnectionProvider>
            {children}
            {process.env.NODE_ENV !== 'production' && process.env.NEXT_PUBLIC_STATS !== 'false' && <Stats />}
          </ConnectionProvider>
        </QueryClientProvider>
      </ConnectKitProvider>
    </>
  )
}

export default Providers
