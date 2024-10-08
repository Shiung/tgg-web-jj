import { useState } from 'react'

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '~/components/ui/sheet'
import { Button } from '~/components/ui/button'
import SvgCopy from '~/icons/copy.svg?react'

const ShareSheet: React.FC = () => {
  const [shareUrl, setShareUrl] = useState(window.location.origin)

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.blur()
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="mt-6 w-full">
          <Button className="w-full" catEars>
            Share
          </Button>
        </div>
      </SheetTrigger>
      <SheetContent side="bottom" className="rounded-t-xl bg-colorLinear-orange">
        <SheetHeader className="bg-transparent px-0">
          <SheetTitle className="text-lg font-ultra">Your Lucky Money is ready!</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col items-center space-y-2 text-white/70">
          <img
            src="/images/lucky-money/cat-whole-body.png"
            className="h-52 w-44"
            alt="cat-whole-body"
          />
          <div className="flex w-full flex-col items-center bg-[url('/images/lucky-money/lucky-money-bg.svg')] p-3 pb-0">
            <div className="mb-2 flex w-full flex-grow items-center rounded-full border-[0.5px] border-[#FFFFFF33] bg-[#333333] px-4 py-2 font-ultra text-white">
              <input
                value={shareUrl}
                onChange={e => setShareUrl(e.target.value)}
                type="text"
                className="flex-grow bg-transparent text-sm outline-none"
                readOnly
                onFocus={handleInputFocus}
              />
              <SvgCopy className="h-4 w-4 text-[#FFFFFFB2]" />
            </div>
            <Button className="mb-5 mt-2 w-full" catEars>
              Share
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default ShareSheet
