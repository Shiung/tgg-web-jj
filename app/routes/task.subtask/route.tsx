import React, { useState, useEffect } from 'react'
import { Button } from '~/components/ui/button'
import { Skeleton } from '~/components/ui/skeleton'
import { cn } from '~/lib/utils'
import TaskContent from './task-content'
import styles from './index.module.scss'
import TaskSubtaskSkeleton from './task-subtask-seleton'

enum TaskType {
  Daily = 'Daily',
  Common = 'Common',
  Special = 'Special',
}

const taskTypes = Object.values(TaskType)

export enum StatusType {
  InProgress,
  Unclaimed,
  Claimed,
}

export enum RewardType {
  USDT,
  TON,
  KOKON,
  Chest,
  Hammer,
}

interface Reward {
  type: RewardType
  amount: number
}

const TaskList = [
  {
    title: 'Daily Task',
    updateTime: '13:00(UTC-8)',
    list: [
      {
        title: 'Everyday login',
        status: StatusType.Unclaimed,
        desc: 'Only when your friends registered and owned over 100 Kokon in their wallet are counted valid member.',
        reward: {
          type: RewardType.Hammer,
          amount: 1,
        } as Reward,
        isLimitTask: true,
        limitTime: '08/24 00:00~09/23:23:59',
        limitQuantity: 1000,
      },
      {
        title: 'Share with your friends',
        status: StatusType.Claimed,
        desc: '',
        reward: {
          type: RewardType.KOKON,
          amount: 300,
        } as Reward,
        isLimitTask: false,
        limitTime: '',
        limitQuantity: 0,
      },
      {
        title: 'Daily reward for 2 star group',
        status: StatusType.Unclaimed,
        desc: '',
        reward: {
          type: RewardType.Hammer,
          amount: 200,
        } as Reward,
        isLimitTask: false,
        limitTime: '',
        limitQuantity: 0,
      },
      {
        title: 'Share Kokon with your friends',
        status: StatusType.InProgress,
        desc: '',
        reward: {
          type: RewardType.KOKON,
          amount: 100,
        } as Reward,
        isLimitTask: false,
        limitTime: '',
        limitQuantity: 0,
      },
      {
        title: 'Invite 3 valid friends (0/3)',
        status: StatusType.InProgress,
        desc: '',
        reward: {
          type: RewardType.USDT,
          amount: 1,
        } as Reward,
        isLimitTask: false,
        limitTime: '',
        limitQuantity: 0,
      },
      {
        title: 'Invite 10 valid friends via lucky money (0/10)',
        status: StatusType.InProgress,
        desc: '',
        reward: {
          type: RewardType.TON,
          amount: 1,
        } as Reward,
        isLimitTask: false,
        limitTime: '',
        limitQuantity: 0,
      },
      {
        title: 'Play 10 times Casual games (0/10)',
        status: StatusType.InProgress,
        desc: '',
        reward: {
          type: RewardType.Chest,
          amount: 1,
        } as Reward,
        isLimitTask: false,
        limitTime: '',
        limitQuantity: 0,
      },
    ],
  },
  {
    title: 'Common Task',
    updateTime: '',
    list: [
      {
        title: 'Share with your friends',
        status: StatusType.Claimed,
        desc: '',
        reward: {
          type: RewardType.KOKON,
          amount: 300,
        } as Reward,
        isLimitTask: false,
        limitTime: '',
        limitQuantity: 0,
      },
      {
        title: 'Daily reward for 2 star group',
        status: StatusType.Unclaimed,
        desc: '',
        reward: {
          type: RewardType.KOKON,
          amount: 200,
        } as Reward,
        isLimitTask: false,
        limitTime: '',
        limitQuantity: 0,
      },
      {
        title: 'Share Kokon with your friends',
        status: StatusType.InProgress,
        desc: '',
        reward: {
          type: RewardType.KOKON,
          amount: 100,
        } as Reward,
        isLimitTask: false,
        limitTime: '',
        limitQuantity: 0,
      },
    ],
  },
]

const TaskSubtask: React.FC = () => {
  const [taskType, setTaskType] = useState<TaskType>(TaskType.Daily)
  const [isLoading, setIsLoading] = useState(true)
  const [isFetch, setIsFetching] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      // setIsFetching(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex flex-1 flex-col">
      {isLoading ? (
        <TaskSubtaskSkeleton />
      ) : (
        <>
          <div className={cn(styles.header)}>
            <p>Small effort</p>
            <p className="pl-1"> but big earning!</p>
          </div>

          <div className="relative -top-4 flex flex-1 flex-col overflow-y-hidden rounded-xl bg-black px-3 py-4">
            <div className="mb-5 flex space-x-2">
              {taskTypes.map(type => (
                <Button
                  className="h-7 flex-1"
                  variant="outlineSoft"
                  isSelected={taskType === type}
                  key={type}
                  onClick={() => setTaskType(type)}
                >
                  {type}
                </Button>
              ))}
            </div>
            <div className="flex flex-1 flex-col space-y-6">
              {isFetch ? (
                <Skeleton className="w-full flex-1 bg-[#1C1C1C]" />
              ) : (
                TaskList.map((task, index) => (
                  <TaskContent
                    key={index}
                    title={task.title}
                    updateTime={task.updateTime}
                    list={task.list}
                  />
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default TaskSubtask
