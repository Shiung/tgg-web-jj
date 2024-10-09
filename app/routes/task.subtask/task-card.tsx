import React, { useState } from 'react'
import Amount from '~/components/amount'
import {
  KokonIcon,
  UsdtIcon,
  ClockIcon,
  TonIcon,
  TreasureIcon,
  SmashEggIcon,
} from '~/components/color-icons'
import CheckIcon from '~/icons/check.svg?react'
import { Button } from '~/components/ui/button'
import ArrowLineDownIcon from '~/icons/arrow-line-down.svg?react'
import styles from './index.module.scss'
import { cn } from '~/lib/utils'
import { RewardType, StatusType } from './route'
import { parseAmount } from '~/lib/amount'

interface TaskCardProps {
  title: string
  status: StatusType
  desc: string
  reward: {
    type: RewardType
    amount: number
  }
  isLimitTask: boolean
  limitTime: string
  limitQuantity: number
}

const TaskCard: React.FC<TaskCardProps> = props => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [status, setStatus] = useState<StatusType>(props.status)

  return (
    <div className="relative rounded-xl bg-[#333] pt-5 text-xs font-ultra">
      {props.isLimitTask && (
        <div className="absolute -left-[0.5px] -top-[0.5px] flex h-5 w-20 items-center space-x-1 rounded-br-lg rounded-tl-lg bg-gradient-to-b from-[#FF8C8C] to-[#FF0E03] px-3 py-1">
          <ClockIcon className="w-3" />
          <span className="text-[10px] text-white">Limited</span>
        </div>
      )}
      <div className="flex items-center justify-between px-3 pt-2.5 text-white">
        <p>{props.title}</p>
        {/* Claim button with animation */}
        <div className="relative h-7">
          <Button
            catEars
            variant={status === StatusType.Claimed ? 'green' : 'default'}
            className={cn('h-7 w-[74px] transition-all duration-300')}
            onClick={() => {
              if (status === StatusType.Unclaimed) {
                setIsAnimating(true)
                setTimeout(() => {
                  setIsAnimating(false)
                  setStatus(StatusType.Claimed)
                }, 1000)
              }
            }}
            disabled={status === StatusType.Claimed || isAnimating}
          >
            {status === StatusType.InProgress ? (
              'Go'
            ) : status === StatusType.Unclaimed ? (
              'Claim'
            ) : status === StatusType.Claimed ? (
              <CheckIcon className="h-5 w-5" />
            ) : (
              'Claim'
            )}
          </Button>
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
            {props.reward.type === RewardType.KOKON && <KokonIcon className="h-[18px] w-[18px]" />}
            {props.reward.type === RewardType.Hammer && (
              <SmashEggIcon className="h-[18px] w-[18px]" />
            )}
            {props.reward.type === RewardType.USDT && <UsdtIcon className="h-[18px] w-[18px]" />}
            {props.reward.type === RewardType.TON && <TonIcon className="h-[18px] w-[18px]" />}
            {props.reward.type === RewardType.Chest && (
              <TreasureIcon className="h-[18px] w-[18px]" />
            )}
            <span>x</span>
            <span>{props.reward.amount}</span>
            {props.reward.type === RewardType.Hammer && (
              <div className="flex items-center space-x-1 rounded-full bg-[#1C1C1C] pl-1 pr-1.5 text-[10px] -tracking-[1px] text-white/70">
                <UsdtIcon className="h-3 w-3" />
                <div>
                  <Amount value={parseAmount(1000000000000)} thousandSeparator crypto="USDT" />
                  ~
                  <Amount value={parseAmount(1000000000000)} thousandSeparator crypto="USDT" />
                </div>
              </div>
            )}
          </div>
          {props.desc && (
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
            <p>
              Only when your friends registered and owned over 100 Kokon in their wallet are counted
              valid member.
            </p>
            {props.isLimitTask && (
              <div className="mt-1 text-xs text-[#FF4D48]">
                {props.limitTime && (
                  <p>
                    Limited Time: <span>{props.limitTime}</span>
                  </p>
                )}
                {props.limitQuantity > 0 && (
                  <p>
                    Limited quantity:{' '}
                    <Amount value={props.limitQuantity} thousandSeparator crypto="USDT" />
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskCard
