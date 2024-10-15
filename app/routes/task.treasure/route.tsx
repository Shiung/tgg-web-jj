import React from 'react'
import { cn } from '~/lib/utils'
import { useTreasuresList } from './hook/useTreasuresList'
import { type CurrencyType } from '~/components/currency-icon'

import styles from './index.module.scss'
import TaskTreasureSkeleton from './task-treasure-skeleton'
import NoDataView from './no-data-view'
import TreasureContent from './treasure-content'
import { errorToast, successToast } from '~/lib/toast'
import { Button } from '~/components/ui/button'

export interface claimBonusType {
  id: number
  amount: string
  currencyType: CurrencyType
}

const TaskTreasure: React.FC = () => {
  // 獲取寶箱列表 hook
  const {
    isLoading: isTreasuresListLoading,
    categorizedTreasures,
    claimAllBonuses,
    isClaimingAll,
  } = useTreasuresList()

  const handleClaimAllBonuses = async () => {
    try {
      await claimAllBonuses()
      successToast('All bonuses claimed successfully')
    } catch (error) {
      errorToast('Some bonuses failed to claim')
    }
  }

  if (isTreasuresListLoading) {
    return <TaskTreasureSkeleton />
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className={cn(styles.header)}>
        <p>Unlock treasure,</p>
        <p>earning better</p>
      </div>
      <div className="relative -top-4 flex flex-1 flex-col space-y-4 rounded-xl bg-black px-3 py-4">
        {categorizedTreasures.unlocking.length > 0 && (
          <>
            <div className="flex items-center justify-between">
              <h2 className="text-base font-ultra">Unlocking</h2>
              <Button
                catEars
                className="h-7 min-w-28"
                onClick={() => handleClaimAllBonuses()}
                loading={isClaimingAll}
              >
                <span className="text-xs font-ultra">Claim Bonus</span>
              </Button>
            </div>
            {categorizedTreasures.unlocking.map((treasure, index) => (
              <div key={index}>
                <TreasureContent treasure={treasure} />
              </div>
            ))}
          </>
        )}
        {categorizedTreasures.standby.length > 0 && (
          <>
            <h2 className="pb-2 text-base font-ultra">Standby</h2>
            {categorizedTreasures.standby.map((treasure, index) => (
              <div key={index}>
                <TreasureContent treasure={treasure} />
              </div>
            ))}
          </>
        )}
        {categorizedTreasures.standby.length === 0 &&
          categorizedTreasures.unlocking.length === 0 && <NoDataView />}
      </div>
    </div>
  )
}

export default TaskTreasure
