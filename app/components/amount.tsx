import { useMemo } from 'react'
import { NumericFormat } from 'react-number-format'
import { NumericFormatProps } from 'react-number-format/types/types'
import BigNumber from 'bignumber.js'
import { cryptoRules, isValidCrypto } from '~/consts/crypto'
import { formatKM } from '~/lib/amount'

interface AmountProps extends Partial<NumericFormatProps> {
  /** 金額 */
  value?: number | string
  /** 币种类型 */
  crypto?: string
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

const Amount: React.FC<AmountProps> = ({
  value,
  crypto,
  useKM = false,
  removeTrailingZeros = true,
  thousandSeparator = true,
  customMaxInt,
  customMaxDec,
  ...props
}) => {
  const isValid = useMemo(() => isValidCrypto(crypto), [crypto])

  const { maxInt, maxDec } = useMemo(() => {
    const rules =
      crypto && isValid
        ? cryptoRules[crypto as keyof typeof cryptoRules]
        : { maxInt: undefined, maxDec: undefined }
    return {
      maxInt: customMaxInt ?? rules.maxInt ?? defaultMaxInt,
      maxDec: customMaxDec ?? rules.maxDec ?? defaultMaxDec,
    }
  }, [crypto, customMaxInt, customMaxDec, isValid])

  const formattedValue = useMemo(() => {
    const _value = new BigNumber(value || 0)

    if (useKM) return formatKM(_value.toNumber())

    const formatted =
      removeTrailingZeros && maxDec > 0
        ? _value.decimalPlaces(maxDec).toString() // 去除尾部 0
        : _value.toFixed(maxDec) // 保留所有小数位

    // eslint-disable-next-line prefer-const
    let [intPart, decPart] = formatted.split('.')
    const truncatedIntPart = intPart.length > maxInt ? intPart.slice(0, maxInt) : intPart

    return decPart ? `${truncatedIntPart}.${decPart}` : truncatedIntPart
  }, [value, useKM, removeTrailingZeros, maxDec, maxInt])

  if (!isValid) {
    console.error(`Invalid crypto: ${crypto}`)
    return null
  }

  if (useKM) return <span className={props.className}>{formattedValue}</span>

  return (
    <NumericFormat
      value={formattedValue}
      thousandSeparator={thousandSeparator ? ',' : undefined}
      decimalScale={maxDec}
      displayType="text"
      {...props}
    />
  )
}

export default Amount
