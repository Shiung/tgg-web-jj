import { CarouselContent, CarouselItem } from '~/components/ui/carousel'
import { Skeleton } from '~/components/ui/skeleton'
import { cn } from '~/lib/utils'

const GameEntranceSkeleton = ({ className }: { className: string }) => (
  <Skeleton className={cn('relative flex-1 overflow-hidden rounded-2xl', className)} />
)

const NewReleaseCarouselContentSkeleton = () => (
  <CarouselContent className="-ml-0">
    {Array(3)
      .fill(0)
      .map((_, index) => (
        <CarouselItem
          key={`carousel-skeleton-${index}`}
          className="flex aspect-square basis-1/3 overflow-hidden pl-0 text-center"
        >
          <div className="h-full w-full pr-2">
            <Skeleton className="h-full w-full rounded-lg object-contain" />
          </div>
        </CarouselItem>
      ))}
  </CarouselContent>
)

export { GameEntranceSkeleton, NewReleaseCarouselContentSkeleton }
