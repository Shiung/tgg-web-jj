import React, { useState, useEffect, useMemo } from 'react'
import { Link, useLocation } from '@remix-run/react'
import Lottie from 'lottie-react'
import { useTreasuresList } from '~/routes/task.treasure/hook/useTreasuresList'
import { useGenerateRuleList } from '~/routes/task.treasure/hook/useGenerateRuleList'
import { cn } from '~/lib/utils'
import useStore from '~/stores/useStore'
import catboxLottieFile from './lottie/catbox.json'
import { parseAmount } from '~/lib/amount'

import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover'
import { motion, useAnimationControls } from 'framer-motion'
import { Button } from '~/components/ui/button'
import { CurrencyIcon } from '~/components/currency-icon'
import Amount from '~/components/amount'
import Empty from './empty'
import { errorToast, successToast } from '~/lib/toast'
import AnimatedCounter from '~/components/animated-counter'

interface readyToShowChangeTreasureType {
  id: number
  remainingClaimAmount: string
}

const TreasurePopover: React.FC<{ className: string }> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(true)
  const location = useLocation()
  const { categorizedTreasures, claimAllBonuses, isClaimingAll, refetch } = useTreasuresList()
  const generateRuleList = useGenerateRuleList()

  // 導頁行為關閉popover
  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  // 是否有可以領的寶箱
  const treasureNotice = useMemo(() => {
    return categorizedTreasures.unlocking.filter(
      treasure => Number(treasure.remainingClaimAmount) > 0
    )
  }, [categorizedTreasures.unlocking])
  // 有可領取的寶箱動畫
  const controls = useAnimationControls()

  useEffect(() => {
    let animationFrameId: number
    let isAnimating = true

    const animate = () => {
      if (treasureNotice.length > 0 && isAnimating) {
        controls
          .start({
            scaleY: [1, 1.2, 1],
            transition: { duration: 0.5 },
          })
          .then(() => {
            return controls.start({
              rotate: [-5, 5, -5, 5, -5, 0],
              transition: { duration: 1 },
            })
          })
          .then(() => {
            animationFrameId = requestAnimationFrame(animate)
          })
      }
    }

    animate()

    return () => {
      isAnimating = false
      cancelAnimationFrame(animationFrameId)
      controls.stop()
    }
  }, [treasureNotice, controls])

  // 開關popover
  const handleToggle = () => setIsOpen(prev => !prev)

  // 領取所有寶箱
  const handleClaimAllBonuses = async () => {
    try {
      await claimAllBonuses()
      successToast('All bonuses claimed successfully')
    } catch (error) {
      errorToast('Some bonuses failed to claim')
    }
  }

  // 打開popover 當下獲取最新api資料
  // categorizedTreasures 與 store.baseTreasure 比較 哪一個寶箱金額有變化
  const baseTreasure = useStore(state => state.baseTreasure)
  const setBaseTreasure = useStore(state => state.setBaseTreasure)
  const [readyToShowChangeTreasure, setReadyToShowChangeTreasure] = useState<
    readyToShowChangeTreasureType[]
  >([])
  useEffect(() => {
    const fetchData = async () => {
      if (isOpen && baseTreasure) {
        const { data: freshData } = await refetch()
        const _changedTreasures: readyToShowChangeTreasureType[] = []
        freshData?.data?.list?.forEach(treasure => {
          if (!treasure?.id) return
          // 只有 UNLOCKING 會有寶箱解鎖金額差異
          if (treasure?.status !== 'UNLOCKING') return
          // store treasure id 有沒有記到 前一次 未查看動畫的寶箱
          if (!(treasure?.id in baseTreasure)) return
          // 與紀錄的金額 相同
          if (baseTreasure[treasure.id] === treasure.remainingClaimAmount.toString()) return

          // 放入待展示
          _changedTreasures.push({
            id: treasure.id,
            remainingClaimAmount: baseTreasure[treasure.id],
          })
        })

        setReadyToShowChangeTreasure(_changedTreasures)
      }
    }
    fetchData() // 調用非同步函式
  }, [isOpen, baseTreasure, refetch])

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <div className="relative flex items-center">
          <Button
            variant="icon"
            size="icon"
            className="h-10 w-10 opacity-100"
            onClick={handleToggle}
          >
            <motion.img
              animate={controls}
              src="/images/header/treasure.png"
              alt="Treasure"
              className={cn('h-9 w-9 object-contain', className)}
              style={{ willChange: 'transform', backfaceVisibility: 'hidden' }}
              loading="eager"
            />
          </Button>
          {treasureNotice.length > 0 && (
            <div className="absolute right-0 top-0 rounded-full bg-red-500 px-1 text-xs text-white">
              {treasureNotice.length}
            </div>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="primary-gradient-border-rounded flex max-h-[378px] w-screen max-w-md flex-col p-4"
        onOpenAutoFocus={e => e.preventDefault()}
        onCloseAutoFocus={e => e.preventDefault()}
      >
        {categorizedTreasures.unlocking.length === 0 ? (
          <Empty />
        ) : (
          <>
            <div className="flex-1 space-y-2 overflow-y-auto">
              {categorizedTreasures.unlocking.map(treasure => {
                let _changedTreasure = null
                if (readyToShowChangeTreasure.length > 0) {
                  _changedTreasure = readyToShowChangeTreasure.find(t => t?.id === treasure.id)
                }
                return (
                  <div key={treasure.id} className="flex flex-col rounded-xl bg-[#1c1c1c]">
                    <ul className="list-disc rounded-t-xl bg-[#333] py-2 pl-6 pr-3 text-white">
                      {generateRuleList({
                        betRequirement: treasure?.betRequirement,
                        directSubBetRequirement: treasure?.directSubBetRequirement,
                      }).map((condition, index) => (
                        <li key={index} className="text-xs font-ultra">
                          {condition}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-stretch rounded-b-xl">
                      <div className="flex flex-1 items-center space-x-2 py-1 pl-3 pr-2">
                        <div key={treasure.id} className="relative">
                          {_changedTreasure?.id ? (
                            <Lottie
                              className="h-20 w-20"
                              animationData={catboxLottieFile}
                              loop={false}
                              onComplete={() => {
                                setReadyToShowChangeTreasure([])
                                setBaseTreasure(null)
                              }}
                            />
                          ) : (
                            <img src="/images/header/treasure.png" alt="" className="h-20 w-20" />
                          )}
                          <div className="absolute -right-2 bottom-1 flex items-center space-x-1 rounded-full border-[0.5px] border-solid border-[#FFF200] bg-black px-1">
                            <CurrencyIcon currency={treasure?.rewardType} className="h-3 w-3" />
                            <Amount
                              className="text-xs font-ultra -tracking-[1px]"
                              value={treasure?.rewardAmount}
                              crypto={treasure?.rewardType}
                              useKM={treasure?.rewardType === 'KOKON'}
                            />
                          </div>
                        </div>
                        <div className="flex-1 text-center">
                          <Amount
                            crypto={treasure.rewardType}
                            value={treasure.remainingUnlockAmount}
                            useKM={treasure?.rewardType === 'KOKON'}
                            className="text-xl font-ultra text-primary"
                          />
                          <p className="text-xs text-white/70">Waiting for unlock</p>
                        </div>
                      </div>
                      <div className="flex flex-[0_0_33%] flex-col items-center justify-center border-l border-dashed border-white/20 px-2 py-1">
                        <AnimatedCounter
                          from={
                            _changedTreasure?.remainingClaimAmount !== undefined
                              ? parseAmount(_changedTreasure.remainingClaimAmount)
                              : parseAmount(treasure.remainingClaimAmount)
                          }
                          to={parseAmount(treasure.remainingClaimAmount)}
                          crypto={treasure.rewardType}
                          useKM={treasure?.rewardType === 'KOKON'}
                          animationOptions={{ duration: 1 }}
                          className="text-base font-ultra text-app-green"
                        />
                        <p className="text-xs text-white/70">Ready for claim </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            {/* action */}
            <div className="mt-6 flex shrink-0 flex-row space-x-2">
              <Link to="/task/treasure" prefetch="viewport" className="flex-1">
                <Button variant="gray" catEars>
                  Check all treasure
                </Button>
              </Link>
              <Button
                className="flex-1"
                catEars
                onClick={handleClaimAllBonuses}
                loading={isClaimingAll}
                disabled={treasureNotice.length === 0}
              >
                Claim
              </Button>
            </div>
          </>
        )}
      </PopoverContent>
    </Popover>
  )
}

export default TreasurePopover
