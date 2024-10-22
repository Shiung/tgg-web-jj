import React from 'react'
import { Button } from '~/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'
import type { RulesDialogProps } from './types'
import { useTranslation, Trans } from 'react-i18next'
import Amount from '~/components/amount'

const RulesDialog: React.FC<RulesDialogProps> = ({ prizePools }) => {
  const { t } = useTranslation()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="icon" size="icon" className="z-40 h-6 w-6 opacity-100">
          <img src="/images/smash-egg/icon-qustion.png" alt="Question" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('eggRule.title')}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-6 px-3 pt-4 text-base text-white/70">
          <p className="text-center">{t('eggRule.heading')}</p>
          <div className="flex flex-col gap-3">
            {prizePools.map(item => (
              <div
                key={item.eggLevel}
                className="flex flex-col gap-1 rounded-lg bg-[#7D2FD7] px-3 py-2"
              >
                <div className="rounded-[6px] bg-[#ffffff33]">
                  <div className="flex items-center justify-between px-2">
                    <p className="text-sm font-ultra text-white">
                      {t(`eggRule.eggName.${item.eggLevel.toLocaleLowerCase()}`)}
                    </p>
                    <p>
                      <i className="relative top-0.5 inline-block h-4 w-[13.6px] bg-[url('/images/smash-egg/hammer.png')] bg-contain bg-no-repeat" />
                      <span className="px-1 text-sm font-ultra text-[#FFF200]">
                        x{item.hammerSpent}
                      </span>
                      <span className="text-xs">{t('perSmash')}</span>
                    </p>
                  </div>
                </div>
                <p className="text-xs">
                  <Trans
                    i18nKey="eggRule.hint"
                    components={{
                      amount1: (
                        <Amount
                          value={item.displayUsdtPrizeMin}
                          crypto="USDT"
                          className="text-white"
                        />
                      ),
                      amount2: (
                        <Amount
                          value={item.displayUsdtPrizeMax}
                          crypto="USDT"
                          className="text-white"
                        />
                      ),
                    }}
                  ></Trans>
                </p>
              </div>
            ))}
          </div>
          <div className="rounded-xl bg-[#FDCB041A] px-3 py-2 text-[#FFF200]">
            <div className="text-sm font-ultra">{t('eggRule.noticeTitle')}</div>
            <div className="mt-2 text-xs">{t('eggRule.noticeContens')}</div>
          </div>
        </div>
        <DialogFooter className="flex flex-row space-x-2 p-3" />
      </DialogContent>
    </Dialog>
  )
}

export default RulesDialog
