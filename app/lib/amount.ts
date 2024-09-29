import { cryptoRules, isValidCrypto } from '~/consts/crypto'

export const parseAmount = (amount: string | undefined, defaultValue: number = 0): number => {
  return parseFloat(amount || '') || defaultValue
}

export function formatKM(num: number, precision: number = 2, removeTrailingZeros: boolean = true) {
  const map = [
    // { suffix: 'T', threshold: 1e12 },
    // { suffix: 'B', threshold: 1e9 },
    { suffix: 'M', threshold: 1e6 },
    { suffix: 'K', threshold: 1e3 },
    { suffix: '', threshold: 1 },
  ]

  const found = map.find(x => Math.abs(num) >= x.threshold)
  if (found) {
    let formatted = (num / found.threshold).toFixed(precision)
    if (removeTrailingZeros) {
      formatted = parseFloat(formatted).toString()
    }
    return formatted + found.suffix
  }

  return `${num}`
}

/**
 * 处理输入时，限制前导0和根據幣種限制位数
 * @param value
 * @param currency
 * @returns
 */
export const sanitizeAmountInputByCurrency = (value: string, currency: string) => {
  if (!currency || !isValidCrypto(currency)) return value
  const rule = cryptoRules[currency as keyof typeof cryptoRules]
  let [intPart, decPart] = value.split('.')

  // 去掉整数部分的前导0，但允许单个0存在（例如 "0.12"）
  if (intPart) {
    intPart = intPart.replace(/^0+(?=\d)/, '')
  }

  // 限制整数部分的长度
  if (intPart.length > rule.maxInt) {
    intPart = intPart.slice(0, rule.maxInt)
  }

  // 限制小数部分的长度（允许输入带尾随0的小数）
  if (decPart) {
    decPart = decPart.slice(0, rule.maxDec)
  }

  return decPart ? `${intPart}.${decPart}` : intPart
}

/**
 * 去除尾随的0 (例如 onBlur 或者 onSubmit 時使用)
 * @param value
 * @param currency
 * @returns
 */
export const removeTrailingZerosByCurrency = (value: string, currency: string) => {
  if (!currency || !isValidCrypto(currency)) return value
  const rule = cryptoRules[currency as keyof typeof cryptoRules]
  let [intPart, decPart] = value.split('.')

  // 去掉整数部分的前导0，但允许单个0存在（例如 "0.12"）
  if (intPart) {
    intPart = intPart.replace(/^0+(?=\d)/, '')
  }

  // 限制小数部分的长度并去掉尾随0
  if (decPart) {
    decPart = decPart.slice(0, rule.maxDec).replace(/0+$/, '')
  }

  return decPart ? `${intPart}.${decPart}` : intPart
}
