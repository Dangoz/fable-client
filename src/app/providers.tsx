'use client'

import React from 'react'
import PrivyProvider from './_providers/privy-provider'
import Stats from '@/components/common/stats'
import QueryClientProvider from './_providers/query-client-provider'
import { ConnectionProvider } from '@/context/ConnectionContext'

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <QueryClientProvider>
        <ConnectionProvider>
          <PrivyProvider>
            {children}
            {process.env.NODE_ENV !== 'production' && process.env.NEXT_PUBLIC_STATS !== 'false' && <Stats />}
          </PrivyProvider>
        </ConnectionProvider>
      </QueryClientProvider>
    </>
  )
}

export default Providers
