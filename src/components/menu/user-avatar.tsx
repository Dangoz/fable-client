'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { LogOut } from 'lucide-react'
import { disconnect, http } from '@wagmi/core'
import { Button } from '@/components/ui/button'
import { LENS_CHAIN, LENS_CHAIN_RPC } from '@/config/lens'
import { useLogout, useAuthenticatedUser, useAccount, evmAddress } from '@lens-protocol/react'
import { createConfig } from 'wagmi'

const UserAvatar = () => {
  const { data: authenticatedUser } = useAuthenticatedUser()
  const { data: account } = useAccount({
    address: evmAddress(authenticatedUser?.address as string),
  })
  const { execute } = useLogout()

  const handleLogout = async () => {
    // sign out from lens
    await execute()
    // disconnect from wagmi
    await disconnect(
      createConfig({
        chains: [LENS_CHAIN],
        transports: {
          [LENS_CHAIN.id]: http(LENS_CHAIN_RPC),
        },
      }),
    )
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="gradient" className="flex items-center gap-2 h-9 px-3">
            <Avatar className="h-7 w-7">
              <AvatarImage src={account?.metadata?.picture || '/default-avatar.jpg'} />
              <AvatarFallback>
                <Skeleton className="size-7" />
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">{account?.username?.value}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>{account?.username?.value}</DropdownMenuItem>

          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-1 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default UserAvatar
