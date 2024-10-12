import { useState } from 'react'
import { SubmitHandler, useFormContext } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '~/components/ui/sheet'
import { Button } from '~/components/ui/button'
import SvgCopy from '~/icons/copy.svg?react'
import { apis } from '~/api'

import type { FormData } from './route'

const ShareSheet: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [shareUrl, setShareUrl] = useState(window.location.origin)
  const {
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useFormContext<FormData>()

  const createPacket = useMutation({
    mutationFn: apis.packet.packetCreate,
    onError: error => {
      console.error('packetCreate failed, onError:', error)
    },
  })

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.blur()
  }

  const onSubmit: SubmitHandler<FormData> = async data => {
    // const generatedShareUrl = `${window.location.origin}/share?amount=${data.distributedAmount}&type=${data.distributeKind}`
    // setShareUrl(generatedShareUrl)
    if (!isValid || isSubmitting || createPacket.isPending) return
    const shareData = {
      distributeKind: data.distributeKind,
      distributedAmount: '',
      maxValue: '',
      minValue: '',
      quota: '',
    }
    if (data.distributeKind === 'FIXED') {
      shareData.distributedAmount = `${data.distributedEachBagAmount * data.quantity}`
    } else {
      shareData.maxValue = `${data.maxValue}`
      shareData.minValue = `${data.minValue}`
      shareData.quota = `${data.quota}`
    }
    console.log('Form Submitted:', shareData)
    const res = await createPacket.mutateAsync(shareData)
    console.log('Form Submitted res:', res)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          catEars
          type="submit"
          className="mt-6"
          disabled={!isValid}
          loading={isSubmitting || createPacket.isPending}
          onClick={handleSubmit(onSubmit)}
        >
          Share
        </Button>
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
