'use client'

import { useEffect } from 'react'
import Chat from '@/components/chat/rag/Chat'
// import clientLogger from '@/lib/logger'

interface ChatPageProps {
  params: {
    agentId: string
  }
}

const ChatPage = ({ params }: ChatPageProps) => {
  const { agentId } = params

  useEffect(() => {
    // clientLogger.info('Chat page loaded', { agentId, timestamp: new Date().toISOString() })
  }, [agentId])

  return (
    <div className="w-full h-full min-h-screen pt-20 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Chatting with Agent: {agentId}</h1>
      <Chat />
    </div>
  )
}

export default ChatPage
