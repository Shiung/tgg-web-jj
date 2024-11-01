import { useCallback, useEffect, useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { endOfDay, formatRFC3339, startOfDay, subDays } from 'date-fns'
import InfiniteScroll from '~/components/ui/infinite-scroll'
import DatePickerSheet from '~/components/date-picker-sheet/index'
import { DropdownOption, DropdownSheet } from '~/components/dropdown-sheet'
import { Skeleton } from '~/components/ui/skeleton'
import { apis } from '~/api'
import LoadingIcon from '~/icons/loading.svg?react'
import { cn } from '~/lib/utils'
import { errorToast } from '~/lib/toast'

import TransactionSkeleton from './transaction-skeleton'
import TransactionEntryItem from './transaction-entry-item'
import NoDataView from './no-data-view'
import styles from './index.module.scss'
import ArrowLineDownIcon from '~/icons/arrow-line-down.svg?react'
import { KatonIcon, TonIcon, UsdtIcon } from '~/components/color-icons'
import XIcon from '~/icons/x.svg?react'
import { Button } from '~/components/ui/button'
import { WalletHistoryListListParams } from '~/api/codegen/data-contracts'

interface Pagination {
  pageSize: number
  totalPage?: number | null
  totalRecord?: number | null
}

export interface TransactionEntry {
  type: string
  amount: string
  currency: string
  transactionTime: string
  comment?: string | null
  txType?: string | null
}

interface TransactionRecordResponse {
  list?: TransactionEntry[]
  pagination?: Pagination
}

interface FormValues {
  currency: string
  type: string
  balance: string
  dateTimeRange: { from: Date; to: Date }
}

// const fakeData = async (params: TransactionRecordRequest): Promise<any> => {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       const staticData: TransactionEntry[] = Array.from({ length: 20 }, (_, index) => ({
//         transactionTime: formatRFC3339(new Date('2024-08-31T11:31:00')),
//         type: 'Deposit',
//         currency: ['USDT', 'TON', 'KATON'][Math.floor(Math.random() * 3)],
//         amount:
//           (Math.random() < 0.5 ? '-' : '') +
//           (Math.floor(Math.random() * 9999999) + Math.random()).toFixed(8),
//       }))

//       const res = {
//         data: {
//           list: staticData,
//           pagination: {
//             pageSize: 20,
//             totalPage: 3,
//             totalRecord: 60,
//           },
//         },
//       }
//       resolve(res)
//     }, 800)
//   })
// }

export default function TransactionRecord({ currentTab }: { currentTab: string }) {
  const { t } = useTranslation()
  const typeOptions = [
    { value: 'Deposit', label: t('transaction.type.deposit') }, // 充值
    { value: 'Withdraw', label: t('transaction.type.withdraw') }, // 提款
    { value: 'Swap(sell)', label: t('transaction.type.swap(sell)') }, // 兑换
    { value: 'Swap(buy)', label: t('transaction.type.swap(buy)') }, // 兑换
    { value: 'Commission', label: t('transaction.type.commission') }, // 佣金
    { value: 'Game', label: t('transaction.type.game') }, // 游戏
    { value: 'Task', label: t('transaction.type.task') }, // 任務
    { value: 'Treasure', label: t('transaction.type.treasure') }, // 宝箱
    { value: 'Rank', label: t('transaction.type.rank') }, // 排行榜
    { value: 'LuckyMoney', label: t('transaction.type.luckyMoney') }, // 红包
    { value: 'SmashEgg', label: t('transaction.type.smashEgg') }, // 砸金蛋
    { value: 'Adjustment', label: t('transaction.type.adjustment') }, // 人工调整
    { value: 'Invite', label: t('transaction.type.invite') }, // 紅包邀請
  ]

  const balanceOptions = [
    { value: 'Income', label: t('Income') },
    { value: 'Expense', label: t('Expense') },
  ]

  const currencyOptions = [
    {
      value: 'USDT',
      label: (
        <div className="flex items-center space-x-1">
          <UsdtIcon className="h-6 w-6 flex-shrink-0" />
          <div>USDT</div>
        </div>
      ),
    },
    {
      value: 'TON',
      label: (
        <div className="flex items-center space-x-1">
          <TonIcon className="h-6 w-6 flex-shrink-0" />
          <div>TON</div>
        </div>
      ),
    },
    {
      value: 'KATON',
      label: (
        <div className="flex items-center space-x-1">
          <KatonIcon className="h-6 w-6 flex-shrink-0" />
          <div>KATON</div>
        </div>
      ),
    },
  ]

  const { control, watch } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      currency: '',
      type: '',
      balance: '',
      dateTimeRange: { from: startOfDay(subDays(new Date(), 29)), to: endOfDay(new Date()) },
    },
  })
  const [isFirstLoading, setIsFirstLoading] = useState(true)

  const formValues = watch()

  const fetchPosts = useCallback(
    async ({ pageParam = 1 }) => {
      const queryString: WalletHistoryListListParams = {
        page: pageParam,
        pageSize: 20,
        transactionTimeFrom: formatRFC3339(formValues.dateTimeRange.from),
        transactionTimeTo: formatRFC3339(formValues.dateTimeRange.to),
        currency: formValues.currency,
        type: formValues.type as WalletHistoryListListParams['type'],
        balance: formValues.balance as WalletHistoryListListParams['balance'],
      }
      const res = await apis.wallet.walletHistoryListList(queryString)
      // const res = await fakeData(queryString)
      return {
        pagination: {
          pageSize: res.data.pagination?.pageSize ?? 0,
          totalPage: res.data.pagination?.totalPage ?? 0,
          totalRecord: res.data.pagination?.totalRecord ?? 0,
        },
        list: res.data.list || [],
      }
    },
    [formValues]
  )

  const { data, fetchNextPage, isFetching, hasNextPage, isFetchingNextPage, error, status } =
    useInfiniteQuery<TransactionRecordResponse, Error>({
      queryKey: ['TransactionRecordRequest', watch()],
      queryFn: ({ pageParam = 1 }) => fetchPosts({ pageParam: pageParam as number }),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.pagination && lastPage.pagination.totalPage) {
          return lastPage.pagination.totalPage > allPages.length ? allPages.length + 1 : undefined
        }
        return undefined
      },
      enabled: currentTab === 'transaction',
    })

  useEffect(() => {
    if (status === 'success') {
      setIsFirstLoading(false)
    }
  }, [status])

  useEffect(() => {
    if (error) {
      errorToast(error.message)
    }
  }, [error])

  const records = useMemo(() => data?.pages.flatMap(page => page.list) ?? [], [data])
  const isFetchData = useMemo(() => {
    return isFetching && !isFetchingNextPage && !data
  }, [isFetching, isFetchingNextPage, data])

  if (isFirstLoading) {
    return <TransactionSkeleton />
  }

  return (
    <div className="flex flex-1 flex-col p-4">
      {/* Filter */}
      <form className="flex flex-col space-y-1">
        <div className="py2 flex h-9 w-full items-center rounded-[100px] border-white/20 bg-[#333] text-xs font-ultra">
          <Controller
            name="dateTimeRange"
            control={control}
            render={({ field }) => (
              <div className={cn('h-full w-full', styles['date-picker'])}>
                <DatePickerSheet
                  id="datetime-range-picker"
                  title={t('SelectDate')}
                  value={field.value}
                  onChange={field.onChange}
                  range
                  showTimePicker
                  rangeLimits={{
                    minDate: startOfDay(subDays(new Date(), 29)),
                    maxDate: endOfDay(new Date()),
                  }}
                />
              </div>
            )}
          />
        </div>
        <div className="flex justify-between space-x-1 text-xs font-ultra text-white/50">
          <div className="py2 flex h-9 min-w-0 flex-1 items-center overflow-hidden rounded-[100px] border-white/20 bg-[#333] text-xs font-ultra">
            <Controller
              name="currency"
              control={control}
              render={({ field }) => (
                <div className="flex h-full w-full min-w-0 flex-col text-white">
                  <DropdownSheet
                    id="currency-dropdown"
                    title={t('Currency')}
                    placeholder={t('Currency')}
                    value={field.value}
                    onConfirm={field.onChange}
                    onReset={() => field.onChange('')}
                    customTrigger={({ selectedLabel, placeholder }) => {
                      return (
                        <div
                          className={cn(
                            'flex flex-1 cursor-pointer items-center justify-between rounded-full border-[0.5px] border-white/20 px-3',
                            selectedLabel ? 'text-white' : 'text-white/50'
                          )}
                        >
                          {selectedLabel || placeholder}
                          {selectedLabel ? (
                            <Button
                              type="button"
                              variant="icon"
                              size="icon"
                              onClick={e => {
                                e.stopPropagation()
                                field.onChange('')
                              }}
                            >
                              <XIcon className="h-4 w-4 text-white" />
                            </Button>
                          ) : (
                            <ArrowLineDownIcon className="h-4 w-4 text-white/70" />
                          )}
                        </div>
                      )
                    }}
                  >
                    {currencyOptions.map(option => (
                      <DropdownOption
                        key={option.value}
                        value={option.value}
                        label={option.label}
                        className="truncate"
                      />
                    ))}
                  </DropdownSheet>
                </div>
              )}
            />
          </div>
          <div className="py2 flex h-9 min-w-0 flex-1 items-center overflow-hidden rounded-[100px] border-white/20 bg-[#333] text-xs font-ultra">
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <div className="flex h-full w-full min-w-0 flex-col">
                  <DropdownSheet
                    id="type-dropdown"
                    title={t('Type')}
                    placeholder={t('Type')}
                    value={field.value}
                    onConfirm={field.onChange}
                    onReset={() => field.onChange('')}
                  >
                    {typeOptions.map(option => (
                      <DropdownOption
                        key={option.value}
                        value={option.value}
                        label={option.label}
                        className="truncate"
                      />
                    ))}
                  </DropdownSheet>
                </div>
              )}
            />
          </div>
          <div className="py2 flex h-9 min-w-0 flex-1 items-center overflow-hidden rounded-[100px] border-white/20 bg-[#333] text-xs font-ultra">
            <Controller
              name="balance"
              control={control}
              render={({ field }) => (
                <div className="flex h-full w-full min-w-0 flex-col">
                  <DropdownSheet
                    id="balance-dropdown"
                    title={t('Balance')}
                    placeholder={t('Balance')}
                    value={field.value}
                    onConfirm={field.onChange}
                    onReset={() => field.onChange('')}
                  >
                    {balanceOptions.map(option => (
                      <DropdownOption
                        key={option.value}
                        value={option.value}
                        label={option.label}
                        className="truncate"
                      />
                    ))}
                  </DropdownSheet>
                </div>
              )}
            />
          </div>
        </div>
      </form>

      {/* Content */}
      {isFetchData ? (
        <Skeleton className="relative mt-3 flex flex-1 flex-col rounded-xl bg-[#1C1C1C] p-3" />
      ) : (
        <div className="relative mt-3 flex flex-1 flex-col rounded-xl bg-[#1C1C1C] p-3">
          {/* table header */}
          <div
            className={cn(
              'relative flex items-center space-x-2 pb-2.5 text-xs font-normal text-white/70',
              styles['list-header']
            )}
          >
            <p className="w-9">{t('Date')}</p>
            <p className="w-9">{t('Time')}</p>
            <p className="flex-1">{t('Type')}</p>
            <p className="flex-1 text-right">{t('Amount')}</p>
          </div>
          <div className="absolute bottom-3 left-3 right-3 top-9 mt-2 overflow-y-auto">
            <div>
              {records && records.length > 0 ? (
                <>
                  {records.map((record, index) => (
                    <TransactionEntryItem key={`${index}`} record={record!} />
                  ))}
                  <InfiniteScroll
                    hasMore={!!hasNextPage}
                    isLoading={!!isFetchingNextPage}
                    next={fetchNextPage}
                    threshold={1}
                  >
                    {hasNextPage && (
                      <div>
                        <LoadingIcon className="m-auto h-6 w-6 animate-spin" />
                      </div>
                    )}
                  </InfiniteScroll>
                </>
              ) : (
                <NoDataView />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
