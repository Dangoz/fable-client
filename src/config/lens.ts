import { chains } from '@lens-chain/sdk/viem'

export const LENS_NETWORK = process.env.NEXT_PUBLIC_LENS_NETWORK || 'mainnet'

export const LensEndpoint = {
  Mainnet: 'https://api.lens.xyz/graphql',
  Testnet: 'https://api.testnet.lens.xyz/graphql',
  Staging: 'https://api.staging.lens.xyz/graphql',
} as const

export type LensEndpointType = keyof typeof LensEndpoint

export const IS_MAINNET = process.env.NEXT_PUBLIC_IS_MAINNET === 'true'

export const LENS_CHAIN = IS_MAINNET ? chains.mainnet : chains.testnet
export const LENS_CHAIN_RPC = IS_MAINNET
  ? 'https://lens-mainnet.g.alchemy.com/v2/yn8RMSd58FNgMOWiIQCtpR74FdJeskE6'
  : 'https://lens-sepolia.g.alchemy.com/v2/yn8RMSd58FNgMOWiIQCtpR74FdJeskE6'
