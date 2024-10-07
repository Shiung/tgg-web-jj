import { Link } from '@remix-run/react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import Amount from '~/components/amount'
import { parseAmount, formatKM, thousandSeparator } from '~/lib/amount'
import { successToast, errorToast } from '~/lib/toast'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'
import {
  cryptoDetails,
  depositCurrencies,
  isValidCrypto,
  cryptoRules,
  Crypto,
} from '~/consts/crypto'
import InfoIcon from '~/icons/info.svg?react'
import WarningIcon from '~/icons/warning.svg?react'
import { Controller, useForm } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import BigNumber from 'bignumber.js'

import { useActions } from './hooks'

import { useWalletContext } from '~/routes/wallet/provider'

const coins = depositCurrencies.map(crypto => ({
  name: cryptoDetails[crypto].name,
  icon: cryptoDetails[crypto].icon,
  amount: 0,
}))

interface SwapFormData {
  currency: string // 幣種
  amount: string // 金额
}

const ToastConf = {
  done: 'Transfer Done',
  error: 'Code is incorrect',
} as const

export default function Swap() {
  const [currentTab, setCurrentTab] = useState('buy')
  const [selectCurrency, setSelectCurrency] = useState<string>('')

  const { state, actions } = useWalletContext()
  const { walletTransferRateData, postTransfer } = useActions()

  const settingRule = useMemo(() => {
    if (
      !walletTransferRateData?.depositKokonMaximum ||
      !walletTransferRateData.depositKokonMinimum ||
      !walletTransferRateData.withdrawKokonMaximum ||
      !walletTransferRateData.withdrawKokonMinimum
    )
      return false

    const isBuy = currentTab === 'buy'

    const max =
      walletTransferRateData?.[isBuy ? 'depositKokonMaximum' : 'withdrawKokonMaximum'] ?? 0
    const min =
      walletTransferRateData?.[isBuy ? 'depositKokonMinimum' : 'withdrawKokonMinimum'] ?? 0
    const buttons =
      walletTransferRateData?.[isBuy ? 'depositSpeedAmount' : 'withdrawSpeedAmount'] ?? []
    return { max, min, buttons, origin: walletTransferRateData }
  }, [walletTransferRateData, currentTab])

  const formSchema = useMemo(() => {
    if (!settingRule) {
      return z.object({
        currency: z.string(),
        amount: z.string().min(1, 'required'),
      })
    } else {
      return z.object({
        currency: z.string(),
        amount: z
          .string()
          .min(1, 'required')
          .refine(
            val => {
              const valNum = val.replace(/,/g, '')
              const pAmount = parseAmount(valNum)
              return pAmount >= settingRule.min
            },
            {
              message: `Range: ${thousandSeparator(settingRule.min.toString())} ~ ${thousandSeparator(settingRule.max.toString())}`,
            }
          )
          .refine(
            val => {
              const valNum = val.replace(/,/g, '')
              const pAmount = parseAmount(valNum)
              return pAmount <= settingRule.max
            },
            {
              message: `Range: ${thousandSeparator(settingRule.min.toString())} ~ ${thousandSeparator(settingRule.max.toString())}`,
            }
          ),
      })
    }
  }, [settingRule])

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    setFocus,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SwapFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { currency: Crypto.KOKON, amount: '' },
    mode: 'onChange',
  })

  const selectedCurrency = watch('currency')
  const amountCurrent = watch('amount')

  const coinsCompute = useMemo(() => {
    const wallets = state.wallets
    return coins.map(c => ({
      ...c,
      amount: wallets?.find(({ currency }) => currency === c.name)?.balance ?? 0,
    }))
  }, [state.wallets])

  const resetHandler = useCallback(() => {
    setSelectCurrency('')
    reset()
  }, [reset])

  const selectedCurrencyRule = useMemo(() => {
    return isValidCrypto(selectedCurrency) ? cryptoRules[selectedCurrency] : null
  }, [selectedCurrency])

  const calculateAmoutTransfer = useMemo(() => {
    if (!selectCurrency || !settingRule) return false
    const inputAmount = parseAmount(amountCurrent.replace(/,/g, ''))
    if (currentTab === 'buy') {
      /** buy */
      return selectCurrency === Crypto.USDT
        ? /** kokon to usdt */
          BigNumber(inputAmount).div(BigNumber(settingRule.origin.usdt2KokonRate)).toNumber()
        : /** kokon to usdt to ton */
          BigNumber(inputAmount)
            .div(BigNumber(settingRule.origin.depositRate))
            .div(BigNumber(settingRule.origin.usdt2KokonRate))
            .toNumber()
    } else {
      /** sell */
      return selectCurrency === Crypto.USDT
        ? /** kokon to usdt */
          BigNumber(inputAmount).div(BigNumber(settingRule.origin.usdt2KokonRate)).toNumber()
        : /** kokon to usdt to ton */
          BigNumber(inputAmount)
            .div(BigNumber(settingRule.origin.withdrawRate))
            .div(BigNumber(settingRule.origin.usdt2KokonRate))
            .toNumber()
    }
  }, [settingRule, amountCurrent, currentTab, selectCurrency])

  const isAmountSufficient = useMemo(() => {
    if (calculateAmoutTransfer === false) return false
    if (currentTab === 'buy') {
      return BigNumber(calculateAmoutTransfer).lte(
        BigNumber(state.wallets?.find(({ currency }) => currency === selectCurrency)?.balance ?? 0)
      )
    } else {
      const inputAmount = parseAmount(amountCurrent.replace(/,/g, ''))
      return BigNumber(inputAmount).lte(
        BigNumber(state.wallets?.find(({ currency }) => currency === Crypto.KOKON)?.balance ?? 0)
      )
    }
  }, [calculateAmoutTransfer, state.wallets, currentTab, selectCurrency, amountCurrent])

  const onSubmit = (values: SwapFormData) => {
    const isBuy = currentTab === 'buy'
    postTransfer(
      {
        amount: values.amount,
        currency: selectCurrency as Crypto,
        type: isBuy ? 'IN' : 'OUT',
      },
      () => {
        resetHandler()
        actions.refetch()
        successToast(ToastConf.done)
      },
      () => {
        errorToast(ToastConf.error)
      }
    )
  }

  useEffect(() => {
    resetHandler()
  }, [currentTab, resetHandler])

  return (
    <div className="space-y-6 bg-black p-4">
      <Tabs defaultValue="buy" className="w-full">
        <TabsList className="w-full bg-[#1C1C1C]">
          <TabsTrigger
            value="buy"
            className="flex-1 data-[state=active]:bg-app-blue data-[state=active]:text-white"
            onClick={() => setCurrentTab('buy')}
          >
            Buy KOKON
          </TabsTrigger>
          <TabsTrigger
            value="sell"
            className="flex-1 data-[state=active]:bg-app-blue data-[state=active]:text-white"
            onClick={() => setCurrentTab('sell')}
          >
            Sell KOKON
          </TabsTrigger>
        </TabsList>
        <TabsContent value={currentTab} className="mt-0"></TabsContent>
      </Tabs>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-3">
          <div className="mt-3 flex flex-col space-y-2 rounded-xl bg-[#1C1C1C] p-3">
            {/* Amount 金額輸入框 */}
            <Controller
              name="amount"
              control={control}
              render={({ field }) => {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { ref, ...restField } = field
                return (
                  <NumericFormat
                    {...restField}
                    getInputRef={ref}
                    customInput={Input}
                    allowNegative={false}
                    decimalScale={selectedCurrencyRule?.maxDec || 0}
                    isAllowed={({ floatValue }) => {
                      if (floatValue === undefined || floatValue === null) return true
                      // 整數部分位數限制
                      const maxIntegerLength = selectedCurrencyRule?.maxInt || 6
                      const integerPart = String(floatValue).split('.')[0]
                      return integerPart.length <= maxIntegerLength
                    }}
                    thousandSeparator
                    type="text"
                    inputMode="decimal"
                    // pattern="[0-9.]*"
                    id="amount"
                    label="Amount"
                    placeholder="Please enter"
                    onValueChange={values => {
                      field.onChange(values.value)
                    }}
                    className="h-9"
                    fieldSuffix={selectedCurrency}
                    error={errors.amount?.message}
                    clearable
                    onClear={() => setValue('amount', '', { shouldValidate: true })}
                  />
                )
              }}
            />
            {settingRule && (
              <div className="flex flex-col pl-3 text-xs text-white/50">
                <div className="flex items-center space-x-1">
                  <InfoIcon className="h-3 w-3" />
                  <p>
                    Range: {formatKM(settingRule.min)} ~ {formatKM(settingRule.max)}
                  </p>
                </div>
                {/* <p className="pl-4">Ratio: 1 USDT=1,000,000 Kokon</p> */}
                <p className="pl-4">
                  Ratio: 1 USDT=&nbsp;
                  <Amount value={settingRule?.origin.usdt2KokonRate} crypto={Crypto.KOKON} />
                  &nbsp;KOKON
                </p>
              </div>
            )}
            {/* 快捷按钮 */}
            {settingRule && (
              <div className="flex justify-between space-x-2">
                {settingRule.buttons.map(amount => (
                  <Button
                    key={amount}
                    type="button"
                    className="h-7 flex-1"
                    variant="outlineSoft"
                    onClick={() => {
                      setValue('amount', amount.toString(), { shouldValidate: true })
                      setFocus('amount')
                    }}
                  >
                    {formatKM(amount)}
                  </Button>
                ))}
              </div>
            )}
          </div>

          <div className="mt-3 flex flex-col space-y-2 rounded-xl bg-[#1C1C1C] p-3">
            <p className="pl-3 text-xs text-white/70">Payment Method</p>
            {coinsCompute.map(coin => (
              <Button
                key={coin.name}
                className="h-7 flex-1 justify-between text-xs"
                variant="outlineSoft"
                type="button"
                isSelected={coin.name === selectCurrency}
                onClick={setSelectCurrency.bind(null, coin.name)}
              >
                <div className="flex items-center space-x-1">
                  <coin.icon className="h-4 w-4" />
                  <span className="pl-1">{coin.name}</span>
                </div>
                <Amount value={coin.amount} crypto={coin.name} />
              </Button>
            ))}
          </div>

          {!isAmountSufficient && (
            <div className="mt-3 flex justify-between rounded-xl bg-[#1C1C1C] px-3 py-2">
              <span className="flex items-center space-x-1 text-xs text-app-red">
                <WarningIcon className="h-4 w-4" />
                <span>Insufficient balance</span>
              </span>
              <Link to="/wallet/deposit">
                <Button className="flex h-6 items-center justify-center px-3">Go to deposit</Button>
              </Link>
            </div>
          )}
        </div>

        <div className="mt-6 flex flex-col space-y-3">
          {calculateAmoutTransfer !== false && (
            <div className="flex items-center justify-between text-white/70">
              <p className="text-xs text-white/70">
                You will &nbsp;
                {currentTab === 'buy' ? 'pay' : 'receive'} :
              </p>
              <p className="text-base font-extrabold text-white">
                <span className="pr-1">
                  <Amount value={calculateAmoutTransfer} crypto={selectCurrency} />
                </span>
                {selectCurrency}
              </p>
            </div>
          )}
          <Button
            catEars
            className="w-full"
            type="submit"
            disabled={!isValid || !isAmountSufficient}
            loading={isSubmitting}
          >
            Buy
          </Button>
        </div>
      </form>
    </div>
  )
}
