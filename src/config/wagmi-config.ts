import { http, createConfig } from 'wagmi'
import { LENS_CHAIN, LENS_CHAIN_RPC } from './lens'
import { getDefaultConfig } from 'connectkit'

export const wagmiConfig = createConfig(
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
