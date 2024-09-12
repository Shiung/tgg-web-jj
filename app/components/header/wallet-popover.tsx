import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover'
import { KokonIcon } from '~/components/color-icons'
import RefreshIcon from '~/icons/refresh.svg?react'
import kokonIcon from '~/components/color-icons/kokon'
import UsdtIcon from '~/components/color-icons/usdt'
import TonIcon from '~/components/color-icons/ton'
import { Button } from '~/components/ui/button'
import Amount from '~/components/amount'
import { cn } from '~/lib/utils'

const amount = 10000000000
const coins = [
  {
    coin: 'KOKON',
    icon: kokonIcon,
    value: 1234567.12,
    conversionRateToUSDT: 0.5,
    valueInUSDT: 1234567.12 * 0.5,
  },
  {
    coin: 'USDT',
    icon: UsdtIcon,
    value: 500000.0,
    conversionRateToUSDT: 1,
    valueInUSDT: 500000.0 * 1,
  },
  {
    coin: 'TON',
    icon: TonIcon,
    value: 2500000.75,
    conversionRateToUSDT: 1.2,
    valueInUSDT: 2500000.75 * 1.2,
  },
]

const WalletPopOver: React.FC<{ className: string }> = ({ className }) => {
  const handleRefresh = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
    event.stopPropagation()
    console.log('handleRefresh')
  }

  return (
    <Popover>
      <PopoverTrigger>
        <div
          className={cn(
            'mr-1 flex h-8 items-center justify-center space-x-1 rounded-full bg-[#1C1C1C]',
            className
          )}
        >
          <KokonIcon className="h-4 w-4" />
          <Amount className="text-sm font-extrabold" value={amount} />
          <RefreshIcon className="h-4 w-4 text-primary" onClick={handleRefresh} />
        </div>
      </PopoverTrigger>
      <PopoverContent className="primary-gradient-radius flex w-auto flex-col p-3 text-white">
        <div className="flex items-center space-x-2">
          <div className="flex flex-col text-sm font-extrabold">
            Total balance
            <span className="text-xs text-white/70">Display all in USDT</span>
          </div>
          <Amount className="text-xl font-extrabold text-primary" value={amount} />
        </div>
        <div className="mt-3 space-y-2">
          {coins.map((coin, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-lg bg-[#1C1C1C] px-3 py-2 font-extrabold"
            >
              <div className="flex items-center space-x-1">
                <coin.icon className="h-6 w-6" />
                <div className="flex flex-col">
                  <p className="text-xs">{coin.coin}</p>
                  <Amount className="text-[10px] font-normal leading-3" value={coin.value} />
                </div>
              </div>
              <Amount className="text-right text-sm" value={coin.valueInUSDT} />
            </div>
          ))}
        </div>
        <Button className="mt-6 w-full" catEars>
          Deposit
        </Button>
      </PopoverContent>
    </Popover>
  )
}

export default WalletPopOver
