import { Skeleton } from '~/components/ui/skeleton'

const DepositSkeleton = () => {
  return (
    <div className="flex flex-col items-stretch p-4">
      <Skeleton className="aspect-[343/76]" />
      <Skeleton className="mt-3 aspect-[343/120]" />
      <Skeleton className="mt-6 h-9 rounded-full" />
      <Skeleton className="mt-3 h-9 rounded-full" />
    </div>
  )
}

export { DepositSkeleton }
