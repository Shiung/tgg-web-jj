import React from 'react'
import { useTranslation } from 'react-i18next'
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

const infoConf: Record<
  'crypto' | 'share',
  {
    title: string
    content: Array<{
      subTitle: string
      content: string
      hasChild?: Array<{
        subTitle: string
        content: string
      }>
    }>
  }
> = {
  crypto: {
    title: 'rank.rules.crypto.title',
    content: [
      {
        subTitle: 'rank.rules.crypto.content1.subTitle',
        content: 'rank.rules.crypto.content1.content',
      },
      {
        subTitle: 'rank.rules.crypto.content2.subTitle',
        content: 'rank.rules.crypto.content2.content',
      },
      {
        subTitle: 'rank.rules.crypto.content3.subTitle',
        content: '',
        hasChild: [
          {
            subTitle: 'rank.rules.crypto.content4.subTitle',
            content: 'rank.rules.crypto.content4.content',
          },
          {
            subTitle: 'rank.rules.crypto.content5.subTitle',
            content: 'rank.rules.crypto.content5.content',
          },
          {
            subTitle: 'rank.rules.crypto.content6.subTitle',
            content: 'rank.rules.crypto.content6.content',
          },
        ],
      },
      {
        subTitle: 'rank.rules.crypto.content7.subTitle',
        content: 'rank.rules.crypto.content7.content',
      },
    ],
  },
  share: {
    title: 'rank.rules.share.title',
    content: [
      {
        subTitle: 'rank.rules.share.content1.subTitle',
        content: 'rank.rules.share.content1.content',
      },
      {
        subTitle: 'rank.rules.share.content2.subTitle',
        content: 'rank.rules.share.content2.content',
      },
      {
        subTitle: 'rank.rules.share.content3.subTitle',
        content: '',
        hasChild: [
          {
            subTitle: 'rank.rules.share.content4.subTitle',
            content: 'rank.rules.share.content4.content',
          },
        ],
      },
      {
        subTitle: 'rank.rules.share.content5.subTitle',
        content: 'rank.rules.share.content5.content',
      },
    ],
  },
}

export default function Rules({ children, type }: React.PropsWithChildren<RulesSheetProps>) {
  const { t } = useTranslation()
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
          <SheetTitle>{t(infoConf?.[type].title)}</SheetTitle>
        </SheetHeader>
        <SheetClose />
        <div className="mx-auto max-h-[calc(100vh_-_48px-_44px)] w-full space-y-6 overflow-y-auto p-4 text-start">
          {infoConf?.[type].content.map(({ subTitle, content, hasChild }, idx) => {
            return (
              <div key={`${type}-${idx}`}>
                {subTitle && (
                  <div className="mb-2 text-base font-ultra leading-snug text-white">
                    {t(subTitle)}
                  </div>
                )}
                {!hasChild && content && (
                  <div className="text-sm font-normal leading-[18px] text-white/70">
                    {t(content)}
                  </div>
                )}
                {hasChild && (
                  <div className="space-y-2">
                    {hasChild.map((c, idx) => (
                      <div key={`child-${idx}`}>
                        {c.subTitle && (
                          <div className="text-sm font-ultra leading-[18px] text-white">
                            {t(c.subTitle)}
                          </div>
                        )}
                        {c.content && (
                          <div className="text-sm font-normal leading-[18px] text-white/70">
                            {t(c.content)}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </SheetContent>
    </Sheet>
  )
}
