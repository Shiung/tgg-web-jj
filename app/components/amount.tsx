import { useMemo } from 'react'
import { NumericFormat } from 'react-number-format'
import { NumericFormatProps } from 'react-number-format/types/types'
import { formatAmount, FormatAmountOptions } from '~/lib/amount'

type AmountProps = { value?: number | string } & FormatAmountOptions & Partial<NumericFormatProps>

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
  const formattedValue = useMemo(
    () =>
      formatAmount(value, {
        crypto,
        useKM,
        removeTrailingZeros,
        thousandSeparator: false,
        customMaxInt,
        customMaxDec,
      }),
    [crypto, customMaxDec, customMaxInt, removeTrailingZeros, useKM, value]
  )

  if (useKM) return <span className={props.className}>{formattedValue}</span>

  return (
    <NumericFormat
      value={formattedValue}
      thousandSeparator={thousandSeparator ? ',' : undefined}
      displayType="text"
      {...props}
    />
  )
}

export default Amount
