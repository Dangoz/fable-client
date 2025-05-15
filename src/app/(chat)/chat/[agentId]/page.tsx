import Chat from '@/components/chat/rag/Chat'

interface ChatPageProps {
  params: Promise<{
    agentId: string
  }>
}

const ChatPage = async ({ params }: ChatPageProps) => {
  const { agentId } = await params

  return (
    <div className="w-full h-full min-h-screen pt-20 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Chatting with Agent: {agentId}</h1>
      <Chat />
    </div>
  )
}

export default ChatPage
