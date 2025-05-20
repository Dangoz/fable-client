'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { PlusIcon } from 'lucide-react'
import { FableWorld } from '@/types/world'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { SolarPunkWorld } from '@/config/world'

// Mock data based on our display needs
const mockWorlds: FableWorld[] = [
  {
    id: '12345678-1234-5678-1234-567812345678',
    name: 'Ethereal Kingdom',
    banner: '/images/world-1.jpg',
    lore: 'Long ago, the Ethereal Kingdom was formed when ancient magic fused with advanced technology...',
    agentIds: [
      'a1345678-1234-5678-1234-567812345678',
      'a2345678-1234-5678-1234-567812345678',
      'a3345678-1234-5678-1234-567812345678',
    ],
    tags: ['magic', 'technology', 'fantasy'],
  },
  {
    id: '22345678-1234-5678-1234-567812345678',
    name: 'Cyberpunk City',
    banner: '/images/world-2.jpg',
    lore: 'In the shadows of towering megacorporations, a resistance movement fights for freedom...',
    agentIds: ['a4345678-1234-5678-1234-567812345678', 'a5345678-1234-5678-1234-567812345678'],
    tags: ['cyberpunk', 'dystopian', 'rebellion'],
  },
]

// Component for displaying overlapping agent avatars
const AgentAvatars = ({ agentIds, maxDisplay = 3 }: { agentIds: string[]; maxDisplay?: number }) => {
  // Show only up to maxDisplay avatars
  const displayedAgents = agentIds.slice(0, maxDisplay)
  const remainingCount = agentIds.length - maxDisplay

  return (
    <div className="flex items-center">
      <div className="flex -space-x-2">
        {displayedAgents.map((agentId) => (
          <Avatar key={agentId} className="border-2 border-background">
            <AvatarFallback className="bg-gradient-to-br from-muted/70 to-muted" />
          </Avatar>
        ))}
      </div>

      {remainingCount > 0 && <span className="ml-2 text-xs text-white/90">+{remainingCount} more</span>}
    </div>
  )
}

// Component for displaying tags
const TagsList = ({ tags }: { tags: string[] }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-3">
      {tags.map((tag) => (
        <div
          key={tag}
          className="px-2 py-0.5 text-xs rounded-full border border-white/20 bg-gradient-to-r from-white/5 to-white/10"
        >
          {tag}
        </div>
      ))}
    </div>
  )
}

const WorldCard = ({ world }: { world: FableWorld }) => {
  // Fallback gradient for missing images
  const gradientBackground = 'bg-gradient-to-br from-secondary to-primary/30'

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl aspect-[3/4] transition-all duration-300 hover:scale-[1.02] group cursor-pointer',
        'shadow-lg border border-border/30 flex flex-col justify-end',
      )}
      style={{
        backgroundImage: world.banner && world.banner.startsWith('/') ? undefined : `url(${world.banner})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Fallback gradient if no image */}
      {(!world.banner || world.banner.startsWith('/')) && <div className={`absolute inset-0 ${gradientBackground}`} />}

      {/* Overlay gradient for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      {/* Content */}
      <div className="relative z-10 p-5 text-white">
        <h2 className="text-lg font-cinzel font-medium mb-2 line-clamp-1">{world.name}</h2>

        {/* Tags */}
        <TagsList tags={world.tags} />

        <div className="flex justify-between items-center">
          <AgentAvatars agentIds={world.agentIds} />
          <Button size="sm" variant="gradient" className="text-xs">
            Enter
          </Button>
        </div>
      </div>
    </div>
  )
}

const WorldPlusCard = () => {
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <>
      <div
        onClick={() => setDialogOpen(true)}
        className={cn(
          'relative overflow-hidden rounded-xl aspect-[3/4] transition-all duration-300 hover:scale-[1.02] group cursor-pointer',
          'shadow-lg border border-border/30 flex flex-col justify-center items-center',
          'bg-gradient-to-br from-secondary to-primary/30',
        )}
      >
        {/* Center plus icon */}
        <div className="flex-grow flex items-center justify-center">
          <PlusIcon size={64} className="text-white/70" />
        </div>

        {/* Button at bottom */}
        <div className="p-5 w-full">
          <Button size="sm" variant="gradient" className="w-full">
            Create a World
          </Button>
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-cinzel">In Construction</DialogTitle>
          </DialogHeader>
          <div className="py-4 text-center">
            <p>World Creation Coming Soon</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

const WorldHubPage = () => {
  const [worlds, setWorlds] = useState<FableWorld[]>([])

  // Simulate loading data
  useEffect(() => {
    // In a real app, fetch data from an API here
    setWorlds([SolarPunkWorld, ...mockWorlds])
  }, [])

  return (
    <div className="container mx-auto py-8 px-4 mt-16">
      <div className="flex flex-col items-start mb-4">
        <p className="text-muted-foreground">Explore interactive worlds with unique characters and stories</p>
      </div>

      {/* Responsive grid with 4-2 cards per row based on screen size */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {worlds.map((world) => (
          <WorldCard key={world.id} world={world} />
        ))}
        <WorldPlusCard />
      </div>
    </div>
  )
}

export default WorldHubPage
