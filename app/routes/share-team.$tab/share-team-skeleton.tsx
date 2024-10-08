import React from 'react'

import { Skeleton } from '~/components/ui/skeleton'

const ShareTeamSkeleton: React.FC = () => {
  return (
    <div className="flex w-full flex-col p-4">
      <Skeleton className="aspect-[343/246]" />
      <Skeleton className="mt-6 h-5 w-40" />
      <div className="mt-2 flex space-x-2">
        <Skeleton className="h-9 w-9 rounded-full" />
        <Skeleton className="flex-1 rounded-full" />
        <Skeleton className="flex-1 rounded-full" />
      </div>
      <Skeleton className="mt-2 aspect-[343/316]" />
      <Skeleton className="mt-2 aspect-[343/316]" />
    </div>
  )
}

export default ShareTeamSkeleton
