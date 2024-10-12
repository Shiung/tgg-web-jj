import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Controller, useFormContext } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'

import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import Amount from '~/components/amount'
import { cryptoRules, Crypto } from '~/consts/crypto'
import WarningIcon from '~/icons/warning.svg?react'

import type { FormData } from './route'

const LuckBag = ({ minValue = 10 }: { minValue?: number }) => {
  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<FormData>()

  const [formMinValue, formMaxValue, errorMessage, hintMessage] = watch([
    'minValue',
    'maxValue',
    'errorMessage',
    'hintMessage',
  ])

  // 如果 maxValue 小于 minValue，则将 maxValue 设置为 minValue
  useEffect(() => {
    if (formMinValue < minValue) {
      setValue('minValue', minValue)
    }
    if (formMaxValue < formMinValue) {
      setValue('maxValue', formMinValue)
    }
  }, [formMinValue, formMaxValue, minValue, setValue])

  return (
    <motion.div
      layout
      className="mt-3 flex flex-col items-stretch space-y-2 rounded-lg bg-gradient-to-b from-[#FDCB04] to-[#FF4D00] p-2"
    >
      {/* Amount of total bag */}
      <div className="space-y-3 rounded-lg bg-[#1C1C1C] p-3">
        <Controller
          name="quota"
          control={control}
          rules={{
            required: true,
            validate: value => {
              if (value < minValue) {
                return `Amount of each bag shouldn’t be under ${minValue}`
              }
              return true
            },
          }}
          render={({ field }) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { ref, onChange, ...restField } = field
            return (
              <NumericFormat
                {...restField}
                getInputRef={ref}
                customInput={Input}
                allowNegative={false}
                decimalScale={cryptoRules.KOKON.maxDec}
                isAllowed={({ floatValue }) => {
                  if (floatValue === undefined || floatValue === null) return true
                  // 整數部分位數限制
                  const maxIntegerLength = cryptoRules.KOKON.maxInt
                  const integerPart = String(floatValue).split('.')[0]
                  return integerPart.length <= maxIntegerLength
                }}
                thousandSeparator
                type="text"
                inputMode="decimal"
                pattern="[0-9]*"
                id="quota"
                label="Amount of total bag"
                placeholder="Please enter"
                onValueChange={({ floatValue }) => onChange(floatValue)}
                className="h-9"
                fieldSuffix={Crypto.KOKON}
                error={errors.quota?.message}
                clearable
                onClear={() => setValue('quota', 0, { shouldValidate: true })}
              />
            )
          }}
        />
        <div className="flex space-x-2">
          {['10', '100', '500', '1000'].map(amount => (
            <Button
              key={amount}
              type="button"
              variant="outlineSoft"
              className="h-7 flex-1"
              onClick={() => setValue('quota', +amount, { shouldValidate: true })}
            >
              <Amount value={amount} crypto={Crypto.KOKON} />
            </Button>
          ))}
        </div>
      </div>

      {/* Amount range of each bag */}
      <div className="space-y-3 rounded-lg bg-[#1C1C1C] p-3">
        <p className="px-3 text-white/70">Amount range of each bag</p>
        <Controller
          name="minValue"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field }) => {
            const { ref, onChange, ...restField } = field
            return (
              <NumericFormat
                {...restField}
                getInputRef={ref}
                customInput={Input}
                allowNegative={false}
                decimalScale={cryptoRules.KOKON.maxDec}
                thousandSeparator
                type="text"
                inputMode="decimal"
                pattern="[0-9]*"
                id="minValue"
                label={
                  <div className="flex w-full justify-between pr-3">
                    <span>Minimum</span>
                    <span>{`(no under ${minValue})`}</span>
                  </div>
                }
                onValueChange={({ floatValue }) => {
                  onChange(floatValue)
                }}
                className="h-9 flex-1"
              />
            )
          }}
        />
        <Controller
          name="maxValue"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field }) => {
            const { ref, onChange, ...restField } = field
            return (
              <NumericFormat
                {...restField}
                getInputRef={ref}
                customInput={Input}
                allowNegative={false}
                decimalScale={cryptoRules.KOKON.maxDec}
                thousandSeparator
                type="text"
                inputMode="decimal"
                pattern="[0-9]*"
                id="maxValue"
                label="Maximum"
                onValueChange={({ floatValue }) => {
                  onChange(floatValue)
                }}
                className="h-9 flex-1"
              />
            )
          }}
        />
      </div>

      {/* Error / Hint */}
      {errorMessage ? (
        <div className="flex rounded-lg bg-[#1C1C1C] px-3 py-2">
          <p className="flex items-center space-x-1 text-xs font-normal text-app-red">
            <WarningIcon className="mr-1 h-4 w-4" />
            {errorMessage}
          </p>
        </div>
      ) : (
        <div className="rounded-lg bg-[#1C1C1C] px-3 py-2 text-xs font-normal text-white/70">
          {hintMessage}
        </div>
      )}
    </motion.div>
  )
}

export default LuckBag
