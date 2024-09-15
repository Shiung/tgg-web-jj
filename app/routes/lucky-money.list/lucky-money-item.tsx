import React from 'react'

import { Link } from '@remix-run/react'
import ArrowLineRight from '~/icons/arrow-line-right.svg?react'
import { KokonIcon } from '~/components/color-icons'

interface LuckyMoneyItemProps {
  type: 0 | 1 //
  status: 0 | 1 | 2 // 紅包詳情狀態 暫定0: Terminated, 1: Completed, 2: remaining
}

const LuckyMoneyItem: React.FC<LuckyMoneyItemProps> = ({ type, status }) => {
  return (
    <Link
      to={{
        pathname: '/lucky-money-detail',
        search: `?status=${status}&type=${type}`,
      }}
      className="mb-2 flex w-full items-center justify-between rounded-[12px] bg-[#1C1C1C] p-3"
    >
      <div className="flex items-center">
        <img
          src={`/images/lucky-money/${type === 0 ? 'normal' : 'luck-battle'}.png`}
          className="h-[38px] w-[38px]"
          alt="normal"
        />
        <div className="ml-2 flex flex-col items-start justify-center">
          <div className="text-sm font-[1000]">{type === 0 ? 'Normal' : 'Luck Battle'}</div>
          <div className="mt-1 text-xs font-normal text-[#FFFFFFB2]">2024-06-17</div>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <div className="flex items-center">
          <div className="flex flex-col items-end">
            <div className="flex items-center text-sm font-[1000]">
              <KokonIcon className="h-4 w-4" />
              <div className="ml-1">18.88K</div>
            </div>
            {status === 2 && (
              <div className="mt-1 text-xs font-normal text-[#FFFFFFB2]">10.02k remaining</div>
            )}
          </div>
          <ArrowLineRight className="ml-2 h-3 w-3 text-[#FFFFFFB2]" />
        </div>
        {status === 0 && (
          <div className="-mb-3 -mr-3 mt-3 h-5 rounded-br-lg rounded-tl-lg bg-[#333333] px-2 py-1">
            <div className="text-[10px] font-[1000] leading-3 text-[#FF4D48]">Terminated</div>
          </div>
        )}
        {status === 1 && (
          <div className="-mb-3 -mr-3 mt-3 h-5 rounded-br-lg rounded-tl-lg bg-[#333333] px-2 py-1">
            <div className="text-[10px] font-[1000] leading-3 text-[#3AE45A]">Completed</div>
          </div>
        )}
      </div>
    </Link>
  )
}

export default LuckyMoneyItem
