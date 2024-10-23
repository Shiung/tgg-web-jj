import { useCallback, useEffect, useMemo, useState } from 'react'
import { ConnectedWallet, useTonConnectUI } from '@tonconnect/ui-react'
import { Address, beginCell, JettonMaster, toNano } from '@ton/ton'
import { useQuery } from '@tanstack/react-query'
import { NumericFormat } from 'react-number-format'
import { Controller, useForm } from 'react-hook-form'
import toast, { type Toast } from 'react-hot-toast'
import { cn } from '~/lib/utils'

import { apis } from '~/api'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import Amount from '~/components/amount'
import { cryptoDetails, cryptoRules, isValidCrypto, Crypto } from '~/consts/crypto'
import CloseIcon from '~/icons/x.svg?react'
import { errorToast } from '~/lib/toast'
import { useTonConnect } from '~/hooks/useTonConnect'

import { JETTON_TRANSFER_GAS_FEES, USDT_MASTER_ADDRESS } from './const'
import { DepositSkeleton } from './skeleton'
import DepositAddress from './deposit-address'
import TonConnectButton from './ton-connect-button'
import DepositViaAddressDialog from './deposit-via-address-sheet'
import SystemMaintenance from './system-maintenance'
import { JettonWallet } from './JettonWallet'
import { calculateUsdtAmount } from './helper'
import { useTranslation } from 'react-i18next'

const ToastSuccess = ({ props }: { props: Toast }) => {
  const { t } = useTranslation()
  return (
    <div
      className={cn(
        'pointer-events-auto relative mx-3 mt-[calc(100vh_/_2_-_172px)] flex w-full max-w-md rounded-lg bg-black shadow-lg ring-1 ring-app-green',
        props.visible ? 'animate-toast-enter' : 'animate-toast-leave'
      )}
    >
      <div className="flex flex-1 items-center justify-between space-x-2 p-3">
        <img
          className="h-12 w-12 flex-shrink-0 object-contain"
          src="/images/wallet/deposit/confirm.png"
          alt=""
        />
        <div className="flex-1">
          <p className="text-base font-ultra text-white">{t('DepositedSuccessfully')}</p>
          <p className="text-xs text-white/70">{t('DepositedSuccessfullyContent')}</p>
        </div>
      </div>
      <Button
        variant="icon"
        size="icon"
        onClick={() => toast.remove(props.id)}
        className="absolute right-1 top-1"
      >
        <CloseIcon className="h-4 w-4 text-white/70" />
      </Button>
    </div>
  )
}

// 充值提交成功通知
export const successNotify = () =>
  toast.custom(t => <ToastSuccess props={t} />, {
    duration: 5000,
  })

interface DepositFormData {
  currency: string // 幣種
  address: string // 地址
  comment: string // 備註
  amount: string // 金额
}

