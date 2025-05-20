'use client'

import { Button } from '@/components/ui/button'
import UserAvatar from '@/components/menu/user-avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { LogIn, Check } from 'lucide-react'
import { useAccount, useWalletClient } from 'wagmi'
import { useModal } from 'connectkit'
import { signMessageWith } from '@lens-protocol/react/viem'
import { LENS_APP_ID } from '@/config/lens'
import { useAuthenticatedUser, useLogin, evmAddress, useAccountsAvailable } from '@lens-protocol/react'
import LensLogoSVG from '@/components/common/lens-logo-svg'
import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

const UserConnection = () => {
  const { address, isConnected } = useAccount()
  const { setOpen } = useModal()
  const { data: walletClient } = useWalletClient()
  const { data: authenticatedUser } = useAuthenticatedUser()
  const { execute } = useLogin()
  const [isLoading, setIsLoading] = useState(false)
  const [isAccountDialogOpen, setIsAccountDialogOpen] = useState(false)
  const [selectedAccountIndex, setSelectedAccountIndex] = useState(0)

  // Only fetch accounts when address is available
  const { data: accountsAvailable } = useAccountsAvailable(address ? { managedBy: address } : { managedBy: '0x0' })

  const handleConnect = async () => {
    setOpen(true)
  }

  const handleOpenAccountDialog = () => {
    if (!accountsAvailable || accountsAvailable.items.length === 0) {
      // New user without accounts, proceed with onboarding
      handleSignIn(null)
      return
    }

    // Set first account as default selection
    setSelectedAccountIndex(0)
    setIsAccountDialogOpen(true)
  }

  const handleSignIn = async (accountIndex: number | null) => {
    if (!walletClient) {
      return
    }

    setIsLoading(true)
    setIsAccountDialogOpen(false)

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

      // Use selected account or default to first one
      const accountToUse = accountIndex !== null ? accountsAvailable.items[accountIndex] : accountsAvailable.items[0]

      // existing user with accounts
      const result = await execute({
        accountOwner: {
          account: evmAddress(accountToUse.account.address as string),
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
        <Button variant={'gradient'} onClick={handleOpenAccountDialog}>
          <LensLogoSVG className="h-6 w-6" />
          Sign in with Lens
        </Button>

        <Dialog open={isAccountDialogOpen} onOpenChange={setIsAccountDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Select Lens Account</DialogTitle>
              <DialogDescription>Choose an account to sign in with Lens</DialogDescription>
            </DialogHeader>

            <div className="space-y-2 my-4">
              {accountsAvailable?.items.map((account, index) => {
                // Get display name from username
                const displayName = account.account.username?.localName || 'unnamed'
                const firstLetter = displayName.charAt(0).toUpperCase()

                return (
                  <div
                    key={account.account.address}
                    className={cn(
                      'flex items-center justify-between p-3 rounded-md cursor-pointer',
                      selectedAccountIndex === index ? 'bg-primary/10 border border-primary/30' : 'hover:bg-accent',
                    )}
                    onClick={() => setSelectedAccountIndex(index)}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                        {firstLetter || '?'}
                      </div>
                      <div>
                        <div className="font-medium">{displayName}</div>
                        <div className="text-xs text-muted-foreground">
                          {account.account.address.slice(0, 6)}...{account.account.address.slice(-4)}
                        </div>
                      </div>
                    </div>
                    {selectedAccountIndex === index && <Check className="h-4 w-4 text-primary" />}
                  </div>
                )
              })}
            </div>

            <Button variant="gradient" onClick={() => handleSignIn(selectedAccountIndex)} className="w-full">
              <LensLogoSVG className="h-5 w-5 mr-2" />
              Sign in with Selected Account
            </Button>
          </DialogContent>
        </Dialog>
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
