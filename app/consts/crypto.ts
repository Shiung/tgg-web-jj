import UsdtIcon from '~/components/color-icons/usdt'
import TonIcon from '~/components/color-icons/ton'
import KokonIcon from '~/components/color-icons/kokon'

export enum Crypto {
  USDT = 'USDT',
  TON = 'TON',
  KOKON = 'KOKON',
}

export const CRYPTO_DETAILS: Record<
  Crypto,
  {
    name: string
    icon: React.FC<React.SVGProps<SVGSVGElement>>
    decimals: number
    network: string
  }
> = {
  [Crypto.USDT]: { name: 'USDT', icon: UsdtIcon, decimals: 6, network: 'TON' },
  [Crypto.TON]: { name: 'TON', icon: TonIcon, decimals: 9, network: 'TON' },
  [Crypto.KOKON]: { name: 'KOKON', icon: KokonIcon, decimals: 0, network: 'TON' },
}

/* 存款幣種 */
export const DEPOSIT_CURRENCIES = [Crypto.USDT, Crypto.TON] as const
