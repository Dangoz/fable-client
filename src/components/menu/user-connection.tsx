'use client'

import { Button } from '@/components/ui/button'
import UserAvatar from '@/components/menu/user-avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { LogIn } from 'lucide-react'
import { ConnectKitButton } from 'connectkit'
import { useAccount } from 'wagmi'
// import { signMessageWith } from '@lens-protocol/client/viem'

const UserConnection = () => {
  const { isConnecting, isDisconnected } = useAccount()

  if (isConnecting) {
    return <Skeleton className="h-9 w-[85px] border rounded-lg" />
  }

  const handleSignIn = async (show: () => void) => {
    show()
  }

  if (isDisconnected) {
    return (
      <div>
        <ConnectKitButton.Custom>
          {({ show }) => (
            <Button variant={'gradient'} onClick={(show) => handleSignIn(show)}>
              <LogIn className="mr-2 h-4 w-4" />
              Sign in
            </Button>
          )}
        </ConnectKitButton.Custom>
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
