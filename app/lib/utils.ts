import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatKM(num: number, precision: number = 2, removeTrailingZeros: boolean = true) {
  const map = [
    // { suffix: 'T', threshold: 1e12 },
    // { suffix: 'B', threshold: 1e9 },
    { suffix: 'M', threshold: 1e6 },
    { suffix: 'K', threshold: 1e3 },
    { suffix: '', threshold: 1 },
  ]

  const found = map.find(x => Math.abs(num) >= x.threshold)
  if (found) {
    let formatted = (num / found.threshold).toFixed(precision)
    if (removeTrailingZeros) {
      formatted = parseFloat(formatted).toString()
    }
    return formatted + found.suffix
  }

  return `${num}`
}
