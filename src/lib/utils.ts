import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { UUID } from '@elizaos/core'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Truncates a crypto wallet address (EVM or Solana) to show only the first 3 and last 3 characters
 * with an ellipsis in the middle.
 *
 * @param address - The wallet address to truncate
 * @param startChars - Number of characters to keep at the start (default: 3)
 * @param endChars - Number of characters to keep at the end (default: 3)
 * @returns The truncated address string
 */
export function truncateWalletAddress(address: string, startChars: number = 3, endChars: number = 3): string {
  if (!address) return ''

  // Check if address is long enough to truncate
  if (address.length <= startChars + endChars) {
    return address
  }

  const start = address.slice(0, startChars)
  const end = address.slice(-endChars)

  return `${start}...${end}`
}

// Generate a random UUID
export function randomUUID(): UUID {
  return URL.createObjectURL(new Blob()).split('/').pop() as UUID
}
