import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { apis } from '~/api/index'
import { useGetHeaderWallet, UserWallet } from '~/hooks/api/useWallet'

import { Link } from '@remix-run/react'
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
import Amount from '~/components/amount'

interface GoRechargeDialogProps {
  isOpen: boolean
  onClose: () => void
}

const GoRechargeDialog: React.FC<GoRechargeDialogProps> = ({ isOpen, onClose }) => {
  // 取 KOKON 錢包
  const { data, isLoading: isWalletLoading } = useGetHeaderWallet()
  const wallets = (data?.data.wallets || []).map<UserWallet>(wallet => ({
    ...wallet,
  }))
  const kokonBalance = useMemo(() => {
    return wallets.find(wallet => wallet.currency === 'KOKON')?.balance
  }, [wallets])

  // 取得遊戲設定
  const { data: gameSettingData, isLoading: gameSettingLoading } = useQuery({
    queryKey: ['gameSetting'],
    queryFn: () => apis.game.gameSettingList(),
    enabled: isOpen, // 只在對話框打開時執行查詢
    refetchOnWindowFocus: false, // 防止窗口聚焦時重新獲取
  })
  const gameSetting = gameSettingData?.data ?? null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Go to Recharge</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center space-y-3 px-3 py-4 text-center text-[#FFFFFFB2]">
          <div className="flex w-full flex-col space-y-1">
            <div className="flex w-full justify-between text-white">
              <div className="flex items-center space-x-1">
                <KokonIcon className="h-4 w-4" />
                <span className="text-sm font-ultra">Payment</span>
              </div>
              {gameSettingLoading ? (
                <Skeleton className="h-4 w-24" />
              ) : (
                <Amount
                  className="text-lg font-ultra"
                  value={gameSetting?.costPerGame}
                  crypto="KOKON"
                />
              )}
            </div>
            <div className="flex w-full justify-between text-white">
              <div className="flex items-center space-x-1">
                <KokonIcon className="h-4 w-4" />
                <span className="text-sm font-ultra">Balance</span>
              </div>
              {isWalletLoading ? (
                <Skeleton className="h-4 w-24" />
              ) : (
                <Amount
                  value={kokonBalance}
                  className="text-lg font-ultra text-red-600"
                  crypto="KOKON"
                />
              )}
            </div>
          </div>
          <div className="text-base text-[#FFFFFFB2]">
            Insufficient balance in your KOKON wallet. Go to get more KOKON.
          </div>
        </div>
        <DialogFooter className="w-full px-3 py-4 text-sm font-ultra">
          <Link prefetch="viewport" className="w-full" to="/wallet/swap">
            <Button className="flex w-full items-center justify-center" catEars>
              <span className="text-sm font-ultra">Buy KOKON</span>
            </Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default GoRechargeDialog
