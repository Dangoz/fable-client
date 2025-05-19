import type { FragmentOf } from '@lens-protocol/client'
import { AccountFragment, AccountMetadataFragment } from './accounts'
import { PostMetadataFragment } from './posts'
import { CustomMediaImageFragment } from './images'

/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-empty-object-type */
declare module '@lens-protocol/client' {
  export interface Account extends FragmentOf<typeof AccountFragment> {}
  export interface AccountMetadata extends FragmentOf<typeof AccountMetadataFragment> {}
  export interface MediaImage extends FragmentOf<typeof CustomMediaImageFragment> {}
  export type PostMetadata = FragmentOf<typeof PostMetadataFragment>
}

export const fragments = [AccountFragment, PostMetadataFragment]
