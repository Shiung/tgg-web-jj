import React from 'react'
import { type RewardType } from './type'
import { type TaskQueryResponse } from '~/api/codegen/data-contracts'
import { parseAmount } from '~/lib/amount'
import { useTranslation } from 'react-i18next'

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog'
import { Button } from '~/components/ui/button'
import Amount from '~/components/amount'
import { TaskIcon } from './task-item'
import { CurrencyIcon } from '~/components/currency-icon'

interface RewardDialogProps {
  isOpen: boolean
  rewardAmount: string
  rewardType: RewardType
  treasureSetting: NonNullable<TaskQueryResponse['dailyList']>[number]['treasureSetting']
  onOpenChange: (open: boolean) => void
}

const RewardDialog: React.FC<RewardDialogProps> = ({
  isOpen,
  onOpenChange,
  rewardAmount,
  rewardType,
  treasureSetting,
}) => {
  const { t } = useTranslation()
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('ClaimSuccess')}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center px-3 py-4 text-base text-white/70">
          <TaskIcon
            type={rewardType}
            treasureType={treasureSetting?.distributionMethod}
            className="mb-3 h-28 w-28"
            imgIcon
          />
          <div>
            <p className="text-center text-sm font-normal leading-[18px] text-white">
              {t('YouGot')}
            </p>
            <div className="mt-1 flex items-center justify-center space-x-1 text-xl font-ultra leading-normal">
              <span className="text-white">{rewardType}</span>
              <span className="text-primary">x</span>
              <span className="text-primary">{rewardAmount}</span>
            </div>
            {rewardType === 'TREASURE' && (
              <div className="mt-1 flex justify-center">
                <div className="inline-flex items-center space-x-1 rounded-full bg-[#1C1C1C] py-1 pl-1 pr-1.5 text-[10px] text-xs font-ultra -tracking-[1px] text-white">
                  <CurrencyIcon currency={treasureSetting?.rewardType} className="h-4 w-4" />
                  {treasureSetting?.distributionMethod === 'FIXED' && (
                    <Amount
                      value={parseAmount(treasureSetting?.fixedAmount ?? 0)}
                      thousandSeparator
                      crypto={treasureSetting?.rewardType}
                    />
                  )}
                  {treasureSetting?.distributionMethod === 'RANDOM' && (
                    <div className="flex items-center space-x-1 text-xs font-ultra">
                      <Amount
                        value={parseAmount(treasureSetting?.minAmount ?? 0)}
                        thousandSeparator
                        crypto={treasureSetting?.rewardType}
                      />
                      <span>~</span>
                      <Amount
                        value={parseAmount(treasureSetting?.maxAmount ?? 0)}
                        thousandSeparator
                        crypto={treasureSetting?.rewardType}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        <DialogFooter className="px-3 pb-4 pt-2">
          <Button catEars className="w-full" onClick={() => onOpenChange(false)}>
            {t('Ok')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default RewardDialog
