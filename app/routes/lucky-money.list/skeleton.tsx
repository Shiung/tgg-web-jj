import { Skeleton } from '~/components/ui/skeleton'

const ListSkeleton = () => {
  return (
    <div className="mt-6 flex flex-1 flex-col items-stretch space-y-2">
      {Array.from({ length: 3 }, (_, idx) => (
        <Skeleton key={idx} className="h-[62px] bg-white/20" />
      ))}
    </div>
  )
}

export { ListSkeleton }
