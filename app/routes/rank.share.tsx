import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Crypto } from '~/consts/crypto'
import { apis } from '~/api'
import type { ShareRankInfoResponse } from '~/api/codegen/data-contracts'
import useStore from '~/stores/useStore'

import { useRankContext } from './rank/provider'
import Skeleton from './rank/components/skeleton'
import PlayerCard from './rank/components/player-card'
import Board from './rank/components/board'

export default function Share() {
  const { state } = useRankContext()
  const isLoggedIn = useStore(state => state.isLoggedIn)

  // 未登入
  const { data: unLoggedInShareData, isLoading: unLoggedInIsLoading } = useQuery({
    queryKey: ['publicRankShareList'],
    queryFn: () => apis.public.publicRankShareList(),
    enabled: !isLoggedIn,
  })

  // 已登入
  const { data: loggedInShareData, isLoading: loggedInIsLoading } = useQuery({
    queryKey: ['rankShareList'],
    queryFn: () => apis.rank.rankShareList(),
    enabled: isLoggedIn,
  })

  const dataLs = useMemo(() => {
    const isReward = state.rankConfigList.shareRankReward ?? false

    let rank: ShareRankInfoResponse['rank'] = [],
      selfRank: ShareRankInfoResponse['selfRank'] | null = null

    if (isLoggedIn) {
      rank = loggedInShareData?.data?.rank ?? []
      selfRank = loggedInShareData?.data?.selfRank ?? null
    } else {
      rank = unLoggedInShareData?.data?.rank ?? []
      selfRank = null
    }

    return {
      top: rank.slice(0, 3).map(l => ({ ...l, scoreCount: l?.subordinatesCount })),
      others: rank.slice(3),
      self: selfRank,
      isReward,
    }
  }, [
    isLoggedIn,
    loggedInShareData?.data?.rank,
    loggedInShareData?.data?.selfRank,
    state.rankConfigList.shareRankReward,
    unLoggedInShareData?.data?.rank,
  ])

  if (unLoggedInIsLoading || loggedInIsLoading) return <Skeleton />

  return (
    <div className="flex flex-1 flex-col">
      <Board
        theme="share"
        dataLs={dataLs.top}
        rewardLock={!dataLs.isReward}
        currency={Crypto.KATON}
      />
      <div className="relative -mt-4 flex-1 rounded-t-xl bg-black">
        <div className="space-y-3 px-4 pt-4">
          <PlayerCard.Title type="share" rewardLock={!dataLs.isReward} />
          {dataLs.others.map(({ customerName, reward, rewardType, ranking, subordinatesCount }) => {
            return (
              <PlayerCard
                key={ranking}
                type="share"
                rank={ranking}
                name={customerName}
                scoreCount={subordinatesCount?.toString() ?? ''}
                reward={reward ?? ''}
                currency={rewardType as Crypto}
                rewardLock={!dataLs.isReward || !rewardType}
              />
            )
          })}
          <PlayerCard
            type="share"
            rank={dataLs.self?.ranking ?? 1000}
            name={dataLs.self?.customerName ?? ''}
            scoreCount={dataLs.self?.subordinatesCount?.toString() ?? '0'}
            reward={dataLs.self?.reward ?? ''}
            currency={dataLs.self?.rewardType as Crypto}
            isSelf
            rewardLock={!dataLs.isReward || !dataLs.self?.rewardType}
          />
        </div>
      </div>
    </div>
  )
}
