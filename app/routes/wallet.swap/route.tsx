import { Link } from '@remix-run/react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import Amount from '~/components/amount'
import { parseAmount, formatKM, formatAmount } from '~/lib/amount'
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

import SystemMaintenance from '~/routes/wallet/system-maintenance'
import { useWalletContext } from '~/routes/wallet/provider'
import { useTranslation } from 'react-i18next'

const coins = depositCurrencies.map(crypto => ({
  name: cryptoDetails[crypto].name,
  icon: cryptoDetails[crypto].icon,
  amount: '0',
}))

interface SwapFormData {
  currency: string // 幣種
  amount: string // 金额
}

const ToastConf = {
  done: 'SwapSuccess',
  error: 'SwapError',
} as const

const ErrorMessage = {
  required: 'required',
  InsufficientBalance: 'InsufficientBalance',
}

export default function Swap() {
  const [currentTab, setCurrentTab] = useState('buy')
  const [selectCurrency, setSelectCurrency] = useState<string>('')

  const { t } = useTranslation()

  const { state, actions } = useWalletContext()
  const { walletTransferRateData, postTransfer } = useActions()

  const settingRule = useMemo(() => {
    if (
      !walletTransferRateData?.depositPCoinMaximum ||
      !walletTransferRateData.depositPCoinMinimum ||
      !walletTransferRateData.withdrawPCoinMaximum ||
      !walletTransferRateData.withdrawPCoinMinimum
    )
      return false

    const isBuy = currentTab === 'buy'

    const max =
      walletTransferRateData?.[isBuy ? 'depositPCoinMaximum' : 'withdrawPCoinMaximum'] ?? 0
    const min =
      walletTransferRateData?.[isBuy ? 'depositPCoinMinimum' : 'withdrawPCoinMinimum'] ?? 0
    const buttons =
      walletTransferRateData?.[isBuy ? 'depositSpeedAmount' : 'withdrawSpeedAmount'] ?? []
    return { max, min, buttons, origin: walletTransferRateData }
  }, [walletTransferRateData, currentTab])

  const formSchema = useMemo(() => {
    if (!settingRule) {
      return z.object({
        currency: z.string(),
        amount: z.string().min(1, ErrorMessage.required),
      })
    } else {
      return z.object({
        currency: z.string(),
        amount: z
          .string()
          .min(1, ErrorMessage.required)
          .refine(
            val => {
              const valNum = val.replace(/,/g, '')
              const pAmount = parseAmount(valNum)
              return pAmount >= settingRule.min
            },
            {
              message: ErrorMessage.InsufficientBalance,
            }
          )
          .refine(
            val => {
              const valNum = val.replace(/,/g, '')
              const pAmount = parseAmount(valNum)
              return pAmount <= settingRule.max
            },
            {
              message: ErrorMessage.InsufficientBalance,
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
    defaultValues: { currency: Crypto.KATON, amount: '' },
    mode: 'onChange',
  })

  const selectedCurrency = watch('currency')
  const amountCurrent = watch('amount')

  const coinsCompute = useMemo(() => {
    const wallets = state.wallets
    return coins.reduce<typeof coins>((returnArr, cur) => {
      const find = wallets?.find(({ currency }) => currency === cur.name)
      if (!find) return returnArr
      return returnArr.concat([{ ...cur, amount: find?.balance ?? '0' }])
    }, [])
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
        ? /** KATON to USDT */
          BigNumber(inputAmount).div(BigNumber(settingRule.origin.usdt2PCoinRate)).toNumber()
        : /** KATON to USDT to TON */
          BigNumber(inputAmount)
            .div(BigNumber(settingRule.origin.depositRate))
            .div(BigNumber(settingRule.origin.usdt2PCoinRate))
            .toNumber()
    } else {
      /** sell */
      return selectCurrency === Crypto.USDT
        ? /** KATON to USDT */
          BigNumber(inputAmount).div(BigNumber(settingRule.origin.usdt2PCoinRate)).toNumber()
        : /** KATON to USDT to TON */
          BigNumber(inputAmount)
            .div(BigNumber(settingRule.origin.withdrawRate))
            .div(BigNumber(settingRule.origin.usdt2PCoinRate))
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
        BigNumber(state.wallets?.find(({ currency }) => currency === Crypto.KATON)?.balance ?? 0)
      )
    }
  }, [calculateAmoutTransfer, state.wallets, currentTab, selectCurrency, amountCurrent])

  const onSubmit = async (values: SwapFormData) => {
    const isBuy = currentTab === 'buy'
    await postTransfer(
      {
        amount: values.amount.replace(/,/g, ''),
        currency: selectCurrency as Crypto,
        type: isBuy ? 'IN' : 'OUT',
      },
      () => {
        resetHandler()
        actions.refetch()
        successToast(t(ToastConf.done))
      },
      () => {
        errorToast(t(ToastConf.error))
      }
    )
  }

  useEffect(() => {
    resetHandler()
  }, [currentTab, resetHandler])

  if (!state.wallets?.length) return <SystemMaintenance />

  return (
    <div className="space-y-6 bg-black p-4">
      <Tabs defaultValue="buy" className="w-full">
        <TabsList className="w-full bg-[#1C1C1C]">
          <TabsTrigger
            value="buy"
            className="flex-1 data-[state=active]:bg-app-blue data-[state=active]:text-white"
            onClick={() => setCurrentTab('buy')}
          >
            {t('BuyKATON').toUpperCase()}
          </TabsTrigger>
          <TabsTrigger
            value="sell"
            className="flex-1 data-[state=active]:bg-app-blue data-[state=active]:text-white"
            onClick={() => setCurrentTab('sell')}
          >
            {t('SellKATON').toUpperCase()}
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
                    label={t('Amount')}
                    placeholder={t('PlaceholderEnter')}
                    onValueChange={values => {
                      // useForm reset 情境下會導致空值set兩次 第二次觸發validate
                      if (!values.value) return
                      field.onChange(values.value)
                    }}
                    className="h-9"
                    fieldSuffix={selectedCurrency}
                    error={errors.amount?.message && t(errors.amount?.message)}
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
                    {t('RangeRule', {
                      minVal: formatKM(settingRule.min),
                      maxVal: formatKM(settingRule.max),
                    })}
                  </p>
                </div>
                <p className="pl-4">
                  {t('RatioRule', {
                    amount: formatAmount(settingRule?.origin.usdt2PCoinRate, {
                      crypto: Crypto.KATON,
                    }),
                  })}
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
            <p className="pl-3 text-xs text-white/70">{t('PaymentMethod')}</p>
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
                <span>{t('InsufficientBalance')}</span>
              </span>
              {currentTab === 'buy' && (
                <Link to="/wallet/deposit">
                  <Button className="flex h-6 items-center justify-center px-3">
                    {t('GoToDeposit')}
                  </Button>
                </Link>
              )}
            </div>
          )}
        </div>

        <div className="mt-6 flex flex-col space-y-3">
          {calculateAmoutTransfer !== false && (
            <div className="flex items-center justify-between text-white/70">
              <p className="text-xs text-white/70">
                {t(currentTab === 'buy' ? 'YouWillPay' : 'YouWillReceive')} :
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
            {t(currentTab === 'buy' ? 'Buy' : 'Sell')}
          </Button>
        </div>
      </form>
    </div>
  )
}
