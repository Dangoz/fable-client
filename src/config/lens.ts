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

export const LENS_APP_ID = IS_MAINNET
  ? '0x8A5Cc31180c37078e1EbA2A23c861Acf351a97cE'
  : '0xC75A89145d765c396fd75CbD16380Eb184Bd2ca7'

export const LENS_SPONSOR = IS_MAINNET
  ? '0x0000000000000000000000000000000000000000'
  : '0x0000000000000000000000000000000000000000'
