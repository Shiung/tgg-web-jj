import { useEffect, useState, useCallback, useRef } from 'react'
import { Link } from '@remix-run/react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import Lottie, { type LottieRefCurrentProps } from 'lottie-react'
import useStore from '~/stores/useStore'
import AppLoading from '~/components/app-loading/index'
import { Button } from '~/components/ui/button'
import { cn } from '~/lib/utils'
import { apis } from '~/api'
import { errorToast } from '~/lib/toast'

import styles from './index.module.scss'
import StandbyCard from './standby-card'
import RulesDialog from './rules-dialog'
import CardTemplate from './card-template'
import AlertDialog from './alert-dialog'
import { Status, EggRecord, EggMarquee, PrizePool } from './types'
import { hammerFile, standbyArr, goldArr, silverArr, copperArr, changeArr } from './animation-data'
import { Trans, useTranslation } from 'react-i18next'
import Amount from '~/components/amount'

// 配合 useMatches 聲明需要登录才能访问
export const handle = {
  requiresAuth: true,
}

const HAMMER_CANVAS_ID = 'hammer'
const EGG_AREA_CANVAS_ID = 'egg_area'

let startX = 0

export default function SmashEgg() {
  const [smashCount, setSmashCount] = useState(0)
  const [smashTotal, setSmashTotal] = useState(0)
  const [currentEggPath, setCurrentEggPath] = useState('')
  const [status, setStatus] = useState<Status>(Status.Init)
  const [open, setOpen] = useState(false)
  const [currentEgg, setCurrentEgg] = useState(0)
  const [animationData, setAnimationData] = useState(standbyArr[0])
  const [reward, setReward] = useState(0)
  const [nextEgg, setNextEgg] = useState<number | null>(null)
  const lottieRefs = useRef<LottieRefCurrentProps>(null)
  const [hammerCount, setHammerCount] = useState(0)
  const hammerRefs = useRef<LottieRefCurrentProps>(null)
  const [eggRecord, setEggRecord] = useState<EggRecord | null>(null)
  const [prizePool, setPrizePool] = useState<PrizePool[]>([])
  const [marqueeList, setMarqueeList] = useState<EggMarquee[]>([])
  const queryClient = useQueryClient()
  const { t } = useTranslation()
  const pricePool = t('pricePool')
  const setHeaderVisibility = useStore(
    (state: { setHeaderVisibility: (visible: boolean) => void }) => state.setHeaderVisibility
  )
  const setNavVisibility = useStore(
    (state: { setNavVisibility: (visible: boolean) => void }) => state.setNavVisibility
  )

  const { telegramUserData } = useStore(state => state)

  const statusRef = useRef(status)
  const nextEggRef = useRef(nextEgg)

  // 初始化 API
  const {
    data: eggData,
    error: eggError,
    isError: isEggError,
    refetch: eggRefetch,
  } = useQuery({
    queryKey: ['initEgg'],
    queryFn: async () => {
      const response = await apis.campaign.campaignEggInfoCreate()
      const data: any = response.data
      data.updateTime = new Date().getTime()
      return response.data
    },
    enabled: status === Status.Init,
  })

  // 開始砸蛋 API
  const {
    data: smashData,
    error: smashError,
    isError: isSmashError,
    refetch: refetchSmash,
    isFetching: isSmashing,
  } = useQuery({
    queryKey: ['startSmash'],
    queryFn: async () => {
      const eggLevel = currentEgg === 0 ? 'GOLD' : currentEgg === 1 ? 'NORMAL' : 'SILVER'
      const response = await apis.campaign.campaignEggSmashCreate({ eggLevel })
      return response.data
    },
    enabled: false,
  })

  // 放棄蛋
  const {
    data: giveupData,
    error: giveupError,
    isError: isGiveupError,
    refetch: refetchGiveup,
  } = useQuery({
    queryKey: ['giveupSmash'],
    queryFn: async () => {
      const eggLevel = currentEgg === 0 ? 'GOLD' : currentEgg === 1 ? 'NORMAL' : 'SILVER'
      const response = await apis.campaign.campaignEggGiveupCreate({ eggLevel })
      return {
        data: response.data,
        status: response.status,
      }
    },
    enabled: false, // 禁用自动查询
  })

  // 活動設定
  const {
    data: activityData,
    error: activityError,
    isError: isActivityError,
  } = useQuery({
    queryKey: ['activityInfo'],
    queryFn: async () => {
      const response = await apis.campaign.campaignEggActivityInfoList()
      return response.data
    },
    enabled: status === Status.Init || status === Status.Standby,
  })

  // 領取獎勵
  const {
    data: claimData,
    error: claimError,
    isError: isClaimError,
    refetch: refetchClaim,
    isFetching: isClaiming,
  } = useQuery({
    queryKey: ['claimReward'],
    queryFn: async () => {
      const response = await apis.campaign.campaignEggClaimCreate({
        transactionId: eggData?.record?.transactionId || '',
      })
      return {
        data: response.data,
        status: response.status,
      }
    },
    enabled: false,
  })

  // 跑馬燈
  const {
    data: marqueeData,
    error: marqueeError,
    isError: isMarqueeError,
  } = useQuery({
    queryKey: ['marqueeInfo'],
    queryFn: async () => {
      const response = await apis.campaign.campaignEggMarqueeList({ size: 30 })
      return response.data
    },
    enabled: status === Status.Init,
  })

  // 创建一个函数来处理放弃操作
  const handleGiveup = useCallback(() => {
    refetchGiveup() // 手动触发查询
  }, [refetchGiveup])

  const handleSamsh = useCallback(() => {
    refetchSmash()
  }, [refetchSmash])

  const handleClaim = useCallback(() => {
    refetchClaim()
    if (telegramUserData) {
      const marquee = {
        customerName: `${telegramUserData?.firstName || ''} ${telegramUserData?.lastName || ''}`,
        eggLevel: eggRecord?.eggLevel || '',
        reward: eggRecord?.reward || '',
      }
      setMarqueeList(prev => {
        const newList = [...prev]
        newList.splice(1, 0, marquee)
        return newList
      })
    }
  }, [refetchClaim, eggRecord, telegramUserData])

  const setupHammerCount = useCallback((count: number) => {
    setHammerCount(count)
    hammerRefs.current?.goToAndPlay(0)
  }, [])

  const handleStartButtonClick = () => {
    setStatus(Status.BrokenEggPage)
  }

  const handleSmashButtonClick = () => {
    handleSamsh()
  }

  const handleGiveUpButtonClick = () => {
    setOpen(true)
  }

  const resetTheGame = useCallback(() => {
    setOpen(false)
    setSmashCount(0)
    setSmashTotal(0)
    setStatus(Status.Standby)
    setCurrentEgg(0)
    setAnimationData(standbyArr[0])
    queryClient.clear()
  }, [queryClient])

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (status !== Status.Standby) return
      startX = e.touches[0].clientX
    },
    [status]
  )

  const handleChangeEgg = useCallback(
    (isNext: boolean) => {
      const nextPage = isNext ? currentEgg + 1 : currentEgg - 1
      const newEgg = nextPage > 2 ? 0 : nextPage < 0 ? 2 : nextPage
      setAnimationData(changeArr[currentEgg][isNext ? 1 : 0])
      setNextEgg(newEgg)
    },
    [currentEgg]
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

  const handleComplete = useCallback(() => {
    if (statusRef.current === Status.Standby) {
      if (nextEggRef.current !== null) {
        setCurrentEgg(nextEggRef.current)
        setAnimationData(standbyArr[nextEggRef.current])
        setNextEgg(null)
      } else {
        setTimeout(() => {
          lottieRefs.current?.goToAndPlay(0, false)
        }, 100)
      }
    }

    if (statusRef.current === Status.Playing) {
      eggRefetch()
    }
  }, [eggRefetch])

  const setupImageAndAnimaiton = useCallback(() => {
    const imgPath = currentEgg === 0 ? 'gold' : currentEgg === 1 ? 'cooper' : 'silver'
    const imgIndex = smashTotal >= 100 ? 'n' : smashCount > 4 ? 4 : smashCount
    const animationIndex = smashTotal + 0.1 >= 100 ? 5 : smashCount > 4 ? 4 : smashCount
    const pagFile =
      currentEgg === 0
        ? goldArr[animationIndex]
        : currentEgg === 1
          ? copperArr[animationIndex]
          : silverArr[animationIndex]

    setAnimationData(pagFile)
    setCurrentEggPath(`/images/smash-egg/${imgPath}-${imgIndex}.png`)
  }, [currentEgg, smashTotal, smashCount])

  useEffect(() => {
    if (status === Status.BrokenEggPage) {
      setupImageAndAnimaiton()
    }
  }, [status, setupImageAndAnimaiton])

  useEffect(() => {
    if (isMarqueeError) {
      errorToast(marqueeError?.message || 'An error occurred')
    } else if (marqueeData) {
      setMarqueeList(marqueeData.result || [])
    }
  }, [marqueeData, marqueeError, isMarqueeError])

  useEffect(() => {
    if (isClaimError) {
      errorToast(claimError?.message || 'An error occurred')
    } else if (!isClaimError && claimData) {
      eggRefetch()
    }
  }, [claimData, claimError, isClaimError, eggRefetch])

  useEffect(() => {
    if (isActivityError) {
      errorToast(activityError?.message || 'An error occurred')
    } else if (activityData?.prizePool && activityData.prizePool.length > 0) {
      setPrizePool(activityData.prizePool)
    }
  }, [activityData, activityError, isActivityError])

  useEffect(() => {
    if (isGiveupError) {
      errorToast(giveupError?.message || 'An error occurred')
    } else if (giveupData) {
      resetTheGame()
    }
  }, [giveupData, giveupError, isGiveupError, resetTheGame])

  useEffect(() => {
    if (isSmashError) {
      errorToast(smashError?.message || 'An error occurred')
    } else if (smashData) {
      setupHammerCount(Number(smashData.hammerRemaining ?? 0))
      setTimeout(() => {
        setReward(smashData.reward ? +smashData.reward : 0)
        setSmashCount(smashData?.totalCount || 0)
        setSmashTotal(() => {
          const newTotal = smashData?.progress ? +smashData.progress : 0
          return newTotal > 100 ? 100 : newTotal
        })
      }, 1000)
      setStatus(Status.Playing)
      if (lottieRefs.current) {
        lottieRefs.current.goToAndPlay(0)
      }
    }
  }, [smashData, smashError, isSmashError, setupHammerCount])

  useEffect(() => {
    if (isEggError) {
      errorToast(eggError?.message || 'An error occurred')
    } else if (eggData) {
      setupHammerCount(eggData.hammerRemaining || 0)
      if (eggData.record) {
        const record = eggData.record
        setEggRecord(record)
        const currentEgg = record.eggLevel === 'GOLD' ? 0 : record.eggLevel === 'NORMAL' ? 1 : 2
        const count = record.totalCount || 0
        const total = record.progress ? +record.progress || 0 : 0
        setCurrentEgg(currentEgg)
        setSmashCount(count)
        setSmashTotal(total)
        setReward(record.reward ? +record.reward : 0)

        if (!record.claimed && record.playStatus === 'SUCCESS') {
          // 未領獎
          setStatus(Status.End)
          setCurrentEggPath(`/images/smash-egg/reward.png`)
        } else if (record.playStatus === 'PLAYING') {
          // 繼續上次的進度
          setStatus(Status.BrokenEggPage)
          const imgPath = currentEgg === 0 ? 'gold' : currentEgg === 1 ? 'cooper' : 'silver'
          const imgIndex = total >= 100 ? 'n' : count > 4 ? 4 : count
          const animationIndex = total + 0.1 >= 100 ? 5 : count > 4 ? 4 : count
          const animationFile =
            currentEgg === 0
              ? goldArr[animationIndex]
              : currentEgg === 1
                ? copperArr[animationIndex]
                : silverArr[animationIndex]

          setTimeout(() => {
            setAnimationData(animationFile)
          }, 500)
          setCurrentEggPath(`/images/smash-egg/${imgPath}-${imgIndex}.png`)
        } else {
          setAnimationData(standbyArr[currentEgg])
          setTimeout(() => {
            setStatus(Status.Standby)
          }, 300)
        }
      } else {
        // 沒有遊戲紀錄
        setTimeout(() => {
          resetTheGame()
        }, 300)
      }
    }
  }, [eggData, eggError, isEggError, setupHammerCount, resetTheGame])

  useEffect(() => {
    statusRef.current = status
    nextEggRef.current = nextEgg
  }, [status, nextEgg])

  useEffect(() => {
    setHeaderVisibility(false)
    setNavVisibility(false)
    return () => {
      queryClient.clear()
      setHeaderVisibility(true)
      setNavVisibility(true)
    }
  }, [])

  const prizePoolItem = prizePool.find(
    item => item.eggLevel === (currentEgg === 0 ? 'GOLD' : currentEgg === 1 ? 'NORMAL' : 'SILVER')
  )

  return (
    <div
      className={`container relative flex flex-1 flex-col rounded-xl bg-[url('/images/smash-egg/bg-main.png')] bg-cover bg-no-repeat px-4 pt-3`}
    >
      {status === Status.Init && <AppLoading />}
      <Lottie
        key={HAMMER_CANVAS_ID}
        lottieRef={hammerRefs}
        className="absolute -top-3.5 left-2 z-[35] aspect-[41/51] w-[60px]"
        animationData={hammerFile}
        loop={false}
        autoplay={true}
      />
      {/* Tool bar */}
      <div className="z-[33] flex aspect-[375/30] w-full justify-between">
        {/* 可用工具數量 */}
        <div
          className={`relative flex w-auto min-w-[78px] items-center justify-end rounded-xl bg-white bg-opacity-30 py-1 pl-9 pr-3 text-right text-lg font-ultra dark:text-white`}
        >
          <span className="">x{hammerCount}</span>
        </div>

        <div className="flex items-center justify-end gap-4">
          {/* 規則按鈕 */}
          <RulesDialog prizePools={prizePool} />
          {/* 關閉按鈕 */}
          <Link className="h-6 w-6" to="/">
            <img src="/images/smash-egg/icon-close.png" alt="" />
          </Link>
        </div>
      </div>

      <CardTemplate marqueeList={marqueeList}>
        {status === Status.Standby && (
          <div
            className={`absolute bottom-0 left-0 right-0 aspect-[343/231] w-full rounded-b-xl ${styles['standby-bg']}`}
          ></div>
        )}

        {(status === Status.BrokenEggPage || status === Status.End) && (
          <div className="dark:color-white relative top-2 px-4 text-xs">
            <h2
              className="flex items-center justify-center text-center font-ultra"
              dangerouslySetInnerHTML={{
                __html: t('eggSmashNeedHammer', {
                  icon: `<i class="inline-block h-6 w-6 mx-2 bg-[url('/images/smash-egg/hammer.png')] bg-contain bg-no-repeat"></i>`,
                  hammer: `<span>${prizePoolItem?.hammerSpent ?? 0}</span>`,
                }),
              }}
            ></h2>

            <div className="relative mt-2 flex items-center justify-center rounded-xl bg-black bg-opacity-70 py-1">
              <p className="text-center">
                {pricePool.split('{{value}}')[0]}
                <span className="px-1 text-xs font-ultra tracking-[-1px]">
                  {' '}
                  <Amount value={prizePoolItem?.displayUsdtPrizeMin ?? 0} crypto="USDT" />
                  -
                  <Amount value={prizePoolItem?.displayUsdtPrizeMax ?? 0} crypto="USDT" />
                </span>{' '}
                {pricePool.split('{{value}}')[1]}
              </p>
            </div>
          </div>
        )}

        {/* Eggs area */}
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative z-30 mt-5 aspect-[343/128]"
        >
          <div
            className={`${status === Status.Standby || status === Status.Playing ? 'block' : 'hidden'}`}
          >
            <Lottie
              id={`${EGG_AREA_CANVAS_ID}}`}
              lottieRef={lottieRefs}
              className={cn(
                `absolute bottom-[-30px] left-[50%] z-20 aspect-[343/343] w-[100%] translate-x-[-50%]`,
                {
                  'bottom-[-26px] aspect-[343/390]': status === Status.Playing,
                  'aspect-[343/343]': status !== Status.Playing,
                },
                styles['lottie-container']
              )}
              animationData={animationData}
              loop={false}
              autoplay={true}
              onComplete={() => handleComplete()}
            />
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
          {status === Status.Standby ? (
            <StandbyCard
              prizePool={prizePoolItem}
              handleStartButtonClick={handleStartButtonClick}
              handleChangeEgg={handleChangeEgg}
              hammerCount={hammerCount}
            />
          ) : status === Status.Playing ? (
            <div className="mt-3 h-6 rounded-full bg-black p-[2px]">
              <div
                className={`${styles['progress-bar']} h-[100%]`}
                style={{ width: `${smashTotal}%` }}
              ></div>
              <p className="relative top-[-20px] z-10 text-center text-sm font-ultra">
                {smashTotal}%
              </p>
            </div>
          ) : status === Status.BrokenEggPage ? (
            <>
              <div className="mt-3 h-6 rounded-full bg-black p-[2px]">
                <div
                  className={`${styles['progress-bar']} h-[100%]`}
                  style={{ width: `${smashTotal}%` }}
                ></div>
                <p className="relative top-[-20px] z-10 text-center text-sm font-ultra">
                  {smashTotal}%
                </p>
              </div>
              <div className="relative mt-3 flex justify-between gap-2 text-black">
                <Button
                  catEars
                  className="flex-1"
                  disabled={hammerCount < (prizePoolItem?.hammerSpent || 1)}
                  onClick={handleSmashButtonClick}
                  loading={isSmashing}
                >
                  {t('smash')} x{prizePoolItem?.hammerSpent || 0}
                </Button>
                <Button catEars variant="gray" className="flex-1" onClick={handleGiveUpButtonClick}>
                  {t('giveUpEgg')}
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="pb-2 text-center text-[24px] font-[1000]">
                <p>
                  <Trans
                    i18nKey="eggClaimMsg"
                    components={{
                      amount1: <Amount value={reward} crypto="USDT" className="text-primary" />,
                    }}
                  ></Trans>
                </p>
              </div>

              <div className="relative text-black">
                <Button catEars className="w-full" onClick={handleClaim} loading={isClaiming}>
                  {t('claim')}
                </Button>
              </div>
            </>
          )}
        </div>
      </CardTemplate>
      <AlertDialog open={open} confirm={handleGiveup} cancel={() => setOpen(false)} />
    </div>
  )
}
