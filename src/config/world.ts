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

export const MockFantasyWorld: FableWorld = {
  id: randomUUID(),
  name: 'Fantasy',
  banner: '',
  lore: 'A world of magic and adventure.',
  tags: ['fantasy', 'adventure', 'magic'],
  agentIds: [
    'a1345678-1234-5678-1234-567812345678',
    'a2345678-1234-5678-1234-567812345678',
    'a3345678-1234-5678-1234-567812345678',
    'a4345678-1234-5678-1234-567812345678',
    'a5345678-1234-5678-1234-567812345678',
  ],
}
