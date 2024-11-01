import React, { useState, useMemo, useEffect } from 'react'
import { useUtils } from '@telegram-apps/sdk-react'
import { useTranslation } from 'react-i18next'
import { useMutation } from '@tanstack/react-query'
import { format } from 'date-fns'
import { cn } from '~/lib/utils'
import { parseAmount } from '~/lib/amount'
import { type TaskQueryResponse } from '~/api/codegen/data-contracts'
import { apis } from '~/api/index'
import useStore from '~/stores/useStore'
import { Button } from '~/components/ui/button'
import Amount from '~/components/amount'
import {
  KatonIcon,
  UsdtIcon,
  ClockIcon,
  TonIcon,
  TreasureIcon,
  TreasureRandomIcon,
  SmashEggIcon,
} from '~/components/color-icons'
import { CurrencyIcon } from '~/components/currency-icon'
import ArrowLineDownIcon from '~/icons/arrow-line-down.svg?react'
import CheckIcon from '~/icons/check.svg?react'
import { errorToast } from '~/lib/toast'
import { emitter } from '~/lib/emitter'

import RewardDialog from './reward-dialog'
import { type RewardType, type rewardClaimStatus } from './type'
import styles from './index.module.scss'

type TaskActionType = NonNullable<TaskQueryResponse['dailyList']>[number]['actionType']

/**
 * 任務名稱格式化
 * @param task 任務
 * @returns 任務名稱
 */
const TaskNameFormat = (task: NonNullable<TaskQueryResponse['dailyList']>[number]) => {
  switch (task.actionType) {
    case 'LOGIN':
      return task.taskName
    case 'RECHARGE':
      return `${task.taskName} (${task.accumulatedValue}/${task.rechargeCondition?.parameterValue})`
    case 'INVITE_FRIENDS':
      return `${task.taskName} (${task.accumulatedValue}/${task.inviteFriendsCondition?.inviteCount})`
    case 'TEAM_CLASS_ACHIEVEMENT':
      return task.taskName
    case 'PLAY_GAMES':
      return `${task.taskName} (${task.accumulatedValue}/${task.playGameCondition?.playCount})`
    case 'OPEN_LINK':
      return task.taskName
    case 'TEAM_RECHARGE':
      return `${task.taskName} (${task.accumulatedValue}/${task.teamRechargeCondition?.depositAmount})`
    default:
      return 'Unknown'
  }
}

// 限量時間格式化
const limitTimeString = (
  startTime: string | null | undefined,
  endTime: string | null | undefined
) => {
  if (!startTime || !endTime) return null
  return `${format(startTime, 'MM/dd HH:mm')} - ${format(endTime, 'MM/dd HH:mm')}`
}

/**
 * 任務項目的屬性介面
 * @interface TaskItemProps
 */
interface TaskItemProps {
  /** 任務 */
  task: NonNullable<TaskQueryResponse['dailyList']>[number]
}

// 顯示獎勵圖示
export const TaskIcon: React.FC<{
  type: RewardType
  treasureType?: 'RANDOM' | 'FIXED'
  className?: string
  imgIcon?: boolean
}> = ({ type, treasureType, className, imgIcon }) => {
  switch (type) {
    case 'USDT':
      if (imgIcon)
        return (
          <img
            className={cn('h-[100px] w-[100px]', className)}
            src="/images/task/reward-usdt.png"
            alt="taskIcon"
          />
        )
      return <UsdtIcon className={cn('h-[18px] w-[18px]', className)} />
    case 'TON':
      if (imgIcon)
        return (
          <img
            className={cn('h-[100px] w-[100px]', className)}
            src="/images/task/reward-ton.png"
            alt="taskIcon"
          />
        )
      return <TonIcon className={cn('h-[18px] w-[18px]', className)} />
    case 'KATON':
      if (imgIcon)
        return (
          <img
            className={cn('h-[100px] w-[100px]', className)}
            src="/images/task/reward-katon.png"
            alt="taskIcon"
          />
        )
      return <KatonIcon className={cn('h-[18px] w-[18px]', className)} />
    case 'TREASURE':
      if (imgIcon)
        return treasureType === 'RANDOM' ? (
          <img
            className={cn('h-[100px] w-[100px]', className)}
            src="/images/task/treasure-award.png"
            alt="taskIcon"
          />
        ) : (
          <img
            className={cn('h-[100px] w-[100px]', className)}
            src="/images/task/reward-treasure.png"
            alt="taskIcon"
          />
        )

      if (treasureType === 'RANDOM') {
        return <TreasureRandomIcon className={cn('h-[18px] w-[18px]', className)} />
      }
      return <TreasureIcon className={cn('h-[18px] w-[18px]', className)} />
    case 'HAMMER':
      if (imgIcon)
        return (
          <img
            className={cn('h-[100px] w-[100px]', className)}
            src="/images/task/reward-hammer.png"
            alt="taskIcon"
          />
        )
      return <SmashEggIcon className={cn('h-[18px] w-[18px]', className)} />
  }
}

