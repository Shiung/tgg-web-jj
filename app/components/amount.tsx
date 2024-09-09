import { NumberFormatBase, useNumericFormat } from 'react-number-format'
import { FormatInputValueFunction, NumericFormatProps } from 'react-number-format/types/types'
import { formatKMBT } from '~/lib/utils'

interface AmountProps extends Partial<NumericFormatProps> {
  value: number
  useKMBT?: boolean // 是否使用 K/M/B/T 格式
  precision?: number // 小数点后保留几位
  removeTrailingZeros?: boolean // 是否去除小数点后的 0
  useThousandSeparator?: boolean // 是否使用千分位分隔符
}

const Amount: React.FC<AmountProps> = ({
  value,
  useKMBT = false,
  precision = 2,
  removeTrailingZeros = true,
  useThousandSeparator = true,
  ...props
}) => {
  const { format, ...rest } = useNumericFormat({
    ...props,
    value: value,
    thousandSeparator: useThousandSeparator ? ',' : undefined,
    decimalScale: precision,
    fixedDecimalScale: !removeTrailingZeros,
    displayType: 'text',
  })

  const _format: FormatInputValueFunction = inputValue => {
    if (useKMBT) {
      return formatKMBT(Number(inputValue), precision, removeTrailingZeros)
    }
    return format?.(inputValue) ?? inputValue
  }

  return <NumberFormatBase format={_format} {...rest} />
}

export default Amount
