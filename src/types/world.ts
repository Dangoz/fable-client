import { World as CoreWorld } from '@elizaos/core'

export interface FableWorld extends CoreWorld {
  banner: string // the banner image URL of the world
  lore: string // the lore of the world
  agentIds: string[] // the ids of the agents in the world
}
