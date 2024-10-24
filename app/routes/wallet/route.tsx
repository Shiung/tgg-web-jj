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
import RefreshIcon from '~/icons/refresh.svg?react'
import ArrowLineDownIcon from '~/icons/arrow-line-down.svg?react'
import { cryptoDetails, CryptoUnion } from '~/consts/crypto'

import { WalletsSkeleton } from './skeleton'
import classes from './index.module.scss'

import { useWalletProvider, emptyWallets } from './provider'
import { useTranslation, Trans } from 'react-i18next'

// 配合 useMatches 聲明需要登录才能访问
export const handle = {
  requiresAuth: true,
}

const DEFAULT_TAB = 'deposit'

type UserWalletItem = UserWallet & {
  icon: React.FC<React.SVGProps<SVGSVGElement>>
}

export default function Wallet() {
  const { data, isLoading, isFetching, refetch } = useGetWalletList()
  const location = useLocation()
  const navigate = useNavigate()
  const [currentTab, setCurrentTab] = useState(DEFAULT_TAB)
  const previousTab = usePrevious(currentTab)
  const [isExpanded, setIsExpanded] = useState(true)
  const [hasUserToggled, setHasUserToggled] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const { t } = useTranslation()

  const wallets = useMemo(
    () =>
      (data?.data.wallets || []).map<UserWalletItem>(wallet => ({
        ...wallet,
        icon: cryptoDetails[wallet.currency as CryptoUnion]?.icon,
      })),
    [data?.data.wallets]
  )

  const handleToggleExpand = () => {
    setIsExpanded(val => !val)
    setHasUserToggled(true)
  }

  const handleRefresh = async () => {
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

  const { contextVal } = useWalletProvider(data?.data.wallets || emptyWallets, refetch)

  return (
    <div className="container mx-auto flex-1 rounded-t-xl bg-black p-0">
      {/* Header */}
      <div className={classes.header}>
        <div className="flex aspect-[343/97] space-x-2">
          {/* Balance */}
          <div className="flex-1">
            <div>
              <p className="text-sm font-ultra tracking-wide">{t('TotalBalance')}</p>
              <p className="text-xs font-normal">{t('DisplayAllInUSDT')}</p>
            </div>
            <div className="mt-3 flex items-center space-x-1">
              <Amount
                className="text-xl font-ultra leading-6 text-primary"
                value={data?.data.totalBalanceInUsdt}
                crypto="USDT"
                customMaxDec={2}
              />
              <Button
                variant="icon"
                size="icon"
                className="text-primary opacity-100"
                onClick={handleRefresh}
              >
                <RefreshIcon
                  className={cn(
                    'h-4 w-4 transition-transform duration-500',
                    isRefreshing ? 'animate-spin' : ''
                  )}
                />
              </Button>
            </div>
            <div className="mt-[2px]">
              <Button
                variant="link"
                size="icon"
                className="h-4 justify-start px-0 py-0"
                onClick={handleToggleExpand}
              >
                <div className="flex items-center justify-center space-x-1 text-xs font-normal text-white">
                  <span>{t('Detail')}</span>
                  <ArrowLineDownIcon
                    className={`h-2 w-2 transform text-white opacity-100 transition-transform ${
                      isExpanded ? 'rotate-180' : 'rotate-0'
                    }`}
                  />
                </div>
              </Button>
            </div>
          </div>
          {/* History */}
          <Link to="history" prefetch="viewport">
            <Button className="flex h-6 items-center justify-center space-x-1 px-3">
              <HistoryIcon className="h-4 w-4" />
              <span className="text-xs font-extrabold">{t('History')}</span>
            </Button>
          </Link>
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
            <div className="relative z-10 space-y-2">
              {/* withdrawal is under processing */}
              {!!data?.data.withdrawingCount && (
                <div className="cursor primary-gradient-border-rounded flex items-center justify-between rounded-lg bg-black px-3 py-2">
                  <span className="text-sm font-normal text-white/70">
                    <Trans
                      i18nKey="WithdrawalIsUnderProcessing"
                      values={{ count: data?.data.withdrawingCount || 0 }}
                      components={{ span: <span className="font-ultra text-white" /> }}
                    />
                  </span>
                  <Button
                    className="flex h-6 items-center justify-center px-3"
                    onClick={() => navigate('withdrawal-processing')}
                  >
                    {t('Check')}
                  </Button>
                </div>
              )}
              {isLoading ? (
                <WalletsSkeleton />
              ) : (
                wallets.map((wallet, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg bg-[#1C1C1C] px-3 py-2 font-ultra"
                  >
                    <div className="flex items-center space-x-1">
                      {wallet.icon && <wallet.icon className="h-6 w-6" />}
                      <div className="flex flex-col space-y-[2px]">
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
                {t('Deposit')}
              </Link>
            </TabsTrigger>
            <TabsTrigger variant="cardTab" value="withdraw" className="flex-1" asChild>
              <Link prefetch="viewport" to="withdraw">
                {t('Withdraw')}
              </Link>
            </TabsTrigger>
            <TabsTrigger variant="cardTab" value="swap" className="flex-1" asChild>
              <Link prefetch="viewport" to="swap">
                {t('Swap')}
              </Link>
            </TabsTrigger>
          </TabsList>
          <TabsContent value={currentTab} className="mt-0">
            <Outlet context={contextVal} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
