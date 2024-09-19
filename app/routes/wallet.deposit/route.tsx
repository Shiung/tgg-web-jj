import { useState } from 'react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { DEPOSIT_CURRENCIES, CRYPTO_DETAILS } from '~/consts/crypto'
import InfoIcon from '~/icons/info.svg?react'
import WarningIcon from '~/icons/warning.svg?react'

const coins = DEPOSIT_CURRENCIES.map(crypto => ({
  name: CRYPTO_DETAILS[crypto].name,
  icon: CRYPTO_DETAILS[crypto].icon,
}))

export default function Deposit() {
  const [selectedCurrency, setSelectedCurrency] = useState('USDT')

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
        <Button catEars>Connect Wallet</Button>
        <Button catEars variant="gray">
          Deposit via Address
        </Button>
      </div>
    </div>
  )
}
