import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Controller, useFormContext } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'
import { Crypto, cryptoRules } from '~/consts/crypto'
import AddIcon from '~/icons/add.svg?react'
import MinusIcon from '~/icons/minus.svg?react'
import { KokonIcon } from '~/components/color-icons'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import Amount from '~/components/amount'
import WarningIcon from '~/icons/warning.svg?react'
import { GetSettingResponse } from '~/api/codegen/data-contracts'

import type { FormData } from './route'
import Message from './message'
import { QuickAmountSkeleton } from './skeleton'

interface NormalBagProps {
  packetSetting?: GetSettingResponse
}

const NormalBag: React.FC<NormalBagProps> = ({ packetSetting }) => {
  const minValue = useMemo(
    () => parseFloat(packetSetting?.minValue || '0'),
    [packetSetting?.minValue]
  )

  const {
    control,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<FormData>()
  const fixedValue = watch('fixedValue')
  const quantity = watch('quantity')
  const errorMessage = watch('errorMessage')

  return (
    <motion.div
      layout
      className="mt-3 flex flex-col items-stretch space-y-2 rounded-lg bg-gradient-to-b from-[#FDCB04] to-[#FF4D00] p-2"
    >
      {/* Amount of each bag */}
      <div className="space-y-3 rounded-lg bg-[#1C1C1C] p-3">
        <Controller
          name="fixedValue"
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
                id="distributedEachAmount"
                label="Amount of each bag"
                placeholder="Please enter"
                onValueChange={({ floatValue }) => onChange(floatValue)}
                className="h-9"
                fieldSuffix={Crypto.KOKON}
                error={errors.fixedValue?.message}
                clearable
                onClear={() => setValue('fixedValue', 0, { shouldValidate: true })}
              />
            )
          }}
        />
        <div className="flex space-x-2">
          {packetSetting?.shortcuts?.length ? (
            packetSetting.shortcuts.map(amount => (
              <Button
                key={amount}
                type="button"
                variant="outlineSoft"
                className="h-7 flex-1"
                onClick={() => setValue('fixedValue', +amount, { shouldValidate: true })}
              >
                <Amount value={amount} crypto={Crypto.KOKON} />
              </Button>
            ))
          ) : (
            <QuickAmountSkeleton />
          )}
        </div>
      </div>

      {/* Quantity */}
      <div className="flex items-end space-x-1 rounded-lg bg-[#1C1C1C] p-3">
        <Controller
          name="quantity"
          control={control}
          rules={{
            required: true,
            min: 1,
          }}
          render={({ field }) => {
            const { ref, onChange, ...restField } = field
            return (
              <NumericFormat
                {...restField}
                getInputRef={ref}
                customInput={Input}
                allowNegative={false}
                type="text"
                inputMode="decimal"
                pattern="[0-9]*"
                decimalScale={0}
                id="quantity"
                label="Quantity"
                isAllowed={values => {
                  const { value, floatValue } = values
                  return value === '' || !!(floatValue && floatValue > 0)
                }}
                onValueChange={({ floatValue }) => {
                  if (floatValue === 0) {
                    onChange(1)
                    return
                  }
                  onChange(floatValue)
                }}
                className="h-9 flex-1"
                fieldSuffix="Bags"
              />
            )
          }}
        />
        <Button
          variant="icon"
          type="button"
          className="h-9 flex-shrink-0 border-[0.5px] border-white/20 bg-[#333] p-[6px]"
        >
          <AddIcon
            onClick={() => {
              const currentQuantity = Number(getValues('quantity')) || 0
              setValue('quantity', currentQuantity + 1)
            }}
            className="h-6 w-6"
          />
        </Button>
        <Button
          variant="icon"
          type="button"
          className="h-9 flex-shrink-0 border-[0.5px] border-white/20 bg-[#333] p-[6px]"
        >
          <MinusIcon
            onClick={() => {
              const currentQuantity = Number(getValues('quantity')) || 0
              setValue('quantity', currentQuantity > 0 ? currentQuantity - 1 : 0)
            }}
            className="h-6 w-6"
          />
        </Button>
      </div>

      {/* Error */}
      <Message
        isVisible={!!errorMessage}
        className="flex rounded-lg bg-[#1C1C1C] px-3 py-2 opacity-100 transition-opacity duration-300 ease-in-out"
      >
        <p className="flex items-center space-x-1 text-xs font-normal text-app-red">
          <WarningIcon className="mr-1 h-4 w-4" />
          <span>{errorMessage}</span>
        </p>
      </Message>

      {/* Summary */}
      <div className="flex items-center space-x-2 break-all p-3 text-xs font-normal text-white/70">
        <div className="flex flex-[1_1_0] flex-col items-center space-y-1">
          <div className="flex items-center space-x-1">
            <KokonIcon className="h-5 w-5" />
            <Amount
              className="text-sm font-ultra text-white"
              value={fixedValue}
              crypto={Crypto.KOKON}
            />
          </div>
          <span>Each bag</span>
        </div>
        <div className="flex-shrink-0">X</div>
        <div className="flex flex-[1_1_0] flex-col items-center space-y-1">
          <span className="text-sm font-ultra text-white">{quantity}</span>
          <span>Quantity</span>
        </div>
        <div className="flex-shrink-0">=</div>
        <div className="flex flex-[1_1_0] flex-col items-center space-y-1">
          <div className="flex items-center space-x-1">
            <KokonIcon className="h-5 w-5" />
            <Amount
              className="text-sm font-ultra text-white"
              value={fixedValue * quantity}
              crypto={Crypto.KOKON}
            />
          </div>
          <div>Total Amount</div>
        </div>
      </div>
    </motion.div>
  )
}

export default NormalBag
