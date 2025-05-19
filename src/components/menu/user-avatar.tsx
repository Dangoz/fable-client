import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { useAccount, createConfig } from 'wagmi'
import { truncateWalletAddress } from '@/lib/utils'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { LogOut } from 'lucide-react'
import { disconnect, http } from '@wagmi/core'
import { Button } from '@/components/ui/button'
import { LENS_CHAIN, LENS_CHAIN_RPC } from '@/config/lens'

const UserAvatar = () => {
  const { address } = useAccount()

  if (!address) return null

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
            <span className="text-xs font-medium">{truncateWalletAddress(address)}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>{truncateWalletAddress(address)}</DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              disconnect(
                createConfig({
                  chains: [LENS_CHAIN],
                  transports: {
                    [LENS_CHAIN.id]: http(LENS_CHAIN_RPC),
                  },
                }),
              )
            }}
          >
            <LogOut className="mr-1 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default UserAvatar
