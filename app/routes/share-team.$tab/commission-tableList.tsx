import React, { useMemo } from 'react'
import { format, parseISO } from 'date-fns'
import { useTranslation } from 'react-i18next'
import { CheckIcon, WaitingIcon, UsdtIcon, KatonIcon } from '~/components/color-icons'
import Amount from '~/components/amount'

interface CommissionItem {
  betAmount?: string
  commissionAmount?: string
  createTime?: string
  displayName?: string
  level?: number
  memberId?: number
  sendStatus?: number
}

interface CommissionTableListProps {
  data: CommissionItem[]
}

const SendStatusIcon = ({ sendStatus }: { sendStatus?: number }) => {
  switch (sendStatus) {
    case 1:
      return <WaitingIcon className="ml-1 h-3 w-3" />
    case 3:
      return <CheckIcon className="ml-1 h-3 w-3" />
    default:
      return null
  }
}

const CommissionTableList: React.FC<CommissionTableListProps> = ({ data }) => {
  const { t } = useTranslation()

  const groupedData = useMemo(() => {
    const groups: { [key: string]: CommissionItem[] } = {}
    data.forEach(item => {
      const date = item?.createTime ? format(new Date(item.createTime), 'yyyy-MM-dd') : ''
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(item)
    })
    return Object.entries(groups)
      .sort(([dateA], [dateB]) => parseISO(dateB).getTime() - parseISO(dateA).getTime())
      .map(([date, rows]) => ({ date, rows }))
  }, [data])

  return (
    <div className="mt-2 flex flex-1 flex-col bg-black text-xs text-white">
      {groupedData.map((dayData, index) => (
        <div key={index} className="mb-2 overflow-hidden rounded-lg bg-[#1C1C1C]">
          <div className="bg-[#333333] px-3 py-2 font-ultra">{dayData.date}</div>
          <div className="px-3 py-0">
            <table className="w-full border-separate border-spacing-y-[10px]">
              <thead>
                <tr className="text-left text-[#999999]">
                  <th className="w-[65px] max-w-[65px]">{t('Name')}</th>
                  <th className="text-right">LV</th>
                  <th className="text-right">
                    <div className="flex items-center justify-end">
                      <UsdtIcon className="mr-1 h-3 w-3" />
                      <div>{t('BetAmount')}</div>
                    </div>
                  </th>
                  <th className="text-right">
                    <div className="flex items-center justify-end">
                      <KatonIcon className="mr-1 h-3 w-3" />
                      <div>{t('Commission')}</div>
                    </div>
                  </th>
                  <th className=""></th>
                </tr>
                <tr className="h-[1px]">
                  <td colSpan={5} className="p-0">
                    <div className="h-[1px] bg-white/20"></div>
                  </td>
                </tr>
              </thead>
              <tbody>
                {dayData.rows.map((row, rowIndex) => (
                  <tr key={rowIndex} className="">
                    <td className="w-[65px] max-w-[65px] truncate">
                      <span title={row.displayName}>{row.displayName}</span>
                    </td>
                    <td className="text-right">{row.level}</td>
                    <td className="text-right">
                      <Amount value={row.betAmount} crypto="USDT" />
                    </td>
                    <td className="text-right">
                      <Amount value={row.commissionAmount} crypto="KATON" />
                    </td>
                    <td className="text-right align-middle">
                      <SendStatusIcon sendStatus={row.sendStatus} />
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
