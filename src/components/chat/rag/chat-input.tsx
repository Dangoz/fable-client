'use client'

import type React from 'react'
import { useRef, useEffect, useCallback, memo } from 'react'
import { toast } from 'sonner'

import { ArrowUp as ArrowUpIcon, Square as StopIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import type { UseChatHelpers } from '@ai-sdk/react'
// import { SuggestedActions } from './SuggesedActions'

function PureChatInput({
  input,
  setInput,
  status,
  stop,
  handleSubmit,
  setMessages,
  className,
}: {
  input: UseChatHelpers['input']
  setInput: UseChatHelpers['setInput']
  status: UseChatHelpers['status']
  stop: () => void
  handleSubmit: UseChatHelpers['handleSubmit']
  setMessages: UseChatHelpers['setMessages']
  className?: string
  // append: UseChatHelpers['append']
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      adjustHeight()
    }
  }, [])

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight + 2}px`
    }
  }

  const resetHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = '98px'
    }
  }

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value)
    adjustHeight()
  }

  const submitForm = useCallback(() => {
    handleSubmit()
    resetHeight()
    textareaRef.current?.focus()
  }, [handleSubmit])

  return (
    <div className={`relative w-full flex flex-col px-0 py-0 ${className || ''} bg-card rounded-sm`}>
      {/* <SuggestedActions append={append} /> */}

      <Textarea
        data-testid="text-input"
        ref={textareaRef}
        placeholder="Send a message..."
        value={input}
        onChange={handleInput}
        className="min-h-24 max-h-52 overflow-y-auto resize-none rounded-sm !text-base focus:outline-none border-none focus:ring-0 shadow-none"
        rows={1}
        autoFocus
        onKeyDown={(event: React.KeyboardEvent<HTMLTextAreaElement>) => {
          if (event.key === 'Enter' && !event.shiftKey && !(event.metaKey || event.ctrlKey)) {
            event.preventDefault()

            if (status === 'ready') {
              submitForm()
            } else {
              toast.error('Please wait for the model to finish its response!')
            }
          } else if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
            event.preventDefault()
            setInput((prev) => prev + '\n')
            adjustHeight()
          }
        }}
      />

      <div className="absolute bottom-2 right-4 w-fit flex flex-row justify-end">
        {status === 'submitted' ? (
          <StopButton stop={stop} setMessages={setMessages} />
        ) : (
          <SendButton input={input} submitForm={submitForm} />
        )}
      </div>
    </div>
  )
}

export const ChatInput = memo(PureChatInput)

function PureStopButton({ stop, setMessages }: { stop: () => void; setMessages: UseChatHelpers['setMessages'] }) {
  return (
    <Button
      variant="outline"
      data-testid="stop-button"
      className="rounded-full p-1.5 h-fit border dark:border-zinc-600 bg-white/50 dark:bg-zinc-800/50 backdrop-blur-sm"
      onClick={(event: React.MouseEvent) => {
        event.preventDefault()
        stop()
        setMessages((messages) => messages)
      }}
    >
      <StopIcon size={14} />
    </Button>
  )
}

const StopButton = memo(PureStopButton)

function PureSendButton({ submitForm, input }: { submitForm: () => void; input: string }) {
  return (
    <Button
      variant="outline"
      data-testid="send-button"
      className="rounded-full p-1.5 h-fit border dark:border-zinc-600 bg-white/50 dark:bg-zinc-800/50 backdrop-blur-sm hover:bg-blue-50 dark:hover:bg-blue-950/30"
      onClick={(event: React.MouseEvent) => {
        event.preventDefault()
        submitForm()
      }}
      disabled={input.length === 0}
    >
      <ArrowUpIcon size={14} />
    </Button>
  )
}

const SendButton = memo(PureSendButton)
