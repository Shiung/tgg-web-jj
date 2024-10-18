import { useRef, useMemo, useCallback } from 'react'
import { cn } from '~/lib/utils'
import { BigNumber } from 'bignumber.js'
import { cryptoRules, isValidCrypto } from '~/consts/crypto'
import { formatKM } from '~/lib/amount'

import { KeyframeOptions, animate, useInView, useIsomorphicLayoutEffect } from 'framer-motion'

type AnimatedCounterProps = {
  from: number
  to: number
  crypto?: string
  animationOptions?: KeyframeOptions
  className?: string
  customMaxInt?: number
  customMaxDec?: number
  useKM?: boolean
  removeTrailingZeros?: boolean
}

const defaultMaxInt = 10 // 默认最大整数位数
const defaultMaxDec = 2 // 默认最大小数位数

// 判斷幾位小數
function getDecimalPlaces(value: number): number {
  const valueString = value.toString()
  const decimalIndex = valueString.indexOf('.')
  if (decimalIndex === -1) {
    return 0 // 没有小数部分
  }
  return valueString.length - decimalIndex - 1
}

const AnimatedCounter = ({
  from,
  to,
  animationOptions,
  className,
  crypto,
  customMaxInt,
  customMaxDec,
  useKM,
  removeTrailingZeros = true,
}: AnimatedCounterProps) => {
  // 數字動畫處理
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useIsomorphicLayoutEffect(() => {
    const element = ref.current
    if (!element) return
    if (!inView) return
    // Set initial value
    element.textContent = String(from)
    // If reduced motion is enabled in system's preferences
    if (window.matchMedia('(prefers-reduced-motion)').matches) {
      element.textContent = String(to)
      return
    }
    const controls = animate(from, to, {
      duration: 10,
      ease: 'easeOut',
      ...animationOptions,
      onUpdate(value) {
        element.textContent = value.toFixed(decimalPlaces)
      },
      onComplete() {
        // 最後呈現的數字
        element.textContent = formattedValue(to)
      },
    })
    // Cancel on unmount
    return () => {
      controls.stop()
    }
  }, [ref, inView, from, to])

  const decimalPlaces = useMemo(() => getDecimalPlaces(from - to), [to, from])

  // 金額顯示規則
  const isValid = useMemo(() => isValidCrypto(crypto), [crypto])
  const { maxInt, maxDec } = useMemo(() => {
    const rules =
      crypto && isValid
        ? cryptoRules[crypto as keyof typeof cryptoRules]
        : { maxInt: undefined, maxDec: undefined }
    return {
      maxInt: customMaxInt ?? rules.maxInt ?? defaultMaxInt,
      maxDec: customMaxDec ?? rules.maxDec ?? defaultMaxDec,
    }
  }, [crypto, customMaxInt, customMaxDec, isValid])

  // 數字格式化
  const formattedValue = useCallback(
    (to: number) => {
      const _value = new BigNumber(to || 0)

      if (useKM) return formatKM(_value.toNumber())

      const formatted =
        removeTrailingZeros && maxDec > 0
          ? _value.decimalPlaces(maxDec).toString() // 去除尾部 0
          : _value.toFixed(maxDec) // 保留所有小数位

      // eslint-disable-next-line prefer-const
      let [intPart, decPart] = formatted.split('.')
      const truncatedIntPart = intPart.length > maxInt ? intPart.slice(0, maxInt) : intPart

      return decPart ? `${truncatedIntPart}.${decPart}` : truncatedIntPart
    },
    [useKM, removeTrailingZeros, maxDec, maxInt]
  )

  return <span ref={ref} className={cn(className)} />
}

export default AnimatedCounter
