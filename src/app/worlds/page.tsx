'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

// Create a mock interface that matches what we need for display
interface MockWorld {
  id: string
  name: string
  banner: string
  lore: string
  agentIds: string[]
  tags: string[]
}

// Mock data based on our display needs
const mockWorlds: MockWorld[] = [
  {
    id: '12345678-1234-5678-1234-567812345678',
    name: 'Ethereal Kingdom',
    banner: '/images/world-1.jpg',
    lore: 'Long ago, the Ethereal Kingdom was formed when ancient magic fused with advanced technology...',
    agentIds: ['agent1', 'agent2', 'agent3'],
    tags: ['magic', 'technology', 'fantasy'],
  },
  {
    id: '22345678-1234-5678-1234-567812345678',
    name: 'Cyberpunk City',
    banner: '/images/world-2.jpg',
    lore: 'In the shadows of towering megacorporations, a resistance movement fights for freedom...',
    agentIds: ['agent4', 'agent5'],
    tags: ['cyberpunk', 'dystopian', 'rebellion'],
  },
  {
    id: '32345678-1234-5678-1234-567812345678',
    name: 'Aquatic Depths',
    banner: '/images/world-3.jpg',
    lore: 'Beneath the waves lies a society of advanced beings who have mastered the ocean...',
    agentIds: ['agent6', 'agent7', 'agent8', 'agent9'],
    tags: ['underwater', 'mystery', 'exploration'],
  },
  {
    id: '42345678-1234-5678-1234-567812345678',
    name: 'Desert Nomads',
    banner: '/images/world-4.jpg',
    lore: 'The nomads of the great desert have survived for millennia by following ancient traditions...',
    agentIds: ['agent10', 'agent11'],
    tags: ['desert', 'survival', 'tradition'],
  },
  {
    id: '52345678-1234-5678-1234-567812345678',
    name: 'Sky Islands',
    banner: '/images/world-5.jpg',
    lore: 'When the continents shattered, the islands rose into the sky, forever changing civilization...',
    agentIds: ['agent12', 'agent13', 'agent14'],
    tags: ['floating', 'adventure', 'discovery'],
  },
  {
    id: '62345678-1234-5678-1234-567812345678',
    name: 'Frozen Frontier',
    banner: '/images/world-6.jpg',
    lore: 'After the eternal frost descended, only the most resourceful communities endured...',
    agentIds: ['agent15', 'agent16'],
    tags: ['winter', 'survival', 'isolation'],
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

const WorldCard = ({ world }: { world: MockWorld }) => {
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

const WorldHubPage = () => {
  const [worlds, setWorlds] = useState<MockWorld[]>([])

  // Simulate loading data
  useEffect(() => {
    // In a real app, fetch data from an API here
    setWorlds(mockWorlds)
  }, [])

  return (
    <div className="container mx-auto py-8 px-4 mt-16">
      <div className="flex flex-col items-start mb-4">
        <p className="text-muted-foreground">Explore interactive worlds with unique characters and stories</p>
      </div>

      {/* Responsive grid with 4-2 cards per row based on screen size */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
        {worlds.map((world) => (
          <WorldCard key={world.id} world={world} />
        ))}
      </div>
    </div>
  )
}

export default WorldHubPage
