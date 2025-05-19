'use client'

import { Button } from '@/components/ui/button'
import UserAvatar from '@/components/menu/user-avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { LogIn } from 'lucide-react'
import { useAccount } from 'wagmi'
import { useModal } from 'connectkit'

const UserConnection = () => {
  const { address, isConnecting, isDisconnected, isReconnecting } = useAccount()
  const { setOpen } = useModal()

  const handleConnect = async () => {
    setOpen(true)
  }

  if (isConnecting || isReconnecting) {
    return <Skeleton className="h-9 w-[85px] border rounded-lg" />
  }

  if (!address || isDisconnected) {
    return (
      <div>
        <Button variant={'gradient'} onClick={handleConnect}>
          <LogIn className="mr-2 h-4 w-4" />
          Sign in
        </Button>
      </div>
    )
  }

  return (
    <div className="flex items-center">
      <UserAvatar />
    </div>
  )
}

export default UserConnection
