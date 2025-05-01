'use client'

import { Sparkles } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

const AmbientParticles = () => {
  return (
    <Canvas>
      <Sparkles count={100} scale={5} size={2.5} speed={0.4} color={''} />
    </Canvas>
  )
}

export default AmbientParticles
