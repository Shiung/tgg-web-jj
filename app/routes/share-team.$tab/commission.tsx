import React, { useState, useMemo } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { endOfDay, format, formatRFC3339, startOfDay, subDays } from 'date-fns'
import { z } from 'zod'
import { cn } from '~/lib/utils'
import { useTranslation } from 'react-i18next'

// NOTICE: For test
// import { getMockCommissionData } from './fake-commisssionData'

import { apis } from '~/api'
import type { SettingResponse, TeamInfoResponse } from '~/api/codegen/data-contracts'
import { parseAmount } from '~/lib/amount'
import { useAppMaxWidth } from '~/hooks/useAppMaxWidth'
import useIntersectionObserver from '~/hooks/useIntersectionObserver'
import CatEarsCard from '~/components/cat-ears-card'
import { UsdtIcon, KatonIcon } from '~/components/color-icons'
import InfoTooltip from '~/components/info-tooltip'
import Amount from '~/components/amount'
import { DropdownOption, DropdownSheet } from '~/components/dropdown-sheet'
import { Skeleton } from '~/components/ui/skeleton'
import DatePickerSheet from '~/components/date-picker-sheet/index'
import SearchIcon from '~/icons/search.svg?react'
import ArrowLineDownIcon from '~/icons/arrow-line-down.svg?react'
import ArrowLineUpIcon from '~/icons/arrow-line-up.svg?react'
import XIcon from '~/icons/x.svg?react'
import LoadingIcon from '~/icons/loading.svg?react'
import { Crypto } from '~/consts/crypto'
import InfiniteScroll from '~/components/ui/infinite-scroll'

import CommissionEmpty from './commission-empty'
import CommissionTableList from './commission-tableList'
import ShareTeamSkeleton from './share-team-skeleton'

const PAGE_SIZE = 20

const levelOptions = [
  { value: '1', label: 'LV: 1' },
  { value: '2', label: 'LV: 2' },
]

// 定義 Zod schema
const formSchema = z.object({
  displayName: z.string().optional(),
  level: z.string().optional(),
  dateTimeRange: z.object({
    from: z.date(),
    to: z.date(),
  }),
})

interface CommissionProps {
  customerTeamInfo?: TeamInfoResponse
  teamSettingList?: SettingResponse
  loading?: boolean
}

