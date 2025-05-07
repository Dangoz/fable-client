'use client'

import React from 'react'
import PrivyProvider from './_providers/privy-provider'
import Stats from '@/components/common/stats'

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <PrivyProvider>
        {children}
        {process.env.NODE_ENV !== 'production' && process.env.NEXT_PUBLIC_STATS !== 'false' && <Stats />}
      </PrivyProvider>
    </>
  )
}

export default Providers
