import { useEffect, useState, useCallback } from 'react'
import { Link } from '@remix-run/react'
// import { PAGInit } from 'libpag'
import { PAGView } from 'libpag/types/pag-view'
import { PAGFile } from 'libpag/types/pag-file'
import { PAGComposition } from 'libpag/types/pag-composition'
import useStore from '~/stores/useStore'
import styles from './index.module.scss'
import StandbyCard from './standby-card'
import RulesDialog from './rules-dialog'
import CardTemplate from './card-template'
import AlertDialog from './alert-dialog'
import { Button } from '~/components/ui/button'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let PAG: any
let PAGInit: any
const HAMMER_CANVAS_ID = 'hammer'
const EGG_AREA_CANVAS_ID = 'egg_area'
const HAMMER_PATH = '/images/smash-egg/animations/hammer.pag'
const STANDBYG_PATH = '/images/smash-egg/animations/standbyg.pag'
const STANDBYS_PATH = '/images/smash-egg/animations/standbys.pag'
const STANDBYC_PATH = '/images/smash-egg/animations/standbyc.pag'
const CHANGEGTS_PATH = '/images/smash-egg/animations/changegts.pag'
const CHANGEGTC_PATH = '/images/smash-egg/animations/changegtc.pag'
const CHANGECTG_PATH = '/images/smash-egg/animations/changectg.pag'
const CHANGECTS_PATH = '/images/smash-egg/animations/changects.pag'
const CHANGESTC_PATH = '/images/smash-egg/animations/changestc.pag'
const CHANGESTG_PATH = '/images/smash-egg/animations/changestg.pag'

const COPPER_N_PATH = '/images/smash-egg/animations/copper-n.pag'
const COPPER_01_PATH = '/images/smash-egg/animations/copper-0.pag'
const COPPER_02_PATH = '/images/smash-egg/animations/copper-1.pag'
const COPPER_03_PATH = '/images/smash-egg/animations/copper-2.pag'
const COPPER_04_PATH = '/images/smash-egg/animations/copper-3.pag'
const COPPER_05_PATH = '/images/smash-egg/animations/copper-4.pag'

const GOLD_N_PATH = '/images/smash-egg/animations/gold-n.pag'
const GOLD_01_PATH = '/images/smash-egg/animations/gold-0.pag'
const GOLD_02_PATH = '/images/smash-egg/animations/gold-1.pag'
const GOLD_03_PATH = '/images/smash-egg/animations/gold-2.pag'
const GOLD_04_PATH = '/images/smash-egg/animations/gold-3.pag'
const GOLD_05_PATH = '/images/smash-egg/animations/gold-4.pag'

const SILVER_N_PATH = '/images/smash-egg/animations/sliver-n.pag'
const SILVER_01_PATH = '/images/smash-egg/animations/silver-0.pag'
const SILVER_02_PATH = '/images/smash-egg/animations/silver-1.pag'
const SILVER_03_PATH = '/images/smash-egg/animations/silver-2.pag'
const SILVER_04_PATH = '/images/smash-egg/animations/silver-3.pag'
const SILVER_05_PATH = '/images/smash-egg/animations/silver-4.pag'
const allFilePats = [
  HAMMER_PATH,
  STANDBYG_PATH,
  STANDBYS_PATH,
  STANDBYC_PATH,
  CHANGEGTS_PATH,
  CHANGEGTC_PATH,
  CHANGECTG_PATH,
  CHANGECTS_PATH,
  CHANGESTC_PATH,
  CHANGESTG_PATH,
  GOLD_01_PATH,
  GOLD_02_PATH,
  GOLD_03_PATH,
  GOLD_04_PATH,
  GOLD_05_PATH,
  GOLD_N_PATH,
  SILVER_01_PATH,
  SILVER_02_PATH,
  SILVER_03_PATH,
  SILVER_04_PATH,
  SILVER_05_PATH,
  SILVER_N_PATH,
  COPPER_01_PATH,
  COPPER_02_PATH,
  COPPER_03_PATH,
  COPPER_04_PATH,
  COPPER_05_PATH,
  COPPER_N_PATH,
]

let standbyArr: ArrayBuffer[] = []
let changeArr: ArrayBuffer[][] = []
let hammerFile: null | ArrayBuffer = null
let goldArr: ArrayBuffer[] = []
let silverArr: ArrayBuffer[] = []
let copperArr: ArrayBuffer[] = []
let currentPlayFile: ArrayBuffer | undefined = undefined

