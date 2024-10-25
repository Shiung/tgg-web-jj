import { Skeleton } from '~/components/ui/skeleton'

const SkeletonBox = ({ isInit }: { isInit?: boolean }) => {
  return (
    <div className="flex flex-1 flex-col bg-background">
      {isInit && (
        <div className="mb-3 inline-flex h-9 w-full items-center justify-center space-x-1 rounded-full bg-black p-1 text-white/70">
          {Array.from({ length: 2 }, (_, idx) => {
            return <Skeleton key={idx} className="h-full flex-1" />
          })}
        </div>
      )}
      <Skeleton className="aspect-[375/270] w-full rounded-b-none rounded-t-xl" />
      <div className="z-10 -mt-4 flex flex-1 flex-col space-y-4 rounded-t-xl bg-black p-4">
        {Array.from({ length: 5 }, (_, idx) => {
          return <Skeleton key={idx} className="flex-[0_0_54px]" />
        })}
      </div>
    </div>
  )
}

export default SkeletonBox
