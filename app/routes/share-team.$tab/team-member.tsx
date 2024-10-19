import React, { useState, useMemo } from 'react'
import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import { Controller, useForm } from 'react-hook-form'

//NOTICE: For test
// import fetchTeamData from './fake-memberData'

import { apis } from '~/api'
import { parseAmount } from '~/lib/amount'
import useIntersectionObserver from '~/hooks/useIntersectionObserver'
import { useAppMaxWidth } from '~/hooks/useAppMaxWidth'
import { UsdtIcon } from '~/components/color-icons'
import XIcon from '~/icons/x.svg?react'
import SortAscIcon from '~/icons/sort-asc.svg?react'
import SortDescIcon from '~/icons/sort-desc.svg?react'
import SearchIcon from '~/icons/search.svg?react'
import LoadingIcon from '~/icons/loading.svg?react'
import ArrowLineUpIcon from '~/icons/arrow-line-up.svg?react'
import ArrowLineDownIcon from '~/icons/arrow-line-down.svg?react'
import InfoTooltip from '~/components/info-tooltip'
import CatEarsCard from '~/components/cat-ears-card'
import Amount from '~/components/amount'
import { Skeleton } from '~/components/ui/skeleton'
import { DropdownOption, DropdownSheet } from '~/components/dropdown-sheet'
import { Crypto } from '~/consts/crypto'
import InfiniteScroll from '~/components/ui/infinite-scroll'

import TeamMemberEmpty from './team-member-empty'
import TeamMemberTableList from './team-member-tableList'
import ShareTeamSkeleton from './share-team-skeleton'

const PAGE_SIZE = 20

const levelOptions = [
  { value: '0', label: 'LV: all' },
  { value: '1', label: 'LV: 1' },
  { value: '2', label: 'LV: 2' },
]

const sortOptions = [
  {
    value: { sortOrder: '', sortField: '' },
    label: <div>Default</div>,
  },
  {
    value: { sortOrder: 'asc', sortField: 'level' },
    label: (
      <div className="flex items-center space-x-1">
        <SortAscIcon className="h-6 w-6 flex-shrink-0 text-[#FFFFFFB2]" />
        <div>LV</div>
      </div>
    ),
  },
  {
    value: { sortOrder: 'desc', sortField: 'level' },
    label: (
      <div className="flex items-center space-x-1">
        <SortDescIcon className="h-6 w-6 flex-shrink-0 text-[#FFFFFFB2]" />
        <div>LV</div>
      </div>
    ),
  },
  {
    value: { sortOrder: 'asc', sortField: 'bet' },
    label: (
      <div className="flex items-center space-x-1">
        <SortAscIcon className="h-6 w-6 flex-shrink-0 text-[#FFFFFFB2]" />
        <div>Total Bets</div>
      </div>
    ),
  },
  {
    value: { sortOrder: 'desc', sortField: 'bet' },
    label: (
      <div className="flex items-center space-x-1">
        <SortDescIcon className="h-6 w-6 flex-shrink-0 text-[#FFFFFFB2]" />
        <div>Total Bets</div>
      </div>
    ),
  },
  {
    value: { sortOrder: 'asc', sortField: 'deposit' },
    label: (
      <div className="flex items-center space-x-1">
        <SortAscIcon className="h-6 w-6 flex-shrink-0 text-[#FFFFFFB2]" />
        <div>Total Deposit</div>
      </div>
    ),
  },
  {
    value: { sortOrder: 'desc', sortField: 'deposit' },
    label: (
      <div className="flex items-center space-x-1">
        <SortDescIcon className="h-6 w-6 flex-shrink-0 text-[#FFFFFFB2]" />
        <div>Total Deposit</div>
      </div>
    ),
  },
]

