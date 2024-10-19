import { useEffect, useMemo } from 'react'
import { Link } from '@remix-run/react'
import { useInfiniteQuery } from '@tanstack/react-query'
import qs from 'qs'

import useStore from '~/stores/useStore'
import ArrowLineLeftIcon from '~/icons/arrow-line-left.svg?react'
import LoadingIcon from '~/icons/loading.svg?react'
import X from '~/icons/x.svg?react'
import LuckyMoneyItem from '~/routes/lucky-money.list/lucky-money-item'
import { apis } from '~/api'
import { Button } from '~/components/ui/button'
import InfiniteScroll from '~/components/ui/infinite-scroll'

import { ListSkeleton } from './skeleton'
import { EmptyList } from '../lucky-money.list/route'

const QUERY_STATE = [2, 3]

const LuckyMoneyHistory = () => {
  const setNavVisibility = useStore(state => state.setNavVisibility)
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['packetsList', QUERY_STATE],
    queryFn: ({ pageParam = 1 }) =>
      apis.packets
        .packetsList(
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          { states: QUERY_STATE, page: pageParam, pageSize: 20 },
          { paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' }) }
        )
        .then(res => ({
          list: res.data.list || [],
          pagination: {
            pageSize: res.data.pagination?.pageSize ?? 0,
            totalPage: res.data.pagination?.totalPage ?? 0,
            totalRecord: res.data.pagination?.totalRecord ?? 0,
          },
        })),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.pagination.totalPage > allPages.length) {
        return allPages.length + 1
      }
      return undefined
    },
    initialPageParam: 1,
  })

  const list = useMemo(() => data?.pages.flatMap(page => page.list) ?? [], [data?.pages])

  useEffect(() => {
    setNavVisibility(false)
    return () => {
      setNavVisibility(true)
    }
  }, [setNavVisibility])

  return (
    <div className="container m-0 flex flex-1 flex-col rounded-t-xl bg-black p-0 text-white">
      {/* Header */}
      <div className="flex h-14 items-center justify-between p-4">
        <Button variant="icon" size="icon">
          <Link prefetch="viewport" to="/lucky-money/list">
            <ArrowLineLeftIcon className="h-6 w-6 text-white/70" />
          </Link>
        </Button>
        <div className="text-lg font-ultra">History</div>
        <Button variant="icon" size="icon">
          <Link to="/">
            <X className="h-6 w-6 text-white/70" />
          </Link>
        </Button>
      </div>

      {/* History List */}
      <div className="flex flex-1 flex-col space-y-3 overflow-y-auto p-4">
        {isLoading ? (
          <ListSkeleton />
        ) : list.length > 0 ? (
          <>
            {list.map((item, index) => (
              <LuckyMoneyItem key={index} {...item} />
            ))}
            <InfiniteScroll
              hasMore={!!hasNextPage}
              isLoading={!!isFetchingNextPage}
              next={fetchNextPage}
            >
              {hasNextPage && (
                <div>
                  <LoadingIcon className="m-auto h-6 w-6 animate-spin" />
                </div>
              )}
            </InfiniteScroll>
          </>
        ) : (
          <EmptyList />
        )}
      </div>
    </div>
  )
}

export default LuckyMoneyHistory
