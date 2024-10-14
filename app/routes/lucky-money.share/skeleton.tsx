import { Skeleton } from '~/components/ui/skeleton'

const QuickAmountSkeleton = () => {
  return (
    <div className="flex flex-1 items-center space-x-2">
      {Array.from({ length: 4 }, (_, idx) => (
        <Skeleton key={idx} className="rounded-ful h-7 flex-1 bg-white/20" />
      ))}
    </div>
  )
}

export { QuickAmountSkeleton }
