import React, { useState, useRef, useCallback } from 'react'
import { cn } from '~/lib/utils'
import { type TaskQueryResponse } from '~/api/codegen/data-contracts'
import { type TaskType, TaskTypeDisplayMap } from './type'
import { useGetTask } from './hook/useGetTask'

import { Button } from '~/components/ui/button'
import TaskCard from './task-card'
import TaskSubtaskSkeleton from './task-subtask-seleton'
import styles from './index.module.scss'

const TaskSubtask: React.FC = () => {
  const { tasks, isTasksLoading } = useGetTask()

  // 移動至指定 task 分類
  const [taskType, setTaskType] = useState<TaskType>('dailyList')
  const taskRefs = useRef<Record<TaskType, React.RefObject<HTMLDivElement>>>({
    dailyList: useRef<HTMLDivElement>(null),
    specialList: useRef<HTMLDivElement>(null),
    oneTimeList: useRef<HTMLDivElement>(null),
  })
  const handleTaskTypeClick = useCallback((type: TaskType) => {
    setTaskType(type)
    const targetElement = taskRefs.current[type as TaskType].current
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  if (isTasksLoading || !tasks) {
    return <TaskSubtaskSkeleton />
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className={cn(styles.header)}>
        <p>Small effort</p>
        <p className="pl-1"> but big earning!</p>
      </div>
      <div className="relative -top-4 flex flex-1 flex-col overflow-y-hidden rounded-xl bg-black px-3 py-4">
        <div className="mb-5 flex space-x-2">
          {tasks?.data &&
            Object.keys(tasks.data).map(type => (
              <Button
                className="h-7 flex-1"
                variant="outlineSoft"
                isSelected={taskType === type}
                key={type}
                onClick={() => handleTaskTypeClick(type as TaskType)}
              >
                {TaskTypeDisplayMap[type as TaskType] || type}
              </Button>
            ))}
        </div>
        <div className="flex flex-1 flex-col space-y-6">
          {tasks?.data &&
            Object.keys(tasks?.data ?? {}).map((taskType, index) => (
              <div key={index} ref={taskRefs.current[taskType as TaskType]}>
                <TaskCard
                  cardTitle={
                    TaskTypeDisplayMap[taskType as TaskType] + ' Task' || taskType + ' Task'
                  }
                  updateTimeString={taskType === 'dailyList' ? 'Update every 13:00(UTC-8)' : ''}
                  list={tasks?.data?.[taskType as keyof TaskQueryResponse]}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default TaskSubtask
