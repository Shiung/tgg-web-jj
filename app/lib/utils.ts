/* eslint-disable @typescript-eslint/no-explicit-any */
import chalk from 'chalk'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { fallbackLng, supportedLngs } from '~/consts/i18n'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function printAppVersion() {
  const kokonArt = `
  ${chalk.hex('#FFD700').bold(`
  K    K   OOO   K    K   OOO   N   N
  K   K   O   O  K   K   O   O  NN  N
  KKKK    O   O  KKKK    O   O  N N N
  K   K   O   O  K   K   O   O  N  NN
  K    K   OOO   K    K   OOO   N   N
  `)}

  ${chalk.hex('#FFD700').bold(`APP VERSION: v${import.meta.env.VITE_APP_VERSION}`)}
  `
  console.info(kokonArt)
}

export const formatCountdown = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`
}

export function mapSystemLanguageCode(code?: string): string {
  if (!code) return fallbackLng
  code = code.toLowerCase()

  if (supportedLngs.includes(code)) {
    return code
  }

  const primaryCode = code.split('-')[0]
  if (supportedLngs.includes(primaryCode)) {
    return primaryCode
  }

  return fallbackLng
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

export function debounce(func: (...args: any[]) => void, delay: number) {
  let timeout: NodeJS.Timeout
  return (...args: any[]) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      func(...args)
    }, delay)
  }
}
