import { Button } from '~/components/ui/button'
import type { StandbyCardProps } from './types'
import { Trans, useTranslation } from 'react-i18next'
import Amount from '~/components/amount'

export default function StandbyCard({
  handleStartButtonClick,
  handleChangeEgg,
  prizePool,
  hammerCount,
}: StandbyCardProps) {
  const { t } = useTranslation()
  const pricePool = t('pricePool')
  return (
    <div>
      {/* Game pannel */}
      <div className="relative z-10 mt-5 flex justify-center px-6">
        <div className="flex h-[94px] w-[100%] flex-col gap-1 rounded-xl bg-black bg-opacity-50 px-4 py-2 text-center">
          <p className="text-center text-base font-ultra leading-[22px] text-[#FDCB04]">
            {t(`eggName.${prizePool?.eggLevel || ''}`).toLocaleUpperCase()}
          </p>
          <div className="h-[20px]">
            <span
              className='class="color-white flex items-center justify-center text-xs font-ultra leading-[16px]'
              dangerouslySetInnerHTML={{
                __html: t('eggSmashNeedHammer', {
                  icon: `<i class="inline-block h-5 w-7 bg-[url('/images/smash-egg/hammer.png')] bg-contain bg-no-repeat"></i>`,
                  hammer: `<span class="color-white text-sm font-ultra leading-[18px]">
                            ${prizePool?.hammerSpent ?? 0}
                          </span>`,
                }),
              }}
            ></span>
          </div>

          <p className="flex items-center justify-center gap-1 rounded-xl bg-black bg-opacity-70 px-3 py-1.5 text-xs">
            {pricePool.split('{{value}}')[0]}
            <span className="text-xs font-ultra tracking-[-1px]">
              {' '}
              <Amount value={prizePool?.displayUsdtPrizeMin ?? 0} crypto="USDT" />
              -
              <Amount value={prizePool?.displayUsdtPrizeMax ?? 0} crypto="USDT" />
            </span>{' '}
            {pricePool.split('{{value}}')[1]}
          </p>
        </div>

        <button
          type="button"
          onClick={() => handleChangeEgg(false)}
          className="absolute left-2 top-[50%] h-[30px] w-[30px] translate-y-[-50%] rounded-full bg-[#FDCB04] p-2"
        >
          <img src="/images/smash-egg/icon-arrow-left.png" alt="Left arrow" />
        </button>
        <button
          type="button"
          onClick={() => handleChangeEgg(true)}
          className="absolute right-2 top-[50%] h-[30px] w-[30px] translate-y-[-50%] rounded-full bg-[#FDCB04] p-2"
        >
          <img src="/images/smash-egg/icon-arrow-right.png" alt="Right arrow" />
        </button>
      </div>
      <div className="relative mt-3 text-black">
        <Button
          catEars
          className="w-full"
          disabled={hammerCount < (prizePool?.hammerSpent ?? 1)}
          onClick={handleStartButtonClick}
        >
          Start
        </Button>
      </div>
    </div>
  )
}
