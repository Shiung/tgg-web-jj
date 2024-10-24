import React, { useMemo } from 'react'
import { UsdtIcon, KatonIcon, TonIcon } from '~/components/color-icons'
import { CryptoUnion } from '~/consts/crypto'

export type CurrencyType = CryptoUnion | null | undefined

interface CurrencyIconProps {
  currency: CurrencyType
  className?: string
}

export const CurrencyIcon: React.FC<CurrencyIconProps> = ({ currency, className }) => {
  const icon = useMemo(() => {
    switch (currency) {
      case 'USDT':
        return <UsdtIcon className={className} />
      case 'KATON':
        return <KatonIcon className={className} />
      case 'TON':
        return <TonIcon className={className} />
      default:
        return <div>null</div>
    }
  }, [currency, className])

  return icon
}
