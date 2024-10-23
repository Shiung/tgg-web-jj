import { useState } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { apis } from '~/api/index'
import { useTranslation } from 'react-i18next'

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
import GoRechargeDialog from './go-recharge-dialog'

interface BuyEnergyDialogProps {
  isOpen: boolean
  onClose: () => void
}

const BuyEnergyDialog: React.FC<BuyEnergyDialogProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation()
  // 充值彈窗
  const [isRechargeDialogOpen, setIsRechargeDialogOpen] = useState(false)
  const handleCloseRechargeDialog = () => {
    setIsRechargeDialogOpen(false)
  }

  // 取得遊戲設定
  const { data: gameSettingData, isLoading: gameSettingLoading } = useQuery({
    queryKey: ['gameSetting'],
    queryFn: () => apis.game.gameSettingList(),
    enabled: isOpen, // 只在對話框打開時執行查詢
    refetchOnWindowFocus: false, // 防止窗口聚焦時重新獲取
  })
  const gameSetting = gameSettingData?.data ?? null

  // 當前能量
  const { data: energyData, isLoading: energyLoading } = useQuery({
    queryKey: ['gameEnergy'],
    queryFn: () => apis.game.gameEnergyList(),
    enabled: isOpen, // 只在對話框打開時執行查詢
    refetchOnWindowFocus: false, // 防止窗口聚焦時重新獲取
  })
  const currentEnergy = energyData?.data?.amount ?? null

  const buyEnergyMutation = useMutation({
    mutationFn: () => apis.game.gameEnergyUpdate({ gameId: 3 }),
    onSuccess: () => {
      // 對第一個iframe發訊息
      window.frames[0].postMessage('CheckBalance', '*')
      onClose()
    },
    onError: error => {
      console.error('[ERROR] EnergyUpdate Failed =>', error)
      // 餘額不足
      if (error && typeof error === 'object' && 'response' in error) {
        const responseData = (error.response as { data: { errorCode: string } })?.data
        if (responseData?.errorCode === 'INTERNAL_ERROR') {
          setIsRechargeDialogOpen(true)
        }
      }
    },
  })

  const handleBuyEnergy = () => {
    buyEnergyMutation.mutate()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('BuyEnergy')}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center px-3 py-4 text-center text-[#FFFFFFB2]">
          <div className="flex space-x-2">
            <img src="/images/energy.png" alt="energy" className="h-6 w-6" />
            {energyLoading ? (
              <Skeleton className="h-6 w-6" />
            ) : (
              <div className="text-lg font-ultra text-white">X {currentEnergy}</div>
            )}
          </div>
          <div>{t('BuyEnergyDescription')}</div>
          <div>{t('BuyEnergyDescription2')}</div>
        </div>
        <DialogFooter className="w-full px-3 py-4 text-sm font-ultra">
          <Button
            className="flex w-full items-center justify-center"
            variant="gray"
            catEars
            onClick={handleBuyEnergy}
            disabled={buyEnergyMutation.isPending}
          >
            {gameSettingLoading ? (
              <Skeleton className="h-4 w-10" />
            ) : (
              <div>
                {t('PAY')} {gameSetting?.costPerGame}
              </div>
            )}
            <KokonIcon className="ml-1 h-4 w-4" />
            <div className="ml-2">{t('FOR')}</div>
            <img src="/images/energy.png" alt="energy" className="ml-1 h-6 w-6" />
          </Button>
        </DialogFooter>
      </DialogContent>
      <GoRechargeDialog isOpen={isRechargeDialogOpen} onClose={handleCloseRechargeDialog} />
    </Dialog>
  )
}

export default BuyEnergyDialog
