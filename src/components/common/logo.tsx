'use client'

import { useEffect, useState } from 'react'

const Logo = () => {
  const [width, setWidth] = useState<number>(0)
  const [height, setHeight] = useState<number>(0)

  useEffect(() => {
    setWidth(window.innerWidth)
    setHeight(window.innerHeight)
  }, [])

  useEffect(() => {
    /* eslint-disable @typescript-eslint/no-require-imports */
    if (width && height) return require('./nextparticle')()
  }, [width, height])

  return (
    <div className="w-full relative">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt="logo"
        className="next-particle invisible"
        src="./logo.png"
        data-color={'black'}
        data-particle-gap="2"
        data-gravity="0.08"
        data-noise="10"
        data-mouse-force="5"
        data-width={`${width}`}
        data-height={`${height}`}
        data-min-width="85%"
        data-min-height="85%"
        data-max-width="600"
        data-max-height="600"
        data-init-position="random"
        data-init-direction="random"
        data-fade-position="random"
        data-fade-direction="random"
      />
    </div>
  )
}

export default Logo
