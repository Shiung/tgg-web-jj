import { useState, useMemo, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apis } from '~/api/index'
import { GetTreasuresResponse } from '~/api/codegen/data-contracts'
import useStore from '~/stores/useStore'

export type Treasure = Exclude<GetTreasuresResponse['list'][number], null>

interface CategorizedTreasures {
  unlocking: Treasure[]
  standby: Treasure[]
}

export function useTreasuresList() {
  const queryClient = useQueryClient()
  const isLoggedIn = useStore(state => state.isLoggedIn)

  // 是否正在一鍵全領寶箱獎勵
  const [isClaimingAll, setIsClaimingAll] = useState(false)

  // 獲取寶箱列表
  const {
    data: treasuresList,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['campaignTreasuresList', isLoggedIn],
    queryFn: apis.campaign.campaignTreasuresList,
    retry: false,
    refetchInterval: 1000 * 30, // 30 秒 refetch 一次
  })
  /**
   * 分類寶箱
   * UNLOCKING 跟 UNLOCKED 並且還有錢未領的 => unlocking
   * 其他 => standby
   */
  const categorizedTreasures = useMemo<CategorizedTreasures>(() => {
    const _treasuresList: CategorizedTreasures = {
      unlocking: [] as Treasure[],
      standby: [] as Treasure[],
    }
    if (treasuresList?.data?.list && treasuresList.data.list.length > 0) {
      treasuresList.data.list.forEach(treasure => {
        if (
          treasure?.status === 'UNLOCKING' ||
          (treasure?.status === 'UNLOCKED' && Number(treasure?.remainingClaimAmount) > 0)
        ) {
          _treasuresList.unlocking.push(treasure)
        } else if (treasure?.status === 'STANDBY') {
          _treasuresList.standby.push(treasure)
        }
      })

      // 排序邏輯
      _treasuresList.unlocking.sort((a, b) => {
        if (a?.status === 'UNLOCKING' && b?.status !== 'UNLOCKING') {
          return -1
        } else if (a?.status !== 'UNLOCKING' && b?.status === 'UNLOCKING') {
          return 1
        }
        return new Date(b?.createdAt ?? '').getTime() - new Date(a?.createdAt ?? '').getTime()
      })

      _treasuresList.standby.sort(
        (a, b) => new Date(b?.createdAt ?? '').getTime() - new Date(a?.createdAt ?? '').getTime()
      )
    }

    return _treasuresList
  }, [treasuresList])

  // 首頁右上角 寶箱變化
  const baseTreasure = useStore(state => state.baseTreasure)
  const setBaseTreasure = useStore(state => state.setBaseTreasure)
  useEffect(() => {
    // 非登入狀態清空
    if (!isLoggedIn) {
      setBaseTreasure(null)
      return
    }
    // store.baseTreasure為空  更新資料
    if (!baseTreasure && categorizedTreasures.unlocking.length > 0) {
      const _result = categorizedTreasures.unlocking.reduce(
        (acc: { [id: number]: string }, treasure) => {
          if (treasure.status === 'UNLOCKING') {
            acc[treasure.id] = treasure.remainingClaimAmount
          }
          return acc
        },
        {}
      )

      setBaseTreasure(_result)
    }
  }, [isLoggedIn, baseTreasure, setBaseTreasure, categorizedTreasures])

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
