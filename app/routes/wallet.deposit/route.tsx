import { useCallback, useEffect, useMemo } from 'react'
import { useTonConnectUI, useTonWallet } from '@tonconnect/ui-react'
import { useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { cryptoDetails, isValidCrypto } from '~/consts/crypto'
import { apis } from '~/api'

import { CurrenciesSkeleton } from './skeleton'
import DepositAddress from './deposit-address'
import TonConnectButton from './ton-connect-button'
import DepositViaAddressDialog from './deposit-via-address-sheet'
import { removeTrailingZerosByCurrency, sanitizeAmountInputByCurrency } from '~/lib/amount'

interface DepositFormData {
  currency: string // 幣種
  address: string // 地址
  amount: string // 金额
}

export default function Deposit() {
  /* 充值設定 */
  const { data: depositSettingData, isLoading: settingLoading } = useQuery({
    queryKey: ['getDepositSetting'],
    queryFn: apis.wallet.walletDepositSettingList,
  })
  /* 充值資訊 */
  const { data: depositCreateData } = useQuery({
    queryKey: ['walletDepositCreate'],
    queryFn: apis.wallet.walletDepositCreate,
  })
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<DepositFormData>({
    defaultValues: { currency: '', address: '', amount: '' },
  })
  const selectedCurrency = watch('currency')

  // ton-connect 相關
  const [tonConnectUI] = useTonConnectUI()
  const tonWallet = useTonWallet()

  const currencies = useMemo(
    () =>
      depositSettingData?.data?.settings
        ?.map(e => {
          if (isValidCrypto(e.currency)) {
            return {
              name: e.currency as string,
              icon: cryptoDetails[e.currency]?.icon,
            }
          }
          return null
        })
        .filter((currency): currency is NonNullable<typeof currency> => Boolean(currency)),
    [depositSettingData?.data?.settings]
  )

  const selectedCurrencySetting = useMemo(() => {
    const settings = depositSettingData?.data?.settings
    return settings?.find(item => item.currency === selectedCurrency)
  }, [depositSettingData?.data, selectedCurrency])

  const handleCurrencySelect = useCallback(
    (currencyName: string) => {
      setValue('currency', currencyName)
    },
    [setValue]
  )

  const onSubmit = (data: DepositFormData) => {
    console.log('Form Data:', data)
  }

  useEffect(() => {
    if (currencies?.length && currencies[0]?.name) {
      handleCurrencySelect(currencies[0].name)
    }
  }, [currencies, handleCurrencySelect, setValue])

  useEffect(() => {
    setValue('address', tonWallet?.account?.address || '')
  }, [tonWallet, setValue])

  useEffect(() => {
    console.log('form errors', errors)
  }, [errors])

  return (
    <div className="bg-black p-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Choose currency */}
        <div className="flex flex-col justify-between space-y-2 rounded-xl bg-[#1C1C1C] p-3">
          <p className="pl-3 text-xs text-white/70">Choose currency</p>
          {settingLoading || !currencies?.length ? (
            <CurrenciesSkeleton />
          ) : (
            <div className="flex justify-between space-x-2">
              {currencies.map((currency, index) => (
                <Button
                  key={`${currency.name}_${index}`}
                  className="h-7 flex-1"
                  variant="outlineSoft"
                  isSelected={selectedCurrency === currency.name}
                  onClick={() => handleCurrencySelect(currency.name)}
                >
                  <currency.icon className="h-[18px] w-[18px]" />
                  <span className="pl-1">{currency.name}</span>
                </Button>
              ))}
            </div>
          )}
        </div>
        <div className="mt-3 flex flex-col space-y-2 rounded-xl bg-[#1C1C1C] p-3">
          {/* Deposit address */}
          <DepositAddress />

          {/* Amount */}
          <Input
            type="number"
            inputMode="decimal"
            pattern="[0-9.]*"
            autoComplete="off"
            className="h-9"
            id="amount"
            label="Amount"
            placeholder="Please enter"
            suffix={selectedCurrency}
            error={errors.amount?.message}
            clearable
            onClear={() => setValue('amount', '', { shouldValidate: true })}
            {...register('amount', {
              setValueAs: value => sanitizeAmountInputByCurrency(value, selectedCurrency), // 在输入时处理格式
              onBlur: e => {
                const finalValue = removeTrailingZerosByCurrency(e.target.value, selectedCurrency) // 失去焦点或提交时去除尾随0
                setValue('amount', finalValue, { shouldValidate: true })
              },
              required: 'Amount is required',
              // validate,
            })}
          />
          <div className="flex justify-between space-x-2">
            {(selectedCurrencySetting?.presentAmounts || []).map(amount => (
              <Button
                key={amount}
                className="h-7 flex-1"
                variant="outlineSoft"
                onClick={() => setValue('amount', amount, { shouldValidate: true })}
              >
                {amount}
              </Button>
            ))}
          </div>
        </div>
        <div className="mt-6 flex flex-col items-stretch space-y-3">
          {tonConnectUI.connected ? (
            <Button disabled={!isValid} type="submit">
              Deposit
            </Button>
          ) : (
            <TonConnectButton />
          )}
          <DepositViaAddressDialog currency={selectedCurrency} info={depositCreateData?.data} />
        </div>
      </form>
    </div>
  )
}
