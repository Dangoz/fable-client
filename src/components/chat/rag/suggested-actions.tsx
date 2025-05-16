'use client'

import { motion } from 'motion/react'
import { Button } from '@/components/ui/button'
import { memo } from 'react'
import { UseChatHelpers } from '@ai-sdk/react'

type SuggestedActionsProps = {
  append: UseChatHelpers['append']
}

const PureSuggestedActions = ({ append }: SuggestedActionsProps) => {
  const suggestedActions = [
    {
      title: 'Wallet Analysis',
      label: 'What can I do with my wallet?',
      action: 'What features are available with my connected wallet?',
    },
    {
      title: 'Get Started',
      label: 'How to use this platform',
      action: "I'm new here. How do I get started with this platform?",
    },
    {
      title: 'Account Management',
      label: 'How to update my profile',
      action: 'How can I update my account settings and profile information?',
    },
    {
      title: 'Technical Support',
      label: 'Help with connection issues',
      action: "I'm having trouble connecting my wallet. Can you help me troubleshoot?",
    },
  ]

  return (
    <div data-testid="suggested-actions" className="grid sm:grid-cols-2 gap-2 w-full">
      {suggestedActions.map((suggestedAction, index) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.05 * index }}
          key={`suggested-action-${suggestedAction.title}-${index}`}
          className={index > 1 ? 'hidden sm:block' : 'block'}
        >
          <Button
            variant="ghost"
            onClick={async () => {
              append({
                role: 'user',
                content: suggestedAction.action,
              })
            }}
            className="text-left border rounded-lg px-3 py-2 text-xs flex-1 gap-0.5 sm:flex-col w-full h-auto justify-start items-start"
          >
            <span className="font-medium">{suggestedAction.title}</span>
            <span className="text-muted-foreground text-xs">{suggestedAction.label}</span>
          </Button>
        </motion.div>
      ))}
    </div>
  )
}

export const SuggestedActions = memo(PureSuggestedActions, () => true)
