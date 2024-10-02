import { useCallback, useEffect, useState } from 'react'
import type { DateRange } from 'react-day-picker'
import InfiniteScroll from '~/components/ui/infinite-scroll'
import { cn } from '~/lib/utils'
import styles from './index.module.scss'
import NoDataView from './no-data-view'
import { Currency, CurrencySwitch } from './currency-switch'
import { apis } from '~/api'
import { useInfiniteQuery } from '@tanstack/react-query'
import { Controller, useForm } from 'react-hook-form'
import DatePickerSheet from '~/components/date-picker-sheet/index'
import { DropdownOption, DropdownSheet } from '~/components/dropdown-sheet'
import { formatRFC3339 } from 'date-fns'
import BetRecordItem from './bet-record-item'
import { errorToast } from '~/lib/toast'

interface FormValues {
  gameList: string
  dateTimeRange: { from: Date; to: Date }
}

export interface GameTransaction {
  betGold: string
  betGoldKokon: string
  betTime: string
  subGameId: 0
  transactionId: string
  winGold: string
  winGoldKokon: string
}

interface GameTransactionRequest {
  page: number
  pageSize: number
  startTime: string
  endTime: string
  gameId: number
}

interface GameTransactionResponse {
  pagination: {
    pageSize: number
    totalPage: number
    totalRecord: number
  }
  records: GameTransaction[]
}

const queryString: GameTransactionRequest = {
  page: 1,
  pageSize: 20,
  startTime: formatRFC3339(new Date()),
  endTime: formatRFC3339(new Date()),
  gameId: 0,
}

export default function BetRecord({ currentTab }: { currentTab: string }) {
  const [currency, setCurrency] = useState<Currency>(Currency.KOKON)
  const [records, setRecords] = useState<GameTransaction[]>([])

  // 在组件内部
  const { control } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      gameList: '0',
      dateTimeRange: { from: new Date(), to: new Date() },
    },
  })

  const toggleCurrency = () => {
    setCurrency(currency === Currency.KOKON ? Currency.USDT : Currency.KOKON)
  }

  const fetchPosts = async (params: GameTransactionRequest) => {
    queryString.page = params.page
    const res = await apis.game.gameTransactionsList(params)
    if (!res.data.records) {
      res.data.records = []
    }
    return {
      pagination: {
        pageSize: res.data.pagination?.pageSize,
        totalPage: res.data.pagination?.totalPage,
        totalRecord: res.data.pagination?.totalRecord,
      },
      records: res.data.records,
    } as GameTransactionResponse
  }

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, error, refetch } = useInfiniteQuery<
    GameTransactionResponse,
    Error
  >({
    queryKey: ['gameTransactions', queryString],
    queryFn: ({ pageParam = 1 }) =>
      fetchPosts({
        ...queryString,
        page: pageParam as number,
      }),
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      if (lastPage && lastPage.pagination.totalPage) {
        return records.length < lastPage.pagination.totalRecord ? queryString.page + 1 : undefined
      }
      return undefined
    },
    enabled: currentTab === 'bet',
  })

  const datePickerOnChange = useCallback(
    (dateRange: DateRange, field: { onChange: (value: DateRange) => void }) => {
      field.onChange(dateRange)
      queryString.startTime = dateRange.from ? formatRFC3339(dateRange.from) : ''
      queryString.endTime = dateRange.to ? formatRFC3339(dateRange.to) : ''
      queryString.page = 1
      setRecords([])
      refetch()
    },
    [refetch]
  )

  useEffect(() => {
    if (error) {
      errorToast(error.message)
    }
  }, [error])

  useEffect(() => {
    if (data && Array.isArray(data.pages)) {
      const page = data.pages[0]
      if (Array.isArray(page.records)) {
        setRecords(prev => [...prev, ...page.records!])
      }
    }
  }, [data])

  useEffect(() => {
    if (currentTab !== 'bet') return
    setRecords([])
    refetch()
  }, [currentTab, refetch])

  return (
    <div className="flex flex-1 flex-col p-4">
      {/* Filter */}
      <div className="flex flex-col space-y-1">
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
                  onChange={(val: DateRange | Date | undefined) => {
                    if (val && 'from' in val && 'to' in val) {
                      datePickerOnChange(val, field)
                    }
                  }}
                  range
                  showTimePicker
                />
              </div>
            )}
          />
        </div>
        <div className="flex justify-between space-x-1 text-xs font-ultra text-white/50">
          <div className="py2 flex h-9 flex-1 items-center rounded-[100px] border-white/20 bg-[#333] text-xs font-ultra">
            <Controller
              name="gameList"
              control={control}
              render={({ field }) => (
                <div className="flex h-full w-full flex-col">
                  <DropdownSheet
                    id="game-list-dropdown"
                    title="Game List"
                    value={field.value}
                    onConfirm={(selectedValue: string) => field.onChange(selectedValue)}
                  >
                    <DropdownOption value="0" label="All" />
                  </DropdownSheet>
                </div>
              )}
            />
          </div>
          <CurrencySwitch currency={currency} toggleCurrency={toggleCurrency} />
        </div>
      </div>

      {/* Content */}
      <div className="relative mt-3 flex-1 rounded-xl p-3">
        {/* table row */}
        <div className="absolute bottom-0 left-0 right-0 top-0 overflow-y-auto">
          {/* <BetRecordItem /> */}
          <div className="space-y-2">
            {records.length > 0 ? (
              <>
                {records.map((record: GameTransaction, index: number) => (
                  <BetRecordItem
                    record={record}
                    key={`${record.transactionId}-${index}`}
                    currency={currency}
                  />
                ))}
                <InfiniteScroll
                  hasMore={!!hasNextPage}
                  isLoading={isFetchingNextPage}
                  next={fetchNextPage}
                  threshold={1}
                >
                  {hasNextPage && <p className="text-center text-xs text-white/70">加載中...</p>}
                </InfiniteScroll>
              </>
            ) : (
              <NoDataView showButton={true} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