const Commission: React.FC<CommissionProps> = ({ customerTeamInfo, teamSettingList, loading }) => {
  const maxWidth = useAppMaxWidth()
  const { t } = useTranslation()

  // 用戶所屬 teamLevel 的 佣金設定
  const activeCommissionSetting = useMemo(() => {
    if (!teamSettingList?.commissionSetting) {
      return null
    }
    const _currentSetting = teamSettingList?.commissionSetting.find(
      setting => setting.class === customerTeamInfo?.class
    )

    if (!_currentSetting) {
      return null
    }

    return Object.entries(_currentSetting)
      .filter(([key]) => key.startsWith('level'))
      .map(([key, value]) => ({
        level: key,
        commission: value,
      }))
  }, [customerTeamInfo?.class, teamSettingList?.commissionSetting])

  // 控制 search 的展開與收合
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)

  // 搜尋表單
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
    defaultValues: {
      displayName: '',
      level: '0',
      dateTimeRange: {
        from: startOfDay(subDays(new Date(), 29)),
        to: endOfDay(new Date()),
      },
      page: 1,
      pageSize: 20,
    },
  })

  // 佣金列表查詢
  const [localDisplayName, setLocalDisplayName] = useState('')
  const displayName = watch('displayName')
  const selectedLevel = watch('level')
  const dateTimeRange = watch('dateTimeRange')

  const queryParams = useMemo(() => {
    const { from, to } = dateTimeRange
    return {
      displayName,
      level: Number(selectedLevel),
      startTime: formatRFC3339(from),
      endTime: formatRFC3339(to),
      page: 1,
      pageSize: 20,
    }
  }, [selectedLevel, dateTimeRange, displayName])

  //NOTICE: For test
  // mock use => queryFn: ({ pageParam = 1 }) => getMockCommissionData(pageParam, PAGE_SIZE),
  // live use => queryFn: ({ pageParam = 1 }) => apis.team.teamCommissionListList({ ...queryParams, page: pageParam, pageSize: PAGE_SIZE }),

  const {
    data: commissionListData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isCommissionListLoading,
  } = useInfiniteQuery({
    queryKey: ['teamCommissionList', queryParams],
    queryFn: ({ pageParam = 1 }) =>
      apis.team.teamCommissionListList({ ...queryParams, page: pageParam, pageSize: PAGE_SIZE }),
    getNextPageParam: (lastPage, allPages) => {
      if (
        lastPage.data?.pagination?.totalPage &&
        lastPage.data?.pagination?.totalPage > allPages.length
      ) {
        return allPages.length + 1
      }
      return undefined
    },
    retry: false,
    initialPageParam: 1,
    enabled: !!selectedLevel && !!dateTimeRange.from && !!dateTimeRange.to && !errors.dateTimeRange,
  })

  const flattenedCommissionList = useMemo(() => {
    return commissionListData?.pages.flatMap(page => page.data?.list ?? []) || []
  }, [commissionListData])

  const latestSummary = useMemo(() => {
    if (!commissionListData?.pages) return null
    for (let i = commissionListData.pages.length - 1; i >= 0; i--) {
      const page = commissionListData.pages[i].data
      if (page.list && Array.isArray(page.list) && page.list.length > 0) {
        return page.summary
      }
    }
    return null
  }, [commissionListData?.pages])

  // 回到顶部
  const [topRef, istopflagVisible, scrollToTop] = useIntersectionObserver<HTMLDivElement>()

  if (loading) {
    return <ShareTeamSkeleton />
  }

  return (
    <div className="relative flex flex-1 flex-col p-4">
      {/* My Team Rating Section */}
      <CatEarsCard>
        <div
          ref={topRef}
          className="flex items-center justify-between rounded-t-[12px] bg-[#333333] px-6 py-2"
        >
          <span className="font-ultra text-primary">
            {t('MyTeamRating')}: {customerTeamInfo?.class || 0}
          </span>
          <div className="flex space-x-1">
            {Array.from({ length: customerTeamInfo?.class || 0 }).map((el, index) => (
              <img
                key={`teamRating-${index}`}
                className="h-4 w-4"
                src="/images/3D-star.png"
                alt="3D-star"
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center space-y-2 p-3">
          <div className="flex w-full flex-col space-y-2 rounded-lg bg-[#333333] px-3 py-2 text-xs font-ultra">
            <div className="border-b-[0.5px] border-[#FFFFFF33] pb-2 text-white">
              {t('TeamCommissionRatio')}
            </div>
            <div className="flex space-x-2">
              {activeCommissionSetting &&
                activeCommissionSetting.map(el => (
                  <div className="flex flex-1 flex-col items-center space-y-1" key={el.level}>
                    <div>{el.level}</div>
                    <div className="text-sm text-white">{el.commission}%</div>
                  </div>
                ))}
            </div>
          </div>
          <div className="flex w-full flex-col space-y-2 rounded-lg bg-[#333333] px-3 py-2 text-xs font-ultra">
            <div className="border-b-[0.5px] border-[#FFFFFF33] pb-2 text-white">
              {t('Summary')}
            </div>
            <div className="flex space-x-2">
              <div className="flex flex-1 flex-col items-center space-y-1">
                <div className="flex space-x-1">
                  <div>{t('TotalBets')}</div>
                  <InfoTooltip content={t('TotalBets.Description')} />
                </div>
                <div className="flex items-center space-x-1 text-sm text-white">
                  <UsdtIcon className="h-4 w-4" />
                  <Amount
                    value={parseAmount(customerTeamInfo?.totalBets)}
                    customMaxInt={7}
                    customMaxDec={6}
                    crypto={Crypto.USDT}
                  />
                </div>
              </div>
              <div className="flex flex-1 flex-col items-center space-y-1">
                <div>{t('TotalCommissions')}</div>
                <div className="flex items-center space-x-1 text-sm text-white">
                  <KatonIcon className="h-4 w-4" />
                  <Amount
                    value={parseAmount(customerTeamInfo?.totalCommission)}
                    crypto={Crypto.KATON}
                    useKM
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </CatEarsCard>
      {/* Commission Details Section */}
      <div className="flex flex-1 flex-col">
        <div className="mt-6 flex items-center space-x-1 font-ultra text-white">
          <div>{t('CommissionDetails')}</div>
          <InfoTooltip content={t('CommissionDetails.Description')} />
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
                    className={`w-full bg-transparent py-2 pl-3 pr-8 text-white outline-none transition-all duration-300 ease-in-out ${
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
            name="level"
            control={control}
            render={({ field }) => (
              <DropdownSheet
                id="game-list-dropdown"
                title="LV"
                placeholder="LV"
                onReset={() => {
                  field.onChange('0')
                }}
                customTrigger={({ selectedLabel, placeholder }) => (
                  <div
                    className={cn(
                      'mr-1 mt-2 flex min-w-[120px] flex-1 cursor-pointer items-center justify-between rounded-full bg-[#FFFFFF33] px-3 py-2 transition-all duration-1000 ease-in-out',
                      selectedLabel ? 'tex-white' : 'text-white/50'
                    )}
                  >
                    <div>{selectedLabel || placeholder}</div>
                    {!selectedLabel ? (
                      <ArrowLineDownIcon className="h-4 w-4" />
                    ) : (
                      <button
                        type="button"
                        onClick={e => {
                          e.stopPropagation()
                          field.onChange('0')
                        }}
                      >
                        <XIcon className="h-4 w-4 text-[#FFFFFFB2]" />
                      </button>
                    )}
                  </div>
                )}
                value={field.value}
                onConfirm={selectedValue => {
                  field.onChange(selectedValue as string)
                }}
              >
                {levelOptions.map(option => (
                  <DropdownOption key={option.value} value={option.value} label={option.label} />
                ))}
              </DropdownSheet>
            )}
          />
          <Controller
            name="dateTimeRange"
            control={control}
            render={({ field }) => (
              <DatePickerSheet
                id="datetime-range-picker"
                title={t('SelectDate')}
                value={field.value}
                customTrigger={({ displayTriggerDate }) => {
                  const { from, to } = field.value
                  const displayText =
                    from && to
                      ? `${format(from, 'MM-dd')} - ${format(to, 'MM-dd')}`
                      : displayTriggerDate || t('SelectDate')
                  return (
                    <div className="mt-2 flex min-w-[120px] flex-1 cursor-pointer items-center justify-between rounded-full bg-[#FFFFFF33] px-3 py-2 transition-all duration-300 ease-in-out">
                      <div className="truncate text-[#FFFFFFB2]">{displayText}</div>
                      <ArrowLineDownIcon className="h-4 w-4" />
                    </div>
                  )
                }}
                onChange={val => {
                  if (val && 'from' in val && 'to' in val) {
                    field.onChange(val)
                  }
                }}
                range
                rangeLimits={{
                  minDate: startOfDay(subDays(new Date(), 29)),
                  maxDate: endOfDay(new Date()),
                }}
              />
            )}
          />
        </div>
        {/* Table Section */}
        {isCommissionListLoading ? (
          <Skeleton className="mt-2 aspect-[343/316]" />
        ) : flattenedCommissionList.length > 0 ? (
          <>
            <CommissionTableList data={flattenedCommissionList} />
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
              <div className="h-10" />
            </InfiniteScroll>
          </>
        ) : (
          <CommissionEmpty />
        )}
      </div>
      {!istopflagVisible && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to Top"
          className="fixed bottom-44 right-3 flex h-7 w-7 items-center justify-center rounded-full border-[0.5px] border-primary bg-[#FFF2004D]"
        >
          <ArrowLineUpIcon className="h-4 w-4 text-primary" />
        </button>
      )}
      {latestSummary && (
        <div
          className="fixed bottom-[88px] flex h-14 w-full items-center rounded-b-xl border-t-[0.5px] border-white/20 bg-black"
          style={{ maxWidth, left: `calc((100vw - ${maxWidth}) / 2)` }}
        >
          <div className="flex flex-1 flex-col items-center justify-center space-y-1">
            <div className="text-xs text-[#FFFFFFB2]">{t('Total')}</div>
            <div className="text-xs font-ultra">{latestSummary?.totalCount || '-'}</div>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center space-y-1">
            <div className="text-xs text-[#FFFFFFB2]">{t('Bets')}</div>
            <div className="flex items-center space-x-1">
              <UsdtIcon className="h-3 w-3" />
              <Amount
                className="text-xs font-ultra"
                value={parseAmount(latestSummary?.totalBet)}
                crypto="USDT"
              />
            </div>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center space-y-1">
            <div className="text-xs text-[#FFFFFFB2]">{t('Commissions')}</div>
            <div className="flex items-center space-x-1">
              <KatonIcon className="h-3 w-3" />
              <Amount
                className="text-xs font-ultra"
                value={parseAmount(latestSummary?.totalCommission)}
                crypto="KATON"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Commission
