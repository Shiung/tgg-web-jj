import { useState } from 'react'
import { cn } from '~/lib/utils'

import { Link } from '@remix-run/react'
import { Button } from '~/components/ui/button'
import InfoIcon from '~/icons/info.svg?react'

import NormalBag from './normal-bag'
import LuckBag from './luck-bag'
import ShareSheet from './share-sheet'

import GetLuckyMoneyDialog from '~/components/get-lucky-money-dialog/index'

export default function LuckyMoneyShare() {
  const [luckBagType, setLuckBagType] = useState(0)

  return (
    <div className="mt-[-7px] flex w-full flex-1 flex-col items-center justify-between rounded-lg bg-black p-4">
      <div className="flex w-full flex-1 flex-col">
        {/* 上方兩顆按鈕 */}
        <div className="mb-6 flex w-full space-x-2">
          <Link prefetch="viewport" to="/lucky-money/list" className="flex-1">
            <Button variant="outlineSoft" className="h-7 w-full text-xs font-ultra text-primary">
              My share
            </Button>
          </Link>
          <Link prefetch="viewport" to="/lucky-money/share" className="flex-1">
            <Button
              variant="outlineSoft"
              className="h-7 w-full bg-[#FFF2004D] text-xs font-ultra text-primary"
            >
              Share New Bags
            </Button>
          </Link>
        </div>
        <div className="mb-3 text-sm font-ultra">Share My Lucky Money</div>
        {/* 紅包類型選擇 */}
        <div className="flex items-center justify-center space-x-2">
          <div
            onClick={() => setLuckBagType(0)}
            onKeyDown={() => {}}
            role="button"
            tabIndex={0}
            className={cn(
              'flex-1 rounded-xl border-[0.5px] border-solid border-primary',
              luckBagType === 0 ? 'bg-[#FFF2004D]' : ''
            )}
          >
            <div className="relative flex max-h-8 items-center border-b border-[#FFF2004D] px-3 py-2">
              <span className="text-xs font-ultra">Normal</span>
              <img
                src="/images/lucky-money/planBtnBg-normal.png"
                alt="PlanBtnBgNormal"
                className={cn(
                  'absolute bottom-0 right-0',
                  luckBagType === 0 ? 'h-10 w-[60px]' : 'h-8 w-[48px]'
                )}
              />
            </div>
            <div className="p-3 text-xs">
              The amount in each bag and total bag quantity is{' '}
              <span className="font-ultra">fixed</span>.
            </div>
          </div>
          <div
            onClick={() => setLuckBagType(1)}
            onKeyDown={() => {}}
            role="button"
            tabIndex={0}
            className={cn(
              'flex-1 rounded-xl border-[0.5px] border-solid border-primary',
              luckBagType === 1 ? 'bg-[#FFF2004D]' : ''
            )}
          >
            <div className="relative flex max-h-8 items-center border-b border-[#FFF2004D] px-3 py-2">
              <span className="text-xs font-ultra">Luck Battle</span>
              <img
                src="/images/lucky-money/planBtnBg-Luck.png"
                alt="PlanBtnBgNormal"
                className={cn(
                  'absolute bottom-0 right-0',
                  luckBagType === 1 ? 'h-10 w-[60px]' : 'h-8 w-[48px]'
                )}
              />
            </div>
            <div className="p-3 text-xs">
              The amount in each bag and total bag quantity is{' '}
              <span className="font-ultra">Radom</span>.
            </div>
          </div>
        </div>

        {/* 分享紅包 兩種類型 */}
        {luckBagType === 0 && <NormalBag />}
        {luckBagType === 1 && <LuckBag />}
      </div>

      {/* 提示區塊 */}
      <div className="mt-3 flex items-start rounded-lg bg-[#1C1C1C] p-2 text-[#FFFFFFB2]">
        <InfoIcon className="h-4 min-h-4 w-4 min-w-4" />
        <div className="ml-1 text-xs font-normal">
          Only unregistered friends can get the lucky money and become your potential referral
          member
        </div>
      </div>

      {/* 分享按鈕 */}
      <ShareSheet />
      <GetLuckyMoneyDialog />
    </div>
  )
}
