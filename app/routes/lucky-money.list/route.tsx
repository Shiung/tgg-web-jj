import { useEffect, useMemo } from 'react'
import { Link } from '@remix-run/react'
import { useInfiniteQuery } from '@tanstack/react-query'

import { Button } from '~/components/ui/button'
import LuckyMoneyItem from './lucky-money-item'
import SwitchTab from '../lucky-money/switch-tab'
import { apis } from '~/api'
import { PacketsResponse } from '~/api/codegen/data-contracts'

const fakeList: Array<NonNullable<PacketsResponse['list']>[number]> = [
  {
    createdAt: '2024-10-09T01:39:00.998004Z',
    distributeKind: 'FIXED',
    distributedAmount: '100000',
    remainingAmount: '1234',
    // 1:進行中 2:已終止(用戶提前中斷發放) 3:已完成(發放完畢)
    state: 1,
  },
  {
    createdAt: '2024-10-09T01:39:00.998004Z',
    distributeKind: 'FIXED',
    distributedAmount: '100000',
    remainingAmount: '1234',
    state: 2,
  },
  {
    createdAt: '2024-10-09T01:39:00.998004Z',
    distributeKind: 'FIXED',
    distributedAmount: '100000',
    remainingAmount: '1234',
    state: 3,
  },
]

export default function LuckyMoneyList() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, error, isFetching, status } =
    useInfiniteQuery({
      queryKey: ['packetsList'],
      queryFn: ({ pageParam = 1 }) =>
        apis.packets.packetsList({ page: pageParam, pageSize: 20 }).then(res => ({
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
    console.log(
      'data',
      data,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
      error,
      isFetching,
      status
    )
  }, [data, fetchNextPage, hasNextPage, isFetchingNextPage, error, isFetching, status])

  return (
    <div className="-mt-4 flex w-full flex-1 flex-col items-stretch justify-between rounded-[12px] bg-black p-4">
      <div className="flex flex-1 flex-col">
        <SwitchTab />
        {/* fakeList */}
        {list.length > 0 ? (
          <div className="mt-6 flex w-full flex-1 flex-col">
            {list.map((item, index) => (
              <LuckyMoneyItem key={index} {...item} />
            ))}
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
