import { usePrivy } from '@privy-io/react-auth'
import { Button } from '@/components/ui/button'
import UserAvatar from '@/components/menu/user-avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { LogIn } from 'lucide-react'

const UserConnection = () => {
  const { ready, authenticated, user, login, logout, connectOrCreateWallet, connectWallet } = usePrivy()

  if (!ready) {
    return <Skeleton className="h-7 w-10 border rounded-lg" />
  }

  if (!authenticated) {
    return (
      <div>
        <Button variant={'gradient'} onClick={() => connectOrCreateWallet()}>
          <LogIn className="mr-2 h-4 w-4" />
          Log in
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
