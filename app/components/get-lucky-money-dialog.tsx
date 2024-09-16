import { useEffect, useState } from 'react'

import { Dialog, DialogContent, DialogTrigger } from '~/components/ui/dialog'
import { Button } from '~/components/ui/button'
import { KokonIcon } from '~/components/color-icons'

const GetLuckyMoneyDialog: React.FC = () => {
  const [bagOpen, setBagOpen] = useState(false)

  useEffect(() => {
    return () => {
      setBagOpen(false)
    }
  }, [setBagOpen])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button catEars variant="danger" className="mt-8 w-full">
          For Test Open luckBag
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-transparent">
        {!bagOpen && (
          <div className="flex flex-col items-center justify-center gap-1 px-9 text-lg font-[1000] text-white">
            <div>You got chance to earn</div>
            <div>a Luck Battle Bag from</div>
            <div>User1234</div>
            <div
              className="relative"
              onClick={() => {
                setBagOpen(true)
              }}
              onKeyDown={() => {}}
              role="button"
              tabIndex={0}
            >
              <img
                src="/public/images/lucky-money/open-lucky-bag.png"
                className="h-[336px] w-[279px]"
                alt="open-lucky-bag"
              />
              <div className="absolute bottom-[44%] w-full text-center text-lg font-[1000] text-[#FE8C02]">
                OPEN
              </div>
              <div className="absolute bottom-4 flex w-full flex-col items-center gap-1 font-[1000]">
                <div className="text-base text-white">Potential Gain</div>
                <div className="flex text-sm">
                  <KokonIcon className="h-5 w-5" />
                  <div className="text-[#FFF200]">1,000~2,000</div>
                </div>
              </div>
            </div>
          </div>
        )}
        {bagOpen && (
          <div className="flex flex-col items-center justify-center gap-1 px-9 text-lg font-[1000] text-white">
            <div className="text-center">
              <span className="inline-block">You got a Luck Battle Bag from</span>
            </div>
            <div>User1234</div>
            <div className="flex items-center">
              <KokonIcon className="h-8 w-8" />
              <div className="ml-1 text-[#FFF200]">1,888</div>
            </div>
            <div className="relative aspect-[375/344] w-full max-w-[375px]">
              <img
                src="/public/images/lucky-money/happy-cat.png"
                className="absolute inset-0 h-full w-full object-contain"
                alt="happy-cat"
              />
            </div>
            <Button catEars className="-mt-8 w-full">
              Got it
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default GetLuckyMoneyDialog
