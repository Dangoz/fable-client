'use client'

import React, { useRef, useEffect } from 'react'
import type { UIMessage } from 'ai'
import Image from 'next/image'
import { usePrivy } from '@privy-io/react-auth'
import { truncateWalletAddress } from '@/lib/utils'
import type { UseChatHelpers } from '@ai-sdk/react'
import { motion } from 'motion/react'

type MessagesProps = {
  messages: Array<UIMessage>
  status: UseChatHelpers['status']
  userAvatar?: string
  className?: string
}

const Messages = ({ messages, status, userAvatar = '/default-avatar.jpg', className = '' }: MessagesProps) => {
  const { user } = usePrivy()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, status])

  return (
    <div
      ref={containerRef}
      className={`flex flex-col w-full max-w-2xl mx-auto overflow-y-scroll px-4 py-4
                 pb-32 flex-1 scroll-smooth bg-zinc-50/50 dark:bg-zinc-900/50 
                 rounded-lg backdrop-blur-sm ${className} h-full`}
      style={{
        scrollbarWidth: 'thin',
        maxHeight: 'calc(100vh - 200px)',
        overflowX: 'hidden',
      }}
    >
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center space-y-4 flex-1">
          <Image src="/chat-banner.svg" alt="Chat Banner" width={300} height={200} className="mb-4" priority />
          <div className="text-zinc-400 dark:text-zinc-500 text-sm">
            Good to see you{user?.wallet?.address && ` ${truncateWalletAddress(user?.wallet?.address)}`}, what can I
            help you with today?
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col space-y-4">
          {messages.map((message, index) => (
            <div
              key={message.id}
              className={`flex items-start gap-3 mb-4 
                        ${message.role === 'user' ? 'flex-row-reverse self-end' : 'self-start'} 
                        animate-fadeIn max-w-[90%] w-auto`}
            >
              {/* Avatar */}
              <div className="flex-shrink-0 mt-1">
                <div className="w-8 h-8 overflow-hidden rounded-full shadow-sm border border-zinc-200 dark:border-zinc-700">
                  <Image
                    src={message.role === 'user' ? userAvatar : '/default-avatar-green.jpg'}
                    alt={message.role === 'user' ? 'User Avatar' : 'AI Avatar'}
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Message bubble container */}
              <div className="relative group max-w-full">
                {/* Message content */}
                <div
                  className={`
                    relative rounded-lg px-4 py-2.5 break-words
                    ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100'
                    }
                    shadow-sm hover:shadow
                    transition-all duration-200 ease-in-out
                  `}
                >
                  {message.parts.map((part, i) => {
                    switch (part.type) {
                      case 'text':
                        return (
                          <div key={`${message.id}-${i}`} className="text-sm leading-relaxed">
                            {part.text}
                          </div>
                        )
                      case 'tool-invocation':
                        return (
                          <pre
                            key={`${message.id}-${i}`}
                            className="text-xs mt-2 p-2 bg-black/10 dark:bg-white/10 rounded-md overflow-x-auto"
                          >
                            {JSON.stringify(part.toolInvocation, null, 2)}
                          </pre>
                        )
                    }
                  })}
                </div>
              </div>
            </div>
          ))}

          {/* Show loading indicator when status is submitted */}
          {status === 'submitted' && (
            <div className="flex items-start gap-3 mb-4 self-start animate-fadeIn">
              {/* AI Avatar */}
              <div className="flex-shrink-0 mt-1">
                <div className="w-8 h-8 overflow-hidden rounded-full shadow-sm border border-zinc-200 dark:border-zinc-700">
                  <Image
                    src="/default-avatar-green.jpg"
                    alt="AI Avatar"
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Loading dots */}
              <div className="relative group max-w-full">
                <div className="relative rounded-lg px-4 py-4 break-words bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 shadow-sm">
                  <div className="flex space-x-2">
                    <motion.div
                      className="w-1.5 h-1.5 bg-zinc-400 dark:bg-zinc-500 rounded-full"
                      animate={{ y: [0, -4, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 1,
                        ease: 'easeInOut',
                        times: [0, 0.5, 1],
                      }}
                    />
                    <motion.div
                      className="w-1.5 h-1.5 bg-zinc-400 dark:bg-zinc-500 rounded-full"
                      animate={{ y: [0, -4, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 1,
                        ease: 'easeInOut',
                        times: [0, 0.5, 1],
                        delay: 0.2,
                      }}
                    />
                    <motion.div
                      className="w-1.5 h-1.5 bg-zinc-400 dark:bg-zinc-500 rounded-full"
                      animate={{ y: [0, -4, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 1,
                        ease: 'easeInOut',
                        times: [0, 0.5, 1],
                        delay: 0.4,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

export default Messages
