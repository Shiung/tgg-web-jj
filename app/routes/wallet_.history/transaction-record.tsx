import { useCallback, useEffect, useState } from 'react'
import InfiniteScroll from '~/components/ui/infinite-scroll'
import { cn } from '~/lib/utils'
import styles from './index.module.scss'
import NoDataView from './no-data-view'
import { Controller, useForm } from 'react-hook-form'
import DatePickerSheet from '~/components/date-picker-sheet/index'
import { useInfiniteQuery } from '@tanstack/react-query'
import { format, formatRFC3339 } from 'date-fns'
import { KokonIcon, UsdtIcon } from '~/components/color-icons'
import { DropdownOption, DropdownSheet } from '~/components/dropdown-sheet'
import Amount from '~/components/amount'

interface TransactionRecordRequest {
  page: number
  pageSize: number
  startTime: string
  endTime: string
  currencyId: string
  type: string
  balance: string
}

interface Pagination {
  pageSize: number
  totalPage: number
  totalRecord: number
}

interface TransactionEntry {
  id: number
  date: string
  type: string
  amount: string
  transactionId: string
  currencyId: number
}

interface TransactionRecordResponse {
  records: TransactionEntry[]
  pagination: Pagination
}

interface FormValues {
  currencyId: string
  type: string
  balance: string
  dateTimeRange: { from: Date; to: Date }
}

const typeOptions = [
  { value: '0', label: 'All' },
  { value: '1', label: 'Deposit' },
  { value: '2', label: 'Withdraw' },
  { value: '3', label: 'Swap(Sell)、Swap(Buy)' },
  { value: '4', label: 'Commission' },
  { value: '5', label: 'Game' },
  { value: '6', label: 'Task' },
  { value: '7', label: 'Treasure' },
  { value: '8', label: 'Rank' },
  { value: '9', label: 'Lucky money' },
  { value: '10', label: 'Smash egg' },
  { value: '11', label: 'Adjustment' },
]

const balanceOptions = [
  { value: '0', label: 'All' },
  { value: '1', label: 'Income' },
  { value: '2', label: 'Expense' },
]

const currencyOptions = [
  { value: '0', label: 'All' },
  { value: '1', label: 'USDT' },
  { value: '2', label: 'TON' },
]

const TransactionEntryItem = ({ record }: { record: TransactionEntry }) => {
  return (
    <div className="flex items-center space-x-2 pb-2.5 text-xs font-normal text-white">
      <p className="w-9">{format(new Date(record.date), 'MM-dd')}</p>
      <p className="w-9">{format(new Date(record.date), 'HH:mm')}</p>
      <p className="flex-1 font-ultra">{record.type}</p>
      <p
        className={`flex-1 text-right font-ultra ${parseFloat(record.amount) < 0 ? 'text-[#FF4D48]' : 'text-white'}`}
      >
        <Amount value={parseFloat(record.amount)} thousandSeparator />
      </p>
      {record.currencyId === 1 ? (
        <UsdtIcon className="my-auto h-3 w-3" />
      ) : (
        <KokonIcon className="my-auto h-3 w-3" />
      )}
    </div>
  )
}

const fakeData = async (params: TransactionRecordRequest): Promise<TransactionRecordResponse> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const staticData: TransactionEntry[] = Array.from({ length: 20 }, (_, index) => ({
        id: params.page * 20 + index + 1,
        date: formatRFC3339(new Date('2024-08-31T11:31:00')),
        type: 'Deposit',
        transactionId: Math.random().toString(36).substring(2, 20).toUpperCase(),
        currencyId: Math.floor(Math.random() * 2) + 1,
        amount:
          (Math.random() < 0.5 ? '-' : '') +
          (Math.floor(Math.random() * 9999999) + Math.random()).toFixed(8),
      }))

      const res: TransactionRecordResponse = {
        records: staticData,
        pagination: {
          pageSize: 20,
          totalPage: 3,
          totalRecord: 60,
        },
      }
      resolve(res)
    }, 800)
  })
}

