import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { UUID } from '@elizaos/core'
import { sha1 } from 'js-sha1' // Need to add js-sha1 dependency

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

const SEED_KEY = 'fable-seed'

/**
 * Retrieves the persistent random seed from Local Storage.
 * If no seed exists, generates a new one using crypto.randomUUID() and saves it.
 * Handles potential exceptions during Local Storage access (e.g., in private browsing).
 * @returns {string | null} The seed string or null if Local Storage is unavailable.
 */
export function getOrGenerateSeed(): string | null {
  if (typeof window === 'undefined' || !window.localStorage) {
    console.warn('Local Storage not available. Cannot get or generate seed.')
    return null
  }

  try {
    let seed = localStorage.getItem(SEED_KEY)
    if (!seed) {
      console.log('Generating new persistence seed.')
      // Use crypto.randomUUID() for a strong random ID
      seed = crypto.randomUUID()
      localStorage.setItem(SEED_KEY, seed)
    }
    return seed
  } catch (error) {
    console.error('Error accessing Local Storage for seed:', error)
    return null
  }
}

/**
 * UUID-related utility functions
 * The following functions help with UUID generation and manipulation
 */

// Generate a random UUID
export function randomUUID(): UUID {
  return URL.createObjectURL(new Blob()).split('/').pop() as UUID
}

export function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    // in production, log error to console
    if (process.env.NODE_ENV !== 'development') {
      console.error('Assertion Failed:', message)
    } else {
      throw new Error('Assertion Failed: ' + message)
    }
  }
}

/**
 * Generates a deterministic Room ID for a specific query and user seed.
 * @param seed Unique user seed.
 * @param query The search query string.
 * @returns Deterministic UUID for the room.
 */
export function generateQueryRoomId(seed: string, query: string): string {
  // Simple sanitization and combination
  const sanitizedQuery = query.trim().toLowerCase().substring(0, 100) // Limit length
  const combinedString = `${seed}::query::${sanitizedQuery}`
  return generateUUIDFromString(combinedString)
}

/**
 * Converts a Uint8Array to a hexadecimal string.
 */
const uint8ArrayToHex = (buf: Uint8Array): string => {
  let out = ''
  for (let i = 0; i < buf.length; i++) {
    let h = buf[i].toString(16)
    if (h.length < 2) {
      h = '0' + h
    }
    out += h
  }
  return out
}

/**
 * Generates a deterministic UUID (version 5 like, using SHA-1) from a string.
 * Based on the core package's stringToUuid but uses js-sha1 for browser compatibility.
 * @param {string} inputString - The string to hash.
 * @returns {string} The generated UUID string.
 */
export function generateUUIDFromString(inputString: string): string {
  if (typeof inputString !== 'string') {
    throw new TypeError('Value must be a string')
  }

  // Get SHA-1 hash bytes
  const hashBytes = sha1.array(inputString)
  const hashBuffer = new Uint8Array(hashBytes)

  // Apply version (pseudo-v5 using SHA-1) and variant (RFC4122)
  hashBuffer[6] = (hashBuffer[6] & 0x0f) | 0x50 // Version 5
  hashBuffer[8] = (hashBuffer[8] & 0x3f) | 0x80 // Variant RFC4122

  // Format as UUID
  return `${uint8ArrayToHex(hashBuffer.slice(0, 4))}-${uint8ArrayToHex(hashBuffer.slice(4, 6))}-${uint8ArrayToHex(hashBuffer.slice(6, 8))}-${uint8ArrayToHex(hashBuffer.slice(8, 10))}-${uint8ArrayToHex(hashBuffer.slice(10, 16))}`
}
