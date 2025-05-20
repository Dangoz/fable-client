'use client'

import AmbientParticles from '@/components/rtf/ambient-particles'
import Logo from '@/components/common/logo'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="w-full h-full min-h-screen flex flex-col items-center justify-center">
      <Logo />
      <div className="absolute left-1/2 bottom-1/4 transform -translate-x-1/2 translate-y-1/2">
        <Button variant="gradient" size="lg" className="font-cinzel" asChild>
          <Link href="/worlds">Explore Worlds</Link>
        </Button>
      </div>
      <AmbientParticles />
    </div>
  )
}
