import React from 'react'
import { type TaskQueryResponse } from '~/api/codegen/data-contracts'

import CatEarsCard from '~/components/cat-ears-card'
import TaskItem from './task-item'

/**
 * 任務卡片屬性介面
 * @interface TaskCardProps
 */
interface TaskCardProps {
  /** 卡片標題 */
  cardTitle: string
  /** 更新時間字串 */
  updateTimeString: string
  /** 任務列表 */
  list:
    | TaskQueryResponse['dailyList']
    | TaskQueryResponse['specialList']
    | TaskQueryResponse['oneTimeList']
}

const TaskCard: React.FC<TaskCardProps> = ({ cardTitle, updateTimeString, list }) => (
  <CatEarsCard className="bg-[#333]">
    <div className="flex items-center justify-between px-6 py-2">
      <p className="text-sm font-ultra text-primary">{cardTitle}</p>
      {updateTimeString && <p className="text-xs text-white/70">{updateTimeString}</p>}
    </div>
    <div className="flex flex-col space-y-2 rounded-b-xl bg-[#1C1C1C] p-3">
      {list?.map((task, index) => <TaskItem key={`TaskItem-${index}`} task={task} />)}
    </div>
  </CatEarsCard>
)

export default TaskCard
