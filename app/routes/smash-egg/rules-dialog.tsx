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

const RulesDialog: React.FC<RulesDialogProps> = ({ prizePools }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="icon" size="icon" className="z-40 h-6 w-6 opacity-100">
          <img src="/images/smash-egg/icon-qustion.png" alt="Question" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rules of Smash Egg</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-6 px-3 text-base text-white/70">
          <p className="text-center">
            Welcome to Smash Egg. Consume the hammer to get the big prize. Depending on the type of
            egg, the rewards and the required hammer for each smash are different:
          </p>
          <div className="flex flex-col gap-3">
            {prizePools.map(item => (
              <div
                key={item.eggLevel}
                className="flex flex-col gap-1 rounded-lg bg-[#7D2FD7] px-3 py-2"
              >
                <div className="rounded-[6px] bg-[#ffffff33]">
                  <div className="flex items-center justify-between px-2">
                    <p className="text-sm font-extrabold text-white">
                      {item.eggLevel.charAt(0).toUpperCase() + item.eggLevel.slice(1).toLowerCase()}
                    </p>
                    <p>
                      <i className="relative top-0.5 inline-block h-4 w-[13.6px] bg-[url('/images/smash-egg/hammer.png')] bg-contain bg-no-repeat" />
                      <span className="px-1 text-sm font-extrabold text-[#FFF200]">
                        x{item.hammerSpent}
                      </span>
                      <span className="text-xs">per smash</span>
                    </p>
                  </div>
                </div>
                <p className="text-xs">
                  You can get{' '}
                  <span className="text-white">
                    {item.displayUsdtPrizeMin}-{item.displayUsdtPrizeMax}
                  </span>{' '}
                  USDT after egg is broken.
                </p>
              </div>
            ))}
          </div>
          <div className="rounded-xl bg-[#FDCB041A] px-3 py-2 text-[#FFF200]">
            <div className="text-sm font-extrabold">Notice</div>
            <div className="mt-2 text-xs">
              You have to smash the egg continuously until the egg is broken. If you give up
              halfway, the consumed hammer will not be returned.
            </div>
          </div>
        </div>
        <DialogFooter className="flex flex-row space-x-2 p-3" />
      </DialogContent>
    </Dialog>
  )
}

export default RulesDialog
