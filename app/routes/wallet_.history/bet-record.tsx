import { useCallback, useEffect, useState, useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { formatRFC3339, startOfDay, endOfDay, subDays } from 'date-fns'
import InfiniteScroll from '~/components/ui/infinite-scroll'
import DatePickerSheet from '~/components/date-picker-sheet/index'
import { DropdownOption, DropdownSheet } from '~/components/dropdown-sheet'
import { Skeleton } from '~/components/ui/skeleton'
import { CurrencySwitch } from './currency-switch'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { cn } from '~/lib/utils'
import { errorToast } from '~/lib/toast'
import LoadingIcon from '~/icons/loading.svg?react'
import { apis } from '~/api'
import type { GetActiveGamesResponse } from '~/api/codegen/data-contracts'
import { Crypto } from '~/consts/crypto'

import styles from './index.module.scss'
import BetRecordItem from './bet-record-item'
import BetSkeleton from './bet-skeleton'
import NoDataView from './no-data-view'
import Amount from '~/components/amount'
import { KokonIcon, UsdtIcon } from '~/components/color-icons'

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
  /* 前端轉換 */
  /* 遊戲名稱 */
  gameName: string
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
  summary: {
    totalBetGold: string
    totalBetGoldKokon: string
    totalWinGold: string
    totalWinGoldKokon: string
  }
}

const defaultValues = {
  gameList: '0',
  dateTimeRange: { from: startOfDay(subDays(new Date(), 30)), to: endOfDay(new Date()) },
}

const calculateDifference = (win: number | undefined, bet: number | undefined) =>
  (Number(win ?? 0) - Number(bet ?? 0)).toString()

const SummaryItem = ({
  label,
  value,
  icon,
}: {
  label: string
  value: React.ReactNode
  icon?: React.ReactNode
}) => (
  <div className="flex flex-1 flex-col items-center justify-between space-y-1 text-xs">
    <p className="text-white/70">{label}</p>
    <div className="flex space-x-1">
      {icon}
      <span className="font-ultra text-white">{value}</span>
    </div>
  </div>
)

