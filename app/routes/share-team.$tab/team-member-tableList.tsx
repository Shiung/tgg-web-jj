import React from 'react'
import { UsdtIcon } from '~/components/color-icons'
import Amount from '~/components/amount'
import { Crypto } from '~/consts/crypto'

interface TeamMember {
  lv?: number
  name?: string
  totalBets?: string
  totalDeposits?: string
}

interface TeamMemberTableListProps {
  data: TeamMember[]
}

const TeamMemberTableList: React.FC<TeamMemberTableListProps> = ({ data }) => {
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
              {data.map((row, rowIndex) => (
                <tr key={rowIndex} className="">
                  <td className="w-[65px] max-w-[65px] truncate">
                    <span title={row.name}>{row.name}</span>
                  </td>
                  <td className="text-right">{row.lv}</td>
                  <td className="text-right">
                    <Amount
                      value={row.totalBets}
                      customMaxInt={7}
                      customMaxDec={6}
                      crypto={Crypto.USDT}
                    />
                  </td>
                  <td className="text-right">
                    <Amount
                      value={row.totalDeposits}
                      customMaxInt={7}
                      customMaxDec={6}
                      crypto={Crypto.USDT}
                    />
                  </td>
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
