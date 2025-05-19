'use client'

import React from 'react'
import Stats from '@/components/common/stats'
import QueryClientProvider from './_providers/query-client-provider'
import { ConnectionProvider } from '@/context/connection-context'
import ConnectKitProvider from './_providers/connectkit-provider'
import { LensProvider } from '@lens-protocol/react'
import { client } from '@/lib/lens/client'

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ConnectKitProvider>
        <QueryClientProvider>
          <LensProvider client={client}>
            <ConnectionProvider>
              {children}
              {process.env.NODE_ENV !== 'production' && process.env.NEXT_PUBLIC_STATS !== 'false' && <Stats />}
            </ConnectionProvider>
          </LensProvider>
        </QueryClientProvider>
      </ConnectKitProvider>
    </>
  )
}

export default Providers
