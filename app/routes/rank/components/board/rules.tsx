import React from 'react'
import { Button } from '~/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '~/components/ui/sheet'

interface RulesSheetProps {
  type: 'crypto' | 'share'
}

const infoConf = {
  crypto: {
    title: 'Crypto Rank Rule',
    content: [
      {
        subTitle: 'Valid bet',
        content:
          'The ranking is based on how much you bet in crypto games (Mines, Crash). Valid bets will only be calculated for bets that have been settled and produced a win or loss result. Any games played, tied, or canceled will not be counted in valid bets.',
      },
      {
        subTitle: 'Update time',
        content: 'Ranking list is updated once an hour.',
      },
      {
        subTitle: 'End time',
        content: '',
      },
      {
        subTitle: 'Daily',
        content: 'Every day 13:00（UTC+8）',
      },
      {
        subTitle: 'Weekly',
        content: 'Monday 13:00（UTC+8）',
      },
      {
        subTitle: 'Monthly',
        content: '10th of each month 13:00（UTC+8）',
      },
      {
        subTitle: 'Ranking rewards',
        content:
          'Rewards will be distributed automatically in 2 hour after the final result of ranking come out.',
      },
    ],
  },
  share: {
    title: 'Share Rank Rule',
    content: [
      {
        subTitle: 'Valid friends',
        content:
          'Share Rank is a competition for who can invite more friends to join KOKON. The ranking is according how many friends you invite become valid members. Once your friends have more than 100 KOKON in their wallet, they are the valid friend.',
      },
      {
        subTitle: 'Update time',
        content: 'Ranking list is updated once an hour.',
      },
      {
        subTitle: 'End time',
        content: '',
      },
      {
        subTitle: 'Daily',
        content: 'Friday 13:00（UTC+8）',
      },
      {
        subTitle: 'Ranking rewards',
        content:
          'Rewards will be distributed automatically in 2 hour after the final result of ranking come out.',
      },
    ],
  },
} as const

export default function Rules({ children, type }: React.PropsWithChildren<RulesSheetProps>) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        {React.isValidElement(children) ? (
          children
        ) : (
          <Button
            variant="link"
            size="link"
            className="w-[68px] whitespace-pre-wrap text-center text-xs font-normal text-white/70"
          >
            default button
          </Button>
        )}
      </SheetTrigger>
      <SheetContent side="bottom" className="max-h-[calc(100vh_-_48px)]">
        <SheetHeader className="pr-12">
          <SheetTitle>{infoConf?.[type].title}</SheetTitle>
        </SheetHeader>
        <SheetClose />
        <div className="mx-auto max-h-[calc(100vh_-_48px-_44px)] w-full space-y-6 overflow-y-auto p-4 text-start">
          {infoConf?.[type].content.map(({ subTitle, content }, idx) => {
            return (
              <div key={`${type}-${idx}`}>
                {subTitle && (
                  <div className="mb-2 text-base font-ultra leading-snug text-white">
                    {subTitle}
                  </div>
                )}
                {content && (
                  <div className="text-sm font-normal leading-[18px] text-white/70">{content}</div>
                )}
              </div>
            )
          })}
        </div>
      </SheetContent>
    </Sheet>
  )
}
