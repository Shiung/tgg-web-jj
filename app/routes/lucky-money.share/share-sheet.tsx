import { useState } from 'react'

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '~/components/ui/sheet'
import { Button } from '~/components/ui/button'
import SvgCopy from '~/icons/copy.svg?react'

const ShareSheet: React.FC = () => {
  const [shareUrl, setShareUrl] = useState('http://kokon.com/=3782038u219')

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
        <SheetHeader>
          {/* TODO: sheet haeder adjust */}
          {/* <SheetClose asChild>
            <div>aaa</div>
          </SheetClose> */}
          <SheetTitle className="text-lg font-[1000]">Your Lucky Money is ready!</SheetTitle>
          <div className="flex flex-col items-center gap-2 text-white/70">
            <img
              src="/public/images/lucky-money/cat-whole-body.png"
              className="h-52 w-44"
              alt="cat-whole-body"
            />
            <div className="mb-2 flex w-full flex-grow items-center rounded-full bg-gray-800 px-4 py-2">
              <input
                value={shareUrl}
                onChange={e => setShareUrl(e.target.value)}
                type="text"
                className="flex-grow bg-transparent text-sm outline-none"
              />
              <SvgCopy className="h-4 w-4" />
            </div>
            <Button className="w-full" catEars>
              Share
            </Button>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}

export default ShareSheet