export default function BetRecord({ currentTab }: { currentTab: string }) {
  const [currency, setCurrency] = useState<Crypto.USDT | Crypto.KOKON>(Crypto.KOKON)
  const [isFirstLoading, setIsFirstLoading] = useState(true)

  const { control, watch } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues,
  })

  const formValues = watch()

  const toggleCurrency = () => {
    setCurrency(currency === Crypto.KOKON ? Crypto.USDT : Crypto.KOKON)
  }

  const { data: gameListRaw, error: gameListError } = useQuery<GetActiveGamesResponse, Error>({
    queryKey: ['gameList'],
    queryFn: async () => {
      try {
        const response = await apis.games.gamesList()
        return response.data as GetActiveGamesResponse
      } catch (error) {
        console.error('Error fetching game list:', error)
        throw error
      }
    },
    enabled: currentTab === 'bet',
  })

  const bcGameOptions = useMemo(() => {
    return gameListRaw?.list?.filter(game => game.gameType === 1) || [] // 1=BC, 2=休閒
  }, [gameListRaw?.list])

  const fetchPosts = useCallback(
    async ({ pageParam = 1 }) => {
      const queryString: GameTransactionRequest = {
        page: pageParam,
        pageSize: 20,
        startTime: formatRFC3339(formValues.dateTimeRange.from),
        endTime: formatRFC3339(formValues.dateTimeRange.to),
        gameId: parseInt(formValues.gameList),
      }

      const res = await apis.game.gameTransactionsList(queryString)
      return {
        pagination: {
          pageSize: res.data.pagination?.pageSize ?? 0,
          totalPage: res.data.pagination?.totalPage ?? 0,
          totalRecord: res.data.pagination?.totalRecord ?? 0,
        },
        records: res.data.records ?? [],
        summary: res.data.summary ?? {},
      } as GameTransactionResponse
    },
    [formValues]
  )

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, error, isFetching, status } =
    useInfiniteQuery<GameTransactionResponse, Error>({
      queryKey: ['gameTransactions', watch()],
      queryFn: ({ pageParam = 1 }) => fetchPosts({ pageParam: pageParam as number }),
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.pagination.totalPage > allPages.length) {
          return allPages.length + 1
        }
        return undefined
      },
      enabled: currentTab === 'bet',
      initialPageParam: 1,
    })

  const records = useMemo(
    () =>
      data?.pages.flatMap(page =>
        page.records.map(record => ({
          ...record,
          gameName: gameListRaw?.list?.find(game => game.id === record.subGameId)?.gameName || '',
        }))
      ) ?? [],
    [data?.pages, gameListRaw?.list]
  )

  const summary = useMemo(() => {
    if (!data?.pages || data.pages.length === 0) return null
    return data.pages[data.pages.length - 1].summary
  }, [data?.pages])

  const isFetchData = useMemo(() => {
    return isFetching && !isFetchingNextPage && !data
  }, [isFetching, isFetchingNextPage, data])

  useEffect(() => {
    if (gameListError) {
      console.error('Error fetching game list:', gameListError)
    }
  }, [gameListError])

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

  if (isFirstLoading) {
    return <BetSkeleton />
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
          <div className="py2 flex h-9 flex-1 items-center rounded-[100px] border-white/20 bg-[#333] text-xs font-ultra">
            <Controller
              name="gameList"
              control={control}
              render={({ field }) => (
                <div className="flex h-full w-full flex-col">
                  <DropdownSheet
                    id="game-list-dropdown"
                    title="Game List"
                    placeholder="Game"
                    value={field.value}
                    onConfirm={field.onChange}
                    onReset={() => field.onChange('0')}
                  >
                    {bcGameOptions?.map(data => (
                      <DropdownOption
                        key={data.id}
                        value={data.id.toString()}
                        label={data.gameName}
                      />
                    ))}
                  </DropdownSheet>
                </div>
              )}
            />
          </div>
          <CurrencySwitch currency={currency} toggleCurrency={toggleCurrency} />
        </div>
      </form>

      {/* Content */}
      {isFetchData ? (
        <Skeleton className="relative mt-3 flex-1 rounded-xl bg-[#1C1C1C] p-3" />
      ) : (
        <div className="relative mt-3 flex-1 rounded-xl p-3">
          <div
            className={cn(
              'absolute left-0 right-0 top-0 overflow-y-auto',
              records.length > 0 ? 'bottom-9' : 'bottom-0'
            )}
          >
            <div className="space-y-2 pb-2">
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
                    {hasNextPage && (
                      <div>
                        <LoadingIcon className="m-auto h-6 w-6 animate-spin" />
                      </div>
                    )}
                  </InfiniteScroll>
                </>
              ) : (
                <NoDataView showButton={true} />
              )}
            </div>
          </div>
          <div
            className={cn(
              'absolute bottom-0 left-0 right-0 h-9 space-x-2 py-2',
              records.length > 0 && summary ? 'flex' : 'hidden'
            )}
          >
            <SummaryItem label="Number" value={data?.pages[0].pagination.totalRecord} />
            <SummaryItem
              label="Bets"
              value={
                <Amount
                  value={
                    currency === Crypto.USDT ? summary?.totalBetGold : summary?.totalBetGoldKokon
                  }
                  crypto={currency}
                  defaultValue="0"
                />
              }
              icon={
                currency === Crypto.USDT ? (
                  <UsdtIcon className="my-auto h-3 w-3" />
                ) : (
                  <KokonIcon className="my-auto h-3 w-3" />
                )
              }
            />
            <SummaryItem
              label="Win/Loss"
              value={
                <Amount
                  value={
                    currency === Crypto.USDT
                      ? calculateDifference(
                          Number(summary?.totalWinGold),
                          Number(summary?.totalBetGold)
                        )
                      : calculateDifference(
                          Number(summary?.totalWinGoldKokon),
                          Number(summary?.totalBetGoldKokon)
                        )
                  }
                  crypto={currency}
                />
              }
              icon={
                currency === Crypto.USDT ? (
                  <UsdtIcon className="my-auto h-3 w-3" />
                ) : (
                  <KokonIcon className="my-auto h-3 w-3" />
                )
              }
            />
          </div>
        </div>
      )}
    </div>
  )
}
