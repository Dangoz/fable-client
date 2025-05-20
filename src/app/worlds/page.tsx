'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { PlusIcon } from 'lucide-react'
import { FableWorld } from '@/types/world'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { SolarPunkWorld, MockFantasyWorld } from '@/config/world'
import { apiClient } from '@/lib/api-client'
import { Skeleton } from '@/components/ui/skeleton'
import { useRouter } from 'next/navigation'
import { randomUUID } from '@/lib/utils'

// Interface for agent data with avatar
interface AgentWithAvatar {
  id: string
  name?: string
  avatarUrl?: string
}

// Component for displaying overlapping agent avatars
const AgentAvatars = ({ agents, maxDisplay = 3 }: { agents: AgentWithAvatar[]; maxDisplay?: number }) => {
  // Show only up to maxDisplay avatars
  const displayedAgents = agents.slice(0, maxDisplay)
  const remainingCount = agents.length - maxDisplay

  return (
    <div className="flex items-center">
      <div className="flex -space-x-2">
        {displayedAgents.map((agent) => (
          <Avatar key={agent.id} className="border-2 border-background">
            {agent.avatarUrl ? (
              <AvatarImage src={agent.avatarUrl} alt={agent.name || 'Agent'} />
            ) : (
              <AvatarFallback className="bg-gradient-to-br from-muted/70 to-muted">
                {agent.name?.charAt(0) || '?'}
              </AvatarFallback>
            )}
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

const WorldCard = ({ world, agentsData }: { world: FableWorld; agentsData: Record<string, AgentWithAvatar> }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  // Fallback gradient for missing images
  const gradientBackground = 'bg-gradient-to-br from-secondary to-primary/30'

  // Get agents data for this world
  const worldAgents = world.agentIds.map((id) => agentsData[id]).filter((agent) => agent !== undefined)

  const handleWorldClick = async (e: React.MouseEvent) => {
    // Don't trigger if the button was clicked directly (it handles its own click)
    if ((e.target as HTMLElement).closest('button')) {
      return
    }
    createGroupAndRedirect()
  }

  const createGroupAndRedirect = async () => {
    try {
      setLoading(true)
      // Create a unique server ID for the group chat
      const serverId = randomUUID()
      // Use the world's name as the room name
      const roomName = `${world.name} Council`
      // Create a group chat with all agents in the world
      await apiClient.createGroupChat(world.agentIds, roomName, serverId, 'world', { worldId: world.id })

      // Redirect to the council page for this group
      router.push(`/council/${serverId}`)
    } catch (error) {
      console.error('Error creating group chat:', error)
      setLoading(false)
      alert('Failed to create group chat. Please try again.')
    }
  }

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
      onClick={handleWorldClick}
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
          <AgentAvatars agents={worldAgents} />
          <Button size="sm" variant="gradient" className="text-xs" onClick={createGroupAndRedirect} disabled={loading}>
            {loading ? 'Loading...' : 'Enter'}
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

// Skeleton loader for world cards
const WorldCardSkeleton = () => {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl aspect-[3/4] transition-all',
        'shadow-lg border border-border/30 flex flex-col justify-end',
        'bg-gradient-to-br from-secondary/20 to-primary/10',
      )}
    >
      {/* Content skeleton */}
      <div className="relative z-10 p-5">
        <Skeleton className="h-6 w-3/4 mb-2" />

        {/* Tags skeleton */}
        <div className="flex flex-wrap gap-2 mb-3">
          <Skeleton className="h-4 w-16 rounded-full" />
          <Skeleton className="h-4 w-20 rounded-full" />
          <Skeleton className="h-4 w-14 rounded-full" />
        </div>

        <div className="flex justify-between items-center">
          {/* Agent avatars skeleton */}
          <div className="flex -space-x-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>

          {/* Button skeleton */}
          <Skeleton className="h-8 w-16 rounded-md" />
        </div>
      </div>
    </div>
  )
}

const WorldHubPage = () => {
  const [worlds, setWorlds] = useState<FableWorld[]>([])
  const [agentsData, setAgentsData] = useState<Record<string, AgentWithAvatar>>({})
  const [loading, setLoading] = useState(true)

  // Fetch all agents and add their IDs to SolarPunkWorld
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await apiClient.getAgents()

        if (response.data && response.data.agents) {
          // Get all agent IDs
          const allAgentIds = response.data.agents.map((agent) => agent.id || '').filter((id) => id !== '')

          // Clone SolarPunkWorld to avoid mutating the imported object
          const updatedSolarPunkWorld = {
            ...SolarPunkWorld,
            name: 'Solar Punk',
            // Add all agent IDs to SolarPunkWorld
            agentIds: allAgentIds,
          }

          setWorlds([updatedSolarPunkWorld, MockFantasyWorld])

          // Fetch detailed data for each agent
          const agentDetailsPromises = allAgentIds.map((id) =>
            apiClient
              .getAgent(id)
              .then((response) => ({
                id,
                name: response.data.name,
                avatarUrl: response.data.settings?.avatar,
              }))
              .catch((error) => {
                console.error(`Error fetching agent ${id}:`, error)
                return { id, name: 'Unknown', avatarUrl: undefined }
              }),
          )

          // Wait for all agent details to be fetched
          const agentsDetails = await Promise.all(agentDetailsPromises)

          // Create a map of agent IDs to agent details
          const agentsMap = agentsDetails.reduce(
            (map, agent) => {
              map[agent.id] = agent
              return map
            },
            {} as Record<string, AgentWithAvatar>,
          )

          setAgentsData(agentsMap)
        } else {
          setWorlds([SolarPunkWorld, MockFantasyWorld])
        }
      } catch (error) {
        console.error('Error fetching agents:', error)
        setWorlds([SolarPunkWorld])
      } finally {
        setLoading(false)
      }
    }

    fetchAgents()
  }, [])

  // Number of skeleton cards to show during loading
  const skeletonCount = 4

  return (
    <div className="container mx-auto py-8 px-4 mt-16">
      <div className="flex flex-col items-start mb-4">
        <p className="text-muted-foreground">Explore interactive worlds with unique characters and stories</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading ? (
          // Render skeleton cards while loading
          Array(skeletonCount)
            .fill(0)
            .map((_, index) => <WorldCardSkeleton key={`skeleton-${index}`} />)
        ) : (
          // Render actual world cards when loaded
          <>
            {worlds.map((world) => (
              <WorldCard key={world.id} world={world} agentsData={agentsData} />
            ))}
            <WorldPlusCard />
          </>
        )}
      </div>
    </div>
  )
}

export default WorldHubPage
