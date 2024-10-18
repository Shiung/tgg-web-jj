import { memo, useMemo, type FC } from 'react'
import { cn } from '~/lib/utils'
import { Button } from '~/components/ui/button'
import Amount from '~/components/amount'
import Icons from '~/icons'
import { Crypto, cryptoDetails } from '~/consts/crypto'

import type { BCRankInfoResponse, ShareRankInfoResponse } from '~/api/codegen/data-contracts'
import Rules from './rules'
import { useTranslation } from 'react-i18next'

type Props = {
  theme?: 'crypto' | 'share'
  currency: Crypto
  dataLs: BCRankInfoResponse['rank'] | ShareRankInfoResponse['rank']
  rewardLock?: boolean
}

type UnitBoardProps = {
  id: string
  imgHeader: string
  imgBoard: string
  currency?: Crypto
  avatar?: string
  name?: string
  reward?: string
  scoreCount?: string
  ranking: number
  rewardLock?: boolean
}

const UnitBoard = ({
  imgBoard,
  imgHeader,
  avatar,
  currency,
  name,
  scoreCount,
  reward,
  rewardLock = false,
}: UnitBoardProps) => {
  const currencyIcon = useMemo(() => currency && cryptoDetails?.[currency], [currency])
  return (
    <div className={cn('px-2 [&>div]:w-full', rewardLock ? 'space-y-3' : 'space-y-7')}>
      <div className="space-y-1 text-center">
        <div className="text-[14px] font-ultra">{name}</div>
        <div className="text-[12px]">{scoreCount}</div>
        <div className="relative w-full">
          <img src={imgHeader} alt="background-board-header" className="w-full" />
          {avatar && (
            <div className="absolute left-1/2 top-1/2 aspect-square w-[55%] -translate-x-1/2 -translate-y-1/2 rounded-full border-[2px] border-[#ffe100]">
              img
            </div>
          )}
        </div>
      </div>
      <div className="relative">
        {!rewardLock && (
          <div className="primary-gradient-border-rounded !absolute -top-4 left-1/2 flex h-[30px] min-w-[50%] -translate-x-1/2 items-center rounded-[100px] bg-black px-2 before:rounded-[100px]">
            {currencyIcon?.icon && <currencyIcon.icon className="mr-1 h-4 w-4" />}
            <span className="whitespace-nowrap text-base font-ultra">
              <Amount value={reward} crypto={currency} />
            </span>
          </div>
        )}
        <img src={imgBoard} alt="background-board" className="w-full" />
      </div>
    </div>
  )
}

const BoardConf: UnitBoardProps[] = [
  {
    id: 'second',
    ranking: 2,
    imgHeader: '/images/rank/rank-board-header-2.png',
    imgBoard: '/images/rank/rank-board-2.png',
  },
  {
    id: 'first',
    ranking: 1,
    imgHeader: '/images/rank/rank-board-header-1.png',
    imgBoard: '/images/rank/rank-board-1.png',
  },
  {
    id: 'third',
    ranking: 3,
    imgHeader: '/images/rank/rank-board-header-3.png',
    imgBoard: '/images/rank/rank-board-3.png',
  },
] as const

const Board: FC<Props> = ({ theme = 'crypto', dataLs, rewardLock = false }) => {
  const { t } = useTranslation()
  const ls = useMemo(() => {
    return BoardConf.map(b => {
      const findData = dataLs.find(({ ranking }) => ranking === b.ranking)
      return {
        ...b,
        ...{ rewardLock: rewardLock || !findData?.rewardType },
        ...(findData && 'rewardType' in findData && { currency: findData.rewardType as Crypto }),
        ...(findData && 'customerName' in findData && { name: findData.customerName }),
        ...(findData && 'reward' in findData && { reward: findData.reward }),
        ...(findData && 'scoreCount' in findData && { scoreCount: findData.scoreCount as string }),
      }
    })
  }, [dataLs, rewardLock])

  return (
    <div
      className={cn(
        'relative aspect-[375/270] w-full rounded-t-xl',
        theme === 'crypto' ? 'bg-colorLinear-purple' : 'bg-colorLinear-green'
      )}
    >
      <img
        src="/images/long-wave.png"
        alt="background"
        className="absolute bottom-0 left-0 aspect-[375/126] w-full"
      />

      <Rules type={theme}>
        <Button
          variant="outline"
          size="link"
          className="absolute right-4 top-4 z-[1] space-x-1 px-2 py-1"
        >
          <Icons.HelpIcon className="h-4 w-4" />
          <span className="text-xs">{t('rule')}</span>
        </Button>
      </Rules>

      <div className="absolute bottom-[15px] flex w-full items-end justify-around [&>div]:w-[30%]">
        {useMemo(() => {
          return ls.map(b => <UnitBoard key={b.id} {...b} />)
        }, [ls])}
      </div>
    </div>
  )
}

export default memo(Board)
