import { format } from 'date-fns'
import Amount from '~/components/amount'
import { KokonIcon, TonIcon, UsdtIcon } from '~/components/color-icons'
import { TransactionEntry } from './transaction-record'
import { useTranslation } from 'react-i18next'

const TransactionEntryItem = ({ record }: { record: TransactionEntry }) => {
  const { t } = useTranslation()
  return (
    <div className="flex items-center space-x-2 pb-2.5 text-xs font-normal text-white">
      <p className="w-9">{format(new Date(record.transactionTime), 'MM-dd')}</p>
      <p className="w-9">{format(new Date(record.transactionTime), 'HH:mm')}</p>
      <p className="flex-1 font-ultra">
        {t(
          `transaction.type.${record.type.replace(/\s+/g, '').charAt(0).toLowerCase() + record.type.replace(/\s+/g, '').slice(1)}`
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
      ) : record.currency === 'KOKON' ? (
        <KokonIcon className="my-auto h-3 w-3" />
      ) : (
        <div />
      )}
    </div>
  )
}

export default TransactionEntryItem
