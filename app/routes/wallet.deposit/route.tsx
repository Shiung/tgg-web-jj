import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { depositCurrencies, cryptoDetails } from '~/consts/crypto'
import InfoIcon from '~/icons/info.svg?react'
import WarningIcon from '~/icons/warning.svg?react'
import { apis } from '~/api'
import DepositViaAddressDialog from './deposit-via-address-sheet'
import TonConnectButton from './ton-connect-button'

const coins = depositCurrencies.map(crypto => ({
  name: cryptoDetails[crypto].name,
  icon: cryptoDetails[crypto].icon,
}))

export default function Deposit() {
  const { data: depositSettingData, isLoading } = useQuery({
    queryKey: ['getDepositSetting'],
    queryFn: apis.wallet.walletDepositSettingList,
  })
  const [selectedCurrency, setSelectedCurrency] = useState('USDT')

  useEffect(() => {
    console.log('depositSettingData', depositSettingData)
  }, [depositSettingData])

  return (
    <div className="bg-black p-4">
      <div className="flex flex-col justify-between space-y-2 rounded-xl bg-[#1C1C1C] p-3">
        <p className="pl-3 text-xs text-white/70">Choose currency</p>
        <div className="flex justify-between space-x-2">
          {coins.map((coin, index) => (
            <Button
              key={`${coin}_${index}`}
              className="h-7 flex-1"
              variant="outlineSoft"
              isSelected={selectedCurrency === coin.name}
              onClick={() => setSelectedCurrency(coin.name)}
            >
              <coin.icon className="h-[18px] w-[18px]" />
              <span className="pl-1">{coin.name}</span>
            </Button>
          ))}
        </div>
      </div>

      <div className="mt-3 flex flex-col space-y-2 rounded-xl bg-[#1C1C1C] p-3">
        {/* Amount */}
        <div className="space-y-1">
          <Label htmlFor="amount" className="text-xs">
            Amount
          </Label>
          <Input className="h-9" id="amount" placeholder="Please enter" />
          {
            /* errors.amount */ false && (
              <p className="flex items-center space-x-1 pl-3 text-xs text-app-red">
                <WarningIcon className="h-3 w-3" />
                {/* {errors.email.message} */}
              </p>
            )
          }
          <p className="flex items-center space-x-1 pl-3 text-xs text-white/50">
            <InfoIcon className="h-3 w-3" />
            <span>Range: 1,234,567.123456 ~ 123,456,789.123456</span>
          </p>
        </div>
        {/* 快捷按钮 */}
        <div className="flex justify-between space-x-2">
          {[10, 100, 500, 1000].map(amount => (
            <Button key={amount} className="h-7 flex-1" variant="outlineSoft">
              {amount}
            </Button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-col items-stretch space-y-3">
        <TonConnectButton />
        <DepositViaAddressDialog />
      </div>
    </div>
  )
}
