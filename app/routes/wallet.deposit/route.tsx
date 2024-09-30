import { useCallback, useEffect, useMemo, useState } from 'react'
import { ConnectedWallet, useTonConnectUI } from '@tonconnect/ui-react'
import { beginCell, toNano } from '@ton/ton'
import { useQuery } from '@tanstack/react-query'
import { NumericFormat } from 'react-number-format'
import { Controller, useForm } from 'react-hook-form'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { cryptoDetails, cryptoRules, isValidCrypto, Crypto } from '~/consts/crypto'
import { useToast } from '~/hooks/use-toast'
import { apis } from '~/api'

import { CurrenciesSkeleton } from './skeleton'
import DepositAddress from './deposit-address'
import TonConnectButton from './ton-connect-button'
import DepositViaAddressDialog from './deposit-via-address-sheet'

interface DepositFormData {
  currency: string // 幣種
  address: string // 地址
  comment: string // 備註
  amount: string // 金额
}

export default function Deposit() {
  // ton-connect 相關
  const [tonConnectUI] = useTonConnectUI()
  const [isConnected, setIsConnected] = useState(tonConnectUI.connected)

  /* 獲取充值設定 */
  const { data: depositSettingData, isLoading: settingLoading } = useQuery({
    queryKey: ['getDepositSetting'],
    queryFn: apis.wallet.walletDepositSettingList,
  })
  /* 獲取充值資訊 */
  const { data: depositCreateData } = useQuery({
    queryKey: ['walletDepositCreate'],
    queryFn: apis.wallet.walletDepositCreate,
  })

  const {
    control,
    handleSubmit,
    setValue,
    setFocus,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm<DepositFormData>({
    defaultValues: { currency: '', address: '', comment: '', amount: '' },
    mode: 'onChange',
  })

  const selectedCurrency = watch('currency')

  const { toast } = useToast()

  // Prepare currencies
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

  const selectedCurrencyRule = useMemo(() => {
    return isValidCrypto(selectedCurrency) ? cryptoRules[selectedCurrency] : null
  }, [selectedCurrency])

  const handleCurrencySelect = useCallback(
    (currencyName: string) => {
      setValue('currency', currencyName)
    },
    [setValue]
  )

  const onSubmit = async (data: DepositFormData) => {
    console.log('Form Data:', data)
    if (!isValid) return
    if (!isValidCrypto(data.currency)) return

    let transaction
    if (data.currency === Crypto.TON) {
      const body = beginCell().storeUint(0, 32).storeStringTail('').endCell()
      transaction = {
        validUntil: Math.floor(Date.now() / 1000) + 360, // 当前时间 + 6 分钟（单位：秒）
        messages: [
          {
            address: data.address,
            amount: toNano(data.amount).toString(), // nanoton
            payload: body.toBoc().toString('base64'),
          },
        ],
      }
    } else if (data.currency === Crypto.USDT) {
      console.log('USDT')
    }
    if (!transaction) return
    console.log('交易信息:', transaction)

    // 處理 TON 交易
    try {
      const result = await tonConnectUI.sendTransaction(transaction)
      console.log('交易成功發送', result)
      // TODO: 換 Notification 樣式
      toast({
        title: 'Deposited successfully',
        variant: 'success',
      })
    } catch (error) {
      toast({
        title: 'Deposited unsuccessfully',
        variant: 'error',
      })
      console.error('交易失敗:', error)
    }
  }

  useEffect(() => {
    const handleStatusChange = (walletInfo: ConnectedWallet | null) => {
      if (walletInfo?.account) {
        setIsConnected(true)
      } else {
        setIsConnected(false)
      }
    }
    const unsubscribe = tonConnectUI.onStatusChange(handleStatusChange)
    return () => {
      unsubscribe()
    }
  }, [tonConnectUI])

  useEffect(() => {
    if (currencies?.length && currencies[0]?.name) {
      handleCurrencySelect(currencies[0].name)
    }
  }, [currencies, handleCurrencySelect, setValue])

  useEffect(() => {
    if (depositCreateData?.data) {
      setValue('address', depositCreateData?.data?.depositAddress || '')
      setValue('comment', depositCreateData?.data?.comment || '')
    }
  }, [depositCreateData?.data, setValue])

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

          {/* 金額輸入框 */}
          <Controller
            name="amount"
            control={control}
            rules={{ required: true }}
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
                  type="text"
                  inputMode="decimal"
                  pattern="[0-9.]*"
                  id="amount"
                  label="Amount"
                  placeholder="Please enter"
                  onValueChange={values => {
                    console.log('onValueChange', values)
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
          {/* 快捷金额按钮 */}
          <div className="flex justify-between space-x-2">
            {(selectedCurrencySetting?.presentAmounts || []).map(amount => (
              <Button
                key={amount}
                type="button"
                className="h-7 flex-1"
                variant="outlineSoft"
                onClick={() => {
                  setValue('amount', amount, { shouldValidate: true })
                  setFocus('amount')
                }}
              >
                {amount}
              </Button>
            ))}
          </div>
        </div>
        {/* 提交按钮 */}
        <div className="mt-6 flex flex-col items-stretch space-y-3">
          {isConnected ? (
            <Button type="submit" disabled={!isValid} loading={isSubmitting}>
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
