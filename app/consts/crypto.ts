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
    /** 名稱 */
    name: string
    /** 圖示 */
    icon: React.FC<React.SVGProps<SVGSVGElement>>
    /** 圖片 */
    img: string
    /** 網路 */
    network: string
  }
> = {
  [Crypto.USDT]: { name: 'USDT', icon: UsdtIcon, img: '/images/crypto/usdt.png', network: 'TON' },
  [Crypto.TON]: { name: 'TON', icon: TonIcon, img: '/images/crypto/ton.png', network: 'TON' },
  [Crypto.KOKON]: {
    name: 'KOKON',
    icon: KokonIcon,
    img: '/images/crypto/kokon.png',
    network: 'TON',
  },
}

export const cryptoRules: Record<
  Crypto,
  {
    /** 整数部分的最大位数 */
    maxInt: number
    /** 小数部分的最大位数 */
    maxDec: number
  }
> = {
  [Crypto.USDT]: { maxInt: 9, maxDec: 6 },
  [Crypto.TON]: { maxInt: 6, maxDec: 9 },
  [Crypto.KOKON]: { maxInt: 15, maxDec: 0 },
}

export const isValidCrypto = (currency: string): currency is Crypto => {
  return Object.values(Crypto).includes(currency as Crypto)
}

/* 存款幣種 */
export const depositCurrencies = [Crypto.USDT, Crypto.TON] as const
