'use client'

import { Button } from '@/components/ui/button'
import UserAvatar from '@/components/menu/user-avatar'
// import { Skeleton } from '@/components/ui/skeleton'
import { LogIn } from 'lucide-react'
import { useAccount, useWalletClient } from 'wagmi'
import { useModal } from 'connectkit'
import { signMessageWith } from '@lens-protocol/react/viem'
import { LENS_APP_ID } from '@/config/lens'
import { useAuthenticatedUser, useLogin, evmAddress } from '@lens-protocol/react'
import LensLogoSVG from '@/components/common/lens-logo-svg'

const UserConnection = () => {
  const { address, isConnected } = useAccount()
  const { setOpen } = useModal()
  const { data: walletClient } = useWalletClient()
  const { data: authenticatedUser } = useAuthenticatedUser()
  const { execute } = useLogin()

  const handleConnect = async () => {
    setOpen(true)
  }

  const handleSignIn = async () => {
    if (!walletClient) {
      return
    }
    const address = walletClient.account.address

    const result = await execute({
      onboardingUser: {
        wallet: evmAddress(address),
        app: evmAddress(LENS_APP_ID),
      },
      // accountOwner: {
      //   account: evmAddress(address),
      //   app: evmAddress(LENS_APP_ID),
      //   owner: evmAddress(address),
      // },
      signMessage: signMessageWith(walletClient),
    })

    if (result.isErr()) {
      console.error(result.error)
    }
  }

  // if (isConnecting) {
  //   return <Skeleton className="h-9 w-[85px] border rounded-lg" />
  // }

  if (!isConnected || !address) {
    return (
      <div>
        <Button variant={'gradient'} onClick={handleConnect}>
          <LogIn className="mr-2 h-4 w-4" />
          Connect
        </Button>
      </div>
    )
  }

  if (!authenticatedUser) {
    return (
      <div>
        <Button variant={'gradient'} onClick={handleSignIn}>
          <LensLogoSVG className="h-6 w-6" />
          Sign in with Lens
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
