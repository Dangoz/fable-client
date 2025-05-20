import { World as CoreWorld } from '@elizaos/core'

export interface FableWorld extends CoreWorld {
  banner: string
  lore: string
  agentIds: string[] // the ids of the agents in the world
}
