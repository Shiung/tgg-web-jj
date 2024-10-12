import { useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Link } from '@remix-run/react'
import { useQuery } from '@tanstack/react-query'
import { FormProvider, useForm } from 'react-hook-form'
import { cn } from '~/lib/utils'
import InfoIcon from '~/icons/info.svg?react'
import { apis } from '~/api'
import { Crypto } from '~/consts/crypto'
import { parseAmount } from '~/lib/amount'
import { Button } from '~/components/ui/button'
import { useGetCryptoWallet } from '~/hooks/api/useWallet'

// import GetLuckyMoneyDialog from '~/components/get-lucky-money-dialog/index'

import NormalBag from './normal-bag'
import LuckBag from './luck-bag'
import ShareSheet from './share-sheet'
import SwitchTab from '../lucky-money/switch-tab'

export type FormData = {
  /* 紅包種類 */
  distributeKind: 'FIXED' | 'RANDOM'
  /* 隨機金額上限 */
  maxValue: number
  /* 隨機金額下限 */
  minValue: number
  /* 隨機奬勵預算 */
  quota: number
  /* 固定每包金額 */
  distributedEachBagAmount: number
  /* 固定總數量 */
  quantity: number
  // 提示訊息
  hintMessage: string
  errorMessage: string
}

const distributeKindOptions = [
  {
    label: 'Normal',
    desc: 'fixed',
    value: 'FIXED',
    img: '/images/lucky-money/planBtnBg-normal.png',
  },
  {
    label: 'Luck battle',
    desc: 'radom',
    value: 'RANDOM',
    img: '/images/lucky-money/planBtnBg-Luck.png',
  },
] as const

export default function LuckyMoneyShare() {
  const { data: packetSettingRaw } = useQuery({
    queryKey: ['packetSettingList'],
    queryFn: apis.packetSetting.packetSettingList,
  })

  const kokonWallet = useGetCryptoWallet(Crypto.KOKON)

  const methods = useForm<FormData>({
    defaultValues: {
      distributeKind: 'FIXED',
      quantity: 1,
    },
    mode: 'onChange',
  })

  const [
    distributeKind,
    distributedEachBagAmount,
    quantity,
    minValue,
    maxValue,
    quota,
    errorMessage,
  ] = methods.watch([
    'distributeKind',
    'distributedEachBagAmount',
    'quantity',
    'minValue',
    'maxValue',
    'quota',
    'errorMessage',
  ])

  useEffect(() => {
    const kokonBalance = parseAmount(kokonWallet?.balance)

    if (distributeKind === 'FIXED') {
      // 固定紅包
      const distributedAmount = (distributedEachBagAmount || 0) * (quantity || 0)
      methods.setValue(
        'errorMessage',
        distributedAmount > kokonBalance ? 'Insufficient balance in wallet' : ''
      )
    } else {
      // 隨機紅包
      const _quota = quota || 0
      const _minValue = minValue || 1
      const _maxValue = maxValue || 1

      // 计算最小和最大潜在邀请人数
      const minReferrals = Math.floor(_quota / _maxValue) || 0
      const maxReferrals = Math.floor(_quota / _minValue) || 0

      methods.setValue(
        'errorMessage',
        _quota > kokonBalance ? 'Insufficient balance in wallet' : ''
      )
      methods.setValue('hintMessage', `Potential referrals: ${minReferrals}~${maxReferrals} people`)
    }
  }, [
    distributeKind,
    distributedEachBagAmount,
    minValue,
    maxValue,
    kokonWallet?.balance,
    methods,
    quantity,
    quota,
  ])

  return (
    <FormProvider {...methods}>
      <form className="-mt-4 flex w-full flex-1 flex-col items-stretch justify-start rounded-lg bg-black p-4">
        <div className="flex flex-1 flex-col">
          {/* Tab */}
          <SwitchTab />
          {/* Title */}
          <span className="mb-3 mt-6 text-base font-ultra">Share my lucky money</span>
          {/* Type */}
          <div className="flex items-center justify-center space-x-2">
            {distributeKindOptions.map(option => (
              <div
                key={option.value}
                onClick={() => methods.setValue('distributeKind', option.value)}
                onKeyDown={() => {}}
                role="button"
                tabIndex={0}
                className={cn(
                  'aspect-[168/104] flex-1 rounded-lg border-[0.5px] border-solid border-primary',
                  'transition duration-300 ease-in-out',
                  distributeKind === option.value ? 'bg-primary/30' : ''
                )}
              >
                <div className="relative flex max-h-8 items-center border-b border-primary/30 px-3 py-2">
                  <span className="text-xs font-ultra">{option.label}</span>
                  <img
                    src={option.img}
                    alt="planBtnBg normal"
                    className={cn(
                      'absolute bottom-0 right-0 h-8 w-12 transition-all duration-300 ease-in-out',
                      distributeKind === option.value ? 'h-10 w-[60px]' : 'h-8 w-[48px]'
                    )}
                  />
                </div>
                <div className="p-3 text-xs font-normal text-white/70">
                  The amount in each bag and total bag quantity is{' '}
                  <span className="font-ultra text-white">{option.desc}</span>.
                </div>
              </div>
            ))}
          </div>
          <AnimatePresence>
            {distributeKind === 'FIXED' && <NormalBag />}
            {distributeKind === 'RANDOM' && <LuckBag />}
          </AnimatePresence>
        </div>

        {/* Hint */}
        <div className="mt-3 flex items-start rounded-lg bg-[#1C1C1C] p-2 text-[#FFFFFFB2]">
          <InfoIcon className="h-4 min-h-4 w-4 min-w-4" />
          <div className="ml-1 text-xs font-normal">
            Only unregistered friends can get the lucky money and become your potential referral
            member.
          </div>
        </div>

        {/* Operation */}
        {errorMessage ? (
          <Link className="mt-6" to="/wallet/deposit">
            <Button className="w-full" catEars>
              Deposit
            </Button>
          </Link>
        ) : (
          <ShareSheet />
        )}

        {/* <GetLuckyMoneyDialog /> */}
      </form>
    </FormProvider>
  )
}
