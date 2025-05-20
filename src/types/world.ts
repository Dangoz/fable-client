import type { UUID } from '@elizaos/core'

export interface FableWorld {
  id: UUID
  name: string
  banner: string // the banner image URL of the world
  lore: string // the lore of the world
  tags: string[] // the tags of the world that relevant to the theme of the world
  agentIds: UUID[] // the ids of the agents in the world
}
