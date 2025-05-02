'use client'

import { Sparkles } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Environment, PerspectiveCamera } from '@react-three/drei'

const AmbientParticles = () => {
  return (
    <div className="w-full h-screen fixed inset-0 -z-10 pointer-events-none p-10">
      <Canvas shadows className="rounded-lg overflow-hidden">
        <Sparkles count={350} scale={5} size={2.5} speed={0.25} color={''} />
        <Environment preset={'apartment'} background={true} backgroundBlurriness={1} />
        {/* <directionalLight position={[0, 0, 5]} intensity={1} castShadow /> */}
        <PerspectiveCamera makeDefault position={[0, 1, 2.5]} />
      </Canvas>
    </div>
  )
}

export default AmbientParticles
