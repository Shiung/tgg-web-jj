import { memo, useState, useEffect } from 'react'
import type { ComponentType } from 'react'
import type { LottieComponentProps } from 'lottie-react'
import type { LottieAnimationProps } from './types'

const LottieAnimation = memo(({ animationData, ...props }: LottieAnimationProps) => {
  const [LottieComponent, setLottieComponent] =
    useState<ComponentType<LottieComponentProps> | null>(null)

  useEffect(() => {
    import('lottie-react')
      .then(module => setLottieComponent(() => module.default))
      .catch(error => console.error('Failed to load Lottie component:', error))
  }, [])

  if (!LottieComponent) return null

  return <LottieComponent animationData={animationData} {...props} />
})

LottieAnimation.displayName = 'LottieAnimation'

export default LottieAnimation
