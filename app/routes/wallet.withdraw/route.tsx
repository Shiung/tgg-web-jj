import React, { useState, useMemo, useRef, useCallback, useEffect } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { NumericFormat } from 'react-number-format'
import { useTranslation } from 'react-i18next'

import { parseAmount } from '~/lib/amount'
import { successToast, errorToast } from '~/lib/toast'
import { apis } from '~/api/index'
import type { WithdrawRequest, WithdrawSettingGetResponse } from '~/api/codegen/data-contracts'
import { ValidCode } from '~/components/verify-button/constants'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import InfoIcon from '~/icons/info.svg?react'
import Amount from '~/components/amount'
import { UsdtIcon } from '~/components/color-icons'
import { Label } from '~/components/ui/label'
import InfoTooltip from '~/components/info-tooltip'
import VerifyButton, { type VerifyButtonExpose } from '~/components/verify-button'
import { cryptoDetails, isValidCrypto, cryptoRules, Crypto } from '~/consts/crypto'

import WithdrawSuccessDialog from './withdraw-success-dialog'
import WithdrawDeniedDialog from './withdraw-denied-dialog'
import WithdrewSkeleton from './withdrew-skeleton'
import SystemMaintenance from './system-maintenance'

type FormData = {
  amount: string
  chainNet: 'TON'
  currency: string
  address: string
  memo?: string
  fundPassword: string
  verificationCode: string
}

const formatPercentage = (value: string | undefined): string => {
  if (!value) return '0'
  const floatValue = parseFloat(value) / 100
  const formatted = floatValue.toFixed(6)
  return formatted.replace(/\.?0+$/, '')
}

