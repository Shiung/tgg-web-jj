import { useRef, useMemo, useCallback } from 'react'
import {
  type ValueAnimationTransition,
  animate,
  useInView,
  useIsomorphicLayoutEffect,
} from 'framer-motion'
import Decimal, { BigNumber } from 'bignumber.js'

import { cn } from '~/lib/utils'
import { cryptoRules, isValidCrypto } from '~/consts/crypto'
import { formatKM } from '~/lib/amount'

type AnimatedCounterProps = {
  from: number
  to: number
  crypto?: string
  animationOptions?: ValueAnimationTransition<number>
  className?: string
  customMaxInt?: number
  customMaxDec?: number
  useKM?: boolean
  removeTrailingZeros?: boolean
}

const defaultMaxInt = 10 // 默认最大整数位数
const defaultMaxDec = 2 // 默认最大小数位数

// 判斷幾位小數
function getDecimalPlaces(value: number | string): number {
  const decimalValue = new Decimal(value)
  const places = decimalValue.decimalPlaces?.() ?? 0
  return places > 4 ? 4 : places
}

const AnimatedCounter = ({
  from,
  to,
  animationOptions,
  className,
  crypto,
  customMaxInt,
  customMaxDec,
  useKM = false,
  removeTrailingZeros = true,
}: AnimatedCounterProps) => {
  // 數字動畫處理
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  // 根據傳進來數字決定顯示動畫要用幾位數去跑
  const decimalPlaces = useMemo(() => getDecimalPlaces(from - to), [to, from])

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
      duration: animationOptions?.duration ?? 10,
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
  }, [inView, from, to])

  // 金額顯示規則
  const { maxInt, maxDec } = useMemo(() => {
    const isValid = isValidCrypto(crypto)
    const rules =
      crypto && isValid
        ? cryptoRules[crypto as keyof typeof cryptoRules]
        : { maxInt: undefined, maxDec: undefined }

    return {
      maxInt: customMaxInt ?? rules.maxInt ?? defaultMaxInt,
      maxDec: customMaxDec ?? rules.maxDec ?? defaultMaxDec,
    }
  }, [crypto, customMaxInt, customMaxDec])

  // 數字格式化
  const formattedValue = useCallback(
    (to: number) => {
      const _value = new BigNumber(to || 0)
      if (useKM) return formatKM(_value.toNumber())
      const formatted =
        removeTrailingZeros && maxDec > 0
          ? _value.decimalPlaces(maxDec).toString()
          : _value.toFixed(maxDec)
      const [intPart, decPart] = formatted.split('.')
      const truncatedIntPart = intPart.length > maxInt ? intPart.slice(0, maxInt) : intPart
      return decPart ? `${truncatedIntPart}.${decPart}` : truncatedIntPart
    },
    [useKM, removeTrailingZeros, maxDec, maxInt]
  )

  return <span ref={ref} className={cn(className)} />
}

export default AnimatedCounter
