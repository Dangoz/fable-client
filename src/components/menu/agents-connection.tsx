'use client'

import { cn } from '@/lib/utils'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useConnection } from '@/context/connection-context'

const AgentsConnection: React.FC = () => {
  const { status, error } = useConnection()

  const getStatusColor = () => {
    switch (status) {
      case 'connected':
        return 'bg-green-500'
      case 'loading':
        return 'bg-yellow-400'
      case 'error':
        return 'bg-red-500'
      case 'unauthorized':
        return 'bg-red-500'
      default:
        return 'bg-gray-400'
    }
  }

  const getStatusLabel = () => {
    switch (status) {
      case 'connected':
        return 'Online'
      case 'loading':
        return 'Connecting'
      case 'error':
      case 'unauthorized':
        return 'Offline'
      default:
        return 'Disconnected'
    }
  }

  const getDetailedStatusText = () => {
    switch (status) {
      case 'connected':
        return 'Connected to Eliza server'
      case 'loading':
        return 'Connecting to Eliza server...'
      case 'error':
        return `Connection error: ${error || 'Unknown error'}`
      case 'unauthorized':
        return 'Unauthorized: Please log in again'
      default:
        return 'Unknown connection status'
    }
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center px-3 py-1 rounded-full bg-slate-100/5 border border-slate-200/10 h-7 space-x-2">
            <div className="relative h-2.5 w-2.5 flex items-center justify-center">
              <div className={cn('h-2.5 w-2.5 rounded-full', getStatusColor())} />
              {status === 'connected' && (
                <div className="absolute inset-0 rounded-full bg-green-500 animate-pulse opacity-70" />
              )}
            </div>
            <span className="text-xs font-medium text-slate-300">{getStatusLabel()}</span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{getDetailedStatusText()}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default AgentsConnection
