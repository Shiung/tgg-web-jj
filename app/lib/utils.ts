/* eslint-disable @typescript-eslint/no-explicit-any */
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { fallbackLng, supportedLngs } from '~/consts/i18n'

/**
 * 組裝 classnames 的工具函數，支援 tailwind 和 clsx
 * @param inputs
 * @returns string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// console.log(`
// ██╗  ██╗ ██████╗ ██╗  ██╗ ██████╗ ███╗   ██╗
// ██║ ██╔╝██╔═══██╗██║ ██╔╝██╔═══██╗████╗  ██║
// █████╔╝ ██║   ██║█████╔╝ ██║   ██║██╔██╗ ██║
// ██╔═██╗ ██║   ██║██╔═██╗ ██║   ██║██║╚██╗██║
// ██║  ██╗╚██████╔╝██║  ██╗╚██████╔╝██║ ╚████║
// ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝
// `)
// console.log(`
//   K    K   OOO   K    K   OOO   N   N
//   K   K   O   O  K   K   O   O  NN  N
//   KKKK    O   O  KKKK    O   O  N N N
//   K   K   O   O  K   K   O   O  N  NN
//   K    K   OOO   K    K   OOO   N   N
// `)

/**
 * 打印應用版本號
 */
export function printAppVersion() {
  console.info(
    `%c
  ██╗  ██╗ ██████╗ ██╗  ██╗ ██████╗ ███╗   ██╗
  ██║ ██╔╝██╔═══██╗██║ ██╔╝██╔═══██╗████╗  ██║
  █████╔╝ ██║   ██║█████╔╝ ██║   ██║██╔██╗ ██║
  ██╔═██╗ ██║   ██║██╔═██╗ ██║   ██║██║╚██╗██║
  ██║  ██╗╚██████╔╝██║  ██╗╚██████╔╝██║ ╚████║
  ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝
    v${import.meta.env.VITE_APP_VERSION}
  `,
    'color: #FFD700'
  )
}

/**
 * 格式倒數計時器分秒
 * @param seconds
 * @returns string
 */
export const formatCountdown = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`
}

/**
 * 格式化成系統支援語言代號
 * @param code 通用語言代號
 * @returns string 系統支援語言代號
 */
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

/**
 * 偵測作業系統代號 (Android, iOS, Windows, MacOS)
 * @returns string
 */
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

  // Unknown 未知操作系统
  return '-'
}

/**
 * 建立後端資源圖片 URL (domain/resource/...)
 * @param path
 * @returns
 */
export function buildResourceImageUrl(path?: string): string {
  if (typeof window === 'undefined') {
    throw new Error('window object is not available')
  }

  if (!path) return ''

  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path
  }

  const currentDomain = window.location.origin
  return `${currentDomain}/resource/${path}`
}

/**
 * 防抖函數
 * @param func
 * @param delay
 * @returns
 */
export function debounce(func: (...args: any[]) => void, delay: number) {
  let timeout: NodeJS.Timeout
  return (...args: any[]) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      func(...args)
    }, delay)
  }
}
