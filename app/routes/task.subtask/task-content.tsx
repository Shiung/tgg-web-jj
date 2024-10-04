import React from 'react'
import CatEarsCard from '~/components/cat-ears-card'
import TaskCard from './task-card'
import { RewardType, StatusType } from './route'

interface TaskItem {
  title: string
  status: StatusType
  desc: string
  reward: {
    type: RewardType
    amount: number
  }
  isLimitTask: boolean
  limitTime: string
  limitQuantity: number
}

interface TaskContentProps {
  title: string
  updateTime: string
  list: TaskItem[]
}

const TaskContent: React.FC<TaskContentProps> = ({ title, updateTime, list }) => (
  <CatEarsCard className="bg-[#333]">
    <div className="flex items-center justify-between px-6 py-2">
      <p className="text-sm font-ultra text-primary">{title}</p>
      {updateTime && <p className="text-xs text-white/70">Update every {updateTime}</p>}
    </div>
    <div className="flex flex-col space-y-2 rounded-b-xl bg-[#1C1C1C] p-3">
      {list.map((task, index) => (
        <TaskCard
          key={index}
          title={task.title}
          status={task.status}
          desc={task.desc}
          reward={task.reward}
          isLimitTask={task.isLimitTask} // Fixed prop name to match interface
          limitTime={task.limitTime}
          limitQuantity={task.limitQuantity}
        />
      ))}
    </div>
  </CatEarsCard>
)

export default TaskContent
