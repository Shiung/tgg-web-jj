import { useCallback, useEffect, useState } from 'react'
import Particle from './particle'
import useTailwindScreen from '~/hooks/useTailwindScreen'

const TARGET_PARTICLE_COUNT = 50 // 目標粒子數量
const PARTICLE_GENERATION_INTERVAL = 200 // 粒子生成間隔, 單位: 毫秒
const PARTICLE_SPEED = 0.8 // 粒子移動速度, 基準值為 1

export default function ParticleBackground() {
  const isXsScreen = useTailwindScreen('sm', 'max')
  const [particles, setParticles] = useState<{ id: string; jsx: JSX.Element }[]>([])

  const addParticle = useCallback(() => {
    setParticles(prevParticles => {
      if (prevParticles.length >= TARGET_PARTICLE_COUNT) {
        // console.log('達到最大粒子數量，停止產生新粒子')
        return prevParticles
      }
      const coordinates = {
        x: Math.random() * window.innerWidth,
        y: window.innerHeight,
      }
      const friction = 1 + Math.random() * 3
      const particleKey = `particle-${Date.now()}`

      // console.log(`生成粒子 ${particleKey}，当前粒子数量: ${prevParticles.length + 1}`)

      return [
        ...prevParticles,
        {
          id: particleKey,
          jsx: (
            <Particle
              key={particleKey}
              coordinates={coordinates}
              friction={friction}
              speed={PARTICLE_SPEED}
              onRemove={() => {
                // console.log(`粒子 ${particleKey} 被移除`)
                requestAnimationFrame(() => { 
                  setParticles(prevParticles => prevParticles.filter(p => p.id !== particleKey))
                })
              }}
            />
          ),
        },
      ]
    })
  }, [])

  useEffect(() => {
    const intervalId = setInterval(() => {
      addParticle()
    }, PARTICLE_GENERATION_INTERVAL)

    return () => clearInterval(intervalId)
  }, [addParticle])

  if (isXsScreen) return null

  return (
    <div className="absolute inset-0 overflow-hidden bg-background">
      {particles.map(particle => particle.jsx)}
    </div>
  )
}
