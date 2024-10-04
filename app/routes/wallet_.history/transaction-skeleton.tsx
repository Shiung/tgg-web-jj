import { Skeleton } from '~/components/ui/skeleton'

const TransactionSkeleton = () => {
  return (
    <div className="flex flex-1 flex-col p-4">
      {/* Filter */}
      <div className="flex flex-col space-y-1">
        <Skeleton className="py2 flex h-9 w-full items-center rounded-[100px] border-white/20 bg-[#333] text-xs font-ultra"></Skeleton>
        <div className="flex justify-between space-x-1 text-xs font-ultra text-white/50">
          <Skeleton className="py2 flex h-9 min-w-0 flex-1 items-center overflow-hidden rounded-[100px] border-white/20 bg-[#333] text-xs font-ultra" />
          <Skeleton className="py2 flex h-9 min-w-0 flex-1 items-center overflow-hidden rounded-[100px] border-white/20 bg-[#333] text-xs font-ultra" />
          <Skeleton className="py2 flex h-9 min-w-0 flex-1 items-center overflow-hidden rounded-[100px] border-white/20 bg-[#333] text-xs font-ultra" />
        </div>
      </div>

      {/* Content */}
      <Skeleton className="relative mt-3 flex-1 rounded-xl bg-[#1C1C1C] p-3" />
    </div>
  )
}

export default TransactionSkeleton
