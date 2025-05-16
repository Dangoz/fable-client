import { create } from 'zustand'
import { useQueryClient } from '@tanstack/react-query'
import { ApiKeyDialog } from '@/components/common/api-key-dialog'
import { clientLogger } from '@/lib/logger'
import { ReactNode } from 'react'

// Managing client state API Key used to connect to eliza server
interface ServerAuthStore {
  isApiKeyDialogOpen: boolean
  openApiKeyDialog: () => void
  setIsApiKeyDialogOpen: (isOpen: boolean) => void
}

const useServerAuthStore = create<ServerAuthStore>((set) => ({
  isApiKeyDialogOpen: false,
  openApiKeyDialog: () => set({ isApiKeyDialogOpen: true }),
  setIsApiKeyDialogOpen: (isOpen) => set({ isApiKeyDialogOpen: isOpen }),
}))

export const ServerAuthProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient()
  const { isApiKeyDialogOpen, setIsApiKeyDialogOpen } = useServerAuthStore()

  const handleApiKeySaved = () => {
    setIsApiKeyDialogOpen(false)
    clientLogger.info('API key saved via dialog, invalidating ping query.')
    queryClient.invalidateQueries({ queryKey: ['ping'] })
  }

  return (
    <>
      {children}
      <ApiKeyDialog open={isApiKeyDialogOpen} onOpenChange={setIsApiKeyDialogOpen} onApiKeySaved={handleApiKeySaved} />
    </>
  )
}

export const useServerAuth = () => {
  const { openApiKeyDialog, isApiKeyDialogOpen } = useServerAuthStore()

  return {
    openApiKeyDialog,
    isApiKeyDialogOpen,
  }
}
