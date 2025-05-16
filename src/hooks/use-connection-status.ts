'use client'

import { create } from 'zustand'
import { toast } from 'sonner'
import SocketIOManager from '@/lib/socketio-manager'

export type ConnectionStatusType = 'loading' | 'connected' | 'reconnecting' | 'error' | 'unauthorized'

interface ConnectionState {
  status: ConnectionStatusType
  error: string | null
  isFirstConnect: boolean
}

interface ConnectionActions {
  setStatus: (status: ConnectionStatusType) => void
  setError: (error: string | null) => void
  setupListeners: () => () => void
  cleanupListeners: () => void
}

type ConnectionStore = ConnectionState & ConnectionActions

export const useConnectionStore = create<ConnectionStore>((set, get) => {
  const socketManager = SocketIOManager.getInstance()

  const onConnect = () => {
    set({ status: 'connected', error: null })

    if (get().isFirstConnect) {
      set({ isFirstConnect: false })
    } else {
      toast.success('Connection Restored', {
        description: 'Successfully reconnected to the Eliza server.',
      })
    }
  }

  const onDisconnect = (reason: string) => {
    set({ status: 'error', error: `Connection lost: ${reason}` })
    toast.error('Connection Lost', {
      description: 'Attempting to reconnect to the Eliza server…',
    })
  }

  const onReconnectAttempt = () => {
    set({ status: 'reconnecting', error: 'Reconnecting...' })
  }

  const onConnectError = (err: Error) => {
    set({ status: 'error', error: err.message })
  }

  const onUnauthorized = (reason: string) => {
    set({ status: 'unauthorized', error: `Unauthorized: ${reason}` })
    toast.error('Unauthorized', {
      description: 'Please log in again.',
    })
  }

  return {
    status: 'loading',
    error: null,
    isFirstConnect: true,
    setStatus: (status) => set({ status }),
    setError: (error) => set({ error }),

    setupListeners: () => {
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

      return get().cleanupListeners
    },

    cleanupListeners: () => {
      socketManager.off('connect', onConnect)
      socketManager.off('disconnect', onDisconnect)
      socketManager.off('reconnect', onConnect)
      socketManager.off('reconnect_attempt', onReconnectAttempt)
      socketManager.off('connect_error', onConnectError)
      socketManager.off('unauthorized', onUnauthorized)
    },
  }
})

export const useConnectionStatus = () => {
  const { status, error, setupListeners } = useConnectionStore()

  // Setup listeners when the hook is first used
  useConnectionStore.getState().setupListeners()

  return { status, error }
}

// For direct access to the store state without the hook's side effects
export const getConnectionStatus = () => useConnectionStore.getState().status
export const getConnectionError = () => useConnectionStore.getState().error
