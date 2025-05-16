'use client'

import { useConnectionStatus } from '@/hooks/use-connection-status'
import { cn } from '@/lib/utils'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

const AgentsConnection: React.FC = () => {
  const { status, error } = useConnectionStatus()

  const getStatusColor = () => {
    switch (status) {
      case 'connected':
        return 'bg-green-500'
      case 'loading':
      case 'reconnecting':
        return 'bg-gray-400'
      case 'error':
      case 'unauthorized':
        return 'bg-red-500'
      default:
        return 'bg-gray-400'
    }
  }

  const getStatusText = () => {
    switch (status) {
      case 'connected':
        return 'Connected to Eliza server'
      case 'loading':
        return 'Connecting to Eliza server...'
      case 'reconnecting':
        return 'Reconnecting to Eliza server...'
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
          <div className="relative h-4 w-4 flex items-center justify-center">
            <div className={cn('h-3 w-3 rounded-full', getStatusColor())} />
            {status === 'connected' && (
              <div className="absolute inset-0 rounded-full bg-green-500 animate-pulse opacity-75" />
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{getStatusText()}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default AgentsConnection
