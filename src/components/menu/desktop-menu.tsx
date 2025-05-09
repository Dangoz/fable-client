import UserConnection from './user-connection'
import Logo from './logo'

const DesktopMenu = () => {
  return (
    <div className="fixed top-0 left-0 right-0 flex justify-between items-start z-50 bg-background/60 backdrop-blur-sm px-10 py-4 ">
      <Logo />
      <UserConnection />
    </div>
  )
}

export default DesktopMenu
