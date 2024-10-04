import { Skeleton } from '~/components/ui/skeleton'

const withdrewSkeleton = () => {
  return (
    <div className="flex w-full flex-col p-4">
      <Skeleton className="h-20 w-full rounded-xl" />
      <Skeleton className="mt-3 h-32 w-full rounded-xl" />
      <Skeleton className="mt-6 h-9 w-full rounded-xl" />
      <Skeleton className="mt-3 h-9 w-full rounded-xl" />
    </div>
  )
}

export default withdrewSkeleton
