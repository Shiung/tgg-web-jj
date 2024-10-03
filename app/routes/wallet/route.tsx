import { useEffect, useMemo, useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from '@remix-run/react'
import { usePrevious } from 'react-use'
import { cn } from '~/lib/utils'
import { parseAmount } from '~/lib/amount'
import { Button } from '~/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'
import Amount from '~/components/amount'
import { useGetWalletList, UserWallet } from '~/hooks/api/useWallet'
import HistoryIcon from '~/icons/history.svg?react'
import ArrowLineDownIcon from '~/icons/arrow-line-down.svg?react'
import { cryptoDetails, CryptoUnion } from '~/consts/crypto'

import { WalletsSkeleton } from './skeleton'
import classes from './index.module.scss'

// 配合 useMatches 聲明需要登录才能访问
export const handle = {
  requiresAuth: true,
}

const DEFAULT_TAB = 'deposit'

type UserWalletItem = UserWallet & {
  icon: React.FC<React.SVGProps<SVGSVGElement>>
}

export default function Wallet() {
  const { data, isLoading } = useGetWalletList()
  const location = useLocation()
  const navigate = useNavigate()
  const [currentTab, setCurrentTab] = useState(DEFAULT_TAB)
  const previousTab = usePrevious(currentTab)
  const [isExpanded, setIsExpanded] = useState(true)
  const [hasUserToggled, setHasUserToggled] = useState(false)

  const wallets = useMemo(
    () =>
      (data?.data.wallets || []).map<UserWalletItem>(wallet => ({
        ...wallet,
        icon: cryptoDetails[wallet.currency as CryptoUnion].icon,
      })),
    [data?.data.wallets]
  )

  const handleToggleExpand = () => {
    setIsExpanded(val => !val)
    setHasUserToggled(true)
  }

  useEffect(() => {
    const pathToTab = location.pathname.split('/').pop() || DEFAULT_TAB

    if (location.pathname === '/wallet') {
      navigate('/wallet/deposit', { replace: true })
    } else {
      // currentTab 和 URL 同步
      setCurrentTab(pathToTab)
    }
  }, [location.pathname, navigate])

  // 收合邏輯
  useEffect(() => {
    if (previousTab && currentTab !== previousTab && !hasUserToggled) {
      setIsExpanded(false)
    }
  }, [currentTab, hasUserToggled, previousTab])

  return (
    <div className="container mx-auto flex-1 rounded-t-xl bg-black p-0">
      {/* Header */}
      <div className={classes.header}>
        <div className="flex aspect-[343/97] space-x-2">
          {/* Balance */}
          <div className="flex-1">
            <div>
              <p className="text-sm font-ultra tracking-wide">Total Balance</p>
              <p className="text-xs font-normal">Display all in USDT</p>
            </div>
            <div className="mt-3 flex items-center space-x-1">
              <Amount
                className="text-xl font-ultra leading-6 text-primary"
                value={parseAmount(data?.data.totalBalanceInUsdt)}
              />
              <Button
                className={`h-4 w-4 transform bg-white/50 opacity-100 transition-transform ${
                  isExpanded ? 'rotate-180' : 'rotate-0'
                }`}
                variant="icon"
                size="icon"
                onClick={handleToggleExpand}
              >
                <ArrowLineDownIcon className="h-2 w-2 text-white" />
              </Button>
            </div>
          </div>
          {/* History */}
          <Button
            className="flex h-6 items-center justify-center space-x-1 px-3"
            onClick={() => navigate('history')}
          >
            <HistoryIcon className="h-4 w-4" />
            <span className="text-xs font-extrabold">History</span>
          </Button>
        </div>

        {/* Wallets List */}
        <div
          className={cn(
            'relative transition-[max-height] duration-300 ease-in-out',
            classes['coins-wallet-bg'],
            isExpanded ? 'max-h-screen' : 'max-h-0'
          )}
        >
          <div
            className={cn(
              'transition-opacity duration-200 ease-in-out',
              isExpanded ? 'opacity-100' : 'opacity-0 delay-150'
            )}
          >
            <div className="space-y-2">
              {/* withdrawal is under processing */}
              <div className="cursor primary-gradient-border-rounded flex items-center justify-between rounded-lg bg-black px-3 py-2">
                <span className="text-sm font-normal text-white/70">
                  <span className="font-ultra text-white">
                    {data?.data.withdrawingCount || 0} withdrawal
                  </span>{' '}
                  is under processing.
                </span>
                <Button
                  className="flex h-6 items-center justify-center px-3"
                  onClick={() => navigate('withdrawal-processing')}
                >
                  Check
                </Button>
              </div>
              {isLoading ? (
                <WalletsSkeleton />
              ) : (
                wallets.map((wallet, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg bg-[#1C1C1C] px-3 py-2 font-ultra"
                  >
                    <div className="flex items-center space-x-1">
                      <wallet.icon className="h-6 w-6" />
                      <div className="flex flex-col space-y-[2px]">
                        <p className="text-xs">{wallet.currency}</p>
                        <Amount
                          className="text-[10px] font-normal leading-3 text-white/70"
                          value={parseAmount(wallet.balanceUsdt)}
                        />
                      </div>
                    </div>
                    <Amount className="text-right text-sm" value={parseAmount(wallet.balance)} />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 -mt-4 rounded-t-xl">
        <Tabs defaultValue="deposit" value={currentTab} className="w-full">
          <TabsList variant="cardTab" className="w-full overflow-x-auto">
            <TabsTrigger variant="cardTab" value="deposit" className="flex-1" asChild>
              <Link prefetch="viewport" to="deposit">
                Deposit
              </Link>
            </TabsTrigger>
            <TabsTrigger variant="cardTab" value="withdraw" className="flex-1" asChild>
              <Link prefetch="viewport" to="withdraw">
                Withdraw
              </Link>
            </TabsTrigger>
            <TabsTrigger variant="cardTab" value="swap" className="flex-1" asChild>
              <Link prefetch="viewport" to="swap">
                Swap
              </Link>
            </TabsTrigger>
          </TabsList>
          <TabsContent value={currentTab} className="mt-0">
            <Outlet />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
