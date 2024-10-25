import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'
import { Crypto as CryptoConst } from '~/consts/crypto'
import useStore from '~/stores/useStore'
import { apis } from '~/api'
import type { RankConfigResponse, BCRankInfoResponse } from '~/api/codegen/data-contracts'

import { useRankContext } from './rank/provider'
import Board from './rank/components/board'
import Skeleton from './rank/components/skeleton'
import PlayerCard from './rank/components/player-card'

type TabOption = {
  value: 'DAILY' | 'WEEKLY' | 'MONTHLY'
  key: keyof RankConfigResponse
  rewardKey: keyof RankConfigResponse
  name: string
}

const TabLsConf: Array<TabOption> = [
  {
    value: 'DAILY',
    name: 'rank.subNav.daily',
    key: 'bcRankDailyEntrance',
    rewardKey: 'bcRankDailyReward',
  },
  {
    value: 'WEEKLY',
    name: 'rank.subNav.weekly',
    key: 'bcRankWeeklyEntrance',
    rewardKey: 'bcRankWeeklyReward',
  },
  {
    value: 'MONTHLY',
    name: 'rank.subNav.monthly',
    key: 'bcRankMonthlyEntrance',
    rewardKey: 'bcRankMonthlyReward',
  },
]

export default function Crypto() {
  const isLoggedIn = useStore(state => state.isLoggedIn)
  const [currentTab, setCurrentTab] = useState<TabOption>(TabLsConf[0])
  const [init, setInit] = useState<boolean>(false)
  const { state } = useRankContext()
  const { t } = useTranslation()

  const tabLs = useMemo(() => {
    return TabLsConf.filter(({ key }) => state.rankConfigList?.[key] ?? false)
  }, [state.rankConfigList])

  // 未登入
  const { data: unLoggedInBcData, isLoading: unLoggedInBcIsLoading } = useQuery({
    queryKey: ['publicRankBcList', currentTab],
    queryFn: () => apis.public.publicRankBcList({ rankType: currentTab.value }),
    enabled: init && !isLoggedIn,
  })

  // 已登入
  const { data: loggedInBcData, isLoading: loggedInBcIsLoading } = useQuery({
    queryKey: ['rankBcList', currentTab],
    queryFn: () => apis.rank.rankBcList({ rankType: currentTab.value }),
    enabled: init && isLoggedIn,
  })

  const dataLs = useMemo(() => {
    const isReward = state.rankConfigList?.[currentTab.rewardKey] ?? false

    let rank: BCRankInfoResponse['rank'] = [],
      selfRank: BCRankInfoResponse['selfRank'] | null = null
    if (isLoggedIn) {
      rank = loggedInBcData?.data?.rank ?? []
      selfRank = loggedInBcData?.data?.selfRank ?? null
    } else {
      rank = unLoggedInBcData?.data?.rank ?? []
      selfRank = null
    }

    return {
      top: rank.slice(0, 3).map(l => ({ ...l, scoreCount: l.validBetGold })),
      others: rank.slice(3),
      self: selfRank,
      isReward,
    }
  }, [
    state.rankConfigList,
    currentTab.rewardKey,
    isLoggedIn,
    loggedInBcData?.data?.rank,
    loggedInBcData?.data?.selfRank,
    unLoggedInBcData?.data?.rank,
  ])

  useEffect(() => {
    if (!tabLs.length) return setInit(false)
    setCurrentTab(tabLs[0])
    setInit(true)
  }, [tabLs])

  if (unLoggedInBcIsLoading || loggedInBcIsLoading || !init) return <Skeleton />

  return (
    <div className="flex flex-1 flex-col">
      <Board dataLs={dataLs.top} currency={CryptoConst.USDT} rewardLock={!dataLs.isReward} />
      <Tabs
        defaultValue="Daily"
        value={currentTab.value}
        className="-mt-4 flex w-full flex-1 flex-col"
      >
        <TabsList variant="cardTab" className="relative w-full overflow-x-auto">
          {tabLs.map(l => {
            return (
              <TabsTrigger
                key={l.value}
                variant="cardTab"
                value={l.value}
                className="flex-1"
                asChild
              >
                <button onClick={setCurrentTab.bind(null, l)}>{t(l.name)}</button>
              </TabsTrigger>
            )
          })}
        </TabsList>
        <TabsContent value={currentTab.value} className="mt-0 flex flex-1 flex-col items-stretch">
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
            {dataLs.self && (
              <PlayerCard
                type="crypto"
                rank={dataLs.self.ranking ?? 0}
                name={dataLs.self.customerName ?? ''}
                scoreCount={dataLs.self.validBetGold ?? ''}
                reward={dataLs.self.reward ?? ''}
                currency={dataLs.self.rewardType as CryptoConst}
                isSelf
                rewardLock={!dataLs.isReward}
              />
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
