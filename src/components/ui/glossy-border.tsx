import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const glossyBorderVariants = cva(
  'w-full flex flex-col items-center relative backdrop-blur-sm dark:border shadow-lg bg-gradient-to-br dark:shadow-lg shadow-md border-[0.5px]',
  {
    variants: {
      variant: {
        default: '',
        purple: '',
        blue: '',
        primary: '',
        foreground: '',
      },
      borderColor: {
        true: '',
        false: 'dark:from-white/10 dark:to-white/5 dark:border-white/20 from-black/5 to-black/10 border-black/10',
      },
      size: {
        sm: 'p-1 lg:p-2 rounded-2xl shadow-sm',
        md: 'p-2 lg:p-3 rounded-3xl shadow-md',
        lg: 'p-3 lg:p-5 rounded-4xl shadow-lg',
      },
    },
    compoundVariants: [
      {
        borderColor: true,
        variant: 'default',
        className: 'dark:from-white/10 dark:to-white/5 dark:border-white/20 from-black/5 to-black/10 border-black/10',
      },
      {
        borderColor: true,
        variant: 'purple',
        className:
          'dark:from-purple-500/5 dark:to-purple-500/10 dark:border-purple-500/20 from-purple-500/15 to-purple-500/20 border-purple-500/15',
      },
      {
        borderColor: true,
        variant: 'blue',
        className:
          'dark:from-blue-500/5 dark:to-blue-500/10 dark:border-blue-500/20 from-blue-500/15 to-blue-500/20 border-blue-500/15',
      },
      {
        borderColor: true,
        variant: 'primary',
        className:
          'dark:from-primary/5 dark:to-primary/10 dark:border-primary/20 from-primary/15 to-primary/20 border-primary/15',
      },
      {
        borderColor: true,
        variant: 'foreground',
        className:
          'dark:from-foreground/5 dark:to-foreground/10 dark:border-foreground/20 from-foreground/10 to-foreground/15 border-foreground/10',
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'md',
      borderColor: false,
    },
  },
)

const glossyGlowVariants = cva('absolute inset-0 pointer-events-none', {
  variants: {
    variant: {
      default: 'bg-gradient-to-br dark:from-card/20 dark:to-card/10 from-black/10 to-black/5',
      purple: 'bg-gradient-to-br dark:from-purple-500/20 dark:to-indigo-600/20 from-purple-500/25 to-indigo-600/25',
      blue: 'bg-gradient-to-br dark:from-blue-500/20 dark:to-cyan-600/20 from-blue-500/25 to-cyan-600/25',
      primary: 'bg-gradient-to-br dark:from-primary/20 dark:to-primary/10 from-primary/25 to-primary/15',
      foreground: 'bg-gradient-to-br dark:from-foreground/20 dark:to-foreground/10 from-foreground/15 to-foreground/10',
    },
    size: {
      sm: 'rounded-2xl blur-md dark:blur-md blur-sm',
      md: 'rounded-3xl blur-lg dark:blur-lg blur-md',
      lg: 'rounded-4xl blur-xl dark:blur-xl blur-lg',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
})

const glossyInnerVariants = cva('w-full overflow-auto relative z-10 dark:border border-[0.5px]', {
  variants: {
    size: {
      sm: 'p-1 lg:p-1.5 rounded-md',
      md: 'p-1.5 lg:p-3 rounded-2xl',
      lg: 'p-2.5 lg:p-5 rounded-3xl',
    },
    variant: {
      default: 'bg-card/90 dark:border-white/10 border-black/5',
      purple: 'bg-card/90 dark:border-purple-500/10 border-purple-500/10',
      blue: 'bg-card/90 dark:border-blue-500/10 border-blue-500/10',
      primary: 'bg-card/90 dark:border-primary/10 border-primary/10',
      foreground: 'bg-card/90 dark:border-foreground/10 border-foreground/5',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'default',
  },
})

interface GlossyBorderProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof glossyBorderVariants> {
  children: React.ReactNode
  glowClassName?: string
  innerClassName?: string
  borderColor?: boolean
}

function GlossyBorder({
  children,
  className,
  glowClassName,
  innerClassName,
  variant,
  size,
  borderColor = false,
  ...props
}: GlossyBorderProps) {
  return (
    <div
      data-slot="glossy-border"
      className={cn(glossyBorderVariants({ variant, size, borderColor, className }))}
      {...props}
    >
      <div className={cn(glossyGlowVariants({ variant, size }), glowClassName)} />
      <div className={cn(glossyInnerVariants({ variant, size }), innerClassName)}>{children}</div>
    </div>
  )
}

export { GlossyBorder, glossyBorderVariants, glossyGlowVariants, glossyInnerVariants }