export default function Deposit() {
  // ton-connect 相關
  const { sender, walletAddress, tonClient } = useTonConnect()
  const [tonConnectUI] = useTonConnectUI()
  const [isConnected, setIsConnected] = useState(tonConnectUI.connected)
  const { t } = useTranslation()

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    setFocus,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm<DepositFormData>({
    defaultValues: { currency: '', address: '', comment: '', amount: '' },
    mode: 'onChange',
  })

  const selectedCurrency = watch('currency')

  /* 獲取充值設定 */
  const { data: depositSettingRaw, isLoading: settingLoading } = useQuery({
    queryKey: ['getDepositSetting'],
    queryFn: apis.wallet.walletDepositSettingList,
  })
  /* 獲取充值資訊 */
  const { data: depositCreateData } = useQuery({
    queryKey: ['walletDepositCreate', { currency: selectedCurrency }],
    queryFn: () =>
      apis.wallet.walletDepositCreate({ currency: selectedCurrency as 'TON' | 'USDT' }),
    enabled: isValidCrypto(selectedCurrency),
  })

  const { currencies, availableCurrencySettings } = useMemo(() => {
    if (!depositSettingRaw?.data?.settings) return { currencies: [], availableCurrencySetting: [] }

    const availableCurrencySettings = depositSettingRaw.data.settings.filter(
      setting => setting.switch
    )

    const currencies = availableCurrencySettings
      .map(e => {
        if (isValidCrypto(e.currency)) {
          return {
            name: e.currency as string,
            icon: cryptoDetails[e.currency]?.icon,
          }
        }
        return null
      })
      .filter((currency): currency is NonNullable<typeof currency> => Boolean(currency))

    return { currencies, availableCurrencySettings }
  }, [depositSettingRaw?.data?.settings])

  const selectedCurrencySetting = useMemo(() => {
    return availableCurrencySettings?.find(item => item.currency === selectedCurrency)
  }, [availableCurrencySettings, selectedCurrency])

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
    console.log('Form Data:', data, tonClient, walletAddress)
    if (!isValid) return
    if (!isValidCrypto(data.currency)) return
    if (!tonClient || !walletAddress) return

    try {
      // 處理 TON 交易
      if (data.currency === Crypto.TON) {
        const body = beginCell().storeUint(0, 32).storeStringTail(data.comment).endCell()
        const transaction = {
          validUntil: Math.floor(Date.now() / 1000) + 360, // 当前时间 + 6 分钟（单位：秒）
          messages: [
            {
              address: data.address,
              amount: toNano(data.amount).toString(), // nanoton
              payload: body.toBoc().toString('base64'),
            },
          ],
        }

        const result = await tonConnectUI.sendTransaction(transaction)
        console.log('TON transaction success', result)
        successNotify()
      } else if (data.currency === Crypto.USDT) {
        // 處理 USDT 交易
        console.log('USDT')
        const jettonMaster = tonClient.open(JettonMaster.create(USDT_MASTER_ADDRESS))
        const usersUsdtAddress = await jettonMaster.getWalletAddress(walletAddress)

        console.log('USDT walletAddress:', walletAddress, 'data.address', data.address)

        // creating and opening jetton wallet instance.
        // First argument (provider) will be automatically substituted in methods, which names starts with 'get' or 'send'
        const jettonWallet = tonClient.open(JettonWallet.createFromAddress(usersUsdtAddress))

        await jettonWallet.sendTransfer(sender, {
          fwdAmount: 1n,
          comment: data.comment,
          jettonAmount: calculateUsdtAmount(+data.amount * 100),
          toAddress: Address.parse(data.address),
          value: JETTON_TRANSFER_GAS_FEES,
        })
        console.log('USDT transaction success')
        successNotify()
      }
    } catch (error) {
      errorToast(t('DepositedUnsuccessfully'))
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

  if (settingLoading) return <DepositSkeleton />
  if (!currencies?.length) return <SystemMaintenance />
  return (
    <div className="bg-black p-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Choose currency */}
        <div className="flex flex-col justify-between space-y-2 rounded-xl bg-[#1C1C1C] p-3">
          <p className="pl-3 text-xs text-white/70">{t('ChooseCurrency')}</p>
          <div className="flex justify-between space-x-2">
            {currencies.map((currency, index) => (
              <Button
                key={`${currency.name}_${index}`}
                type="button"
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
        </div>

        <div className="mt-3 flex flex-col space-y-2 rounded-xl bg-[#1C1C1C] p-3">
          {/* Deposit address */}
          <DepositAddress />

          {/* Amount 金額輸入框 */}
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
                  pattern="[0-9.]*"
                  id="amount"
                  label={t('Amount')}
                  placeholder={t('PlaceholderEnter')}
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
                <Amount
                  value={amount}
                  crypto={isValidCrypto(selectedCurrency) ? selectedCurrency : undefined}
                />
              </Button>
            ))}
          </div>
        </div>
        {/* 提交按钮 */}
        <div className="mt-6 flex flex-col items-stretch space-y-3">
          {isConnected ? (
            <Button type="submit" disabled={!isValid} loading={isSubmitting}>
              {t('Deposit')}
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
