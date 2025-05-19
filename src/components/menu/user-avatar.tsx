import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { useAccount } from 'wagmi'
import { truncateWalletAddress } from '@/lib/utils'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { LogOut } from 'lucide-react'
import { disconnect } from '@wagmi/core'
import { wagmiConfig } from '@/config/wagmi-config'

const UserAvatar = () => {
  const { address } = useAccount()

  if (!address) return null

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2 px-2 h-7 rounded-lg border border-primary/20 dark:border-primary/30 hover:border-primary/40 dark:hover:border-primary/50 transition-all duration-200">
          <Avatar className="border border-primary/20 dark:border-primary/30 h-5 w-5">
            <AvatarImage src={'/default-avatar.jpg'} />
            <AvatarFallback>
              <Skeleton className="size-5" />
            </AvatarFallback>
          </Avatar>
          <span className="text-xs font-medium text-foreground/80">{truncateWalletAddress(address)}</span>
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
