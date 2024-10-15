import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apis } from '~/api/index'
import { GetTreasuresResponse } from '~/api/codegen/data-contracts'

type Treasure = GetTreasuresResponse['list'][number]

interface CategorizedTreasures {
  unlocking: Treasure[]
  standby: Treasure[]
}

export function useTreasuresList() {
  const queryClient = useQueryClient()

  // 是否正在一鍵全領寶箱獎勵
  const [isClaimingAll, setIsClaimingAll] = useState(false)

  // 獲取寶箱列表
  const {
    data: treasuresList,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['campaignTreasuresList'],
    queryFn: apis.campaign.campaignTreasuresList,
    retry: false,
  })

  const categorizedTreasures: CategorizedTreasures = {
    unlocking: [],
    standby: [],
  }

  // 分類寶箱
  if (treasuresList?.data?.list && treasuresList.data.list.length > 0) {
    treasuresList.data.list.forEach(treasure => {
      if (
        treasure?.status === 'UNLOCKING' ||
        (treasure?.status === 'UNLOCKED' && Number(treasure?.remainingClaimAmount) > 0)
      ) {
        categorizedTreasures.unlocking.push(treasure)
      } else if (treasure?.status === 'STANDBY') {
        categorizedTreasures.standby.push(treasure)
      }
    })

    // 排序邏輯
    categorizedTreasures.unlocking.sort((a, b) => {
      if (a?.status === 'UNLOCKING' && b?.status !== 'UNLOCKING') {
        return -1
      } else if (a?.status !== 'UNLOCKING' && b?.status === 'UNLOCKING') {
        return 1
      }
      return new Date(b?.createdAt ?? '').getTime() - new Date(a?.createdAt ?? '').getTime()
    })

    categorizedTreasures.standby.sort(
      (a, b) => new Date(b?.createdAt ?? '').getTime() - new Date(a?.createdAt ?? '').getTime()
    )
  }

  // 一鍵全領 寶箱獎勵
  const claimBonusMutation = useMutation({
    mutationFn: (id: number) => apis.campaign.campaignTreasuresClaimBonusCreate(id.toString(), {}),
    onError: error => {
      console.error('claimBonus failed, onError:', error)
    },
  })

  const claimAllBonuses = async () => {
    if (categorizedTreasures.unlocking.length === 0) {
      return
    }

    setIsClaimingAll(true)

    const claimBatch = async (treasures: Treasure[]) => {
      const results = await Promise.all(
        treasures.map(treasure => {
          if (!treasure?.id) {
            console.error('treasure id is null', treasure)
            return Promise.reject('fail')
          }
          return claimBonusMutation.mutateAsync(treasure.id)
        })
      )
      return results
    }

    const batchSize = 5
    let claimedCount = 0
    const totalTreasures = categorizedTreasures.unlocking.length

    try {
      while (claimedCount < totalTreasures) {
        const batch = categorizedTreasures.unlocking.slice(claimedCount, claimedCount + batchSize)
        await claimBatch(batch)
        claimedCount += batch.length
        await new Promise(resolve => setTimeout(resolve, 1000)) // 添加 1 秒延遲
      }
      await refetch()
    } catch (error) {
      console.error('Claim bonuses failed:', error)
      throw error
    } finally {
      queryClient.invalidateQueries({ queryKey: ['campaignTreasuresList'] })
      setIsClaimingAll(false)
    }
  }

  return {
    treasuresList,
    isLoading,
    refetch,
    categorizedTreasures,
    claimAllBonuses,
    isClaimingAll,
  }
}
