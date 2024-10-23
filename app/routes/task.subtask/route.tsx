import React, { useState, useRef, useCallback, useEffect } from 'react'
import { cn } from '~/lib/utils'
import { type TaskQueryResponse } from '~/api/codegen/data-contracts'
import { type TaskType, useTaskTypeDisplayMap } from './type'
import { useGetTask } from './hook/useGetTask'
import { useTranslation } from 'react-i18next'
import useIntersectionObserver from '~/hooks/useIntersectionObserver'
import { useSearchParams } from '@remix-run/react'
import { useAppMaxWidth } from '~/hooks/useAppMaxWidth'

import { Button } from '~/components/ui/button'
import TaskCard from './task-card'
import TaskSubtaskSkeleton from './task-subtask-seleton'
import styles from './index.module.scss'
import ArrowLineUpIcon from '~/icons/arrow-line-up.svg?react'

const TaskSubtask: React.FC = () => {
  const { t } = useTranslation()
  const maxWidth = useAppMaxWidth()
  const [searchParams] = useSearchParams()
  const searchTaskType = searchParams.get('type')

  // 回到顶部
  const [topRef, istopflagVisible, scrollToTop] = useIntersectionObserver<HTMLDivElement>()

  const taskTypeDisplayMap = useTaskTypeDisplayMap()
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

  useEffect(() => {
    // 資料未取得前不執行
    if (isTasksLoading || !tasks) return
    // url 有指定 taskType
    if (searchTaskType) {
      console.log('params.type', searchTaskType)

      const type = searchTaskType as TaskType
      if (taskRefs.current[type]) {
        handleTaskTypeClick(type)
      }
    }
  }, [handleTaskTypeClick, isTasksLoading, searchTaskType, tasks])

  if (isTasksLoading || !tasks) {
    return <TaskSubtaskSkeleton />
  }

  return (
    <div className="flex flex-1 flex-col">
      <div ref={topRef} className={cn(styles.header)}>
        <p>{t('subTaskCardDescription')}</p>
        <p className="pl-1">{t('subtaskCardDescription2')}</p>
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
                {taskTypeDisplayMap[type as TaskType] || type}
              </Button>
            ))}
        </div>
        <div className="flex flex-1 flex-col space-y-6">
          {tasks?.data &&
            Object.keys(tasks?.data ?? {}).map((taskType, index) => (
              <div key={index} ref={taskRefs.current[taskType as TaskType]}>
                <TaskCard
                  cardTitle={
                    taskTypeDisplayMap[taskType as TaskType] + ' ' + t('Task') ||
                    taskType + ' ' + t('Task')
                  }
                  updateTimeString={taskType === 'dailyList' ? t('subTaskUpdateTimeString') : ''}
                  list={tasks?.data?.[taskType as keyof TaskQueryResponse]}
                />
              </div>
            ))}
        </div>
      </div>
      {!istopflagVisible && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to Top"
          className="fixed bottom-28 flex h-7 w-7 items-center justify-center rounded-full border-[0.5px] border-primary bg-[#FFF2004D]"
          style={{ maxWidth, right: `calc((100vw - ${maxWidth}) / 2 + 10px)` }}
        >
          <ArrowLineUpIcon className="h-4 w-4 text-primary" />
        </button>
      )}
    </div>
  )
}

export default TaskSubtask
