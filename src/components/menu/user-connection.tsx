import { usePrivy } from '@privy-io/react-auth'
import { Button } from '@/components/ui/button'

const UserConnection = () => {
  const { ready, authenticated, user, login, logout, connectOrCreateWallet, connectWallet } = usePrivy()

  if (!ready) return null

  return (
    <div>
      <Button variant={'gradient'} onClick={() => connectOrCreateWallet()}>
        Connect
      </Button>
      {/* <Button variant={'gradient'} onClick={() => logout()}>
        Logout
      </Button> */}
    </div>
  )
}

export default UserConnection
