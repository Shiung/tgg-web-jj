import { useEffect } from 'react'
import { Close as SheetPrimitiveClose } from '@radix-ui/react-dialog'
import { useCopyToClipboard } from 'react-use'
import { QRCode } from 'react-qrcode-logo'
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
import { Skeleton } from '~/components/ui/skeleton'
import CopyIcon from '~/icons/copy.svg?react'
import InfoIcon from '~/icons/info.svg?react'
import { cryptoDetails, isValidCrypto } from '~/consts/crypto'
import { successToast } from '~/lib/toast'
import { useTranslation, Trans } from 'react-i18next'

interface DepositViaAddressDialogProps {
  currency: string
  info?: {
    depositAddress: string
    comment: string
  }
}

const DepositViaAddressDialog: React.FC<DepositViaAddressDialogProps> = ({ currency, info }) => {
  const [state, copyToClipboard] = useCopyToClipboard()

  const { t } = useTranslation()

  useEffect(() => {
    if (!state.value) return
    successToast('Copied')
  }, [state])

  if (!info) return <Skeleton className="h-9 w-full rounded-full" />
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button catEars variant="gray">
          {t('DepositViaAddress')}
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" onOpenAutoFocus={e => e.preventDefault()}>
        <SheetHeader className="pr-12">
          <SheetTitle>{t('DepositViaAddress')}</SheetTitle>
        </SheetHeader>
        <SheetClose />

        <div className="flex flex-col items-center px-3 pt-4">
          {/* qr code */}
          {info?.depositAddress ? (
            <QRCode
              value={info?.depositAddress}
              size={160}
              enableCORS
              logoImage={isValidCrypto(currency) ? cryptoDetails[currency].img : undefined}
              logoPadding={2}
              removeQrCodeBehindLogo
            />
          ) : (
            <Skeleton className="h-[160px] w-[160px]" />
          )}
          {/* Deposit Address */}
          <div className="mt-6 w-full space-y-1">
            <Label htmlFor="address" className="text-xs">
              {t('DepositAddress')}
            </Label>
            <div className="relative flex h-auto w-full items-center justify-between rounded-full border-[0.5px] border-white/20 bg-[#333] px-3 py-2 text-sm font-ultra">
              <span className="flex-1 break-all">{info?.depositAddress || ''}</span>
              <Button
                variant="icon"
                size="icon"
                className="h-6 w-6 flex-shrink-0 text-white"
                onClick={() => copyToClipboard(info?.depositAddress || '')}
              >
                <CopyIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
          {/* Comment */}
          <div className="mt-3 w-full space-y-1">
            <Label htmlFor="comment" className="text-xs">
              {t('CommentRequired')}
            </Label>
            <Input
              readOnly
              className="h-9"
              id="comment"
              value={info?.comment}
              fieldSuffix={
                <Button
                  variant="icon"
                  size="icon"
                  className="h-6 w-6 text-white"
                  onClick={() => copyToClipboard(info?.comment || '')}
                >
                  <CopyIcon className="h-4 w-4" />
                </Button>
              }
            />
          </div>
          {/* Hint */}
          <div className="mt-2 flex space-x-1 rounded-lg bg-[#1C1C1C] p-2 text-white/70">
            <InfoIcon className="h-[14px] w-[14px] flex-shrink-0" />
            <span className="flex-1 text-xs font-normal">
              <Trans
                i18nKey="DepositAddressHint"
                components={{ Comp: <span className="font-ultra text-white" /> }}
              />
            </span>
          </div>
        </div>
        <SheetFooter className="mt-6 px-4 pb-4">
          <SheetPrimitiveClose asChild>
            <Button type="submit" className="w-full">
              {t('Done')}
            </Button>
          </SheetPrimitiveClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default DepositViaAddressDialog
