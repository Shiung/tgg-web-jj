import React from 'react'
import { CheckIcon, WaitingIcon, UsdtIcon, KokonIcon } from '~/components/color-icons'

const mockTableData = [
  {
    date: '08-27-2024',
    rows: [
      {
        name: 'marry1245',
        lv: 2,
        betAmount: '1,234,567.123456',
        commission: '1,000.75 M',
        status: 'rejected',
      },
      {
        name: 'adbferbg...',
        lv: 2,
        betAmount: '1,234,567.123456',
        commission: '1,000.75 M',
        status: 'rejected',
      },
      {
        name: 'remivkfgaasddssssssssss',
        lv: 2,
        betAmount: '1,234,567.123456',
        commission: '1,000.75 M',
        status: 'rejected',
      },
      {
        name: 'qqqefwqwdqqdqwdqqwdqwd.',
        lv: 2,
        betAmount: '1,234,567.123456',
        commission: '1,000.75 M',
        status: 'approved',
      },
      {
        name: 'marry1245',
        lv: 2,
        betAmount: '1,234,567.123456',
        commission: '1,000.75 M',
        status: 'approved',
      },
      {
        name: 'marry1245',
        lv: 2,
        betAmount: '1,234,567.123456',
        commission: '1,000.75 M',
        status: 'approved',
      },
      {
        name: 'marry1245',
        lv: 2,
        betAmount: '1,234,567.123456',
        commission: '1,000.75 M',
        status: 'approved',
      },
      {
        name: 'marry1245',
        lv: 2,
        betAmount: '1,234,567.123456',
        commission: '1,000.75 M',
        status: 'approved',
      },
      {
        name: 'marry1245',
        lv: 2,
        betAmount: '1,234,567.123456',
        commission: '1,000.75 M',
        status: 'approved',
      },
    ],
  },
  {
    date: '2024-08-26',
    rows: [
      {
        name: 'marry1245',
        lv: 2,
        betAmount: '1,234,567.123456',
        commission: '1,000.75 M',
        status: 'approved',
      },
      {
        name: 'marry1245',
        lv: 2,
        betAmount: '1,234,567.123456',
        commission: '1,000.75 M',
        status: 'approved',
      },
      {
        name: 'marry1245',
        lv: 2,
        betAmount: '1,234,567.123456',
        commission: '1,000.75 M',
        status: 'approved',
      },
      {
        name: 'marry1245',
        lv: 2,
        betAmount: '1,234,567.123456',
        commission: '1,000.75 M',
        status: 'approved',
      },
      {
        name: 'marry1245',
        lv: 2,
        betAmount: '1,234,567.123456',
        commission: '1,000.75 M',
        status: 'approved',
      },
      {
        name: 'marry1245',
        lv: 2,
        betAmount: '1,234,567.123456',
        commission: '1,000.75 M',
        status: 'approved',
      },
      {
        name: 'marry1245',
        lv: 2,
        betAmount: '1,234,567.123456',
        commission: '1,000.75 M',
        status: 'approved',
      },
      {
        name: 'marry1245',
        lv: 2,
        betAmount: '1,234,567.123456',
        commission: '1,000.75 M',
        status: 'approved',
      },
      {
        name: 'marry1245',
        lv: 2,
        betAmount: '1,234,567.123456',
        commission: '1,000.75 M',
        status: 'pending',
      },
    ],
  },
]

const CommissionTableList: React.FC = () => {
  const truncateName = (name: string, maxLength: number = 9) => {
    return name.length > maxLength ? name.slice(0, maxLength) + '...' : name
  }

  return (
    <div className="mt-2 flex flex-1 flex-col bg-black text-xs text-white">
      {mockTableData.map((dayData, index) => (
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
                      <span title={row.name}>{truncateName(row.name)}</span>
                    </td>
                    <td className="text-right">{row.lv}</td>
                    <td className="text-right">{row.betAmount}</td>
                    <td className="text-right">{row.commission}</td>
                    <td className="flex justify-end text-right">
                      {row.status === 'approved' && (
                        <CheckIcon className="ml-1 h-3 w-3 text-green-500" />
                      )}
                      {row.status === 'rejected' && (
                        <CheckIcon className="ml-1 h-3 w-3 text-red-500" />
                      )}
                      {row.status === 'pending' && (
                        <WaitingIcon className="ml-1 h-3 w-3 text-yellow-500" />
                      )}
                    </td>
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
