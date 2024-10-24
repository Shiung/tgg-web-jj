import React, { useMemo, useRef, useEffect, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { Truncate } from '@re-dev/react-truncate'
import { Crypto, cryptoDetails } from '~/consts/crypto'
import Icons from '~/icons'
import { cn } from '~/lib/utils'
import Amount from '~/components/amount'

type Props = {
  type: 'crypto' | 'share'
  rank: number
  name: string
  currency: Crypto
  reward: string
  scoreCount: string
  isSelf?: boolean
  rewardLock?: boolean
}

const Layout = ({
  slot_first,
  slot_second,
  slot_third,
  isTitle = false,
  isSelf = false,
}: {
  slot_first: React.ReactNode
  slot_second: React.ReactNode
  slot_third: React.ReactNode
  isTitle?: boolean
  isSelf?: boolean
}) => {
  const domRef = useRef<HTMLDivElement>(null)
  const blockRef = useRef<HTMLDivElement>(null)
  const [fixedStyle, setFixedStyle] = useState<{ [key in string]: string }>({})

  useEffect(() => {
    if (!isSelf) return

    const resizeObserver = new ResizeObserver(e => {
      const resizeWidth = e[0].contentRect.width
      setFixedStyle(prev => ({
        ...prev,
        width: `${resizeWidth}px`,
      }))
    })
    blockRef.current && resizeObserver.observe(blockRef.current)

    const { height, width } = domRef.current?.getBoundingClientRect() ?? {}
    if (width && height) {
      setFixedStyle({
        width: `${width}px`,
        height: `${height}px`,
        position: 'fixed',
        bottom: '100px',
      })
    }

    return () => {
      setFixedStyle({})
    }
  }, [isSelf])

  return (
    <>
      <div
        ref={domRef}
        className={cn(
          'flex w-full items-center justify-start gap-2 px-3',
          isTitle ? '' : 'h-[54px] rounded-xl bg-[#1c1c1c] py-2',
          isSelf ? 'primary-gradient-border-rounded relative' : ''
        )}
        style={fixedStyle}
      >
        <div className="relative w-9 flex-shrink-0">{slot_first}</div>
        <div className="flex-1 space-y-1">{slot_second}</div>
        <div className="flex min-w-[100px] items-center justify-end space-x-1">{slot_third}</div>
      </div>

      <div
        ref={blockRef}
        className={cn(Object.keys(fixedStyle).length === 0 ? 'hidden' : '')}
        style={{ ...fixedStyle, position: 'static', width: '100%' }}
      />
    </>
  )
}

const classForMessageStyle =
  "before:content-[''] before:absolute before:bg-white before:w-[15px] before:h-[7px] before:rotate-[38deg] before:bottom-[-5px] before:right-[23px] before:rounded-[50%]"

const Title: React.FC<Pick<Props, 'rewardLock' | 'type'>> = ({ rewardLock = false, type }) => {
  const { t } = useTranslation()
  return (
    <Layout
      slot_first={<span className="text-xs font-normal text-white/70">{t('Rank')}</span>}
      slot_second={
        <span className="text-xs font-normal text-white/70">
          {t(
            type === 'crypto'
              ? 'rank.playerCard.table.title.playBet'
              : 'rank.playerCard.table.title.playShare'
          )}
        </span>
      }
      slot_third={
        !rewardLock && (
          <span className="text-xs font-normal text-white/70">
            {t('rank.playerCard.table.title.reward')}
          </span>
        )
      }
      isTitle
    />
  )
}

const PlayerCard: React.FC<Props> & {
  Title: typeof Title
} = ({ currency, rank, name, reward, scoreCount, type, isSelf = false, rewardLock = false }) => {
  const { t } = useTranslation()
  const currencyIcon = useMemo(() => currency && cryptoDetails?.[currency], [currency])

  return (
    <Layout
      slot_first={
        <>
          <img src="/images/rank/rank-medal.png" alt="background-board" className="h-9 w-9" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-ultra">
            {rank > 999 ? '999+' : rank}
          </div>
        </>
      }
      slot_second={
        <>
          <div className="whitespace-nowrap text-sm font-ultra">
            <Truncate>{isSelf ? t('Me') : name}</Truncate>
          </div>
          <div className="flex items-center space-x-1 text-xs text-white/70">
            {type === 'crypto' && <Icons.BetIcon className="h-3 w-3" />}
            {type === 'share' && <Icons.CatIcon className="h-3 w-3" />}
            <span>{scoreCount}</span>
          </div>
        </>
      }
      slot_third={
        isSelf && type === 'crypto' && !rewardLock && Number(reward) === 0 ? (
          <div className="absolute bottom-0 right-0">
            <div
              className={cn(
                'absolute bottom-0 left-[40px] -translate-x-full -translate-y-full whitespace-nowrap rounded-[20px] bg-white px-3 py-1 text-center text-xs font-ultra text-black/90',
                classForMessageStyle
              )}
            >
              <Trans i18nKey="rank.playerCard.trustMe" components={{ Comp: <div /> }} />
            </div>
            <img src="/images/rank/rank-self-tip.png" alt="background-board" className="w-[72px]" />
          </div>
        ) : rewardLock || !currency ? (
          <></>
        ) : (
          <>
            {currencyIcon?.icon && <currencyIcon.icon className="h-4 w-4" />}
            <span className="font-ultra">
              <Amount value={reward} crypto={currency} />
            </span>
          </>
        )
      }
      isSelf={isSelf}
    />
  )
}

PlayerCard.Title = Title

export default PlayerCard
