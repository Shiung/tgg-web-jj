import { useNavigate } from '@remix-run/react'
import { useState } from 'react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import Amount from '~/components/amount'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'
import { CRYPTO_DETAILS, DEPOSIT_CURRENCIES } from '~/consts/crypto'
import InfoIcon from '~/icons/info.svg?react'
import WarningIcon from '~/icons/warning.svg?react'

const coins = DEPOSIT_CURRENCIES.map(crypto => ({
  name: CRYPTO_DETAILS[crypto].name,
  icon: CRYPTO_DETAILS[crypto].icon,
  amount: 123456789.12,
}))

export default function Swap() {
  const navigate = useNavigate()
  const [currentTab, setCurrentTab] = useState('buy')

  return (
    <div className="space-y-6 bg-black p-4">
      <Tabs defaultValue="buy" className="w-full">
        <TabsList className="w-full bg-[#1C1C1C]">
          <TabsTrigger
            value="buy"
            className="flex-1 data-[state=active]:bg-app-blue data-[state=active]:text-white"
            onClick={() => setCurrentTab('buy')}
          >
            Buy KOKON
          </TabsTrigger>
          <TabsTrigger
            value="sell"
            className="flex-1 data-[state=active]:bg-app-blue data-[state=active]:text-white"
            onClick={() => setCurrentTab('sell')}
          >
            Sell KOKON
          </TabsTrigger>
        </TabsList>
        <TabsContent value={currentTab} className="mt-0"></TabsContent>
      </Tabs>

      <div className="space-y-3">
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
            <div className="flex flex-col pl-3 text-xs text-white/50">
              <div className="flex items-center space-x-1">
                <InfoIcon className="h-3 w-3" />
                <p>Range: 1M ~ 1,000M</p>
              </div>
              <p className="pl-4">Ratio: 1 USDT=1,000,000 Kokon</p>
            </div>
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

        <div className="mt-3 flex flex-col space-y-2 rounded-xl bg-[#1C1C1C] p-3">
          <p className="pl-3 text-xs text-white/70">Payment Method</p>
          {coins.map(coin => (
            <Button
              key={coin.name}
              className="h-7 flex-1 justify-between text-xs"
              variant="outlineSoft"
            >
              <div className="flex items-center space-x-1">
                <coin.icon className="h-4 w-4" />
                <span className="pl-1">{coin.name}</span>
              </div>
              <Amount value={coin.amount} />
            </Button>
          ))}
        </div>

        <div className="mt-3 flex justify-between rounded-xl bg-[#1C1C1C] px-3 py-2">
          <span className="flex items-center space-x-1 text-xs text-app-red">
            <WarningIcon className="h-4 w-4" />
            <span>Insufficient balance</span>
          </span>
          <Button
            className="flex h-6 items-center justify-center px-3"
            onClick={() => navigate('/wallet/deposit')}
          >
            Go to deposit
          </Button>
        </div>
      </div>

      <div className="mt-6 flex flex-col space-y-3">
        <div className="flex items-center justify-between text-white/70">
          <p className="text-xs text-white/70">You will pay: </p>
          <p className="text-base font-extrabold text-white">
            <span className="pr-1">0</span>USDT
          </p>
        </div>
        <Button catEars className="w-full">
          Buy
        </Button>
      </div>
    </div>
  )
}
