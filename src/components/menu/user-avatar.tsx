import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { useAccount, createConfig } from 'wagmi'
import { truncateWalletAddress } from '@/lib/utils'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { LogOut } from 'lucide-react'
import { disconnect, http } from '@wagmi/core'
import { Button } from '@/components/ui/button'
import { LENS_CHAIN, LENS_CHAIN_RPC } from '@/config/lens'
import { useAuthenticatedUser, useLogout } from '@lens-protocol/react'

const UserAvatar = () => {
  const { address } = useAccount()
  const { data: authenticatedUser } = useAuthenticatedUser()
  const { execute } = useLogout()

  if (!address || !authenticatedUser) return null

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
          <Button variant="gradient" size="sm" className="h-7">
            <Avatar className="h-5 w-5 mr-1">
              <AvatarImage src={'/default-avatar.jpg'} />
              <AvatarFallback>
                <Skeleton className="size-5" />
              </AvatarFallback>
            </Avatar>
            <span className="text-xs font-medium">
              <div>{authenticatedUser.address || truncateWalletAddress(address)}</div>
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>{truncateWalletAddress(address)}</DropdownMenuItem>
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
