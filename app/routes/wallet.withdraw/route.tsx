import { useState } from 'react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import InfoIcon from '~/icons/info.svg?react'
import WarningIcon from '~/icons/warning.svg?react'
import { cryptoDetails, depositCurrencies } from '~/consts/crypto'
import { Label } from '~/components/ui/label'

const coins = depositCurrencies.map(crypto => ({
  name: cryptoDetails[crypto].name,
  icon: cryptoDetails[crypto].icon,
}))

export default function Withdraw() {
  const [selectedCurrency, setSelectedCurrency] = useState('USDT')

  return (
    <div className="bg-black p-4">
      {/* Choose currency */}
      <div className="relative flex flex-col justify-between space-y-2 rounded-xl bg-[#1C1C1C] p-3">
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

      <div className="mt-3 flex h-[26px] w-[115px] items-center justify-center rounded-t-xl bg-app-blue px-3 py-1 text-sm">
        Network: <span className="font-ultra">TON</span>
      </div>
      <div className="flex flex-col space-y-3 rounded-r-xl rounded-bl-lg bg-[#1C1C1C] p-3">
        {/* Address */}
        <div className="space-y-1">
          <Label htmlFor="address" className="text-xs">
            Address
          </Label>
          <Input className="h-9" id="address" placeholder="Please enter" />
        </div>
        {/* Memo */}
        <div className="space-y-1">
          <Label htmlFor="memo" className="text-xs">
            Memo (optional)
          </Label>
          <Input className="h-9" id="memo" placeholder="Please enter" />
        </div>
        <div className="flex space-x-2 rounded-lg bg-[#333] p-2 text-xs text-white/70">
          <InfoIcon className="h-4 w-4 flex-shrink-0" />
          <p className="">
            Most trading platforms require you to fill in plain text MEMO/digital ID/comment for TON
            deposit before it can be credited. Failure to fill in or incorrect filling will result
            in asset loss.
          </p>
        </div>
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
        {/*  */}
        <div className="flex flex-col space-y-1 rounded-lg bg-[#333] px-3 py-2 text-xs text-white/70">
          <div className="flex justify-between">
            <p>Available Balance: </p>
            <p>
              <span className="pr-1 text-white">123,456,789.123456</span>USDT
            </p>
          </div>
          <div className="flex justify-between">
            <p>Fee: </p>
            <p>
              <span className="pr-1 text-white">0.1</span>USDT
            </p>
          </div>
          <div className="flex justify-between">
            <p>Daily limit (amount)</p>
            <p>
              <span className="pr-1 text-white">0/200</span>USDT
            </p>
          </div>
          <div className="flex justify-between">
            <p>Daily limit (times)</p>
            <p>
              <span className="pr-1 text-white">0/10</span>USDT
            </p>
          </div>
        </div>

        <div className="space-y-1">
          <Label htmlFor="password" className="text-xs">
            Fund password
          </Label>
          <Input className="h-9" type="password" id="password" placeholder="Please enter" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="verificationCode" className="text-xs">
            Verification code
          </Label>
          <Input className="h-9" id="verificationCode" placeholder="Please enter" />
        </div>
        <Button className="h-6 flex-1" variant="outline" type="button">
          Send Verification Code
        </Button>
      </div>

      <div className="mt-6 flex flex-col space-y-3">
        <div className="flex items-center justify-between text-white/70">
          <p className="text-xs text-white/70">Receive amount: </p>
          <p className="text-base font-extrabold text-white">
            <span className="pr-1">0</span>USDT
          </p>
        </div>
        <Button catEars className="w-full">
          Deposit via Address
        </Button>
      </div>
    </div>
  )
}