const queryString: TransactionRecordRequest = {
  page: 1,
  pageSize: 20,
  startTime: formatRFC3339(new Date('2024-09-26')),
  endTime: formatRFC3339(new Date('2024-09-27')),
  currencyId: '',
  type: '',
  balance: '',
}

export default function TransactionRecord({ currentTab }: { currentTab: string }) {
  const [records, setRecords] = useState<TransactionEntry[]>([])

  const { control } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      currencyId: '0',
      type: '0',
      balance: '0',
      dateTimeRange: { from: new Date(), to: new Date() },
    },
  })

  const fetchPosts = async (params: TransactionRecordRequest) => {
    queryString.page = params.page
    const res = await fakeData(params)
    return res
  }

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useInfiniteQuery<
    TransactionRecordResponse,
    Error
  >({
    queryKey: ['TransactionRecordRequest'],
    queryFn: ({ pageParam = 1 }) =>
      fetchPosts({
        ...queryString,
        page: pageParam as number,
      }),
    initialPageParam: 1,
    getNextPageParam: () => {
      return queryString.page < 5 ? queryString.page + 1 : undefined
    },
    enabled: currentTab === 'transaction',
  })

  useEffect(() => {
    if (data && Array.isArray(data.pages)) {
      const page = data.pages[0]
      if (queryString.page < page.pagination.totalPage) {
        setRecords(prev => [...prev, ...page.records])
      }
    }
  }, [data])

  const datePickerOnChange = useCallback(
    (dateRange: any, field: any) => {
      field.onChange(dateRange)
      queryString.startTime = formatRFC3339(dateRange.from)
      queryString.endTime = formatRFC3339(dateRange.to)
      queryString.page = 1
      setRecords([])
      refetch()
    },
    [refetch]
  )

  const currencyDropdownOnChange = useCallback(
    (value: string, field: any) => {
      field.onChange(value)
      refetch()
    },
    [refetch]
  )

  const typeDropdownOnChange = useCallback(
    (value: string, field: any) => {
      field.onChange(value)
      refetch()
    },
    [refetch]
  )

  const balanceDropdownOnChange = useCallback(
    (value: string, field: any) => {
      field.onChange(value)
      refetch()
    },
    [refetch]
  )

  useEffect(() => {
    if (currentTab !== 'transaction') return
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
                  onChange={val => datePickerOnChange(val, field)}
                  range
                  showTimePicker
                />
              </div>
            )}
          />
        </div>
        <div className="flex justify-between space-x-1 text-xs font-ultra text-white/50">
          <div className="py2 flex h-9 min-w-0 flex-1 items-center overflow-hidden rounded-[100px] border-white/20 bg-[#333] text-xs font-ultra">
            <Controller
              name="currencyId"
              control={control}
              render={({ field }) => (
                <div className="flex h-full w-full min-w-0 flex-col">
                  <DropdownSheet
                    id="currency-dropdown"
                    title="Currency"
                    placeholder="Currency"
                    value={field.value}
                    onConfirm={(selectedValue: string) =>
                      currencyDropdownOnChange(selectedValue, field)
                    }
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
                    onConfirm={(selectedValue: string) =>
                      typeDropdownOnChange(selectedValue, field)
                    }
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
                    onConfirm={(selectedValue: string) =>
                      balanceDropdownOnChange(selectedValue, field)
                    }
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
      </div>

      {/* Content */}
      <div className="relative mt-3 flex-1 rounded-xl bg-[#1C1C1C] p-3">
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
        {/* table row */}
        <div className="absolute bottom-3 left-3 right-3 top-9 overflow-y-auto pt-3">
          <div>
            {records.length > 0 ? (
              <>
                {records.map((record: TransactionEntry, index: number) => (
                  <TransactionEntryItem
                    key={`${record.id}-${record.transactionId}-${index}`}
                    record={record}
                  />
                ))}
                <InfiniteScroll
                  hasMore={!!hasNextPage}
                  isLoading={!!isFetchingNextPage}
                  next={fetchNextPage}
                  threshold={1}
                >
                  {hasNextPage && <p className="text-center text-xs text-white/70">加載中...</p>}
                </InfiniteScroll>
              </>
            ) : (
              <NoDataView />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
