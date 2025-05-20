'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams } from 'next/navigation'
import { apiClient } from '@/lib/api-client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ArrowUp as ArrowUpIcon } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import Image from 'next/image'
import type { UUID } from '@elizaos/core'

// Interface for agent data
interface AgentWithAvatar {
  id: string
  name: string
  avatarUrl?: string
}

// Interface for memory/message
interface Message {
  id?: string
  content: string
  role: 'agent' | 'user'
  agentId?: string
  timestamp: number
}

// Interface for memory from API
interface Memory {
  id: string
  content: string
  entity_id?: string
  created_at: number
  [key: string]: any
}

const CouncilPage = () => {
  const params = useParams()
  const roomId = params.groupId as string

  const [agents, setAgents] = useState<AgentWithAvatar[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [worldName, setWorldName] = useState('Group Chat')
  const [primaryAgentId, setPrimaryAgentId] = useState<string | null>(null)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Fetch room info, agents and messages on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        // Fetch all agents first
        const agentsResponse = await apiClient.getAgents()

        if (agentsResponse.data && agentsResponse.data.agents) {
          // Fetch agent details and track the primary agent
          const agentDetails = await Promise.all(
            agentsResponse.data.agents.map((agent) =>
              apiClient
                .getAgent(agent.id || '')
                .then((resp) => ({
                  id: agent.id || '',
                  name: resp.data.name,
                  avatarUrl: resp.data.settings?.avatar,
                }))
                .catch(() => ({
                  id: agent.id || '',
                  name: 'Unknown Agent',
                  avatarUrl: undefined,
                })),
            ),
          )

          setAgents(agentDetails)

          // Try to determine world name from agents
          if (agentDetails.length > 0) {
            if (agentDetails[0].name.includes('Solar')) {
              setWorldName('Solar Punk World')
            }
            // Set the first agent as primary for fetching room data
            setPrimaryAgentId(agentDetails[0].id)
          }

          // Fetch room info if we have a primary agent
          if (agentDetails.length > 0) {
            try {
              const primaryAgent = agentDetails[0]

              // Get room info - use getRooms to find the room since getRoom might not exist
              const roomsResponse = await apiClient.getRooms()

              if (roomsResponse.rooms) {
                // Find the room with the matching ID
                const room = roomsResponse.rooms.find((r: any) => r.id === roomId)

                if (room) {
                  // Use the actual room name if available
                  if (room.name) {
                    setWorldName(room.name)
                  }
                }
              }

              // Fetch messages for this room
              const memoriesResponse = await apiClient.getMemories(primaryAgent.id, roomId as UUID)

              if (memoriesResponse && memoriesResponse.memories) {
                // Transform memories to messages format
                const formattedMessages = memoriesResponse.memories
                  .map((memory: Memory) => ({
                    id: memory.id,
                    content: memory.content,
                    role: memory.entity_id ? 'agent' : 'user',
                    agentId: memory.entity_id,
                    timestamp: memory.created_at,
                  }))
                  .sort((a: Message, b: Message) => a.timestamp - b.timestamp)

                setMessages(formattedMessages)
              }
            } catch (error) {
              console.error('Error fetching room data:', error)
            }
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    if (roomId) {
      fetchData()
    }
  }, [roomId])

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  // Handle textarea height
  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight + 2}px`
    }
  }

  // Reset textarea height
  const resetHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = '98px'
    }
  }

  // Handle message submission
  const handleSubmit = async () => {
    if (!input.trim() || sending || !primaryAgentId) return

    // Add user message to UI immediately
    const userMessage: Message = {
      content: input,
      role: 'user',
      timestamp: Date.now(),
    }
    setMessages((prev) => [...prev, userMessage])

    // Clear input
    setInput('')
    resetHeight()

    try {
      setSending(true)

      // Use speechConversation instead, which we know exists in the API
      await apiClient.speechConversation(primaryAgentId, input, { roomId: roomId as UUID })

      // Refresh the messages after sending
      setTimeout(async () => {
        try {
          if (primaryAgentId) {
            const memoriesResponse = await apiClient.getMemories(primaryAgentId, roomId as UUID)

            if (memoriesResponse && memoriesResponse.memories) {
              const formattedMessages = memoriesResponse.memories
                .map((memory: Memory) => ({
                  id: memory.id,
                  content: memory.content,
                  role: memory.entity_id ? 'agent' : 'user',
                  agentId: memory.entity_id,
                  timestamp: memory.created_at,
                }))
                .sort((a: Message, b: Message) => a.timestamp - b.timestamp)

              setMessages(formattedMessages)
            }
          }
        } catch (error) {
          console.error('Error refreshing messages:', error)
        }
      }, 1000) // Wait a second for the backend to process
    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      setSending(false)
    }
  }

  // Find agent by ID
  const findAgent = (agentId?: string) => {
    return agents.find((a) => a.id === agentId)
  }

  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto px-4">
      {/* Agent Avatars Section */}
      <div className="flex justify-center items-center py-4 border-b">
        {loading ? (
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="w-10 h-10 rounded-full" />
            ))}
          </div>
        ) : (
          <div className="flex -space-x-3">
            {agents.map((agent) => (
              <Avatar key={agent.id} className="border-2 border-background w-10 h-10">
                {agent.avatarUrl ? (
                  <AvatarImage src={agent.avatarUrl} alt={agent.name} />
                ) : (
                  <AvatarFallback className="bg-gradient-to-br from-muted/70 to-muted">
                    {agent.name.charAt(0)}
                  </AvatarFallback>
                )}
              </Avatar>
            ))}
          </div>
        )}
        <h1 className="ml-4 text-lg font-medium">{worldName}</h1>
      </div>

      {/* Messages Section */}
      <div
        className="flex-1 overflow-y-auto py-4 px-2 bg-zinc-50/50 dark:bg-zinc-900/50 my-4 rounded-lg"
        style={{ scrollbarWidth: 'thin' }}
      >
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start gap-3">
                <Skeleton className="w-8 h-8 rounded-full" />
                <Skeleton className="h-20 w-4/5 rounded-lg" />
              </div>
            ))}
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full space-y-4">
            <div className="text-zinc-400 dark:text-zinc-500 text-sm">
              Start a conversation with the characters in this world
            </div>
          </div>
        ) : (
          <div className="flex flex-col space-y-4">
            {messages.map((message, index) => {
              const agent = message.role === 'agent' ? findAgent(message.agentId) : null

              return (
                <div
                  key={index}
                  className={`flex items-start gap-3 mb-4 
                           ${message.role === 'user' ? 'flex-row-reverse self-end' : 'self-start'} 
                           animate-fadeIn max-w-[85%] w-auto`}
                >
                  {/* Avatar */}
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-8 h-8 overflow-hidden rounded-full shadow-sm border border-zinc-200 dark:border-zinc-700">
                      {message.role === 'user' ? (
                        <Image
                          src="/default-avatar.jpg"
                          alt="User Avatar"
                          width={32}
                          height={32}
                          className="object-cover"
                        />
                      ) : agent?.avatarUrl ? (
                        <Image src={agent.avatarUrl} alt={agent.name} width={32} height={32} className="object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted/70 to-muted text-xs">
                          {agent?.name.charAt(0) || '?'}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Message bubble */}
                  <div className="relative group max-w-full">
                    {/* Agent name for agent messages */}
                    {message.role === 'agent' && agent && (
                      <div className="text-xs text-zinc-500 mb-1">{agent.name}</div>
                    )}

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
                      <div className="text-sm leading-relaxed">{message.content}</div>
                    </div>
                  </div>
                </div>
              )
            })}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Section */}
      <div className="relative w-full mb-6 bg-card rounded-sm">
        <Textarea
          ref={textareaRef}
          placeholder="Send a message..."
          value={input}
          onChange={(e) => {
            setInput(e.target.value)
            adjustHeight()
          }}
          className="min-h-24 max-h-52 overflow-y-auto resize-none rounded-sm !text-base focus:outline-none border-none focus:ring-0 shadow-none"
          rows={1}
          autoFocus
          onKeyDown={(event) => {
            if (event.key === 'Enter' && !event.shiftKey && !(event.metaKey || event.ctrlKey)) {
              event.preventDefault()
              handleSubmit()
            } else if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
              event.preventDefault()
              setInput((prev) => prev + '\n')
              adjustHeight()
            }
          }}
        />

        <div className="absolute bottom-2 right-4 w-fit flex flex-row justify-end">
          <Button
            variant="outline"
            className="rounded-full p-1.5 h-fit border dark:border-zinc-600 bg-white/50 dark:bg-zinc-800/50 backdrop-blur-sm hover:bg-blue-50 dark:hover:bg-blue-950/30"
            onClick={handleSubmit}
            disabled={!input.trim() || sending || !primaryAgentId}
          >
            <ArrowUpIcon size={14} />
          </Button>
        </div>
      </div>

      {/* CSS for animations */}
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

export default CouncilPage
