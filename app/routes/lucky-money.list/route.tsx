import { useEffect } from 'react'
import { Link } from '@remix-run/react'
import { useInfiniteQuery } from '@tanstack/react-query'

import { Button } from '~/components/ui/button'
import LuckyMoneyItem from './lucky-money-item'
import SwitchTab from '../lucky-money/switch-tab'
import { apis } from '~/api'
import { PacketResponse } from '~/api/codegen/data-contracts'

const fakeLuckyMoneyList: Array<{ type: 0 | 1; status: 2 }> = [
  { type: 0, status: 2 },
  { type: 1, status: 2 },
  { type: 0, status: 2 },
  { type: 0, status: 2 },
  { type: 0, status: 2 },
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
    <div className="-mt-4 flex w-full flex-1 flex-col items-center justify-between rounded-[12px] bg-black p-4">
      <div className="flex w-full flex-1 flex-col">
        <SwitchTab />
        <div className="mt-6 w-full flex-1 overflow-y-auto">
          {fakeLuckyMoneyList.map((el, index) => (
            <LuckyMoneyItem key={index} type={el.type} status={el.status} />
          ))}
          {/* Empty List */}
          {true || (
            <div className="flex h-full flex-col items-center justify-center text-xs font-semibold text-[#FFFFFFB2]">
              <img src="/images/list-empty.png" className="mb-2 h-32 w-32" alt="list-empty" />
              <div>Empty. </div>
              <div>Share New Bags to invite friends to join KOKON!</div>
            </div>
          )}
        </div>
      </div>
      <div className="mt-6 w-full">
        <Link prefetch="viewport" to="/lucky-money-history">
          <Button className="w-full" catEars>
            History
          </Button>
        </Link>
      </div>
    </div>
  )
}
