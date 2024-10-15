import { useCallback, useEffect, useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useInfiniteQuery } from '@tanstack/react-query'
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

interface TransactionRecordRequest {
  page: number
  pageSize: number
  transactionTimeFrom?: string
  transactionTimeTo?: string
  currency?: string
  type?: string
  balance?: string
}

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

const typeOptions = [
  { value: '0', label: 'All' },
  { value: 'Deposit', label: 'Deposit' }, // 充值
  { value: 'Withdraw', label: 'Withdraw' }, // 提款
  { value: 'Swap(sell)', label: 'Swap(Sell)' }, // 兑换
  { value: 'Swap(buy)', label: 'Swap(Buy)' }, // 兑换
  { value: 'Commission', label: 'Commission' }, // 佣金
  { value: 'Game', label: 'Game' }, // 游戏
  { value: 'Task', label: 'Task' }, // 任務
  { value: 'Treasure', label: 'Treasure' }, // 宝箱
  { value: 'Rank', label: 'Rank' }, // 排行榜
  { value: 'LuckMoney', label: 'Lucky money' }, // 红包
  { value: 'SmashEgg', label: 'Smash egg' }, // 砸金蛋
  { value: 'Adjustment', label: 'Adjustment' }, // 人工调整
]

const balanceOptions = [
  { value: '0', label: 'All' },
  { value: 'Income', label: 'Income' },
  { value: 'Expense', label: 'Expense' },
]

const currencyOptions = [
  { value: '0', label: 'All' },
  { value: 'USDT', label: 'USDT' },
  { value: 'TON', label: 'TON' },
  { value: 'KOKON', label: 'KOKON' },
]

const fakeData = async (params: TransactionRecordRequest): Promise<any> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const staticData: TransactionEntry[] = Array.from({ length: 20 }, (_, index) => ({
        transactionTime: formatRFC3339(new Date('2024-08-31T11:31:00')),
        type: 'Deposit',
        currency: ['USDT', 'TON', 'KOKON'][Math.floor(Math.random() * 3)],
        amount:
          (Math.random() < 0.5 ? '-' : '') +
          (Math.floor(Math.random() * 9999999) + Math.random()).toFixed(8),
      }))

      const res = {
        data: {
          list: staticData,
          pagination: {
            pageSize: 20,
            totalPage: 3,
            totalRecord: 60,
          },
        },
      }
      resolve(res)
    }, 800)
  })
}

export default function TransactionRecord({ currentTab }: { currentTab: string }) {
  const { control, watch } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      currency: '0',
      type: '0',
      balance: '0',
      dateTimeRange: { from: startOfDay(subDays(new Date(), 30)), to: endOfDay(new Date()) },
    },
  })
  const [isFirstLoading, setIsFirstLoading] = useState(true)

  const formValues = watch()

  const fetchPosts = useCallback(
    async ({ pageParam = 1 }) => {
      const queryString: TransactionRecordRequest = {
        page: pageParam,
        pageSize: 20,
        transactionTimeFrom: formatRFC3339(formValues.dateTimeRange.from),
        transactionTimeTo: formatRFC3339(formValues.dateTimeRange.to),
        currency: formValues.currency === '0' ? '' : formValues.currency,
        type: formValues.type === '0' ? '' : formValues.type,
        balance: formValues.balance === '0' ? '' : formValues.balance,
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
                  title="Select Date"
                  value={field.value}
                  onChange={field.onChange}
                  range
                  showTimePicker
                  rangeLimits={{
                    minDate: startOfDay(subDays(new Date(), 30)),
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
                <div className="flex h-full w-full min-w-0 flex-col">
                  <DropdownSheet
                    id="currency-dropdown"
                    title="Currency"
                    placeholder="Currency"
                    value={field.value}
                    onConfirm={field.onChange}
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
                    title="Type"
                    placeholder="Type"
                    value={field.value}
                    onConfirm={field.onChange}
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
                    title="Balance"
                    placeholder="Balance"
                    value={field.value}
                    onConfirm={field.onChange}
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
            <p className="w-9">Date</p>
            <p className="w-9">Time</p>
            <p className="flex-1">Type</p>
            <p className="flex-1 text-right">Amount</p>
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
