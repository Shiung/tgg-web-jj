import toast from 'react-hot-toast'
import CheckIcon from '~/icons/check.svg?react'
import WarningIcon from '~/icons/warning.svg?react'

/**
 * 成功樣式的 Toast
 * @param message s
 * @returns
 */
const successToast = (message: string) =>
  toast(message, {
    icon: <CheckIcon className="h-4 w-4 text-white/70" />,
    className: 'bg-app-green text-white font-ultra p-2',
  })

/**
 * 失敗樣式的 Toast
 * @param message s
 * @returns
 */
const errorToast = (message: string) =>
  toast(message, {
    icon: <WarningIcon className="h-4 w-4 text-white/70" />,
    className: 'bg-app-red text-white font-ultra p-2',
  })

export { successToast, errorToast }
