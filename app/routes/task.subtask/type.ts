import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

// 後端定義任務類型
export type TaskType = 'dailyList' | 'specialList' | 'oneTimeList'
// 前端顯示任務類型對應表
export const useTaskTypeDisplayMap = () => {
  const { t } = useTranslation()

  return useMemo(
    () => ({
      dailyList: t('daily'),
      specialList: t('special'),
      oneTimeList: t('single'),
    }),
    [t]
  )
}

// 獎勵類型
export type RewardType = 'USDT' | 'TON' | 'KOKON' | 'TREASURE' | 'HAMMER'

/** 任務領取狀態,
 *  INELIGIBLE: 不符合領取條件
 * WAITING_CLAIM: 可領取
 * CLAIMED: 已領取
 */
export type rewardClaimStatus = 'INELIGIBLE' | 'WAITING_CLAIM' | 'CLAIMED'
