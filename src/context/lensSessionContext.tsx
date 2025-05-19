'use client'

import { client } from '@/lib/lens/client'
import type { SessionClient } from '@lens-protocol/client'
import { createContext, useContext, useState, ReactNode, useEffect } from 'react'

interface LensSessionContextType {
  sessionClient: SessionClient | null
  setSessionClient: (sessionClient: SessionClient | null) => void
}

const LensSessionContext = createContext<LensSessionContextType | undefined>(undefined)

export const LensSessionProvider = ({ children }: { children: ReactNode }) => {
  const [sessionClient, setSessionClient] = useState<SessionClient | null>(null)

  useEffect(() => {
    const handleResumeSession = async () => {
      try {
        const resumed = await client.resumeSession()
        if (resumed.isErr()) {
          console.error(resumed.error)
        }
        const sessionClient = resumed.isOk() ? resumed.value : null
        setSessionClient(sessionClient)
      } catch (error) {
        console.error('Failed to resume Lens session:', error)
        setSessionClient(null)
      }
    }
    handleResumeSession()
  }, [])

  return (
    <LensSessionContext.Provider value={{ sessionClient, setSessionClient }}>{children}</LensSessionContext.Provider>
  )
}

export const useLensSession = () => {
  const context = useContext(LensSessionContext)
  if (!context) {
    throw new Error('useLensSession must be used within a LensSessionProvider')
  }
  return context
}
