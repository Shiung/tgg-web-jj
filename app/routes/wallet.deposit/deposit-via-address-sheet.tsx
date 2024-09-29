import { useEffect } from 'react'
import { Close as SheetPrimitiveClose } from '@radix-ui/react-dialog'
import { useCopyToClipboard } from 'react-use'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from '~/components/ui/sheet'
import { Button } from '~/components/ui/button'
import { Label } from '~/components/ui/label'
import { Input } from '~/components/ui/input'
import { useToast } from '~/hooks/use-toast'
import { Skeleton } from '~/components/ui/skeleton'
import QRCode from '~/components/qr-code'
import CopyIcon from '~/icons/copy.svg?react'
import InfoIcon from '~/icons/info.svg?react'
import { cryptoDetails, isValidCrypto } from '~/consts/crypto'

interface DepositViaAddressDialogProps {
  currency: string
  info?: {
    depositAddress: string
    comment: string
  }
}

const DepositViaAddressDialog: React.FC<DepositViaAddressDialogProps> = ({ currency, info }) => {
  const [state, copyToClipboard] = useCopyToClipboard()
  const { toast } = useToast()

  useEffect(() => {
    if (!state.value) return
    toast({
      title: 'Copied',
      variant: 'success',
    })
  }, [state, toast])

  if (!info) return <Skeleton className="h-9 w-full rounded-full" />
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button catEars variant="gray">
          Deposit via Address
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" onOpenAutoFocus={e => e.preventDefault()}>
        <SheetHeader className="pr-12">
          <SheetTitle>Deposit via address</SheetTitle>
        </SheetHeader>
        <SheetClose />

        <div className="flex flex-col items-center px-3 pt-4">
          {/* qr code */}
          {info?.depositAddress ? (
            <QRCode
              value={info?.depositAddress}
              size={160}
              logoImage={isValidCrypto(currency) ? cryptoDetails[currency].img : undefined}
              logoSize={30}
              backgroundColor="#ffffff"
            />
          ) : (
            <Skeleton className="h-[160px] w-[160px]" />
          )}
          {/* Deposit Address */}
          <div className="mt-6 w-full space-y-1">
            <Label htmlFor="address" className="text-xs">
              Deposit Address
            </Label>
            <Input
              readOnly
              className="h-9"
              id="address"
              value={info?.depositAddress}
              suffix={
                <Button
                  variant="icon"
                  size="icon"
                  className="h-4 w-4 text-white"
                  onClick={() => copyToClipboard(info?.depositAddress || '')}
                >
                  <CopyIcon className="h-full w-full" />
                </Button>
              }
            />
          </div>
          {/* Comment */}
          <div className="mt-3 w-full space-y-1">
            <Label htmlFor="comment" className="text-xs">
              Comment (Required)
            </Label>
            <Input
              readOnly
              className="h-9"
              id="comment"
              value={info?.comment}
              suffix={
                <Button
                  variant="icon"
                  size="icon"
                  className="h-4 w-4 text-white"
                  onClick={() => copyToClipboard(info?.comment || '')}
                >
                  <CopyIcon className="h-full w-full" />
                </Button>
              }
            />
          </div>
          {/* Hint */}
          <div className="mt-2 flex space-x-1 rounded-lg bg-[#1C1C1C] p-2 text-white/70">
            <InfoIcon className="h-[14px] w-[14px] flex-shrink-0" />
            <span className="flex-1 text-xs font-normal">
              Please be sure to enter the{' '}
              <span className="font-ultra text-white">correct address</span> and{' '}
              <span className="font-ultra text-white">Comment</span> when depositing. Currently only{' '}
              <span className="font-ultra text-white">TON</span> and{' '}
              <span className="font-ultra text-white">USDT</span> in{' '}
              <span className="font-ultra text-white">TON blockchain</span> format are supported.
            </span>
          </div>
        </div>
        <SheetFooter className="mt-6 px-4 pb-4">
          <SheetPrimitiveClose asChild>
            <Button type="submit" className="w-full">
              Done
            </Button>
          </SheetPrimitiveClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default DepositViaAddressDialog
