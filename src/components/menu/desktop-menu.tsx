'use client'

import UserConnection from './user-connection'
import Logo from './logo'
// import AgentsConnection from './agents-connection'

const DesktopMenu = () => {
  return (
    <div className="fixed top-0 left-0 right-0 flex justify-between items-start z-50 bg-background/60 backdrop-blur-sm px-10 py-4 ">
      <div className="flex items-center space-x-4">
        <Logo />
      </div>
      <div className="flex items-center space-x-4">
        {/* <AgentsConnection /> */}
        <UserConnection />
      </div>
    </div>
  )
}

export default DesktopMenu
