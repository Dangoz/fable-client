import { useEffect, useRef } from 'react'
import { create } from 'zustand'
import { toast } from 'sonner'
import SocketIOManager from '@/lib/socketio-manager'

export type ConnectionStatusType = 'loading' | 'connected' | 'reconnecting' | 'error' | 'unauthorized'

interface ConnectionState {
  status: ConnectionStatusType
  error: string | null
}

interface ConnectionActions {
  setStatus: (status: ConnectionStatusType) => void
  setError: (error: string | null) => void
}

type ConnectionStore = ConnectionState & ConnectionActions

export const useConnectionStore = create<ConnectionStore>((set) => ({
  status: 'loading',
  error: null,
  setStatus: (status) => set({ status }),
  setError: (error) => set({ error }),
}))

export const useConnectionStatus = () => {
  const isFirstConnect = useRef(true)
  const { status, error, setStatus, setError } = useConnectionStore()

  useEffect(() => {
    const socketManager = SocketIOManager.getInstance()

    const onConnect = () => {
      setStatus('connected')
      setError(null)

      if (isFirstConnect.current) {
        isFirstConnect.current = false
      } else {
        toast.success('Connection Restored', {
          description: 'Successfully reconnected to the Eliza server.',
        })
      }
    }

    const onDisconnect = (reason: string) => {
      setStatus('error')
      setError(`Connection lost: ${reason}`)
      toast.error('Connection Lost', {
        description: 'Attempting to reconnect to the Eliza server…',
      })
    }

    const onReconnectAttempt = () => {
      setStatus('reconnecting')
      setError('Reconnecting...')
    }

    const onConnectError = (err: Error) => {
      setStatus('error')
      setError(err.message)
    }

    const onUnauthorized = (reason: string) => {
      setStatus('unauthorized')
      setError(`Unauthorized: ${reason}`)
      toast.error('Unauthorized', {
        description: 'Please log in again.',
      })
    }

    socketManager.on('connect', onConnect)
    socketManager.on('disconnect', onDisconnect)
    socketManager.on('reconnect', onConnect)
    socketManager.on('reconnect_attempt', onReconnectAttempt)
    socketManager.on('connect_error', onConnectError)
    socketManager.on('unauthorized', onUnauthorized)

    // trigger initial connect state
    if (SocketIOManager.isConnected()) {
      onConnect()
    }

    return () => {
      socketManager.off('connect', onConnect)
      socketManager.off('disconnect', onDisconnect)
      socketManager.off('reconnect', onConnect)
      socketManager.off('reconnect_attempt', onReconnectAttempt)
      socketManager.off('connect_error', onConnectError)
      socketManager.off('unauthorized', onUnauthorized)
    }
  }, [toast, setStatus, setError])

  return { status, error }
}

// For direct access to the store state without the hook's side effects
export const getConnectionStatus = () => useConnectionStore.getState().status
export const getConnectionError = () => useConnectionStore.getState().error
