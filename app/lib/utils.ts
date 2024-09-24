/* eslint-disable @typescript-eslint/no-explicit-any */
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

export const formatCountdown = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`
}

export function detectOS() {
  if (typeof navigator === 'undefined') return ''

  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera

  // 检测 Android
  if (/android/i.test(userAgent)) {
    return 'Android'
  }

  // 检测 iOS
  if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
    return 'iOS'
  }

  // 检测 Windows
  if (/Win(dows )?/i.test(userAgent)) {
    return 'Windows'
  }

  // 检测 MacOS
  if (/Macintosh|Mac OS X/i.test(userAgent)) {
    return 'MacOS'
  }

  // 未知操作系统
  return 'Unknown'
}
