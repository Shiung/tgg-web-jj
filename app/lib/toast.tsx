import toast from 'react-hot-toast'
import CheckIcon from '~/icons/check.svg?react'
import WarningIcon from '~/icons/warning.svg?react'

/**
 * 成功樣式的 Toast
 * @param message s
 * @returns
 */
const successToast = (message: string) =>
  toast.custom(t => (
    <div
      className={`${
        t.visible ? 'animate-enter' : 'animate-leave'
      } pointer-events-auto flex items-center space-x-2 rounded-lg bg-app-green p-2`}
    >
      <CheckIcon className="h-4 w-4 text-white/70" />
      <span className="text-sm font-ultra text-white">{message}</span>
    </div>
  ))

/**
 * 失敗樣式的 Toast
 * @param message s
 * @returns
 */
const errorToast = (message: string) =>
  toast.custom(t => (
    <div
      className={`${
        t.visible ? 'animate-enter' : 'animate-leave'
      } pointer-events-auto flex items-center space-x-2 rounded-lg bg-app-red p-2`}
    >
      <WarningIcon className="h-4 w-4 text-white/70" />
      <span className="text-sm font-ultra text-white">{message}</span>
    </div>
  ))

export { successToast, errorToast }
