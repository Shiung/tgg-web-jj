import styles from './index.module.scss'
import { useMemo } from 'react'
import type { FooterProps } from './types'
import { useTranslation } from 'react-i18next'
import { formatAmount } from '~/lib/amount'

const eggName = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

export default function Footer({ marqueeList }: FooterProps) {
  const { t } = useTranslation()
  const repeatedMarqueeList = useMemo(() => {
    return marqueeList ? [...marqueeList, ...marqueeList] : []
  }, [marqueeList])

  return (
    <>
      <div className="flex items-center justify-evenly">
        <img
          className="inline-block h-[33px] w-[52px]"
          src="/images/smash-egg/winner.png"
          alt="Winner"
        />
        <span className="text-[16px] font-ultra">{t('eggFooterTitle')}</span>
        <img
          className="inline-block h-[33px] w-[52px]"
          src="/images/smash-egg/winner.png"
          alt="Winner"
        />
      </div>

      <div className="rounded-[8px] bg-[#F54798] px-4 py-1 text-sm">
        <div className={styles['marquee-container']}>
          <div className={styles.marquee}>
            {repeatedMarqueeList.map((item, index) => (
              <p
                key={`${item.customerName}-${index}`}
                dangerouslySetInnerHTML={{
                  __html: t('eggMarquee', {
                    user: `<span> ${item.customerName}</span>`,
                    eggName: `<span class="text-[#FFF200]"> ${t(`eggName.${item.eggLevel.toLocaleLowerCase()}`)}</span>`,
                    amount: `<span class="text-4 px-1 font-ultra text-white"> ${formatAmount(item.reward, { crypto: 'USDT' })}</span>`,
                  }),
                }}
              ></p>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
