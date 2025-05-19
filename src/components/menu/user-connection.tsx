'use client'

import { Button } from '@/components/ui/button'
import UserAvatar from '@/components/menu/user-avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { LogIn } from 'lucide-react'
import { useAccount, useWalletClient } from 'wagmi'
import { useModal } from 'connectkit'
import { client } from '@/lib/lens/client'
import { signMessageWith } from '@lens-protocol/client/viem'
import { LENS_APP_ID } from '@/config/lens'
import { useLensSession } from '@/context/lensSessionContext'

const UserConnection = () => {
  const { address, isConnected, isConnecting } = useAccount()
  const { setOpen } = useModal()
  const { data: walletClient } = useWalletClient()
  const { sessionClient, setSessionClient } = useLensSession()

  const handleConnect = async () => {
    setOpen(true)
  }

  const handleSignIn = async () => {
    if (!walletClient) return

    const authenticated = await client.login({
      onboardingUser: {
        app: LENS_APP_ID,
        wallet: address,
      },
      signMessage: signMessageWith(walletClient),
    })

    if (authenticated.isErr()) {
      return console.error(authenticated.error)
    }

    setSessionClient(authenticated.value)
  }

  if (isConnecting) {
    return <Skeleton className="h-9 w-[85px] border rounded-lg" />
  }

  if (!isConnected) {
    return (
      <div>
        <Button variant={'gradient'} onClick={handleConnect}>
          <LogIn className="mr-2 h-4 w-4" />
          Connect
        </Button>
      </div>
    )
  }

  if (!sessionClient) {
    return (
      <div>
        <Button variant={'gradient'} onClick={handleSignIn}>
          <LogIn className="mr-2 h-4 w-4" />
          Sign in
        </Button>
      </div>
    )
  }

  return (
    <div>
      <UserAvatar />
    </div>
  )
}

export default UserConnection
