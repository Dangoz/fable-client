'use client'

import { useAuthenticatedUser, useAccount, evmAddress } from '@lens-protocol/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { User, Calendar, Globe } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function ProfilePage() {
  const { data: authenticatedUser, loading: authLoading } = useAuthenticatedUser()
  const router = useRouter()

  // Get account data for the authenticated user
  const { data: account, loading: accountLoading } = useAccount({
    address: authenticatedUser ? evmAddress(authenticatedUser.address as string) : '',
  })

  // Redirect to home if not authenticated
  useEffect(() => {
    if (!authLoading && !authenticatedUser) {
      router.push('/')
    }
  }, [authenticatedUser, authLoading, router])

  // Loading state
  if (authLoading || accountLoading) {
    return (
      <div className="w-full flex justify-center pt-20">
        <div className="w-full max-w-md px-4">
          <div className="p-6 rounded-lg border border-primary/10 backdrop-blur-sm bg-background/80 shadow-md">
            <div className="flex flex-col items-center space-y-4">
              <Skeleton className="h-24 w-24 rounded-full" />
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-20 w-full" />
              <div className="w-full space-y-2">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // If not authenticated, don't render anything (will be redirected by useEffect)
  if (!authenticatedUser || !account) {
    return null
  }

  // Extract website from attributes if available
  const websiteAttribute = account.metadata?.attributes?.find(
    (attr) => attr.key.toLowerCase() === 'website' || attr.key.toLowerCase() === 'url',
  )
  const website = websiteAttribute?.value
  return (
    <div className="w-full flex justify-center pt-20">
      <div className="w-full max-w-md px-4">
        <div className="rounded-lg border border-primary/10 backdrop-blur-sm bg-background/80 shadow-md overflow-hidden">
          {/* Header with background */}
          <div className="h-24 relative bg-gradient-to-r from-primary/20 to-primary/10 bg-cover bg-center">
            <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]"></div>
            {/* Avatar - positioned to overlap header and content */}
            <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 z-10">
              <Avatar className="h-24 w-24 border-4 border-background shadow-md">
                <AvatarImage
                  src={account.metadata?.picture || '/default-avatar.jpg'}
                  alt={account.username?.value || 'User'}
                  className="object-cover object-position-center"
                />
                <AvatarFallback className="bg-primary/10">
                  <User className="h-12 w-12 text-primary/40" />
                </AvatarFallback>
              </Avatar>
            </div>
          </div>

          {/* Content */}
          <div className="pt-16 pb-6 px-6">
            {/* User name and handle */}
            <div className="text-center mb-4">
              <h1 className="text-xl font-bold text-primary mb-1">{account.username?.value || 'Anonymous User'}</h1>
              {account.username?.localName && (
                <p className="text-sm text-muted-foreground">@{account.username.localName}</p>
              )}
            </div>

            {/* Bio */}
            {account.metadata?.bio && (
              <div className="mb-4 text-center">
                <p className="text-sm text-primary/80">{account.metadata.bio}</p>
              </div>
            )}

            <div className="h-px w-full bg-border my-4" />

            {/* User details */}
            <div className="space-y-3 pt-2">
              {website && (
                <div className="flex items-center gap-2 text-sm text-primary/70">
                  <Globe className="size-4 text-primary/60" />
                  <a
                    href={website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary hover:underline"
                  >
                    {website}
                  </a>
                </div>
              )}

              {account.createdAt && (
                <div className="flex items-center gap-2 text-sm text-primary/70">
                  <Calendar className="size-4 text-primary/60" />
                  <span>Joined {new Date(account.createdAt).toLocaleDateString()}</span>
                </div>
              )}
            </div>

            {/* Stats section */}
            <div className="mt-6 grid grid-cols-2 gap-4 text-center">
              <div className="p-3 rounded-md bg-primary/5">
                <div className="text-sm font-medium text-muted-foreground">Posts</div>
                <div className="text-xl font-semibold text-primary">0</div>
              </div>
              <div className="p-3 rounded-md bg-primary/5">
                <div className="text-sm font-medium text-muted-foreground">Followers</div>
                <div className="text-xl font-semibold text-primary">0</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
