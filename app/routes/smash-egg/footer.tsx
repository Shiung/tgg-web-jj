// import styles from './index.module.scss'
import { useEffect, useRef } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { formatAmount } from '~/lib/amount'
import type { FooterProps } from './types'

export default function Footer({ marqueeList = [] }: FooterProps) {
  const { t } = useTranslation()
  const containerRef = useRef<HTMLDivElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()

  useEffect(() => {
    const containerWidth = containerRef.current ? containerRef.current.offsetWidth : 0
    const marqueeWidth = marqueeRef.current ? marqueeRef.current.scrollWidth : 0
    const speed = 100 // 每 100px 的移動時間（秒數）100px/s

    controls.set({ x: containerWidth })
    controls.start({
      x: -marqueeWidth / 2,
      transition: {
        x: {
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'linear',
          duration: marqueeWidth / speed,
        },
      },
    })
  }, [marqueeList, controls])

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

      <div
        className="h-[30px] w-full overflow-hidden rounded-sm bg-app-pink px-4 py-1 text-sm"
        ref={containerRef}
      >
        <motion.div className="flex flex-nowrap space-x-3" animate={controls} ref={marqueeRef}>
          {marqueeList.map((item, index) => (
            <p
              className="whitespace-nowrap font-normal text-white"
              key={`${item.customerName}-${index}`}
              dangerouslySetInnerHTML={{
                __html: t('eggMarquee', {
                  user: `<span> ${item.customerName}</span>`,
                  eggName: `<span class="text-primary"> ${t(`eggName.${item.eggLevel.toLocaleLowerCase()}`)}</span>`,
                  amount: `<span class="text-4 px-1 font-ultra text-white"> ${formatAmount(item.reward, { crypto: 'USDT' })}</span>`,
                }),
              }}
            ></p>
          ))}
        </motion.div>
      </div>
    </>
  )
}
