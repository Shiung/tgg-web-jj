import { useMemo } from 'react'
import Board from './rank/components/board'
import PlayerCard from './rank/components/player-card'
import Skeleton from './rank/components/skeleton'
import { useRankContext } from './rank/provider'
import { Crypto } from '~/consts/crypto'

import { useQuery } from '@tanstack/react-query'
import { apis } from '~/api'
import type { ShareRankInfoResponse } from '~/api/codegen/data-contracts'

export default function Share() {
  const { state } = useRankContext()

  const { data, isLoading } = useQuery({
    queryKey: [''],
    queryFn: () => apis.rank.rankShareList(),
  })

  const dataLs = useMemo(() => {
    const isReward = state.rankConfigList.shareRankReward ?? false
    const { rank, selfRank } = data?.data ?? { rank: [], selfRank: {} }
    return {
      top: rank.slice(0, 3).map(l => ({ ...l, scoreCount: l?.subordinatesCount })),
      others: rank.slice(3),
      self: selfRank as ShareRankInfoResponse['selfRank'],
      isReward,
    }
  }, [data, state.rankConfigList])

  if (isLoading) return <Skeleton />

  return (
    <div className="flex flex-1 flex-col">
      <Board
        theme="share"
        dataLs={dataLs.top}
        rewardLock={!dataLs.isReward}
        currency={Crypto.KOKON}
      />
      <div className="relative -mt-4 flex-1 rounded-t-xl bg-black">
        <div className="space-y-3 p-4">
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
            rank={dataLs?.self?.ranking ?? 0}
            name={dataLs.self?.customerName ?? ''}
            scoreCount={dataLs.self?.subordinatesCount?.toString() ?? ''}
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
