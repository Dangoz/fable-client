'use client'

import { useChat } from '@ai-sdk/react'
import { ChatInput } from './ChatInput'
import Messages from './Messages'
import { GlossyBorder } from '@/components/ui/glossy-border'

const Chat = () => {
  const { messages, setMessages, input, setInput, handleSubmit, status, stop } = useChat({
    maxSteps: 3,
  })
  return (
    <div className="flex flex-col w-full h-full items-center relative flex-1">
      <Messages messages={messages} />

      <div className="fixed inset-x-0 bottom-0 z-10">
        <GlossyBorder variant="blue" size="md" borderColor className="mx-auto max-w-2xl rounded-b-none border-b-0 pb-0">
          <form className="flex justify-center w-full">
            <ChatInput
              input={input}
              setInput={setInput}
              status={status}
              stop={stop}
              handleSubmit={handleSubmit}
              setMessages={setMessages}
            />
          </form>
        </GlossyBorder>
      </div>
    </div>
  )
}

export default Chat
