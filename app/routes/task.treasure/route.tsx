import React, { useEffect, useState } from 'react'
import kokonIcon from '~/components/color-icons/kokon'
import styles from './index.module.scss'
import { cn } from '~/lib/utils'
import TaskTreasureSkeleton from './task-treasure-skeleton'
import NoDataView from './no-data-view'
import RewardDialog from './reward-dialog'
import TreasureContent from './treasure-content'

const treasureData = [
  {
    type: 'Unlocking',
    unlockRule: [
      ['1% bet amount in Crypto games'],
      ['1% bet amount in Crypto games', '1% bet amount in Crypto games from level 1 friends'],
    ],
    totalAmount: 10000000, // 寶箱中的總金額
    unlockAmount: 10082000, // 等待解鎖的金額
    readyToClaimAmount: 10082000, // 可以領取的金額
    icon: '/images/header/treasure.png', // 寶箱圖示
    coinIcon: kokonIcon, // 幣種圖示
    hint: 'You will unlock 1 % valid bet amount to treasure when every time you play crypto games（Mines, Crash）. Valid bets will only be calculated for bets that have been settled and produced a win or loss result. Any games played, tied, or canceled will not be counted in valid bets.',
  },
  {
    type: 'Standby',
    unlockRule: [
      ['1% bet amount in Crypto games', '1% bet amount in Crypto games from level 1 friends'],
    ],
    totalAmount: 1000, // 寶箱中的總金額
    unlockAmount: 0, // 等待解鎖的金額
    readyToClaimAmount: 0, // 可以領取的金額
    icon: '/images/header/treasure.png', // 寶箱圖示
    coinIcon: kokonIcon, // 幣種圖示
    hint: 'You will unlock 1 % valid bet amount to treasure when every time you play crypto games（Mines, Crash）. Valid bets will only be calculated for bets that have been settled and produced a win or loss result. Any games played, tied, or canceled will not be counted in valid bets.',
  },
]

const TaskTreasure: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex flex-1 flex-col">
      {isLoading ? (
        <TaskTreasureSkeleton />
      ) : (
        <>
          <div className={cn(styles.header)}>
            <p>Unlock treasure,</p>
            <p>earning better</p>
          </div>
          <div className="relative -top-4 flex-1 rounded-xl bg-black px-3 py-4">
            {treasureData.length > 0 ? (
              treasureData.map((treasure, index) => (
                <div key={index} className={index === 0 ? 'mb-6' : ''}>
                  <TreasureContent treasure={treasure} onClaimBonus={() => setIsDialogOpen(true)} />
                </div>
              ))
            ) : (
              <NoDataView />
            )}
          </div>
        </>
      )}
      <RewardDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        rewardAmount={1000000000}
      />
    </div>
  )
}

export default TaskTreasure
