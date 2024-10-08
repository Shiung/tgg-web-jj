import React from 'react'

import { Skeleton } from '~/components/ui/skeleton'

const ShareInviteSkeleton: React.FC = () => {
  return (
    <div className="relative flex flex-col items-stretch">
      <Skeleton className="aspect-[375/246]" />
      <div className="absolute left-0 top-52 flex w-full flex-col rounded-xl bg-black">
        <Skeleton className="mt-2 aspect-[343/115]" />
        <Skeleton className="mt-2 aspect-[343/115]" />
        <Skeleton className="mt-7 h-5 w-40" />
        <Skeleton className="mt-2 aspect-[343/584]" />
      </div>
    </div>
  )
}

export default ShareInviteSkeleton
