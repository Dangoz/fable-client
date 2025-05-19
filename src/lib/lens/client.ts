import { PublicClient, mainnet, testnet } from '@lens-protocol/client'
import { IS_MAINNET } from '@/config/lens'

export const client = PublicClient.create({
  environment: IS_MAINNET ? mainnet : testnet,
  // origin: 'https://myappdomain.xyz', // Omit if running in a browser
})
