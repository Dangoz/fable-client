// Simplified representation of backend Memory type for parsing
export interface BackendMemory {
  id: string
  entityId: string // UUID of sender (user or agent)
  agentId: string // UUID of the agent this memory belongs to
  roomId: string // UUID of the room (which is also agentId in this case)
  content: {
    text?: string
    source?: string
    thought?: string
    actions?: string[]
    // other potential fields from backend Content
    [key: string]: unknown
  }
  metadata?: {
    entityName?: string
    // other potential metadata
    [key: string]: unknown
  }
  createdAt: number
  worldId?: string
  // other potential fields from backend Memory
  [key: string]: unknown
}
