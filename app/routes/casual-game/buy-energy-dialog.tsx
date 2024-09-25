import { useQuery, useMutation } from '@tanstack/react-query'
import { apis } from '~/api/index'

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog'
import { Button } from '~/components/ui/button'
import { KokonIcon } from '~/components/color-icons'

interface BuyEnergyDialogProps {
  isOpen: boolean
  onClose: () => void
}

const BuyEnergyDialog: React.FC<BuyEnergyDialogProps> = ({ isOpen, onClose }) => {
  // 當前能量
  const { data: energyData } = useQuery({
    queryKey: ['gameEnergy'],
    queryFn: () => apis.game.gameEnergyList(),
    enabled: isOpen, // 只在對話框打開時執行查詢
    refetchOnWindowFocus: false, // 防止窗口聚焦時重新獲取
  })
  const currentEnergy = energyData?.data?.amount ?? null

  // TODO: 確認餘額 能不能購買能量
  const buyEnergyMutation = useMutation({
    mutationFn: () => apis.game.gameEnergyUpdate({ gameId: 3 }),
    onSuccess: () => {
      // 對第一個iframe發訊息
      window.frames[0].postMessage('CheckBalance', '*')
      onClose()
    },
  })

  const handleBuyEnergy = () => {
    buyEnergyMutation.mutate()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Buy Energy</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center px-3 py-4 text-center text-[#FFFFFFB2]">
          <div className="flex space-x-2">
            <img src="/images/energy.png" alt="energy" className="h-6 w-6" />
            <div className="text-lg font-ultra text-white">X {currentEnergy}</div>
          </div>
          <div>Consume 1 energy for each game.You have ran out of Energy.</div>
          <div>Would you like to get one more energy to play the game?</div>
        </div>
        <DialogFooter className="w-full px-3 py-4 text-sm font-ultra">
          <Button
            className="flex w-full items-center justify-center"
            variant="gray"
            catEars
            onClick={handleBuyEnergy}
            disabled={buyEnergyMutation.isPending}
          >
            <div>PAY 500</div>
            <KokonIcon className="ml-1 h-4 w-4" />
            <div className="ml-2">FOR</div>
            <img src="/images/energy.png" alt="energy" className="ml-1 h-6 w-6" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default BuyEnergyDialog
