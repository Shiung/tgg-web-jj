import { useCallback, useEffect, useState } from 'react'
import { SubmitHandler, useFormContext } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '~/components/ui/sheet'
import { Button } from '~/components/ui/button'
import SvgCopy from '~/icons/copy.svg?react'
import { apis } from '~/api'
import { CreateRequest } from '~/api/codegen/data-contracts'

import type { FormData } from './route'
import { Input } from '~/components/ui/input'
import { useCopyToClipboard } from 'react-use'
import { successToast } from '~/lib/toast'
import { useShare } from '~/hooks/useShare'

const ShareSheet: React.FC = () => {
  const { shareUrl } = useShare()
  const [state, copyToClipboard] = useCopyToClipboard()
  const [open, setOpen] = useState(false)
  const [shareUrlLink, setShareUrlLink] = useState('')

  const {
    handleSubmit,
    reset,
    formState: { isValid, isSubmitting },
  } = useFormContext<FormData>()

  const createPacket = useMutation({
    mutationFn: apis.packet.packetCreate,
    onError: error => {
      console.error('packetCreate failed, onError:', error)
    },
  })

  const onSubmit: SubmitHandler<FormData> = async data => {
    if (!isValid || isSubmitting || createPacket.isPending) return
    const shareData: CreateRequest = {
      distributeKind: data.distributeKind,
      limitKind: (data.distributeKind === 'FIXED' ? 1 : 0) as 0 | 1, // 上限類型 0:個數 1:金額,若是FIXED發送類型時固定需為0)
    }
    if (data.distributeKind === 'FIXED') {
      shareData.distributedAmount = `${data.distributedEachBagAmount * data.quantity}`
      shareData.quantity = data.quantity
    } else {
      shareData.maxValue = `${data.maxValue}`
      shareData.minValue = `${data.minValue}`
      shareData.quota = `${data.quota}`
    }
    console.log('Form Submitted:', shareData)
    try {
      const res = await createPacket.mutateAsync(shareData)
      if (res.data.referralCode) {
        setShareUrlLink(`${window.location.origin}/?startapp=${res.data.referralCode}`)
        setOpen(true)
      } else {
        setShareUrlLink('')
        setOpen(false)
      }
      console.log('packetCreate res:', res)
    } catch (error) {
      console.error('packetCreate failed:', error)
      setShareUrlLink('')
      setOpen(false)
    }
  }

  const handleShareURL = useCallback(() => {
    shareUrl(
      shareUrlLink,
      'I am sharing the LIMITED lucky money bags with friends. Click here to get one!'
    )
  }, [shareUrl, shareUrlLink])

  const handleSheetChange = (isOpen: boolean) => {
    setOpen(isOpen)
    if (!isOpen) {
      reset()
    }
  }

  useEffect(() => {
    if (!state.value) return
    successToast('Copied')
  }, [state])

  return (
    <Sheet open={open} onOpenChange={handleSheetChange}>
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
      <SheetContent
        side="bottom"
        className="rounded-t-xl bg-colorLinear-orange"
        onOpenAutoFocus={e => e.preventDefault()}
      >
        <SheetHeader className="bg-transparent p-4">
          <SheetTitle className="text-lg font-ultra leading-6">
            Your Lucky Money Is Ready!
          </SheetTitle>
        </SheetHeader>
        <SheetClose className="right-4 top-4" />
        <div className="flex flex-col items-center justify-between space-y-2 text-white/70">
          <img
            src="/images/lucky-money/cat-whole-body.png"
            className="h-auto w-[46%]"
            alt="cat-whole-body"
          />
          <div className="flex w-full flex-col items-stretch space-y-4 bg-[url('/images/long-wave.png')] bg-contain p-3 pb-8">
            <Input
              readOnly
              className="h-9 text-white"
              value={shareUrlLink}
              fieldSuffix={
                <Button
                  variant="icon"
                  size="icon"
                  type="button"
                  className="h-6 w-6 text-white"
                  onClick={() => copyToClipboard(shareUrlLink)}
                >
                  <SvgCopy className="h-4 w-4" />
                </Button>
              }
            />
            <Button className="w-full" type="button" catEars onClick={handleShareURL}>
              Share
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default ShareSheet
