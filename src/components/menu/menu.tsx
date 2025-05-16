'use client'

import React from 'react'
import useIsMobile from '@/hooks/use-is-mobile'
import DesktopMenu from './desktop-menu'
import MobileMenu from './mobile-menu'
import { usePathname } from 'next/navigation'
import { screensWithMenu } from '@/config/menu'

const Menu = () => {
  const isMobile = useIsMobile()

  const pathname = usePathname()
  const showMenu = screensWithMenu.includes(pathname as (typeof screensWithMenu)[number])

  if (isMobile === null) {
    return null
  }

  return <>{showMenu && (isMobile ? <MobileMenu /> : <DesktopMenu />)}</>
}

export default Menu
