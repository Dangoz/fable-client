import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { useAccount } from 'wagmi'
import { truncateWalletAddress } from '@/lib/utils'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { LogOut } from 'lucide-react'
import { disconnect } from '@wagmi/core'
import { wagmiConfig } from '@/config/wagmi-config'
import { Button } from '@/components/ui/button'

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
          <DropdownMenuItem onClick={() => disconnect(wagmiConfig)}>
            <LogOut className="mr-1 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default UserAvatar
