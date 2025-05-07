'use client'

import React from 'react'
import PrivyProvider from './_providers/privy-provider'

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <PrivyProvider>{children}</PrivyProvider>
}

export default Providers
