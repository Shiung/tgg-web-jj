import { format } from 'date-fns'
import Amount from '~/components/amount'
import { KokonIcon, TonIcon, UsdtIcon } from '~/components/color-icons'
import { TransactionEntry } from './transaction-record'

const TransactionEntryItem = ({ record }: { record: TransactionEntry }) => {
  return (
    <div className="flex items-center space-x-2 pb-2.5 text-xs font-normal text-white">
      <p className="w-9">{format(new Date(record.transactionTime), 'MM-dd')}</p>
      <p className="w-9">{format(new Date(record.transactionTime), 'HH:mm')}</p>
      <p className="flex-1 font-ultra">{record.type}</p>
      <p
        className={`flex-1 text-right font-ultra ${
          parseFloat(record.amount) < 0 ? 'text-app-red' : 'text-white'
        }`}
      >
        <Amount value={record.amount} thousandSeparator crypto={record.currency} />
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
