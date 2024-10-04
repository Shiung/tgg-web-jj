import React from 'react'
import { Skeleton } from '~/components/ui/skeleton'
import { cn } from '~/lib/utils'
import styles from './index.module.scss'

const TaskSubtaskSkeleton: React.FC = () => {
  return (
    <div className="flex flex-1 flex-col">
      <Skeleton className={cn(styles['header--skeleton'])} />

      <div className="relative -top-4 flex flex-1 flex-col rounded-xl bg-black px-3 py-4">
        <div className="mb-5 flex space-x-2">
          {[1, 2, 3].map(index => (
            <Skeleton key={index} className="h-7 flex-1" />
          ))}
        </div>
        <div className="flex flex-1 flex-col">
          <Skeleton className="flex-1 bg-[#1C1C1C]" />
        </div>
      </div>
    </div>
  )
}

export default TaskSubtaskSkeleton
