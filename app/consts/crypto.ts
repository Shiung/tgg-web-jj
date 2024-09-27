import { KokonIcon, UsdtIcon, TonIcon } from '~/components/color-icons'

export enum Crypto {
  USDT = 'USDT',
  TON = 'TON',
  KOKON = 'KOKON',
}

export type CryptoUnion = keyof typeof Crypto

export const cryptoDetails: Record<
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
export const depositCurrencies = [Crypto.USDT, Crypto.TON] as const
