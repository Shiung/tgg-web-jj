import React, { useState } from 'react'
import { cn } from '~/lib/utils'
import { useTreasuresList } from './hook/useTreasuresList'
import { type CurrencyType } from '~/components/currency-icon'
import { useTranslation } from 'react-i18next'
import useIntersectionObserver from '~/hooks/useIntersectionObserver'
import { useAppMaxWidth } from '~/hooks/useAppMaxWidth'

import styles from './index.module.scss'
import TaskTreasureSkeleton from './task-treasure-skeleton'
import NoDataView from './no-data-view'
import TreasureContent from './treasure-content'
import { errorToast, successToast } from '~/lib/toast'
import { Button } from '~/components/ui/button'
import ArrowLineDownIcon from '~/icons/arrow-line-down.svg?react'
import ArrowLineUpIcon from '~/icons/arrow-line-up.svg?react'

const INITIAL_DISPLAY_COUNT = 2
const LOAD_MORE_COUNT = 10

export interface claimBonusType {
  id: number
  amount: string
  currencyType: CurrencyType
}

const TaskTreasure: React.FC = () => {
  const { t } = useTranslation()
  const maxWidth = useAppMaxWidth()

  // 回到顶部
  const [topRef, istopflagVisible, scrollToTop] = useIntersectionObserver<HTMLDivElement>()

  // 獲取寶箱列表 hook
  const {
    isLoading: isTreasuresListLoading,
    categorizedTreasures,
    claimAllBonuses,
    isClaimingAll,
  } = useTreasuresList()

  // 前端分頁
  const [unlockingDisplayCount, setUnlockingDisplayCount] = useState(INITIAL_DISPLAY_COUNT)
  const [standbyDisplayCount, setStandbyDisplayCount] = useState(INITIAL_DISPLAY_COUNT)
  const handleShowMoreUnlocking = () => {
    setUnlockingDisplayCount(prev => prev + LOAD_MORE_COUNT)
  }
  const handleShowMoreStandby = () => {
    setStandbyDisplayCount(prev => prev + LOAD_MORE_COUNT)
  }

  // 領取所有寶箱
  const handleClaimAllBonuses = async () => {
    try {
      await claimAllBonuses()
      successToast(t('AllBonusesClaimedSuccessfully'))
    } catch (error) {
      errorToast(t('SomeBonusesFailedToClaim'))
    }
  }

  if (isTreasuresListLoading) {
    return <TaskTreasureSkeleton />
  }

  return (
    <div className="flex flex-1 flex-col rounded-xl bg-black px-3 py-4">
      <div ref={topRef} className={cn(styles.header)}>
        <p>{t('UnlockTreasure')}</p>
        <p>{t('EarningBetter')}</p>
      </div>
      <div className="relative -top-4 flex flex-1 flex-col space-y-4 rounded-xl">
        {categorizedTreasures.unlocking.length > 0 && (
          <>
            <div className="flex items-center justify-between">
              <h2 className="text-base font-ultra">{t('Unlocking')}</h2>
              <Button
                catEars
                className="h-7 min-w-28"
                onClick={() => handleClaimAllBonuses()}
                loading={isClaimingAll}
              >
                <span className="text-xs font-ultra">{t('ClaimBonus')}</span>
              </Button>
            </div>
            {categorizedTreasures.unlocking
              .slice(0, unlockingDisplayCount)
              .map((treasure, index) => (
                <div key={index}>
                  <TreasureContent treasure={treasure} />
                </div>
              ))}
            {categorizedTreasures.unlocking.length > unlockingDisplayCount && (
              <button
                className="flex w-full cursor-pointer flex-col items-center justify-center font-ultra text-primary"
                onClick={handleShowMoreUnlocking}
              >
                <span>{t('ShowMore')}</span>
                <ArrowLineDownIcon className="h-3 w-3" />
              </button>
            )}
          </>
        )}
        {categorizedTreasures.standby.length > 0 && (
          <>
            <h2 className="pb-2 text-base font-ultra">{t('Standby')}</h2>
            {categorizedTreasures.standby.slice(0, standbyDisplayCount).map((treasure, index) => (
              <div key={index}>
                <TreasureContent treasure={treasure} />
              </div>
            ))}
            {categorizedTreasures.standby.length > standbyDisplayCount && (
              <button
                className="flex w-full cursor-pointer flex-col items-center justify-center font-ultra text-primary"
                onClick={handleShowMoreStandby}
              >
                <span>{t('ShowMore')}</span>
                <ArrowLineDownIcon className="h-3 w-3" />
              </button>
            )}
          </>
        )}
        {!istopflagVisible && (
          <button
            onClick={scrollToTop}
            aria-label="Scroll to Top"
            className="fixed bottom-28 flex h-7 w-7 items-center justify-center rounded-full border-[0.5px] border-primary bg-[#FFF2004D]"
            style={{ maxWidth, right: `calc((100vw - ${maxWidth}) / 2 + 10px)` }}
          >
            <ArrowLineUpIcon className="h-4 w-4 text-primary" />
          </button>
        )}
        {categorizedTreasures.standby.length === 0 &&
          categorizedTreasures.unlocking.length === 0 && <NoDataView />}
      </div>
    </div>
  )
}

export default TaskTreasure
