import { useTranslation } from 'react-i18next'
import { format } from 'date-fns'
import Amount from '~/components/amount'
import { KatonIcon, TonIcon, UsdtIcon } from '~/components/color-icons'
import InfoTooltip from '~/components/info-tooltip'
import { TransactionEntry } from './transaction-record'

const extractGameName = (comment: string) => {
  const match = comment.match(/游戏名称：(.+)/)
  return match ? match[1] : ''
}

const TransactionEntryItem = ({ record }: { record: TransactionEntry }) => {
  const { t } = useTranslation()

  const getTransactionTypeKey = (type: string) => {
    const formattedType =
      type.replace(/\s+/g, '').charAt(0).toLowerCase() + type.replace(/\s+/g, '').slice(1)
    return `transaction.type.${formattedType}`
  }

  return (
    <div className="flex items-center space-x-2 pb-2.5 text-xs font-normal text-white">
      <p className="w-9">{format(new Date(record.transactionTime), 'MM-dd')}</p>
      <p className="w-9">{format(new Date(record.transactionTime), 'HH:mm')}</p>
      <p className="flex flex-1 items-center font-ultra">
        {record.type === 'Game' ? (
          <InfoTooltip
            customTrigger={
              <div className="w-auto flex-grow-0 text-xs text-white underline opacity-100">
                {t(getTransactionTypeKey(record.type))}
              </div>
            }
            content={extractGameName(record.comment ?? '')}
          />
        ) : (
          t(getTransactionTypeKey(record.type))
        )}
      </p>
      <p
        className={`flex-1 text-right font-ultra ${
          parseFloat(record.amount) < 0 ? 'text-app-red' : 'text-white'
        }`}
      >
        <Amount value={record.amount} crypto={record.currency} />
      </p>
      {record.currency === 'USDT' ? (
        <UsdtIcon className="my-auto h-3 w-3" />
      ) : record.currency === 'TON' ? (
        <TonIcon className="my-auto h-3 w-3" />
      ) : record.currency === 'KATON' ? (
        <KatonIcon className="my-auto h-3 w-3" />
      ) : (
        <div />
      )}
    </div>
  )
}

export default TransactionEntryItem