enum Status {
  Init,
  Standby,
  BorkenEggPage,
  Playing,
  End,
}

let hammerPagView: PAGView | undefined
let hammerPagFile: PAGFile | undefined
let hammerPagComposition: PAGComposition | undefined

let pannelPagView: PAGView | undefined
let pannelPagFile: PAGFile | undefined
let pannelPagComposition: PAGComposition | undefined

let startX: number = 0

export default function SmashEgg() {
  const [smashCount, setSmashCount] = useState(0)
  const [smashTotal, setSmashTotal] = useState(0)
  const [currentEggPath, setCurrentEggPath] = useState('')
  const [status, setStatus] = useState<Status>(Status.Init)
  const [open, setOpen] = useState(false)
  const [currentEgg, setCurrentEgg] = useState(0)
  const [isChanging, setIsChanging] = useState(false)

  const setHeaderVisibility = useStore(
    (state: { setHeaderVisibility: (visible: boolean) => void }) => state.setHeaderVisibility
  )
  const setNavVisibility = useStore(
    (state: { setNavVisibility: (visible: boolean) => void }) => state.setNavVisibility
  )

  const destoryHammerPagView = useCallback(async () => {
    try {
      if (hammerPagFile && !hammerPagFile.isDestroyed) {
        hammerPagFile && hammerPagFile.destroy()
        hammerPagFile = undefined
      }
      if (hammerPagComposition) {
        hammerPagComposition.removeAllLayers()
        hammerPagComposition.destroy()
        hammerPagComposition = undefined
      }

      if (hammerPagView && hammerPagView['pagSurface']) {
        await hammerPagView['pagSurface'].clearAll()
        await hammerPagView.stop()
      }
      if (hammerPagView && !hammerPagView.isDestroyed) {
        hammerPagView['renderCanvas'] = null
        await hammerPagView.destroy()
        hammerPagView = undefined
      }
    } catch (error) {
      console.log('@@ error', error)
    }
  }, [])

  const destoryPanneelPagView = useCallback(async () => {
    try {
      if (pannelPagFile && !pannelPagFile.isDestroyed) {
        pannelPagFile && pannelPagFile.destroy()
        pannelPagFile = undefined
      }

      if (pannelPagComposition) {
        pannelPagComposition.removeAllLayers()
        pannelPagComposition.destroy()
        pannelPagComposition = undefined
      }

      if (pannelPagView && pannelPagView['pagSurface']) {
        await pannelPagView['pagSurface'].clearAll()
        await pannelPagView.stop()
      }

      if (pannelPagView && !pannelPagView.isDestroyed) {
        pannelPagView['renderCanvas'] = null
        await pannelPagView.destroy()
        pannelPagView = undefined
      }
    } catch (error) {
      console.log('@@ error', error)
    }
  }, [])

  const handlePlayingAnimationEnd = () => {
    setSmashCount(count => (count + 1 > 4 ? 4 : count + 1))
    let timer: NodeJS.Timeout | undefined = undefined
    setSmashTotal(prevTotal => {
      const newTotal = prevTotal + 18 >= 100 ? 100 : prevTotal + 18
      timer = setTimeout(() => {
        if (newTotal >= 100) {
          setStatus(Status.End)
        } else {
          setStatus(Status.BorkenEggPage)
        }
      }, 1000)
      return newTotal
    })
    return () => clearTimeout(timer)
  }

  const performChangeAnimation = useCallback((pagFile: PAGFile) => {
    return new Promise<void>(resolve => {
      if (!pannelPagView) {
        console.error('pannelPagView is not initialized')
        resolve()
        return
      }

      // 創建一個新的 PAGComposition
      const composition = PAG.PAGComposition.make(pagFile.width(), pagFile.height())

      // 將 pagFile 添加為 composition 的圖層
      const layer = composition.addLayer(pagFile)

      // 確保 layer 被正確添加
      if (!layer) {
        console.error('Failed to add layer to composition')
        resolve()
        return
      }

      // 使用新創建的 composition
      pannelPagView.setComposition(composition)
      pannelPagView.setRepeatCount(1)
      pannelPagView.setProgress(0)

      const onAnimationEnd = () => {
        pannelPagView?.removeListener('onAnimationEnd', onAnimationEnd)
        resolve()
      }

      pannelPagView.addListener('onAnimationEnd', onAnimationEnd)
      pannelPagView.play()
    })
  }, [])

  const performHammerAnimation = useCallback(async () => {
    if (hammerPagView) return

    try {
      const canvas = document.getElementById(HAMMER_CANVAS_ID) as HTMLCanvasElement
      if (!canvas) throw new Error('Canvas element not found')

      hammerPagFile = await PAG.PAGFile.load(hammerFile)
      if (!hammerPagFile) throw new Error('Failed to load hammer PAG file')

      hammerPagComposition = PAG.PAGComposition.make(hammerPagFile.width(), hammerPagFile.height())
      if (!hammerPagComposition) throw new Error('Failed to create hammer PAG composition')

      const layer = hammerPagComposition.addLayer(hammerPagFile)
      if (!layer) throw new Error('Failed to add layer to hammer PAG composition')

      canvas.width = hammerPagComposition.width()
      canvas.height = hammerPagComposition.height()

      hammerPagView = await PAG.PAGView.init(hammerPagFile, canvas, { firstFrame: false })
      if (!hammerPagView) throw new Error('Failed to initialize hammer PAG view')

      hammerPagView.setRepeatCount(0)
      await hammerPagView.play()
    } catch (error) {
      console.error('Error in performHammerAnimation:', error)
    }
  }, [])

  const handleChangeEgg = useCallback(
    async (isNext: boolean) => {
      if (isChanging) return

      try {
        setIsChanging(true)

        const nextPage = isNext ? currentEgg + 1 : currentEgg - 1
        const newEgg = nextPage > 2 ? 0 : nextPage < 0 ? 2 : nextPage

        // 加載新的 PAGFile
        const newPagFile = await PAG.PAGFile.load(changeArr[currentEgg][isNext ? 1 : 0])

        // 執行動畫
        await performChangeAnimation(newPagFile)

        // 更新 currentEgg
        setCurrentEgg(newEgg)
      } catch (error) {
        console.log('@@ error', error)
      } finally {
        setIsChanging(false)
      }
    },
    [isChanging, currentEgg, performChangeAnimation]
  )

  const handleStartButtonClick = () => {
    setStatus(Status.BorkenEggPage)
  }

  const handleSmashButtonClick = () => {
    setStatus(Status.Playing)
  }

  const handleGiveUpButtonClick = () => {
    setOpen(true)
  }

  const resetTheGame = useCallback(() => {
    setOpen(false)
    setSmashCount(0)
    setSmashTotal(0)
    setStatus(Status.Standby)
  }, [])

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (status !== Status.Standby) return
      startX = e.touches[0].clientX
    },
    [status]
  )

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (status !== Status.Standby) return
      const endX = e.changedTouches[0].clientX
      if (endX - startX > 50) {
        handleChangeEgg(true)
      } else if (startX - endX > 50) {
        handleChangeEgg(false)
      }
    },
    [status, handleChangeEgg]
  )

  const initPagView = async () => {
    PAGInit().then(pag => {
      PAG = pag
      setStatus(Status.Standby)
      performHammerAnimation()
    })
  }

  const loadAllPagFile = async () => {
    const [
      hammerBuffer,
      standyGBuffer,
      standySBuffer,
      standyCBuffer,
      changeGTSBuffer,
      changeGTCBuffer,
      changeSTCBuffer,
      changeSTGBuffer,
      changeCTGBuffer,
      changeCTSBuffer,
      gold01Buffer,
      gold02Buffer,
      gold03Buffer,
      gold04Buffer,
      gold05Buffer,
      goldnBuffer,
      silver01Buffer,
      silver02Buffer,
      silver03Buffer,
      silver04Buffer,
      silver05Buffer,
      silvernBuffer,
      copper01Buffer,
      copper02Buffer,
      copper03Buffer,
      copper04Buffer,
      copper05Buffer,
      coppernBuffer,
    ] = await Promise.all(
      allFilePats.map(path => fetch(path).then(response => response.arrayBuffer()))
    )
    hammerFile = hammerBuffer
    standbyArr = [standyGBuffer, standyCBuffer, standySBuffer]
    changeArr = [
      [changeGTSBuffer, changeGTCBuffer],
      [changeSTCBuffer, changeSTGBuffer],
      [changeCTGBuffer, changeCTSBuffer],
    ]
    goldArr = [gold01Buffer, gold02Buffer, gold03Buffer, gold04Buffer, goldnBuffer, gold05Buffer]
    silverArr = [
      silver01Buffer,
      silver02Buffer,
      silver03Buffer,
      silver04Buffer,
      silvernBuffer,
      silver05Buffer,
    ]
    copperArr = [
      copper01Buffer,
      copper02Buffer,
      copper03Buffer,
      copper04Buffer,
      coppernBuffer,
      copper05Buffer,
    ]
    initPagView()
  }

  useEffect(() => {
    if (status !== Status.Playing) return
    const playBrokenEggAnimation = async () => {
      try {
        const pagFile = await PAG.PAGFile.load(currentPlayFile)

        if (!pannelPagView) return

        // 創建一個新的 PAGComposition
        const composition = PAG.PAGComposition.make(pagFile.width(), pagFile.height())

        // 將 pagFile 添加為 composition 的圖層
        composition.addLayer(pagFile)

        // 使用新創建的 composition
        pannelPagView.setComposition(composition)
        pannelPagView.setRepeatCount(1)
        pannelPagView.setProgress(0)

        await pannelPagView.play()

        const onAnimationEnd = () => {
          pannelPagView!.removeListener('onAnimationEnd', onAnimationEnd)
          handlePlayingAnimationEnd()
        }
        pannelPagView.addListener('onAnimationEnd', onAnimationEnd)
      } catch (error) {
        console.error('Error playing broken egg animation:', error)
      }
    }
    playBrokenEggAnimation()
  }, [status])

  useEffect(() => {
    if (status !== Status.Standby) return
    const initializeStandbyAnimation = async () => {
      try {
        const canvas = document.getElementById(EGG_AREA_CANVAS_ID) as HTMLCanvasElement
        pannelPagFile = (await PAG.PAGFile.load(standbyArr[currentEgg])) as PAGFile
        pannelPagComposition = PAG.PAGComposition.make(
          pannelPagFile.width(),
          pannelPagFile.height()
        ) as PAGComposition
        pannelPagComposition.addLayer(pannelPagFile)

        if (!pannelPagView) {
          pannelPagView = (await PAG.PAGView.init(pannelPagComposition, canvas, {
            isFirstFrame: false,
          })) as PAGView
        } else {
          pannelPagView.setComposition(pannelPagComposition)
        }

        pannelPagView.setRepeatCount(0)
        await pannelPagView.play()
      } catch (error) {
        console.error('Error in standby animation setup:', error)
      }
    }
    initializeStandbyAnimation()
  }, [currentEgg, status])

  useEffect(() => {
    const imgPath = currentEgg === 0 ? 'gold' : currentEgg === 1 ? 'cooper' : 'silver'
    const imgIndex = smashTotal >= 100 ? 'n' : smashCount > 4 ? 4 : smashCount
    const animationIndex = smashTotal + 18 >= 100 ? 5 : smashCount > 4 ? 4 : smashCount
    const pagFile =
      currentEgg === 0
        ? goldArr[animationIndex]
        : currentEgg === 1
          ? copperArr[animationIndex]
          : silverArr[animationIndex]
    setCurrentEggPath(`/images/smash-egg/${imgPath}-${imgIndex}.png`)
    currentPlayFile = pagFile
  }, [status, smashTotal, smashCount, currentEgg])

  useEffect(() => {
    import('libpag').then(module => {
      PAGInit = module.PAGInit
      loadAllPagFile()
      setHeaderVisibility(false)
      setNavVisibility(false)
    })

    return () => {
      destoryHammerPagView()
      destoryPanneelPagView()
      setHeaderVisibility(true)
      setNavVisibility(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      className={`container relative flex flex-1 flex-col rounded-t-xl bg-[url('/images/smash-egg/bg-main.png')] bg-cover bg-no-repeat px-4 pt-3`}
    >
      {/* PAG View */}
      <div className={`absolute left-2 top-0 z-40 aspect-[41/51] w-[46px]`}>
        <canvas id={HAMMER_CANVAS_ID} className="h-[100%] w-[100%]"></canvas>
      </div>

      {/* Tool bar */}
      <div className="z-30 flex aspect-[375/30] justify-between">
        {/* 可用工具數量 */}
        <div
          className={`relative flex w-[78px] items-center justify-end rounded-xl bg-white bg-opacity-30 px-3 py-1 text-right text-lg font-extrabold dark:text-white`}
        >
          <span className="">x10</span>
        </div>

        <div className="flex items-center justify-end gap-4">
          {/* 規則按鈕 */}
          <RulesDialog />
          {/* 關閉按鈕 */}
          <Link className="h-6 w-6" to="/">
            <img src="/images/smash-egg/icon-close.png" alt="" />
          </Link>
        </div>
      </div>

      <CardTemplate>
        {(status === Status.Standby || status === Status.Init) && (
          <div
            className={`absolute bottom-0 left-0 right-0 aspect-[343/231] w-full rounded-b-xl ${styles['standby-bg']}`}
          ></div>
        )}

        {(status === Status.BorkenEggPage || status === Status.End) && (
          <div className="dark:color-white relative top-2 px-4 text-xs">
            <h2 className="text-center font-extrabold">
              <span>ONE SMASH NEED</span>
              <i className="inline-block h-6 w-6 bg-[url('/images/smash-egg/hammer.png')] bg-contain bg-no-repeat"></i>
              <span>X15</span>
            </h2>

            <div className="relative mt-2 flex items-center justify-center rounded-xl bg-black bg-opacity-70 py-1">
              <p className="text-center">
                PRIZE POOL<span className="px-1 font-extrabold">500-10000</span>USDT
              </p>
            </div>
          </div>
        )}

        {/* Eggs area */}
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative mt-5 aspect-[343/128]"
        >
          <div
            className={`absolute bottom-[-30px] left-[50%] z-20 aspect-[343/343] w-[100%] translate-x-[-50%] ${status === Status.Playing ? `bottom-[-50px] aspect-[343/390]` : `aspect-[343/343]`} ${status === Status.Standby || status === Status.Playing ? 'block' : 'hidden'} `}
          >
            <canvas id={EGG_AREA_CANVAS_ID} className="h-[100%] w-[100%]"></canvas>
          </div>

          <div
            className={`${status === Status.Standby || status === Status.Playing ? 'hidden' : 'block'}`}
          >
            <div className="relative top-[82px] mx-auto w-[107px]">
              <img src="/images/smash-egg/bottom-s.png" alt="" />
            </div>
            <button
              className="absolute left-[50%] top-0 mx-auto w-[100px] translate-x-[-50%] border-0 bg-transparent p-0"
              onClick={handleSmashButtonClick}
            >
              <img src={currentEggPath} alt="" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="px-4">
          {status === Status.Standby || status === Status.Init ? (
            <StandbyCard
              handleStartButtonClick={handleStartButtonClick}
              handleChangeEgg={handleChangeEgg}
            />
          ) : status === Status.Playing ? (
            <div className="mt-3 h-6 rounded-full bg-black p-[2px]">
              <div
                className={`${styles['progress-bar']} h-[100%]`}
                style={{ width: `${smashTotal}%` }}
              ></div>
              <p className="relative top-[-20px] z-10 text-center text-sm font-extrabold">
                {smashTotal}%
              </p>
            </div>
          ) : status === Status.BorkenEggPage ? (
            <>
              <div className="mt-3 h-6 rounded-full bg-black p-[2px]">
                <div
                  className={`${styles['progress-bar']} h-[100%]`}
                  style={{ width: `${smashTotal}%` }}
                ></div>
                <p className="relative top-[-20px] z-10 text-center text-sm font-extrabold">
                  {smashTotal}%
                </p>
              </div>
              <div className="relative mt-3 flex justify-between gap-2 text-black">
                <Button catEars className="flex-1" onClick={handleSmashButtonClick}>
                  smasg x1
                </Button>
                <Button catEars variant="gray" className="flex-1" onClick={handleGiveUpButtonClick}>
                  Give up this egg
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="text-center text-[24px] font-[1000]">
                <p>
                  YOU GAIN <span className="text-[#FFF200]">768</span> USDT!{' '}
                </p>
              </div>

              <div className="relative text-black">
                <Button catEars className="w-full" onClick={resetTheGame}>
                  Claim
                </Button>
              </div>
            </>
          )}
        </div>
      </CardTemplate>
      <AlertDialog open={open} comfirm={resetTheGame} cancel={() => setOpen(false)} />
    </div>
  )
}