export default function Withdraw() {
  // 當前選擇幣種
  const [selectedCurrency, setSelectedCurrency] = useState<'USDT' | 'TON'>('USDT')

  const { t } = useTranslation()

  const selectedCurrencyRule = useMemo(() => {
    return isValidCrypto(selectedCurrency) ? cryptoRules[selectedCurrency] : null
  }, [selectedCurrency])

  // 獲取提款設定
  const {
    data: withdrawSettingsRaw,
    isLoading,
    refetch: refetchWithdrawSettings,
  } = useQuery({
    queryKey: ['walletWithdrawSettings'],
    queryFn: () => apis.wallet.walletWithdrawSettingList(),
  })
  const currentSetting = useMemo(() => {
    if (!withdrawSettingsRaw) return null
    return (
      withdrawSettingsRaw.data.settings.find(setting => setting.currency === selectedCurrency) ||
      null
    )
  }, [withdrawSettingsRaw, selectedCurrency])

  // Prepare currencies
  const coins = useMemo(() => {
    return (withdrawSettingsRaw?.data?.settings ?? [])
      .filter(setting => setting.switch) // 判斷幣種是否啟用
      .map(setting => {
        if (isValidCrypto(setting.currency)) {
          return {
            name: setting.currency,
            icon: cryptoDetails[setting.currency]?.icon,
          }
        }
        return null
      })
      .filter((coin): coin is NonNullable<typeof coin> => Boolean(coin))
  }, [withdrawSettingsRaw?.data?.settings])
  // 幣種對應的icon
  interface ActiveIconProps {
    currency: string | undefined
    className?: string
  }
  const ActiveIcon = React.memo<ActiveIconProps>(({ currency, className = '' }) => {
    const IconComponent = useMemo(() => {
      if (!currency || !coins) return null
      return coins.find(el => el.name === currency)?.icon || null
    }, [currency])

    if (!IconComponent) return null
    return <IconComponent className={className} />
  })
  ActiveIcon.displayName = 'ActiveIcon'

  // 表單驗證
  const schema = useMemo(() => {
    if (!currentSetting) return z.object({})
    return z.object({
      amount: z
        .string()
        .min(1, t('AmountIsRequired'))
        .refine(val => !isNaN(parseAmount(val)), {
          message: t('MustBeAValidNumber'),
        })
        .refine(
          () => {
            return (currentSetting?.appliedTimes || 0) < (currentSetting?.dailyLimitTimes || 0)
          },
          {
            message: t('YouHaveReachedTheLimitOfDailyWithdrawal'),
          }
        )
        .refine(
          val => {
            const amount = parseAmount(val)
            const usedAmount = parseAmount(currentSetting.usedAmount)
            const dailyLimit = parseAmount(currentSetting.dailyLimitAmount)
            return usedAmount + amount <= dailyLimit
          },
          {
            message: t('YouHaveReachedTheLimitOfDailyWithdrawal'),
          }
        )
        .refine(
          val => {
            const amount = parseAmount(val)
            const availableAmount = parseAmount(currentSetting.availableForWithdraw)
            return amount <= availableAmount
          },
          {
            message: t('AvailableForWithdrawIsInsufficient'),
          }
        )
        .refine(
          val => {
            const amount = parseAmount(val)
            const minAmount = parseAmount(currentSetting.minimumAmount)
            return amount >= minAmount
          },
          {
            message: t('RangeRule', {
              minVal: parseAmount(currentSetting.minimumAmount),
              maxVal: parseAmount(currentSetting.maximumAmount),
            }),
          }
        )
        .refine(
          val => {
            const amount = parseAmount(val)
            const maxAmount = parseAmount(currentSetting.maximumAmount)
            return amount <= maxAmount
          },
          {
            message: t('RangeRule', {
              minVal: parseAmount(currentSetting.minimumAmount),
              maxVal: parseAmount(currentSetting.maximumAmount),
            }),
          }
        ),
      address: z.string().min(1, t('AddressIsRequired')),
      memo: z.string().optional(),
      fundPassword: z.string().min(1, t('FundPasswordIsRequired')),
      verificationCode: z.string().min(1, t('InputVerificationIsRequireError')),
    })
  }, [currentSetting, t])

  const {
    control,
    register,
    getValues,
    setValue,
    setFocus,
    handleSubmit,
    watch,
    reset: resetForm,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      amount: '',
      address: '',
      memo: '',
      fundPassword: '',
      verificationCode: '',
    },
  })

  // 手續費計算
  const calculateFee = useCallback(
    (amount: string, setting: WithdrawSettingGetResponse['settings'][0] | null): string | null => {
      if (!setting || !amount) return null

      const amountNum = parseAmount(amount)
      if (isNaN(amountNum)) return null

      const { feeType, feeSettingValue } = setting
      const feeValue = parseAmount(feeSettingValue)

      if (isNaN(feeValue)) return null

      if (feeType === 'fixed') {
        return feeSettingValue
      } else if (feeType === 'percentage') {
        return ((amountNum * feeValue) / 100).toFixed(8)
      }

      return null
    },
    []
  )

  const watchAmount = watch('amount')

  const fee = useMemo(
    () => calculateFee(watchAmount, currentSetting),
    [watchAmount, currentSetting, calculateFee]
  )
  const receiveAmount = useMemo(() => {
    const amount = parseAmount(watchAmount || '0')
    const feeAmount = fee ? parseAmount(fee) : 0
    return (amount - feeAmount).toFixed(8)
  }, [watchAmount, fee])

  // 快捷按钮
  const handleQuickAmountSelect = (value: string) => {
    if (value === 'max') {
      setValue('amount', currentSetting?.availableForWithdraw || '0')
    } else {
      setValue('amount', value)
    }
  }

  // 驗證碼
  const vbRef = useRef<VerifyButtonExpose>(null)

  // 送出表單流程 先檢查驗證碼正確 在送出提款請求
  const verifycodeCheck = useMutation({
    mutationFn: (code: string) => apis.customer.customerVerifycodeCreate({ code }),
    // TODO: spec 錯誤訊息 確認是哪一邊要維護 還有 i18n
    onError: (error: { response: { data: { message: string } } }) => {
      console.error('[ERROR] VerificationCodeIsIncorrect =>', error)
      errorToast(t('VerificationCodeIsIncorrect'))
    },
  })

  const withdrawMutation = useMutation({
    mutationFn: (data: WithdrawRequest) => apis.wallet.walletWithdrawCreate(data),
    onSuccess: () => {
      setIsSuccessDialogOpen(true)
      refetchWithdrawSettings()
      resetForm()
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      errorToast(error?.response?.data.message || error.message)
    },
  })
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false)

  const onSubmit = (data: z.infer<typeof schema>) => {
    // 使用类型断言确保 data 符合 FormData 类型
    const formData = data as FormData
    verifycodeCheck.mutate(formData.verificationCode, {
      onSuccess: () => {
        withdrawMutation.mutate({
          amount: formData.amount,
          chainNet: 'TON',
          currency: selectedCurrency,
          fundPassword: formData.fundPassword,
          recipientAddress: formData.address,
          ...(!!formData.memo && { memo: formData.memo }),
        })
      },
    })
  }

  // 切換幣種時，格式限制位數，避免超過限制造成輸入框卡住
  useEffect(() => {
    const amount = getValues('amount')
    if (!amount) return

    const { maxInt = 0, maxDec = 0 } = selectedCurrencyRule || {}
    const [integerPart = '', decimalPart = ''] = amount.split('.')
    const limitedInteger = integerPart.slice(0, maxInt)
    const limitedDecimal = decimalPart.slice(0, maxDec)
    const newAmount = limitedDecimal ? `${limitedInteger}.${limitedDecimal}` : limitedInteger
    setValue('amount', newAmount)
  }, [getValues, selectedCurrency, selectedCurrencyRule, setValue])

  if (isLoading) return <WithdrewSkeleton />
  if (!coins?.length) return <SystemMaintenance />
  return (
    <div className="bg-black p-4">
      {/* Choose currency */}
      <div className="relative flex flex-col justify-between space-y-2 rounded-xl bg-[#1C1C1C] p-3">
        <p className="pl-3 text-xs text-white/70">{t('ChooseCurrency')}</p>
        <div className="flex justify-between space-x-2">
          {coins?.length &&
            coins.map((coin, index) => (
              <Button
                key={`${coin}_${index}`}
                className="h-7 flex-1"
                variant="outlineSoft"
                isSelected={selectedCurrency === coin.name}
                onClick={() => setSelectedCurrency(coin.name as 'USDT' | 'TON')}
              >
                <coin.icon className="h-[18px] w-[18px]" />
                <span className="pl-1">{coin.name}</span>
              </Button>
            ))}
        </div>
      </div>

      <div className="mt-3 flex h-[26px] w-[115px] items-center justify-center rounded-t-xl bg-app-blue px-3 py-1 text-sm">
        {t('Network')}: <span className="font-ultra">{currentSetting?.chainNet}</span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-3 rounded-r-xl rounded-bl-lg bg-[#1C1C1C] p-3">
          {/* Address */}
          <div className="space-y-1">
            <Label htmlFor="address" className="text-xs">
              {t('Address')}
            </Label>
            <Input
              className={`h-9`}
              placeholder={t('PlaceholderEnter')}
              {...register('address')}
              error={errors?.address?.message}
            />
          </div>
          {/* Memo */}
          <div className="space-y-1">
            <Label htmlFor="memo" className="text-xs">
              {t('MemoOptional')}
            </Label>
            <Input className="h-9" {...register('memo')} placeholder={t('PlaceholderEnter')} />
          </div>
          <div className="flex space-x-2 rounded-lg bg-[#333] p-2 text-xs text-white/70">
            <InfoIcon className="h-4 w-4 flex-shrink-0" />
            <p className="">{t('MemoOptionalHint')}</p>
          </div>
          {/* Amount 金額輸入框 */}
          <div className="space-y-1">
            <Controller
              name="amount"
              control={control}
              rules={{ required: true }}
              render={({ field }) => {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { ref, onChange, ...restField } = field
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
                    pattern="[0-9.,]*"
                    id="amount"
                    label={t('Amount')}
                    placeholder={t('PlaceholderEnter')}
                    onValueChange={values => {
                      onChange(values.value)
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
            {!errors?.amount?.message && (
              <p className="flex items-center space-x-1 pl-3 text-xs text-white/50">
                <InfoIcon className="h-3 w-3" />
                <span>
                  {t('RangeRule', {
                    minVal: currentSetting?.minimumAmount,
                    maxVal: currentSetting?.maximumAmount,
                  })}
                </span>
              </p>
            )}
          </div>
          {/* 快捷按钮 */}
          {currentSetting && (
            <div className="mt-2 flex flex-wrap justify-between space-x-2">
              {currentSetting.presentAmounts.map((presentAmount, index) => (
                <Button
                  type="button"
                  key={`amount_${index}`}
                  className="mb-2 h-7 flex-1"
                  variant="outlineSoft"
                  onClick={() => {
                    handleQuickAmountSelect(presentAmount)
                    setFocus('amount')
                  }}
                >
                  <Amount value={presentAmount} crypto={selectedCurrency} />
                </Button>
              ))}
              <Button
                type="button"
                className="mb-2 h-7 flex-1"
                variant="outlineSoft"
                onClick={() => {
                  handleQuickAmountSelect('max')
                  setFocus('amount')
                }}
              >
                {t('Max')}
              </Button>
            </div>
          )}
          {/*  */}
          <div className="flex flex-col space-y-1 rounded-lg bg-[#333] px-3 py-2 text-xs text-white/70">
            <div className="flex justify-between">
              <div className="flex space-x-1">
                <p>{t('AvailableForWithdraw')}</p>
                <InfoTooltip
                  content={
                    <div className="flex w-72 items-center justify-between space-x-1 text-xs">
                      <div className="text-[#FFFFFFB2]">{t('WagerRequirement')}</div>
                      <div className="flex items-center">
                        <span className="pr-1 text-white">
                          <Amount value={currentSetting?.wagerRequirement} crypto={Crypto.USDT} />
                        </span>
                        <UsdtIcon className="h-3 w-3" />
                      </div>
                    </div>
                  }
                />
              </div>
              <div className="flex items-center">
                <Amount
                  className="pr-1 text-white"
                  value={currentSetting?.availableForWithdraw}
                  crypto={currentSetting?.currency}
                />
                <ActiveIcon currency={currentSetting?.currency} className="h-3 w-3" />
              </div>
            </div>
            {currentSetting?.feeType && (
              <div className="flex justify-between">
                <p>{t('Fee')}</p>
                <div className="flex items-center">
                  <span className="pr-1 text-white">
                    {currentSetting?.feeType === 'fixed' && currentSetting?.feeSettingValue}
                    {currentSetting?.feeType === 'percentage' &&
                      `${watch('amount') || 0} x ${formatPercentage(currentSetting?.feeSettingValue)}`}
                  </span>
                  <ActiveIcon currency={currentSetting?.currency} className="h-3 w-3" />
                </div>
              </div>
            )}
            <div className="flex justify-between">
              <p>{t('DailyLimitAmount')}</p>
              <div className="flex items-center">
                <span className="pr-1 text-white">
                  {currentSetting?.usedAmount}/{currentSetting?.dailyLimitAmount}
                </span>
                <ActiveIcon currency={currentSetting?.currency} className="h-3 w-3" />
              </div>
            </div>
            <div className="flex justify-between">
              <p>{t('DailyLimitTimes')}</p>
              <p>
                <span className="pr-1 text-white">
                  {currentSetting?.appliedTimes}/{currentSetting?.dailyLimitTimes}
                </span>
                {t('Times')}
              </p>
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="password" className="text-xs">
              {t('FundPassword')}
            </Label>
            <Input
              className="h-9"
              type="password"
              id="password"
              autoComplete="new-password"
              placeholder={t('PlaceholderEnter')}
              {...register('fundPassword')}
              error={errors?.fundPassword?.message}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="verificationCode" className="text-xs">
              {t('VerificationCode')}
            </Label>
            <Input
              className="h-9"
              id="verificationCode"
              placeholder={t('PlaceholderEnter')}
              {...register('verificationCode')}
              error={errors?.verificationCode?.message}
            />
          </div>
          {/* Verification Button */}
          <VerifyButton
            className="h-6 flex-1"
            ref={vbRef}
            kind={ValidCode.withdrawFundPin}
            successCallBack={successToast.bind(null, t('VerificationCheckMail'))}
            errorCallBack={() => {}}
          />
        </div>

        <div className="mt-6 flex flex-col space-y-3">
          <div className="flex items-center justify-between text-white/70">
            <p className="text-xs text-white/70">Receive amount: </p>
            <p className="text-base font-extrabold text-white">
              <Amount className="pr-1" value={receiveAmount} crypto={currentSetting?.currency} />
              {currentSetting?.currency}
            </p>
          </div>
          <Button
            catEars
            disabled={!isValid}
            loading={isLoading || verifycodeCheck.isPending || withdrawMutation.isPending}
            className="w-full"
            type="submit"
          >
            {t('Withdraw')}
          </Button>
        </div>
      </form>
      {/* 提款成功弹窗 */}
      <WithdrawSuccessDialog
        isOpen={isSuccessDialogOpen}
        onClose={() => setIsSuccessDialogOpen(false)}
      />
      {/* 確認是否有綁定提現密碼 */}
      <WithdrawDeniedDialog />
    </div>
  )
}
