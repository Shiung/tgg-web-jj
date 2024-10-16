import { Skeleton } from '~/components/ui/skeleton'

const DetailSkeleton = () => {
  return (
    <div className="relative -mt-4 rounded-2xl bg-black p-4 shadow-lg">
      <div className="flex items-center justify-between space-x-2 rounded-2xl bg-black shadow-lg">
        <Skeleton className="h-9 flex-1 rounded-full" />
        <Skeleton className="h-9 w-[120px] flex-shrink-0 rounded-full" />
      </div>
      <div className="mt-6 flex flex-1 flex-col items-stretch space-y-2">
        {Array.from({ length: 5 }, (_, idx) => (
          <Skeleton key={idx} className="h-[62px] bg-white/20" />
        ))}
      </div>
    </div>
  )
}

export { DetailSkeleton }
