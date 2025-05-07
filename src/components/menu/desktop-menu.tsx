import UserConnection from './user-connection'

const DesktopMenu = () => {
  return (
    <div className="fixed top-0 left-0 right-0 flex justify-between items-center z-50 bg-background/60 px-10 py-4 ">
      <div className="flex-1">123</div>
      <UserConnection />
    </div>
  )
}

export default DesktopMenu
