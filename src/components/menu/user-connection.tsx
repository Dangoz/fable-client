'use client'

import { Button } from '@/components/ui/button'
import UserAvatar from '@/components/menu/user-avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { LogIn } from 'lucide-react'
import { useAccount, useWalletClient } from 'wagmi'
import { useModal } from 'connectkit'
import { signMessageWith } from '@lens-protocol/react/viem'
import { LENS_APP_ID } from '@/config/lens'
import { useAuthenticatedUser, useLogin, evmAddress, useAccountsAvailable } from '@lens-protocol/react'
import LensLogoSVG from '@/components/common/lens-logo-svg'
import { useState } from 'react'

const UserConnection = () => {
  const { address, isConnected } = useAccount()
  const { setOpen } = useModal()
  const { data: walletClient } = useWalletClient()
  const { data: authenticatedUser } = useAuthenticatedUser()
  const { execute } = useLogin()
  const [isLoading, setIsLoading] = useState(false)

  // Only fetch accounts when address is available
  const { data: accountsAvailable } = useAccountsAvailable(address ? { managedBy: address } : { managedBy: '0x0' })

  const handleConnect = async () => {
    setOpen(true)
  }

  const handleSignIn = async () => {
    if (!walletClient) {
      return
    }

    setIsLoading(true)

    try {
      // new user without accounts, use onboardingUser
      if (!accountsAvailable || accountsAvailable.items.length === 0) {
        const result = await execute({
          onboardingUser: {
            wallet: evmAddress(address as string),
            app: evmAddress(LENS_APP_ID),
          },
          signMessage: signMessageWith(walletClient),
        })

        if (result.isErr()) {
          console.error(result.error)
        }

        return
      }

      // existing user with accounts
      const result = await execute({
        accountOwner: {
          account: evmAddress(accountsAvailable?.items[0]?.account.address as string),
          app: evmAddress(LENS_APP_ID),
          owner: evmAddress(address as string),
        },
        signMessage: signMessageWith(walletClient),
      })

      if (result.isErr()) {
        console.error(result.error)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

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

  if (isLoading) {
    return (
      <div>
        <Button variant={'gradient'} disabled>
          <Skeleton className="h-6 w-24" />
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
