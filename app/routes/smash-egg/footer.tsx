import styles from './index.module.scss'
import { useMemo } from 'react'
import type { FooterProps } from './types'

const eggName = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

export default function Footer({ marqueeList }: FooterProps) {
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
        <span className="text-[16px] font-extrabold">WINNER</span>
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
              <p key={`${item.customerName}-${index}`}>
                {item.customerName} just broke a{' '}
                <span className="text-[#FFF200]">{eggName(item.eggLevel)} egg</span> with{' '}
                <span className="text-4 px-1 font-extrabold">{item.reward}</span>USDT!
              </p>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
