import React, { useEffect, useMemo, useRef, useState } from 'react'
import Rhombus from './icons/rhombus'
import Pentahedron from './icons/pentahedron'
import Circle from './icons/circle'
import X from './icons/x'
import Point from './icons/point'

const svgComponents = [Rhombus, Pentahedron, Circle, X, Point]

interface ParticleProps {
  coordinates: { x: number; y: number }
  friction: number
  speed: number
  onRemove: () => void
}

const Particle: React.FC<ParticleProps> = ({ coordinates, friction, speed = 1, onRemove }) => {
  const [position, setPosition] = useState(coordinates.y)
  const isAlive = useRef(true)
  const steps = window.innerHeight / 2
  const siner = useRef(200 * Math.random())
  const rotation = useRef(Math.random() > 0.5 ? '-' : '+')
  const scale = useRef(0.5 + Math.random())

  const SvgComponent = useMemo(
    () => svgComponents[Math.floor(Math.random() * svgComponents.length)],
    []
  )

  const left = useMemo(() => {
    return coordinates.x + Math.sin((position * Math.PI) / steps) * siner.current
  }, [coordinates.x, position, steps])

  useEffect(() => {
    const move = () => {
      setPosition(prevPosition => {
        const newPosition = prevPosition - speed * friction
        if (newPosition < -100) {
          // 当粒子到达顶部时，标记为不活跃并触发移除逻辑
          isAlive.current = false
          requestAnimationFrame(() => onRemove())
          return prevPosition // 返回上一个位置以停止移动
        }
        return newPosition
      })

      if (isAlive.current) {
        requestAnimationFrame(move) // 持续调度下一次动画帧
      }
    }

    const animationFrameId = requestAnimationFrame(move)

    return () => {
      cancelAnimationFrame(animationFrameId) // 清除动画帧
    }
  }, [friction, onRemove, speed])

  if (!isAlive.current) return null

  return (
    <div
      style={{
        transform: `translateX(${left}px) translateY(${position}px) scale(${scale.current}) rotate(${rotation.current}${position}deg)`,
        position: 'absolute',
        top: 0,
        left: 0,
      }}
    >
      <SvgComponent />
    </div>
  )
}

export default Particle
