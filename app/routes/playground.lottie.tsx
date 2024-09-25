import { LottieComponentProps } from 'lottie-react'
import { useCallback, useEffect, useState } from 'react'
import { Button } from '~/components/ui/button'

import animationPath1 from '~/routes/smash-egg/lottie/standbys.json'
import animationPath2 from '~/routes/smash-egg/lottie/changegtc.json'
import animationPath3 from '~/routes/smash-egg/lottie/changects.json'
import animationPath4 from '~/routes/smash-egg/lottie/changestg.json'
import animationPath5 from '~/routes/smash-egg/lottie/copper03.json'
import animationPath6 from '~/routes/smash-egg/lottie/copper04.json'
import animationPath7 from '~/routes/smash-egg/lottie/copper05.json'
import hammerAmi from '~/routes/smash-egg/lottie/hammer.json'

const animationFiles = [
  animationPath1,
  animationPath2,
  animationPath3,
  animationPath4,
  animationPath5,
  animationPath6,
  animationPath7,
]

export default function Lottie() {
  const [LottieComponent, setLottieComponent] =
    useState<React.ComponentType<LottieComponentProps> | null>(null)
  const [animationData, setAnimationData] = useState(animationFiles[0])
  const [isAniLoop, setIsAniLoop] = useState(true)

  useEffect(() => {
    import('lottie-react').then(module => {
      setLottieComponent(() => module.default)
    })
  }, [])

  const buttonClick = useCallback((index: number) => {
    setAnimationData(animationFiles[index])
    setIsAniLoop(index === 0)
  }, [])

  if (!LottieComponent) {
    return <div>Loading...</div>
  }

  return (
    <div className="relative flex-1">
      <LottieComponent
        className="absolute left-4 top-4 h-[51px] w-[41px]"
        animationData={hammerAmi}
        loop={true}
        autoplay={true}
        onComplete={() => {}}
      />
      <LottieComponent
        className="m-auto h-[350px] w-[343px]"
        animationData={animationData}
        loop={isAniLoop}
        autoplay={true}
        onComplete={() => {}}
      />
      <div className="flex flex-wrap justify-start space-x-1 space-y-1">
        {animationFiles.map((_, index) => (
          <Button key={index} catEars onClick={() => buttonClick(index)}>
            動畫{index + 1}
          </Button>
        ))}
      </div>
    </div>
  )
}
