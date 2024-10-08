import React, { useMemo } from 'react'
import { format, parseISO } from 'date-fns'

import { CheckIcon, WaitingIcon, UsdtIcon, KokonIcon } from '~/components/color-icons'
import Amount from '~/components/amount'

interface CommissionItem {
  betAmount: string
  commissionAmount: string
  createTime: string
  displayName: string
  level: number
  memberId: number
  sendStatus: number
}

interface CommissionTableListProps {
  data: CommissionItem[]
  summary?: {
    totalBet: string
    totalCommission: string
    totalCount: number
  } | null
}

const CommissionTableList: React.FC<CommissionTableListProps> = ({ data, summary }) => {
  const groupedData = useMemo(() => {
    const groups: { [key: string]: CommissionItem[] } = {}
    data.forEach(item => {
      const date = format(new Date(item.createTime), 'yyyy-MM-dd')
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(item)
    })
    return Object.entries(groups)
      .sort(([dateA], [dateB]) => parseISO(dateB).getTime() - parseISO(dateA).getTime())
      .map(([date, rows]) => ({ date, rows }))
  }, [data])

  const truncateName = (name: string, maxLength: number = 9) => {
    return name.length > maxLength ? name.slice(0, maxLength) + '...' : name
  }

  const getStatusIcon = (sendStatus: number) => {
    switch (sendStatus) {
      case 1:
        return <CheckIcon className="ml-1 h-3 w-3 text-green-500" />
      case 0:
        return <WaitingIcon className="ml-1 h-3 w-3 text-yellow-500" />
      default:
        return <CheckIcon className="ml-1 h-3 w-3 text-red-500" />
    }
  }

  return (
    <div className="mt-2 flex flex-1 flex-col bg-black text-xs text-white">
      {groupedData.map((dayData, index) => (
        <div key={index} className="mb-2 overflow-hidden rounded-lg bg-[#1C1C1C]">
          <div className="bg-[#333333] px-3 py-2 font-ultra">{dayData.date}</div>
          <div className="px-3 py-0">
            <table className="w-full border-separate border-spacing-y-[10px]">
              <thead>
                <tr className="text-left text-[#999999]">
                  <th className="w-[65px] max-w-[65px]">Name</th>
                  <th className="text-right">LV</th>
                  <th className="text-right">
                    <div className="flex items-center justify-end">
                      <UsdtIcon className="mr-1 h-3 w-3" />
                      <div>Bet Amount</div>
                    </div>
                  </th>
                  <th className="text-right">
                    <div className="flex items-center justify-end">
                      <KokonIcon className="mr-1 h-3 w-3" />
                      <div>Commission</div>
                    </div>
                  </th>
                  <th className=""></th>
                </tr>
                <tr className="h-[1px]">
                  <td colSpan={5} className="p-0">
                    <div className="h-[1px] bg-[#FFFFFF33]"></div>
                  </td>
                </tr>
              </thead>
              <tbody>
                {dayData.rows.map((row, rowIndex) => (
                  <tr key={rowIndex} className="">
                    <td className="w-[65px] max-w-[65px] truncate">
                      <span title={row.displayName}>{truncateName(row.displayName)}</span>
                    </td>
                    <td className="text-right">{row.level}</td>
                    <td className="text-right">
                      <Amount value={row.betAmount} crypto="USDT" />
                    </td>
                    <td className="text-right">
                      <Amount value={row.commissionAmount} crypto="KOKON" />
                    </td>
                    <td className="flex justify-end text-right">{getStatusIcon(row.sendStatus)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CommissionTableList
