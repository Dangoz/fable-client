import UserConnection from './user-connection'
import Image from 'next/image'

const DesktopMenu = () => {
  return (
    <div className="fixed top-0 left-0 right-0 flex justify-between items-start z-50 bg-background/60 backdrop-blur-sm px-10 py-4 ">
      <div className="flex-1">
        <Image src="/logo.png" alt="Logo" width={100} height={50} />
      </div>
      <UserConnection />
    </div>
  )
}

export default DesktopMenu
