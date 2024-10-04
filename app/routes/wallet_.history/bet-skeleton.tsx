import { Skeleton } from '~/components/ui/skeleton'

export default function BetSkeleton() {
  return (
    <div className="flex flex-1 flex-col p-4">
      {/* Filter */}
      <div className="flex flex-col space-y-1">
        <Skeleton className="py2 flex h-9 w-full items-center rounded-[100px] border-white/20 bg-[#333] text-xs font-ultra"></Skeleton>
        <div className="flex justify-between space-x-1 text-xs font-ultra text-white/50">
          <Skeleton className="py2 flex h-9 flex-1 items-center rounded-[100px] border-white/20 bg-[#333] text-xs font-ultra"></Skeleton>
          <Skeleton className="h-9 w-[73px] rounded-full" />
        </div>
      </div>

      {/* Content */}
      <div className="relative mt-3 flex-1 rounded-xl p-3">
        <Skeleton className="absolute bottom-0 left-0 right-0 top-0 overflow-y-auto"></Skeleton>
      </div>
    </div>
  )
}
