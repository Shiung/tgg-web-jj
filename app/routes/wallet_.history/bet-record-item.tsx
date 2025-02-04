import { useEffect } from 'react'
import { useCopyToClipboard } from 'react-use'
import { format } from 'date-fns'
import { Button } from '~/components/ui/button'
import { KatonIcon, UsdtIcon } from '~/components/color-icons'
import Amount from '~/components/amount'
import CopyIcon from '~/icons/copy.svg?react'
import { Crypto } from '~/consts/crypto'
import { successToast } from '~/lib/toast'
import { GameTransaction } from './bet-record'
import { useTranslation } from 'react-i18next'

export default function BetRecordItem({
  record,
  currency,
}: {
  record: GameTransaction
  currency: Crypto
}): JSX.Element {
  const [state, copyToClipboard] = useCopyToClipboard()
  const { t } = useTranslation()
  useEffect(() => {
    if (!state.value) return
    successToast(t('Copied'))
  }, [state, t])

  return (
    <div className="w-full rounded-xl bg-[#1C1C1C]">
      <div className="rounded-t-xl bg-[#333] text-sm font-ultra text-white">
        <p className="px-3 py-1">{record.gameName}</p>
      </div>
      <div className="flex flex-col space-y-2 px-3 py-2">
        <div className="relative flex flex-col space-y-1 pb-2 before:absolute before:bottom-0 before:left-0 before:right-0 before:h-[0.5px] before:bg-white/20 before:content-['']">
          <div className="flex items-center justify-between">
            <span className="text-xs text-white/70">{t('BetAmount')}</span>
            <div className="flex space-x-1">
              <span className="text-xs text-white">
                {currency === Crypto.USDT ? (
                  <Amount value={record.betGold} crypto={Crypto.USDT} />
                ) : (
                  <Amount value={record.betGoldPCoin} crypto={Crypto.KATON} />
                )}
              </span>
              {currency === Crypto.USDT ? (
                <UsdtIcon className="my-auto h-3 w-3" />
              ) : (
                <KatonIcon className="my-auto h-3 w-3" />
              )}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-white/70">{t('winLoss')}</span>
            <div className="flex space-x-1">
              <span
                className={`text-sm font-ultra ${
                  (currency === Crypto.USDT
                    ? Number(record.winGold)
                    : Number(record.winGoldPCoin)) > 0
                    ? 'text-app-green'
                    : (currency === Crypto.USDT
                          ? Number(record.winGold)
                          : Number(record.winGoldPCoin)) < 0
                      ? 'text-app-red'
                      : 'text-white'
                }`}
              >
                <span className="px-1">
                  {(currency === Crypto.USDT
                    ? Number(record.winGold)
                    : Number(record.winGoldPCoin)) > 0
                    ? '+'
                    : (currency === Crypto.USDT
                          ? Number(record.winGold)
                          : Number(record.winGoldPCoin)) < 0
                      ? '-'
                      : ''}
                </span>
                {currency === Crypto.USDT ? (
                  <Amount value={Math.abs(Number(record.winGold))} crypto={Crypto.USDT} />
                ) : (
                  <Amount value={Math.abs(Number(record.winGoldPCoin))} crypto={Crypto.KATON} />
                )}
              </span>
              {currency === Crypto.USDT ? (
                <UsdtIcon className="my-auto h-3 w-3" />
              ) : (
                <KatonIcon className="my-auto h-3 w-3" />
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between text-xs text-white/50">
          <div className="flex space-x-1">
            <span>{format(new Date(record.betTime), 'MM-dd')}</span>
            <span>{format(new Date(record.betTime), 'HH:mm')}</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>#{record.transactionId}</span>
            <Button
              variant="icon"
              size="icon"
              className="h-4 w-4 text-white"
              onClick={() => copyToClipboard(`#${record.transactionId}`)}
            >
              <CopyIcon className="h-full w-full" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
