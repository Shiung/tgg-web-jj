import { useEffect, useMemo } from 'react'
import { Link, useNavigate } from '@remix-run/react'
import { useInfiniteQuery } from '@tanstack/react-query'
import qs from 'qs'

import { apis } from '~/api'
import { Button } from '~/components/ui/button'
import InfiniteScroll from '~/components/ui/infinite-scroll'
import LoadingIcon from '~/icons/loading.svg?react'

import LuckyMoneyItem from './lucky-money-item'
import SwitchTab from '../lucky-money/switch-tab'
import { ListSkeleton } from './skeleton'

const QUERY_STATE = [1]

export default function LuckyMoneyList() {
  const navigate = useNavigate()
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isFetched } =
    useInfiniteQuery({
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
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.pagination.totalPage > allPages.length) {
          return allPages.length + 1
        }
        return undefined
      },
      retry: false,
    })

  const list = useMemo(() => data?.pages.flatMap(page => page.list) ?? [], [data?.pages])

  useEffect(() => {
    if (isFetched && !list.length) {
      navigate('/lucky-money/share')
    }
  }, [isFetched, list.length, navigate])

  return (
    <div className="-mt-4 flex w-full flex-1 flex-col items-stretch justify-between rounded-[12px] bg-black p-4">
      <div className="flex flex-1 flex-col">
        <SwitchTab />
        {isLoading ? (
          <ListSkeleton />
        ) : list.length > 0 ? (
          <div className="mt-6 flex w-full flex-1 flex-col">
            {list.map(item => (
              <LuckyMoneyItem key={item.packetId} {...item} />
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
          </div>
        ) : (
          <div className="m-auto flex flex-col items-center justify-center text-xs font-semibold text-white/70">
            {/* Empty List */}
            <img src="/images/list-empty.png" className="mb-2 h-32 w-32" alt="list-empty" />
            <div>Empty. </div>
            <div>Share New Bags to invite friends to join KOKON!</div>
          </div>
        )}
      </div>
      <div className="mt-6">
        <Link prefetch="viewport" to="/lucky-money-history">
          <Button className="w-full" catEars>
            History
          </Button>
        </Link>
      </div>
    </div>
  )
}
