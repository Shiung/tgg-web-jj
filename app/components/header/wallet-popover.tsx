import { useMemo, useState } from 'react'
import { Link } from '@remix-run/react'
import { useTranslation } from 'react-i18next'
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover'
import { Button } from '~/components/ui/button'
import Amount from '~/components/amount'
import RefreshIcon from '~/icons/refresh.svg?react'
import { KatonIcon } from '~/components/color-icons'
import { Skeleton } from '~/components/ui/skeleton'
import { cn } from '~/lib/utils'
import { parseAmount } from '~/lib/amount'
import { useGetHeaderWallet, UserWallet } from '~/hooks/api/useWallet'
import { cryptoDetails, CryptoUnion } from '~/consts/crypto'

type UserWalletItem = UserWallet & {
  icon: React.FC<React.SVGProps<SVGSVGElement>>
}

const WalletPopOver: React.FC<{ className: string }> = ({ className }) => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const { data, isLoading, isFetching, refetch } = useGetHeaderWallet()
  const wallets = (data?.data.wallets || []).map<UserWalletItem>(wallet => ({
    ...wallet,
    icon: cryptoDetails[wallet.currency as CryptoUnion]?.icon,
  }))

  const katonBalance = useMemo(() => {
    return wallets.find(wallet => wallet.currency === 'KATON')?.balance
  }, [wallets])

  const handleRefresh = async (event: React.MouseEvent<SVGElement, MouseEvent>) => {
    event.stopPropagation()
    if (isRefreshing || isFetching) return

    setIsRefreshing(true)
    const delayMs = 1500
    const start = Date.now()
    await refetch()
    const duration = Date.now() - start
    const delay = duration < delayMs ? delayMs - duration : 0

    setTimeout(() => {
      setIsRefreshing(false)
    }, delay)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
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
            <KatonIcon className="h-4 w-4" />
            <Amount className="text-sm font-ultra" value={katonBalance} crypto="KATON" />
            <RefreshIcon
              className={cn(
                'h-4 w-4 cursor-pointer text-primary transition-transform duration-500',
                isRefreshing ? 'animate-spin' : ''
              )}
              onClick={handleRefresh}
            />
          </div>
        )}
      </PopoverTrigger>
      <PopoverContent className="primary-gradient-border-rounded flex w-auto min-w-[260px] flex-col p-3 text-white">
        <div className="flex items-center justify-between space-x-2">
          <div className="flex flex-col text-sm font-ultra">
            {t('TotalBalance')}
            <span className="text-xs text-white/70">{t('DisplayAllInUSDT')}</span>
          </div>
          <Amount
            className="text-xl font-ultra text-primary"
            value={data?.data.totalBalanceInUsdt}
            crypto="USDT"
            customMaxDec={2}
          />
        </div>
        <div className="mt-3 space-y-2">
          {wallets.map((wallet, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-lg bg-[#1C1C1C] px-3 py-2 font-ultra"
            >
              <div className="flex items-center space-x-1">
                {wallet.icon && <wallet.icon className="h-6 w-6" />}
                <div className="flex flex-col">
                  <p className="text-xs">{wallet.currency}</p>
                  <Amount
                    className="text-[10px] font-normal leading-3 text-white/70"
                    value={parseAmount(wallet.balance)}
                    crypto={wallet.currency}
                  />
                </div>
              </div>
              <Amount
                className="text-right text-sm"
                value={parseAmount(wallet.balanceUsdt)}
                crypto="USDT"
                customMaxDec={2}
              />
            </div>
          ))}
        </div>
        <Link
          to="/wallet/deposit"
          prefetch="viewport"
          onClick={() => {
            setOpen(false)
          }}
        >
          <Button className="mt-6 w-full" catEars>
            {t('Deposit')}
          </Button>
        </Link>
      </PopoverContent>
    </Popover>
  )
}

export default WalletPopOver
