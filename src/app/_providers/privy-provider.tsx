'use client'

import { PrivyProvider as PrivyProviderOriginal } from '@privy-io/react-auth'
import { toSolanaWalletConnectors } from '@privy-io/react-auth/solana'

const PRIVY_APP_ID = process.env.NEXT_PUBLIC_PRIVY_APP_ID ?? ''
const PRIVY_CLIENT_ID = process.env.NEXT_PUBLIC_PRIVY_CLIENT_ID ?? ''

const PrivyProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <PrivyProviderOriginal
      appId={PRIVY_APP_ID}
      clientId={PRIVY_CLIENT_ID}
      config={{
        loginMethods: ['wallet', 'email', 'twitter'],
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
        },
        externalWallets: {
          solana: { connectors: toSolanaWalletConnectors() },
        },
        appearance: {
          theme: 'dark',
          walletChainType: 'solana-only',
          walletList: ['phantom', 'solflare', 'detected_solana_wallets', 'wallet_connect'],
        },
      }}
    >
      {children}
    </PrivyProviderOriginal>
  )
}

export default PrivyProvider
