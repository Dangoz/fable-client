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
      title: '解释我的命盘中',
      label: '紫微星和天同星的影响',
      action: '解释我的命盘中紫微星和天同星的影响',
    },
    {
      title: '分析我的命宫',
      label: '对事业的影响',
      action: '分析我的命宫对事业的影响',
    },
    {
      title: '我的财帛宫',
      label: '有什么特殊的星曜组合？',
      action: '我的财帛宫有什么特殊的星曜组合？',
    },
    {
      title: '今年的大运分析',
      label: '对我的感情有何影响？',
      action: '今年的大运分析对我的感情有何影响？',
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
