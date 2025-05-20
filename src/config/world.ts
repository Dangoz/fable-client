import type { FableWorld } from '@/types/world'
import { randomUUID } from '@/lib/utils'

export const SolarPunkWorld: FableWorld = {
  id: randomUUID(),
  name: 'Solar Punk',
  banner:
    'https://emerald-patient-puffin-220.mypinata.cloud/ipfs/bafybeihwdlb2ri2fiyeeeaichacjc3nipneyi266kpldq747lveg4css6q',
  lore: 'A world where the sun is the source of all energy and the people are solar powered.',
  tags: ['solarpunk', 'eco-utopia', 'sustainable'],
  agentIds: [],
}
