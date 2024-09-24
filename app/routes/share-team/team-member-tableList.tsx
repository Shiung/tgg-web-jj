import React from 'react'
import { UsdtIcon } from '~/components/color-icons'

const mockTableData = [
  {
    name: 'marry1245',
    lv: 2,
    betAmount: '1,234,567.123456',
    commission: '1,000.75 M',
  },
  {
    name: 'marry1245',
    lv: 2,
    betAmount: '1,234,567.123456',
    commission: '1,000.75 M',
  },
  {
    name: 'marry1245',
    lv: 2,
    betAmount: '1,234,567.123456',
    commission: '1,000.75 M',
  },
]

const TeamMemberTableList: React.FC = () => {
  const truncateName = (name: string, maxLength: number = 9) => {
    return name.length > maxLength ? name.slice(0, maxLength) + '...' : name
  }

  return (
    <div className="mt-2 flex flex-1 flex-col bg-black text-xs text-white">
      <div className="mb-2 overflow-hidden rounded-lg bg-[#1C1C1C]">
        <div className="px-3 py-0">
          <table className="w-full border-separate border-spacing-y-[10px]">
            <thead>
              <tr className="text-left text-[#999999]">
                <th className="w-[65px] max-w-[65px]">Name</th>
                <th className="text-right">LV</th>
                <th className="text-right">
                  <div className="flex items-center justify-end">
                    <UsdtIcon className="mr-1 h-3 w-3" />
                    <div>Total Bets</div>
                  </div>
                </th>
                <th className="text-right">
                  <div className="flex items-center justify-end">
                    <UsdtIcon className="mr-1 h-3 w-3" />
                    <div>Total Deposit</div>
                  </div>
                </th>
              </tr>
              <tr className="h-[1px]">
                <td colSpan={5} className="p-0">
                  <div className="h-[1px] bg-[#FFFFFF33]"></div>
                </td>
              </tr>
            </thead>
            <tbody>
              {mockTableData.map((row, rowIndex) => (
                <tr key={rowIndex} className="">
                  <td className="w-[65px] max-w-[65px] truncate">
                    <span title={row.name}>{truncateName(row.name)}</span>
                  </td>
                  <td className="text-right">{row.lv}</td>
                  <td className="text-right">{row.betAmount}</td>
                  <td className="text-right">{row.commission}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default TeamMemberTableList
