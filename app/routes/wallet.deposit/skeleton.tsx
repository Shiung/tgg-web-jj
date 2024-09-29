import { Skeleton } from '~/components/ui/skeleton'

const CurrenciesSkeleton = () => {
  return (
    <div className="flex w-full justify-between space-x-2">
      {Array.from({ length: 2 }).map((_, index) => (
        <Skeleton key={index} className="h-6 flex-1 rounded-full" />
      ))}
    </div>
  )
}

export { CurrenciesSkeleton }