const TeamMember: React.FC = () => {
  const maxWidth = useAppMaxWidth()
  // 取得用戶的團隊資訊
  const { data: customerTeamInfo, isLoading: customerTeamInfoLoading } = useQuery({
    queryKey: ['customerTeamInfoList'],
    queryFn: () => apis.customer.customerTeamInfoList(),
  })

  // 控制 search 的展開與收合
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)

  // 搜尋表單
  const { control, watch, setValue } = useForm({
    mode: 'onChange',
    defaultValues: {
      displayName: '',
      sort: { sortOrder: '', sortField: '' },
      level: '0',
    },
  })

  // 團隊列表
  const [localDisplayName, setLocalDisplayName] = useState('')
  const selectedDisplayName = watch('displayName')
  const selectedSort = watch('sort')
  const selectedLevel = watch('level')

  interface QueryParams {
    name?: string
    level?: number
    sortOrder?: 'desc' | 'asc'
    sortField?: 'level' | 'bet' | 'deposit'
  }
  const queryParams = useMemo<QueryParams>(() => {
    const { sortOrder, sortField } = selectedSort as Pick<QueryParams, 'sortField' | 'sortOrder'>
    return {
      ...(!!sortOrder &&
        !!sortField && {
          sortOrder,
          sortField,
        }),
      ...(!!selectedDisplayName && {
        name: selectedDisplayName,
      }),
      level: Number(selectedLevel),
    }
  }, [selectedDisplayName, selectedSort, selectedLevel])

  //NOTICE: For test
  // mock use => queryFn: ({ pageParam = 1 }) => fetchTeamData(pageParam, PAGE_SIZE, queryParams),
  // live use =>   queryFn: ({ pageParam = 0 }) => apis.customer.customerTeamPerformanceList({ ...queryParams, anchorPoint: pageParam }),

  const {
    data: teamPerformanceListData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isTeamPerformanceListLoading,
  } = useInfiniteQuery({
    queryKey: ['customerTeamPerformanceList', queryParams],
    queryFn: ({ pageParam = 1 }) =>
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      apis.customer.customerTeamPerformanceList({
        ...queryParams,
        page: pageParam,
        pageSize: PAGE_SIZE,
      }),
    getNextPageParam: (lastPage, allPages) => {
      if (
        lastPage.data?.pagination?.totalPage &&
        lastPage.data?.pagination?.totalPage > allPages.length
      ) {
        return allPages.length + 1
      }
      return undefined
    },
    initialPageParam: 1,
  })

  const flattenedData = useMemo(() => {
    return teamPerformanceListData?.pages.flatMap(page => page.data?.data).filter(d => !!d) || []
  }, [teamPerformanceListData])

  // 獲取最新的匯總數據
  const latestSummary = useMemo(() => {
    if (
      !selectedDisplayName &&
      !selectedSort.sortOrder &&
      !selectedSort.sortField &&
      !Number(selectedLevel)
    )
      return null
    if (!teamPerformanceListData?.pages) return null
    for (let i = teamPerformanceListData.pages.length - 1; i >= 0; i--) {
      const page = teamPerformanceListData.pages[i].data
      if (page.data && Array.isArray(page.data) && page.data.length > 0) {
        return page.summary
      }
    }
    return null
  }, [teamPerformanceListData?.pages, selectedDisplayName, selectedLevel, selectedSort])

  // 回到顶部
  const [topRef, istopflagVisible, scrollToTop] = useIntersectionObserver<HTMLDivElement>()

  if (customerTeamInfoLoading) {
    return <ShareTeamSkeleton />
  }

  return (
    <div className="flex flex-1 flex-col p-4">
      {/* My Team Rating Section */}
      <CatEarsCard>
        <div
          ref={topRef}
          className="flex items-center justify-between rounded-t-[12px] bg-[#333333] px-6 py-2"
        >
          <span className="font-ultra text-primary">
            My Team Rating: {customerTeamInfo?.data?.class || 0}
          </span>
          <div className="flex space-x-1">
            {Array.from({ length: customerTeamInfo?.data?.class || 0 }).map((_, index) => (
              <img
                key={`teamRating-${index}`}
                className="h-4 w-4"
                src="/images/3D-star.png"
                alt="3D-star"
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center p-3">
          <div className="flex w-full space-x-2 rounded-lg bg-[#333333] px-3 py-2 text-xs font-ultra">
            <div className="flex min-h-[60px] flex-1 flex-col items-center justify-center text-center">
              <div className="flex flex-1 items-center text-[#999999]">Total Member</div>
              <div className="flex items-center space-x-1 text-sm text-white">
                <div>{customerTeamInfo?.data?.teamSize}</div>
              </div>
            </div>
            <div className="flex min-h-[60px] flex-1 flex-col items-center justify-between">
              <div className="flex flex-1 items-center text-[#999999]">
                <span className="mr-1">Total Bets</span>
                <InfoTooltip
                  content="Bet amount are defined as valid bets in crypto games (Mines, Crash).Valid bets will only
                  be calculated for bets that have been settled and produced a win or loss result. Any
                  games played, tied, or canceled will not be counted in valid bets."
                />
              </div>
              <div className="flex items-center space-x-1 text-sm text-white">
                <UsdtIcon className="h-4 w-4" />
                <Amount
                  value={parseAmount(customerTeamInfo?.data?.totalBets)}
                  customMaxInt={7}
                  customMaxDec={2}
                  crypto={Crypto.USDT}
                />
              </div>
            </div>
            <div className="flex min-h-[60px] flex-1 flex-col items-center justify-between">
              <div className="flex flex-1 items-center text-[#999999]">Total Deposit</div>
              <div className="flex items-center space-x-1 text-sm text-white">
                <UsdtIcon className="h-4 w-4" />
                <Amount
                  value={parseAmount(customerTeamInfo?.data?.totalDeposit)}
                  customMaxInt={7}
                  customMaxDec={2}
                  crypto={Crypto.USDT}
                />
              </div>
            </div>
          </div>
        </div>
      </CatEarsCard>

      {/* All Members Section */}
      <div className="flex flex-1 flex-col">
        <div className="mt-6 flex items-center space-x-1 font-ultra text-white">
          <div>All Members</div>
          <InfoTooltip content="Only when your friends registered and owned over 100 KOKON in their wallet are counted valid member." />
        </div>
        {/* Search Section */}
        <div className="flex w-full flex-wrap text-xs font-ultra">
          <div
            className={`mt-2 flex items-center justify-start overflow-hidden rounded-full bg-[#333333] p-[6px] transition-all duration-300 ease-in-out ${
              isSearchExpanded ? 'h-9 w-full' : 'mr-1 h-9 w-9 cursor-pointer'
            }`}
            role="button"
            tabIndex={0}
            onKeyDown={() => {}}
            onClick={() => setIsSearchExpanded(prev => !prev)}
          >
            <SearchIcon className="h-6 w-6 flex-shrink-0 text-[#FFFFFFB2]" />
            <Controller
              name="displayName"
              control={control}
              render={({ field }) => (
                <div className="relative flex-grow">
                  <input
                    type="text"
                    disabled={!isSearchExpanded}
                    className={`w-full bg-transparent py-2 pl-2 pr-8 text-white outline-none transition-all duration-300 ease-in-out ${
                      isSearchExpanded ? 'ml-2 opacity-100' : 'h-0 w-0 opacity-0'
                    }`}
                    placeholder="Search..."
                    onClick={e => e.stopPropagation()}
                    value={localDisplayName}
                    onChange={e => setLocalDisplayName(e.target.value)}
                    onBlur={() => {
                      field.onChange(localDisplayName)
                      setValue('displayName', localDisplayName)
                    }}
                  />
                  {localDisplayName && (
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 -translate-y-1/2 transform"
                      onClick={e => {
                        e.stopPropagation()
                        setLocalDisplayName('')
                        field.onChange('')
                        setValue('displayName', '')
                      }}
                    >
                      <XIcon className="h-4 w-4 text-[#FFFFFFB2]" />
                    </button>
                  )}
                </div>
              )}
            />
          </div>
          <Controller
            name="sort"
            control={control}
            render={({ field }) => (
              <DropdownSheet
                id="game-list-dropdown"
                title="Sort"
                customTrigger={({ selectedLabel, placeholder }) => {
                  return (selectedLabel as React.ReactElement)?.props?.children === 'Default' ? (
                    <div className="mr-1 mt-2 flex cursor-pointer items-center justify-between rounded-full bg-[#FFFFFF33] p-[6px]">
                      <SortAscIcon className="h-6 w-6 flex-shrink-0 text-[#FFFFFFB2]" />
                    </div>
                  ) : (
                    <div className="mr-1 mt-2 flex min-w-[120px] flex-1 cursor-pointer items-center justify-between rounded-full bg-[#FFFFFF33] px-3 py-2">
                      {selectedLabel || placeholder}
                      <button
                        type="button"
                        onClick={e => {
                          e.stopPropagation()
                          field.onChange({ sortOrder: '', sortField: '' })
                        }}
                      >
                        <XIcon className="h-4 w-4 text-[#FFFFFFB2]" />
                      </button>
                    </div>
                  )
                }}
                value={field.value}
                onConfirm={(selectedValue: string | object) => {
                  field.onChange(selectedValue)
                }}
              >
                {sortOptions.map((option, index) => (
                  <DropdownOption
                    key={`sortOptions-${index}`}
                    value={option.value}
                    label={option.label}
                  />
                ))}
              </DropdownSheet>
            )}
          />
          <Controller
            name="level"
            control={control}
            render={({ field }) => (
              <DropdownSheet
                id="game-list-dropdown"
                title="LV"
                customTrigger={({ selectedLabel, placeholder }) => (
                  <div className="mr-1 mt-2 flex min-w-[120px] flex-1 cursor-pointer items-center justify-between rounded-full bg-[#FFFFFF33] px-3 py-2 transition-all duration-1000 ease-in-out">
                    <div>{selectedLabel || placeholder}</div>
                    <ArrowLineDownIcon className="h-4 w-4" />
                  </div>
                )}
                value={field.value}
                onConfirm={(selectedValue: string | object) => {
                  field.onChange(selectedValue)
                }}
              >
                {levelOptions.map(option => (
                  <DropdownOption key={option.value} value={option.value} label={option.label} />
                ))}
              </DropdownSheet>
            )}
          />
        </div>
        {/* Table Section */}
        {isTeamPerformanceListLoading ? (
          <Skeleton className="mt-2 aspect-[343/316]" />
        ) : flattenedData?.length > 0 ? (
          <>
            <TeamMemberTableList data={flattenedData} />
            <InfiniteScroll
              hasMore={!!hasNextPage}
              isLoading={isFetchingNextPage}
              next={fetchNextPage}
              threshold={1}
            >
              {hasNextPage && (
                <div className="mt-2 flex w-full items-center justify-center">
                  <LoadingIcon className="h-6 w-6 animate-spin" />
                </div>
              )}
            </InfiniteScroll>
          </>
        ) : (
          <TeamMemberEmpty />
        )}
      </div>
      {!istopflagVisible && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to Top"
          className="fixed bottom-40 right-2 flex h-7 w-7 items-center justify-center rounded-full border-[0.5px] border-primary bg-[#FFF2004D]"
        >
          <ArrowLineUpIcon className="h-4 w-4 text-primary" />
        </button>
      )}
      {latestSummary && (
        <>
          <div className="h-14" id="blockArea"></div>
          <div
            className="fixed inset-x-0 bottom-[88px] mx-auto flex h-14 w-full items-center rounded-b-xl border-t border-white/20 bg-black"
            style={{ maxWidth }}
          >
            <div className="flex flex-1 flex-col items-center justify-center space-y-1">
              <div className="text-xs text-[#FFFFFFB2]">Member</div>
              <div className="text-xs font-ultra">{latestSummary.teamSize}</div>
            </div>
            <div className="flex flex-1 flex-col items-center justify-center space-y-1">
              <div className="text-xs text-[#FFFFFFB2]">Bets</div>
              <div className="flex items-center space-x-1">
                <UsdtIcon className="h-3 w-3" />
                <Amount
                  className="text-xs font-ultra"
                  value={parseAmount(latestSummary.totalBets)}
                  customMaxInt={7}
                  customMaxDec={6}
                  crypto={Crypto.USDT}
                />
              </div>
            </div>
            <div className="flex flex-1 flex-col items-center justify-center space-y-1">
              <div className="text-xs text-[#FFFFFFB2]">Deposit</div>
              <div className="flex items-center space-x-1">
                <UsdtIcon className="h-3 w-3" />
                <Amount
                  className="text-xs font-ultra"
                  value={parseAmount(latestSummary.totalDeposit)}
                  customMaxInt={7}
                  customMaxDec={6}
                  crypto={Crypto.USDT}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default TeamMember
