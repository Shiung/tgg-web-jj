import { SVGProps, useState } from 'react'
import { useNavigate } from '@remix-run/react'
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover'
import { KokonIcon, UsdtIcon, TonIcon } from '~/components/color-icons'
import RefreshIcon from '~/icons/refresh.svg?react'
import { Button } from '~/components/ui/button'
import Amount from '~/components/amount'
import { cn } from '~/lib/utils'
import { useHeaderWallet } from '~/hooks/api/useWallet'
import { WalletInfoResponse } from '~/api/codegen/data-contracts'
import { Skeleton } from '~/components/ui/skeleton'

const icons = {
  KOKON: KokonIcon,
  USDT: UsdtIcon,
  TON: TonIcon,
}

type UserWallets = WalletInfoResponse['wallets'][number] & {
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
}

const WalletPopOver: React.FC<{ className: string }> = ({ className }) => {
  const navigate = useNavigate()
  const [isRefreshing, setIsRefreshing] = useState(false)
  const { data, isLoading, isFetching, refetch } = useHeaderWallet()
  const wallets = (data?.data.wallets || []).map<UserWallets>(wallet => ({
    ...wallet,
    icon: icons[wallet.currency as keyof typeof icons],
  }))

  const handleRefresh = async (event: React.MouseEvent<SVGElement, MouseEvent>) => {
    event.stopPropagation()
    if (isFetching) return

    setIsRefreshing(true)
    const start = Date.now()
    await refetch()
    const duration = Date.now() - start
    const delay = duration < 1000 ? 1000 - duration : 0

    setTimeout(() => {
      setIsRefreshing(false)
    }, delay)
  }

  return (
    <Popover>
      <PopoverTrigger>
        {isLoading ? (
          <Skeleton className="mr-1 h-8 w-24 rounded-full" />
        ) : (
          <div
            className={cn(
              'mr-1 flex h-8 items-center justify-center space-x-1 rounded-full bg-[#1C1C1C]',
              className
            )}
          >
            <KokonIcon className="h-4 w-4" />
            <Amount className="text-sm font-ultra" value={Number(data?.data.totalBalanceInUsdt)} />
            <RefreshIcon
              className={cn(
                'h-4 w-4 text-primary transition-transform duration-500',
                isRefreshing ? 'animate-spin' : ''
              )}
              onClick={handleRefresh}
            />
          </div>
        )}
      </PopoverTrigger>
      <PopoverContent className="primary-gradient-border-rounded flex w-auto min-w-[260px] flex-col p-3 text-white">
        <div className="flex items-center space-x-2">
          <div className="flex flex-col text-sm font-ultra">
            Total balance
            <span className="text-xs text-white/70">Display all in USDT</span>
          </div>
          <Amount
            className="text-xl font-ultra text-primary"
            value={Number(data?.data.totalBalanceInUsdt)}
          />
        </div>
        <div className="mt-3 space-y-2">
          {wallets.map((wallet, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-lg bg-[#1C1C1C] px-3 py-2 font-ultra"
            >
              <div className="flex items-center space-x-1">
                <wallet.icon className="h-6 w-6" />
                <div className="flex flex-col">
                  <p className="text-xs">{wallet.currency}</p>
                  <Amount className="text-[10px] font-normal leading-3 text-white/70" value={0} />
                  {/* USDT估值 待確認欄位 */}
                </div>
              </div>
              <Amount className="text-right text-sm" value={+wallet.balance} />
            </div>
          ))}
        </div>
        <Button className="mt-6 w-full" catEars onClick={() => navigate('/wallet')}>
          Deposit
        </Button>
      </PopoverContent>
    </Popover>
  )
}

export default WalletPopOver
