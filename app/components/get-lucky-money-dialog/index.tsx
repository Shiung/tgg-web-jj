import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Lottie from 'lottie-react'

import { Dialog, DialogContent, DialogTrigger } from '~/components/ui/dialog'
import { Button } from '~/components/ui/button'
import { KokonIcon } from '~/components/color-icons'

import luckyBagAnimationData from './lottie/lucky-bag.json'

interface GetLuckyMoneyDialogProps {
  isOpen?: boolean
  onClose?: () => void
}

const GetLuckyMoneyDialog: React.FC<GetLuckyMoneyDialogProps> = ({ isOpen, onClose }) => {
  const [status, setStatus] = useState<'initial' | 'loading' | 'animation' | 'result'>('initial')

  const handleOpenClick = async () => {
    setStatus('loading')

    try {
      // 模拟 API 调用
      await new Promise(resolve => setTimeout(resolve, 2000))

      // 模拟接收到的金额
      // const amount = 1888
      // setAmountReceived(amount)

      setStatus('animation')
    } catch (error) {
      // 错误处理
      console.error(error)
      setStatus('initial')
    }
  }

  const handleLottieComplete = () => {
    setStatus('result')
  }

  useEffect(() => {
    if (!isOpen) {
      setStatus('initial')
      // setAmountReceived(null)
    }
  }, [isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>
        <Button catEars variant="danger" className="mt-8 w-full">
          For Test Open luckBag
        </Button>
      </DialogTrigger>
      <DialogContent className="aspect-[375/420] bg-transparent shadow-none">
        <AnimatePresence>
          {status === 'initial' && (
            <motion.div
              key="initial-screen"
              initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center text-lg font-ultra text-white"
            >
              <div>You got chance to earn a</div>
              <div>{`a ${'Luck Battle Bag'} from`}</div>
              <div>{`${'User1234'}`}</div>
              <div
                className="relative flex aspect-[270/336] w-[74.4%] cursor-pointer items-center justify-center"
                onClick={handleOpenClick}
                onKeyDown={() => {}}
                role="button"
                tabIndex={0}
              >
                <img
                  src="/images/lucky-money/open-lucky-bag.png"
                  className="h-auto w-full object-contain"
                  alt="open-lucky-bag"
                />
                <div className="absolute bottom-[36%] flex aspect-square w-[32.25%] items-center justify-center text-center text-lg font-ultra text-[#FE8C02]">
                  OPEN
                </div>
                <div className="absolute bottom-[9%] flex w-full flex-col items-center space-y-1 font-ultra">
                  <span className="text-base text-white">Potential Gain</span>
                  <span className="flex text-sm">
                    <KokonIcon className="h-5 w-5" />
                    <span className="text-primary">1,000~2,000</span>
                  </span>
                </div>
              </div>
            </motion.div>
          )}
          {status === 'loading' && (
            <motion.div
              key="loading-screen"
              initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center text-lg font-ultra text-white"
            >
              Loading
            </motion.div>
          )}

          {status === 'animation' && (
            <motion.div
              key="lottie-animation"
              // layout
              initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
              transition={{ duration: 0.5 }}
            >
              <Lottie
                animationData={luckyBagAnimationData}
                loop={false}
                onComplete={handleLottieComplete}
                style={{ width: '100%', height: '100%' }}
              />
            </motion.div>
          )}

          {status === 'result' && (
            /* amountReceived !== null && */ <motion.div
              key="result-screen"
              // layout
              initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-stretch justify-center space-y-1 px-9 text-center text-lg font-ultra text-white"
            >
              <div className="text-center">
                <span className="inline-block">You got a Luck Battle Bag from</span>
              </div>
              <div>User1234</div>
              <div className="flex items-center self-center">
                <KokonIcon className="h-8 w-8" />
                <div className="ml-1 text-primary">1,888</div>
              </div>
              <div className="relative flex aspect-[375/344] w-full flex-col items-center justify-end">
                <img
                  src="/images/lucky-money/happy-cat.png"
                  className="absolute inset-0 h-full w-full object-contain"
                  alt="happy-cat"
                />
                <Button
                  catEars
                  className="w-full"
                  onClick={() => {
                    onClose?.()
                    setStatus('initial')
                  }}
                >
                  Got it
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}

export default GetLuckyMoneyDialog
