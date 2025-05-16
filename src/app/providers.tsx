'use client'

import React from 'react'
import PrivyProvider from './_providers/privy-provider'
import Stats from '@/components/common/stats'
import QueryClientProvider from './_providers/query-client-provider'

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <QueryClientProvider>
        <PrivyProvider>
          {children}
          {process.env.NODE_ENV !== 'production' && process.env.NEXT_PUBLIC_STATS !== 'false' && <Stats />}
        </PrivyProvider>
      </QueryClientProvider>
    </>
  )
}

export default Providers
