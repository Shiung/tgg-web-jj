import React from 'react'
import { Skeleton } from '~/components/ui/skeleton'
import { cn } from '~/lib/utils'
import styles from './index.module.scss'

const TaskTreasureSkeleton: React.FC = () => {
  return (
    <div className="flex flex-1 flex-col">
      <Skeleton className={cn(styles['header--skeleton'])} />

      <div className="relative -top-4 flex flex-1 flex-col gap-2 rounded-xl bg-black px-3 py-4">
        <Skeleton className="mb-1 h-5 w-20 rounded-full py-1" />
        <Skeleton className="flex-1" />
        <Skeleton className="flex-1" />
        <Skeleton className="mt-1 aspect-[343/36] w-full rounded-full" />
      </div>
    </div>
  )
}

export default TaskTreasureSkeleton
