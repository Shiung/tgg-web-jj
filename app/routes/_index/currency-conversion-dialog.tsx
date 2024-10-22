import { useQuery } from '@tanstack/react-query'
import { apis } from '~/api/index'
import { useTranslation } from 'react-i18next'

import { useNavigate } from '@remix-run/react'
import { Skeleton } from '~/components/ui/skeleton'

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog'
import { Button } from '~/components/ui/button'
import { KokonIcon } from '~/components/color-icons'
import SwapIcon from '~/icons/swap.svg?react'
import Amount from '~/components/amount'
import { errorToast } from '~/lib/toast'

interface CurrencyConversionDialogProps {
  isOpen: boolean
  cryptoPageLink: string | null
  onClose: () => void
}

const CurrencyConversionDialog: React.FC<CurrencyConversionDialogProps> = ({
  isOpen,
  cryptoPageLink,
  onClose,
}) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  // 取得轉換錢包資訊

  const { data: gameWalletData, isLoading: gameWalletLoading } = useQuery({
    queryKey: ['gameWallet'],
    queryFn: () => apis.game.gameWalletList(),
    enabled: isOpen, // 只在對話框打開時執行查詢
    refetchOnWindowFocus: false, // 防止窗口聚焦時重新獲取
  })

  const handleOK = () => {
    if (cryptoPageLink) {
      navigate(cryptoPageLink)
    } else {
      console.error('cryptoPageLink is null', cryptoPageLink)
      errorToast('Please try again later.')
    }
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('CurrencyConversion')}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center space-y-3 px-3 py-4">
          <div className="flex w-full flex-col items-center justify-center space-y-1">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center justify-center space-x-1">
                <KokonIcon className="h-4 w-4" />
                <div className="text-sm font-ultra">KOKON</div>
              </div>
              {gameWalletLoading ? (
                <Skeleton className="h-4 w-14" />
              ) : (
                <Amount
                  value={gameWalletData?.data.kokonBalance}
                  crypto="KOKON"
                  className="text-lg font-ultra"
                />
              )}
            </div>
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center justify-center space-x-1">
                <SwapIcon className="h-4 w-4 text-[#FFFFFFB2]" />
                <div className="text-sm font-ultra">USDT</div>
              </div>
              {gameWalletLoading ? (
                <Skeleton className="h-4 w-14" />
              ) : (
                <Amount
                  value={gameWalletData?.data.balance}
                  crypto={gameWalletData?.data.currency}
                  className="text-lg font-ultra"
                />
              )}
            </div>
          </div>
          <div className="text-center text-base text-[#FFFFFFB2]">
            {t('CurrencyConversion.Description')}
          </div>
        </div>
        <DialogFooter className="w-full px-3 pb-4 pt-0 text-sm font-ultra">
          <Button
            className="flex w-full items-center justify-center"
            onClick={handleOK}
            disabled={gameWalletLoading}
            catEars
          >
            <span className="text-sm font-ultra">{t('Ok')}</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CurrencyConversionDialog
