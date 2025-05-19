'use client'

import { PublicClient, mainnet, testnet } from '@lens-protocol/react'
import { IS_MAINNET } from '@/config/lens'
import { fragments } from './fragments'

export const client = PublicClient.create({
  environment: IS_MAINNET ? mainnet : testnet,
  // origin: 'https://myappdomain.xyz', // Omit if running in a browser
  fragments,
  ...(typeof window !== 'undefined' && { storage: window.localStorage }),
})
