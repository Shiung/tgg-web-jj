import React from 'react'
import { cn } from '~/lib/utils'

enum Currency {
  KOKON = 'KOKON',
  USDT = 'USDT',
}

interface CurrencySwitchProps {
  currency: Currency
  toggleCurrency: () => void
}

const CurrencySwitch: React.FC<CurrencySwitchProps> = ({ currency, toggleCurrency }) => {
  return (
    <div
      className={`relative flex h-9 w-[73px] cursor-pointer items-center rounded-full p-1 ${
        currency === Currency.USDT ? 'bg-[#4DB6AC]' : 'bg-primary'
      }`}
      onClick={toggleCurrency}
    >
      <span
        className={cn(
          'absolute top-2/4 -translate-y-2/4 text-xs font-ultra text-white',
          currency === Currency.USDT
            ? 'left-2 text-right text-white'
            : 'right-1.5 text-right text-black'
        )}
      >
        {currency}
      </span>
      <div
        className={cn(
          'h-4 w-4 transform rounded-full bg-white shadow-md transition-transform',
          currency === Currency.USDT ? 'translate-x-12 bg-white' : 'translate-x-0 bg-black'
        )}
      />
    </div>
  )
}

export { Currency, CurrencySwitch }
