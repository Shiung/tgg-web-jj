import { cn } from '~/lib/utils'

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('animate-pulse rounded-lg bg-[#1C1C1C]', className)} {...props} />
}

export { Skeleton }
