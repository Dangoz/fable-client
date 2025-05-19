import { http, createConfig } from 'wagmi'
import { getDefaultConfig } from 'connectkit'
import { LENS_CHAIN } from './lens'

export const wagmiConfig = createConfig(
  getDefaultConfig({
    chains: [LENS_CHAIN],
    transports: {
      [LENS_CHAIN.id]: http(LENS_CHAIN.rpcUrls.default.http[0]!),
    },
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '',
    appName: 'Fable',
    appDescription: 'Fablexyz, Fantasy Predicetion Market, Decentralized Storytelling',
    appIcon: 'https://fable.xyz/icon.png',
  }),
)
