'use client'

import { useState } from 'react'
import { truncateWalletAddress } from '@/lib/utils'
import { Copy, Check } from 'lucide-react'
import { useAccount } from 'wagmi'

const Stats = () => {
  const { address, isConnected, chain } = useAccount()
  const [copiedItemId, setCopiedItemId] = useState<string | null>(null)

  const copyToClipboard = (text: string, itemId: string) => {
    navigator.clipboard.writeText(text)
    setCopiedItemId(itemId)
    setTimeout(() => setCopiedItemId(null), 2000)
  }

  return (
    <div className="fixed bottom-20 left-5 z-[9999] flex flex-col items-start rounded-md p-2 border-2">
      <h1>Stats</h1>
      <div>Authentication: {`${isConnected}`}</div>
      <div>------------------</div>
      <div className="flex items-center gap-1">
        User ID:{' '}
        {address ? (
          <span className="flex items-center gap-1">
            <span>{truncateWalletAddress(address)}</span>
            <button
              onClick={() => copyToClipboard(address, 'userId')}
              className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {copiedItemId === 'userId' ? <Check size={14} /> : <Copy size={14} />}
            </button>
          </span>
        ) : (
          'Not logged in'
        )}
      </div>
      <div className="flex items-center gap-1">
        Wallet Address:{' '}
        {address ? (
          <span className="flex items-center gap-1">
            <span>{truncateWalletAddress(address)}</span>
            <button
              onClick={() => copyToClipboard(address, 'walletAddress')}
              className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              title="Copy full address"
            >
              {copiedItemId === 'walletAddress' ? <Check size={14} /> : <Copy size={14} />}
            </button>
          </span>
        ) : (
          'No wallet'
        )}
      </div>
      <div>Chain: {chain?.name}</div>
    </div>
  )
}

export default Stats
