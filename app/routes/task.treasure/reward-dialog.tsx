import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog'
import { Button } from '~/components/ui/button'
import { UsdtIcon } from '~/components/color-icons'
import Amount from '~/components/amount'

interface RewardDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  rewardAmount: number
}

const RewardDialog: React.FC<RewardDialogProps> = ({ isOpen, onOpenChange, rewardAmount }) => (
  <Dialog open={isOpen} onOpenChange={onOpenChange}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Claim Success</DialogTitle>
      </DialogHeader>
      <div className="px-3 py-4 text-base text-white/70">
        <img className="mx-auto w-24" src="/images/task/treasure-award.png" alt="Treasure Award" />
        <div>
          <p className="text-center text-sm font-normal leading-[18px] text-white">You got</p>
          <div className="mt-1 flex items-center justify-center space-x-1 text-xl font-ultra leading-normal">
            <span className="text-white">Treasure</span>
            <span className="text-primary">x</span>
            <span className="text-primary">1</span>
          </div>
          <div className="mt-1 flex justify-center">
            <div className="inline-flex items-center space-x-1 rounded-full bg-[#1C1C1C] py-1 pl-1 pr-1.5 text-[10px] text-xs -tracking-[1px] text-white">
              <UsdtIcon className="w-4" />
              <div className="font-ultra">
                <Amount value={rewardAmount} thousandSeparator crypto="USDT" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <DialogFooter className="px-3 pb-4 pt-2">
        <Button catEars className="w-full" onClick={() => onOpenChange(false)}>
          Ok
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
)

export default RewardDialog
