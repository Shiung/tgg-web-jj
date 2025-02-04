import BigNumber from 'bignumber.js'
import { Crypto, cryptoRules, isValidCrypto } from '~/consts/crypto'

/**
 * 安全處理來源金額數據返回數字類型
 */
export const parseAmount = (
  amount: string | number | undefined,
  defaultValue: number = 0
): number => {
  if (typeof amount === 'number') {
    return amount
  }
  if (typeof amount === 'string') {
    const parsed = parseFloat(amount)
    return isNaN(parsed) ? defaultValue : parsed
  }
  return defaultValue
}

export function thousandSeparatorFunction(numStr: string): string {
  // 檢查是否為合法的數字字串（包含正負號、整數和小數點）
  if (!/^[-+]?\d*\.?\d*$/.test(numStr)) {
    console.error(`Invalid number string: ${numStr}`)
    return numStr // 非數字字串直接返回原始輸入
  }

  const [intPart, decPart] = numStr.split('.')
  const formattedIntPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return decPart ? `${formattedIntPart}.${decPart}` : formattedIntPart
}

export interface FormatAmountOptions {
  /** 币种类型, 接受 TON、USDT */
  /**
   * 币种类型, 接受 `CryptoEnum` 中定义的值:
   * - `Crypto.TON`
   * - `Crypto.USDT`
   * - `Crypto.KATON`
   * @see {@link ~/consts/crypto.Crypto
   */
  crypto?: string | keyof typeof Crypto
  /** 是否使用 K/M 格式 */
  useKM?: boolean
  /** 是否去除小数点后的 0, 預設 true */
  removeTrailingZeros?: boolean
  /** 是否使用千分位分隔符，預設 true */
  thousandSeparator?: boolean
  /** 自定义的最大整数位数  */
  customMaxInt?: number
  /** 自定义的最大小数位数 */
  customMaxDec?: number
}

const defaultMaxInt = 10 // 默认最大整数位数
const defaultMaxDec = 2 // 默认最大小数位数

export const formatAmount = (
  value?: number | string,
  {
    crypto,
    useKM = false,
    removeTrailingZeros = true,
    thousandSeparator = true,
    customMaxInt,
    customMaxDec,
  }: FormatAmountOptions = {}
) => {
  const isValid = isValidCrypto(crypto)

  if (!isValid) {
    console.error(`Invalid crypto: ${crypto}`)
    return value
  }

  const { maxInt, maxDec } = (() => {
    const rules =
      crypto && isValid
        ? cryptoRules[crypto as keyof typeof cryptoRules]
        : { maxInt: undefined, maxDec: undefined }
    return {
      maxInt: customMaxInt ?? rules.maxInt ?? defaultMaxInt,
      maxDec: customMaxDec ?? rules.maxDec ?? defaultMaxDec,
    }
  })()

  const _value = new BigNumber(value || 0)

  let formatted: string
  formatted = _value.toFixed(maxDec, BigNumber.ROUND_DOWN)

  if (removeTrailingZeros && maxDec > 0) {
    formatted = formatted.replace(/\.?0+$/, '')
  }

  const [intPart, decPart] = formatted.split('.')
  const truncatedIntPart = intPart.length > maxInt ? intPart.slice(0, maxInt) : intPart

  if (useKM) {
    return formatKM(new BigNumber(`${truncatedIntPart}.${decPart || ''}`).toNumber())
  }

  const formattedIntPart = thousandSeparator
    ? thousandSeparatorFunction(truncatedIntPart)
    : truncatedIntPart

  return decPart ? `${formattedIntPart}.${decPart}` : formattedIntPart
}

export function formatKM(num: number) {
  if (Math.abs(num) < 10000) {
    return thousandSeparatorFunction(`${num}`)
  }

  const map = [
    { suffix: 'M', threshold: 1e6, precision: 2 },
    { suffix: 'K', threshold: 1e3, precision: 2 },
    { suffix: '', threshold: 1, precision: 0 },
  ]

  const found = map.find(x => Math.abs(num) >= x.threshold)
  if (found) {
    let formatted = (num / found.threshold).toFixed(found.precision)
    if (found.precision > 0) {
      formatted = parseFloat(formatted).toString()
    }
    formatted = thousandSeparatorFunction(formatted)
    return `${formatted}${found.suffix}`
  }

  return thousandSeparatorFunction(`${num}`)
}