// 按鈕狀態管理
const useButtonState = (
  status: rewardClaimStatus,
  isAnimating: boolean,
  actionType: TaskActionType
) => {
  const { t } = useTranslation()
  return useMemo(() => {
    switch (status) {
      case 'CLAIMED':
        return {
          disabled: true,
          text: <CheckIcon className="h-5 w-5" />,
          variant: 'green' as const,
        }
      case 'WAITING_CLAIM':
        return {
          disabled: isAnimating,
          text: isAnimating ? '^_^' : t('Claim'),
          variant: 'default' as const,
        }
      case 'INELIGIBLE':
        if (actionType === 'OPEN_LINK') {
          return { disabled: false, text: t('Go'), variant: 'default' as const }
        }
        return { disabled: true, text: t('Claim'), variant: 'default' as const }
      default:
        return null
    }
  }, [status, isAnimating, actionType, t])
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { t } = useTranslation()

  // 獎勵彈窗邏輯
  const [isRewardDialogOpen, setIsRewardDialogOpen] = useState(false)
  const onRewardDialogChange = (type: boolean) => {
    setIsRewardDialogOpen(type)
  }

  // 敘述展開邏輯
  const [isExpanded, setIsExpanded] = useState(false)

  // 按鈕動畫邏輯
  const [isAnimating, setIsAnimating] = useState(false)
  const [btnStatus, setBtnStatus] = useState<rewardClaimStatus>(task.rewardClaimStatus)
  const buttonState = useButtonState(btnStatus, isAnimating, task.actionType)

  // 響應api給的按鈕狀態
  useEffect(() => {
    setBtnStatus(task.rewardClaimStatus)
  }, [task.rewardClaimStatus])

  // 是否顯示限量
  const isLimited = useMemo<boolean>(() => {
    return !!task.endTime || parseAmount(task.rewardAmountLimit) !== 0
  }, [task])

  // 任務領取
  const { mutateAsync: claimRewardAsync, isPending } = useMutation({
    mutationFn: (id: string) => apis.task.taskClaimRewardIdCreate(id),
    onSuccess: () => {
      setBtnStatus('CLAIMED')
      emitter.emit('refetchTaskList', true)
    },
  })
  const handleClaim = async (
    actionType: TaskActionType,
    status: rewardClaimStatus,
    id: string,
    link?: string
  ) => {
    // 如果任務類型是 OPEN_LINK，且狀態是 INELIGIBLE(不符合領取條件)
    if (actionType === 'OPEN_LINK' && status === 'INELIGIBLE' && link) {
      handleOpenLink(id, link)
      return
    }

    try {
      await claimRewardAsync(id)
      // 過場動畫
      setIsAnimating(true)
      setTimeout(() => {
        setIsAnimating(false)
      }, 1000)
      setTimeout(() => {
        onRewardDialogChange(true)
      }, 1500)
    } catch (error) {
      errorToast(error?.response?.data?.message || 'Claim Failed')
      console.error('[ERROR] Claim Failed ', error)
    }
  }

  //先檢查是否登入 =>通知後端已點連結 => 另開連結
  const utils = useUtils()
  const inTelegram = useStore(state => state.inTelegram)
  const isLoggedIn = useStore(state => state.isLoggedIn)
  const openNeedLoginDialog = useStore(state => state.openNeedLoginDialog)
  const { mutateAsync: openLinkAsync } = useMutation({
    mutationFn: (id: string) => apis.task.taskOpenLinkIdCreate(id),
  })
  const handleOpenLink = async (id: string, link: string) => {
    try {
      if (!isLoggedIn) {
        openNeedLoginDialog()
        return
      }

      await openLinkAsync(id)
      if (inTelegram) {
        link.startsWith('https://t.me/') ? utils.openTelegramLink(link) : utils.openLink(link)
      } else {
        window.open(link, '_blank')
      }
    } catch (error) {
      errorToast(error?.response?.data?.message || 'Open Link Failed')
      console.error('[ERROR] Open Link Failed ', error)
    }
  }

  /**
   * 特定類型要顯示的 desc
   * @interface
   */
  const showDesc = useMemo(() => {
    switch (task.actionType) {
      case 'RECHARGE':
        return ['RECHARGE_AMOUNT', 'RECHARGE_COUNT'].some(
          key => task.rechargeCondition?.parameterType === key
        )
          ? t('task.depositDescription')
          : null
      case 'INVITE_FRIENDS':
        return task.inviteFriendsCondition?.parameterValue === 'INVITE_VALID_USER'
          ? t('task.inviteFriendsDescription')
          : null
      case 'TEAM_RECHARGE':
        return ['TEAM_RECHARGE_AMOUNT', 'DIRECT_SUBORDINATE_RECHARGE_AMOUNT'].some(
          key => task.teamRechargeCondition?.parameterType === key
        )
          ? t('task.depositDescription')
          : null
      case 'TEAM_CLASS_ACHIEVEMENT':
        if (!task.teamClassRewardSetting) return null
        return (
          <>
            {Object.keys(task?.teamClassRewardSetting ?? {}).map(key => {
              return (
                <>
                  {Number(key.replace(/[^0-9]/g, ''))} star {task.rewardType} x{' '}
                  {task?.teamClassRewardSetting?.[key as keyof typeof task.teamClassRewardSetting]}
                  <br />
                </>
              )
            })}
            {t('task.teamClassRewardDescription')}
          </>
        )
      default:
        return null
    }
  }, [t, task])

  return (
    <div
      className={cn('relative rounded-xl bg-[#333] text-xs font-ultra', isLimited ? 'pt-5' : '')}
    >
      {isLimited && (
        <div className="absolute -left-[0.5px] -top-[0.5px] flex h-5 w-20 items-center space-x-1 rounded-br-lg rounded-tl-lg bg-gradient-to-b from-[#FF8C8C] to-[#FF0E03] px-3 py-1">
          <ClockIcon className="w-3" />
          <span className="text-[10px] text-white">{t('Limited')}</span>
        </div>
      )}
      <div className="flex items-center justify-between px-3 pt-2.5 text-white">
        <p>{TaskNameFormat(task)}</p>
        {/* Claim button with animation */}
        <div className="relative h-7">
          {buttonState && (
            <Button
              catEars
              variant={buttonState.variant}
              className={cn('h-7 w-[74px] transition-all duration-300', {
                'opacity-0': isAnimating,
              })}
              onClick={() =>
                handleClaim(
                  task.actionType,
                  task.rewardClaimStatus,
                  task.id,
                  task?.openLinkCondition?.parameterValue
                )
              }
              disabled={buttonState.disabled}
              loading={isPending}
            >
              {buttonState.text}
            </Button>
          )}
          {isAnimating && (
            <Button
              catEars
              variant="green"
              className={cn('absolute bottom-0 left-0 h-7 w-[74px]', styles['animate-slide-up'])}
            >
              ^_^
            </Button>
          )}
        </div>
      </div>
      <div className="mt-3 rounded-b-xl border-t border-dashed border-white/20 bg-[#333] pb-2 pl-3">
        <div className="flex h-7 justify-between pt-2">
          <div className="flex items-center space-x-1 text-primary">
            <TaskIcon
              type={task.rewardType}
              treasureType={task.treasureSetting?.distributionMethod}
            />
            <span>x</span>
            <span>{task.rewardAmount}</span>
            {task.rewardType === 'TREASURE' && (
              <div className="flex items-center space-x-1 rounded-full bg-[#1C1C1C] pl-1 pr-1.5 text-[10px] -tracking-[1px] text-white/70">
                <CurrencyIcon currency={task.treasureSetting?.rewardType} className="h-3 w-3" />
                {task.treasureSetting?.distributionMethod === 'FIXED' && (
                  <Amount
                    value={parseAmount(task.treasureSetting?.fixedAmount ?? 0)}
                    thousandSeparator
                    crypto={task.treasureSetting?.rewardType}
                  />
                )}
                {task.treasureSetting?.distributionMethod === 'RANDOM' && (
                  <div>
                    <Amount
                      value={parseAmount(task.treasureSetting?.minAmount ?? 0)}
                      thousandSeparator
                      crypto={task.treasureSetting?.rewardType}
                    />
                    ~
                    <Amount
                      value={parseAmount(task.treasureSetting?.maxAmount ?? 0)}
                      thousandSeparator
                      crypto={task.treasureSetting?.rewardType}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
          {(!!showDesc || isLimited) && (
            <Button
              variant="icon"
              className="-mt-0.5 flex h-6 items-center justify-between space-x-2"
              onClick={() => setIsExpanded(prev => !prev)}
            >
              <ArrowLineDownIcon
                className={`h-4 w-4 text-white/70 transition-transform duration-300 ${
                  isExpanded ? 'rotate-180' : ''
                }`}
              />
            </Button>
          )}
        </div>
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="pt-3 text-xs font-normal text-white/70">
            <p className="pr-1">{showDesc}</p>
            <div className="mt-1 text-xs text-app-red">
              {task.endTime && (
                <p>
                  {t('LimitedTime')}: <span>{limitTimeString(task.startTime, task.endTime)}</span>
                </p>
              )}
              {task.rewardAmountLimit && (
                <p>
                  {t('LimitedQuantity')}:{' '}
                  <Amount
                    value={parseAmount(task.rewardAmountLimit)}
                    thousandSeparator
                    crypto="USDT"
                  />
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <RewardDialog
        isOpen={isRewardDialogOpen}
        onOpenChange={onRewardDialogChange}
        rewardAmount={task.rewardAmount}
        rewardType={task.rewardType}
        treasureSetting={task.treasureSetting}
      />
    </div>
  )
}

export default TaskItem
