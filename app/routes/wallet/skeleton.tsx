import { Skeleton } from '~/components/ui/skeleton'

const WalletsSkeleton = () => {
  return (
    <>
      {Array.from({ length: 3 }).map((_, index) => (
        <Skeleton key={`skeleton_${index}`} className="h-12 w-full" />
      ))}
    </>
  )
}

export { WalletsSkeleton }
