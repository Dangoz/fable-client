'use client'

import { Sparkles } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'

const AmbientParticles = () => {
  return (
    <div className="w-full h-full fixed inset-0 -z-10 pointer-events-none p-10">
      <Canvas shadows className="rounded-lg overflow-hidden">
        <Sparkles count={50} scale={5} size={0.5} speed={0.15} color={''} />
        {/* <Environment preset={'warehouse'} background={true} backgroundBlurriness={1} /> */}
        {/* <directionalLight position={[0, 0, 5]} intensity={1} castShadow /> */}
        <PerspectiveCamera makeDefault position={[0, 1, 2.5]} />
      </Canvas>
    </div>
  )
}

export default AmbientParticles
