import { useEffect, useMemo, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'
import { useRankContext } from './rank/provider'
import { Crypto as CryptoConst } from '~/consts/crypto'

import Board from './rank/components/board'
import Skeleton from './rank/components/skeleton'
import PlayerCard from './rank/components/player-card'

import { useQuery } from '@tanstack/react-query'
import { apis } from '~/api'
import type { RankConfigResponse, BCRankInfoResponse } from '~/api/codegen/data-contracts'

type TabOption = {
  value: 'DAILY' | 'WEEKLY' | 'MONTHLY'
  key: keyof RankConfigResponse
  rewardKey: keyof RankConfigResponse
  name: string
}

const TabLsConf: Array<TabOption> = [
  {
    value: 'DAILY',
    name: 'Daily',
    key: 'bcRankDailyEntrance',
    rewardKey: 'bcRankDailyReward',
  },
  {
    value: 'WEEKLY',
    name: 'Weekly',
    key: 'bcRankWeeklyEntrance',
    rewardKey: 'bcRankWeeklyReward',
  },
  {
    value: 'MONTHLY',
    name: 'Monthly',
    key: 'bcRankMonthlyEntrance',
    rewardKey: 'bcRankMonthlyReward',
  },
]

export default function Crypto() {
  const [currentTab, setCurrentTab] = useState<TabOption>(TabLsConf[0])
  const [init, setInit] = useState<boolean>(false)
  const { state } = useRankContext()

  const tabLs = useMemo(() => {
    return TabLsConf.filter(({ key }) => state.rankConfigList?.[key] ?? false)
  }, [state.rankConfigList])

  const { data, isLoading } = useQuery({
    queryKey: ['rankBcList', currentTab],
    queryFn: () => apis.rank.rankBcList({ rankType: currentTab.value }),
    enabled: init,
  })

  const dataLs = useMemo(() => {
    const isReward = state.rankConfigList?.[currentTab.rewardKey] ?? false
    const { rank, selfRank } = data?.data ?? { rank: [], selfRank: {} }
    return {
      top: rank.slice(0, 3).map(l => ({ ...l, scoreCount: l.validBetGold })),
      others: rank.slice(3),
      self: selfRank as BCRankInfoResponse['selfRank'],
      isReward,
    }
  }, [data, state.rankConfigList, currentTab])

  useEffect(() => {
    if (!tabLs.length) return setInit(false)
    setCurrentTab(tabLs[0])
    setInit(true)
  }, [tabLs])

  if (isLoading || !init) return <Skeleton />

  return (
    <div className="flex flex-1 flex-col">
      <Board dataLs={dataLs.top} currency={CryptoConst.USDT} rewardLock={!dataLs.isReward} />
      <Tabs
        defaultValue="Daily"
        value={currentTab.value}
        className="-mt-4 flex w-full flex-1 flex-col"
      >
        <TabsList variant="cardTab" className="relative w-full overflow-x-auto">
          {tabLs.map(t => {
            return (
              <TabsTrigger
                key={t.value}
                variant="cardTab"
                value={t.value}
                className="flex-1"
                asChild
              >
                <button onClick={setCurrentTab.bind(null, t)}>{t.name}</button>
              </TabsTrigger>
            )
          })}
        </TabsList>
        <TabsContent value={currentTab.value} className="mt-0 flex flex-1">
          <div className="flex flex-1 flex-col space-y-3 bg-black p-4">
            <PlayerCard.Title type="crypto" rewardLock={!dataLs.isReward} />
            {dataLs.others.map(({ customerName, reward, rewardType, ranking, validBetGold }) => {
              return (
                <PlayerCard
                  key={ranking}
                  type="crypto"
                  rank={ranking}
                  name={customerName}
                  scoreCount={validBetGold}
                  reward={reward ?? ''}
                  currency={rewardType as CryptoConst}
                  rewardLock={!dataLs.isReward || !rewardType}
                />
              )
            })}
            <PlayerCard
              type="crypto"
              rank={dataLs?.self?.ranking ?? 0}
              name={dataLs.self?.customerName ?? ''}
              scoreCount={dataLs.self?.validBetGold ?? ''}
              reward={dataLs.self?.reward ?? ''}
              currency={dataLs.self?.rewardType as CryptoConst}
              isSelf
              rewardLock={!dataLs.isReward}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
