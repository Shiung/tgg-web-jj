import { useEffect, useMemo, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { AnimatePresence, motion } from 'framer-motion'
import Lottie from 'lottie-react'
import { Loader2 } from 'lucide-react'

import { Dialog, DialogContent } from '~/components/ui/dialog'
import { Button } from '~/components/ui/button'
import { KokonIcon } from '~/components/color-icons'
import Amount from '~/components/amount'
import useStore from '~/stores/useStore'
import { apis } from '~/api'
import { Crypto } from '~/consts/crypto'

import luckyBagAnimationData from './lottie/lucky-bag.json'
import { errorToast } from '~/lib/toast'

const GetLuckyMoneyDialog: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [status, setStatus] = useState<'initial' | 'animation' | 'result'>('initial')
  const { giverName, isQualified, maxValue, minValue, showPotential } = useStore(
    state => state.packet
  )

  const {
    mutateAsync: packetDraw,
    data,
    isPending,
  } = useMutation({
    mutationFn: apis.packetDraw.packetDrawCreate,
    onError: error => {
      console.error('packetCreate failed, onError:', error)
    },
  })
  const drawResult = useMemo(() => data?.data, [data?.data])

  const handleOpenClick = async () => {
    // setStatus('loading')

    try {
      const res = await packetDraw({})
      console.log('draw occur res', res)

      setStatus('animation')
    } catch (error: any) {
      // 错误处理
      console.error('draw occur error', error)
      errorToast(error?.message)
      setStatus('initial')
    }
  }

  const handleLottieComplete = () => {
    setStatus('result')
  }

  useEffect(() => {
    if (isQualified) {
      // 為true時需開獎
      setIsOpen(true)
    }
  }, [isQualified])

  useEffect(() => {
    if (!isOpen) {
      setStatus('initial')
    }
  }, [isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {/* Test */}
      {/* <DialogTrigger asChild>
        <Button catEars variant="danger" className="mt-8 w-full">
          Test Open luckBag
        </Button>
      </DialogTrigger> */}
      <DialogContent
        className="aspect-[375/420] bg-transparent shadow-none"
        defaultClose={false}
        onOpenAutoFocus={e => e.preventDefault()}
      >
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
              <div>{`a ${showPotential ? 'Luck Battle Bag' : 'Normal Bag'} from`}</div>
              <div>{`${giverName}`}</div>
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
                  {isPending ? <Loader2 className="h-8 w-8 animate-spin" /> : 'OPEN'}
                </div>
                {showPotential && (
                  <div className="absolute bottom-[9%] flex w-full flex-col items-center space-y-1 font-ultra">
                    <span className="text-base text-white">Potential Gain</span>
                    <span className="flex text-sm">
                      <KokonIcon className="h-5 w-5" />
                      <span className="flex items-center justify-center space-x-1 text-primary">
                        <Amount value={minValue} crypto={Crypto.KOKON} />
                        <span className="mx-1">~</span>
                        <Amount value={maxValue} crypto={Crypto.KOKON} />
                      </span>
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {status === 'animation' && (
            <motion.div
              key="lottie-animation"
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

          {status === 'result' /* && drawResult */ && (
            <motion.div
              key="result-screen"
              // layout
              initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-stretch justify-center space-y-1 px-9 text-center text-lg font-ultra text-white"
            >
              {drawResult?.isWinned ? (
                <>
                  <div className="text-center">
                    <p>You got a Luck Battle Bag from</p>
                    <p>{giverName}</p>
                  </div>
                  <div className="flex items-center self-center">
                    <KokonIcon className="h-8 w-8" />
                    <div className="ml-1 text-primary">
                      <Amount value={drawResult?.amount} crypto={Crypto.KOKON} />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-center">
                    <p>Sorry,</p>
                    <p>you are not qualified.</p>
                  </div>
                </>
              )}
              <div className="relative flex aspect-[375/344] w-full flex-col items-center justify-end">
                <img
                  src={`/images/lucky-money/${drawResult?.isWinned ? 'happy-cat' : 'sad-cat'}.png`}
                  className="absolute inset-0 h-full w-full object-contain"
                  alt="happy-cat"
                />
                <Button
                  catEars
                  className="w-full"
                  onClick={() => {
                    setIsOpen(false)
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
