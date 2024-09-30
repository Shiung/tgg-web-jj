import { forwardRef, useEffect, useMemo, useRef, useState } from 'react'
import { cn } from '~/lib/utils'
import WarningIcon from '~/icons/warning.svg?react'
import XIcon from '~/icons/x.svg?react'
import PasswordShowIcon from '~/icons/password-show.svg?react'
import PasswordHideIcon from '~/icons/password-hide.svg?react'
import InfoIcon from '~/icons/info.svg?react'
import { Button } from './button'
import { Label } from './label'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  clearable?: boolean
  error?: string // 表單錯誤訊息
  label?: string // 輸入框的標籤
  id?: string // 用於與 label 關聯的 id
  hint?: string
  fieldSuffix?: React.ReactNode
  onClear?: () => void
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type, clearable = false, error, label, id, hint, fieldSuffix, onClear, ...props },
    ref
  ) => {
    const [inputType, setInputType] = useState(type)
    const fieldSuffixRef = useRef<HTMLDivElement>(null)
    const [suffixWidth, setSuffixWidth] = useState(0)

    const paddingRight = useMemo(() => {
      let padding = 12
      if (suffixWidth) {
        padding += suffixWidth + 8
      }
      if (clearable) {
        padding += 24
      }
      return `${padding}px`
    }, [clearable, suffixWidth])

    const handleTogglePassword = () => {
      setInputType(inputType === 'password' ? 'text' : 'password')
    }

    useEffect(() => {
      if (fieldSuffixRef.current) {
        setSuffixWidth(fieldSuffixRef.current.offsetWidth)
      }
    }, [fieldSuffix])

    return (
      <div className="space-y-1">
        {label && <Label htmlFor={id}>{label}</Label>}
        <div className="relative w-full">
          <input
            type={inputType}
            id={id}
            className={cn(
              'flex h-10 w-full rounded-full border-[0.5px] border-white/20 bg-[#333] px-3 py-2 text-sm font-ultra file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:font-ultra placeholder:text-white/50 focus-within:ring-1 focus-within:ring-primary focus-within:ring-offset-0 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
              'appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none', // 隱藏自帶輸入框數字控件
              error ? 'input-error' : '', // 錯誤樣式
              className
            )}
            style={{ paddingRight }}
            ref={ref}
            {...props}
          />
          {/* suffix area */}
          <div className="absolute inset-y-0 right-3 flex items-center space-x-1">
            {fieldSuffix && (
              <div
                ref={fieldSuffixRef}
                className="flex items-center text-xs font-normal text-white/50 focus:outline-none"
              >
                {fieldSuffix}
              </div>
            )}
            {clearable && (
              <Button
                variant="icon"
                size="icon"
                type="button"
                onClick={onClear}
                className="text-white focus:outline-none"
              >
                <XIcon className="h-4 w-4" />
              </Button>
            )}
            {type === 'password' && (
              <Button
                variant="icon"
                size="icon"
                type="button"
                onClick={handleTogglePassword}
                className="text-white focus:outline-none"
              >
                {inputType === 'password' ? (
                  <PasswordHideIcon className="h-4 w-4" />
                ) : (
                  <PasswordShowIcon className="h-4 w-4" />
                )}
              </Button>
            )}
          </div>
        </div>
        {error && (
          <p className="flex items-center pl-3 text-xs text-app-red">
            <WarningIcon className="mr-1 h-3 w-3" />
            {error}
          </p>
        )}
        {hint && (
          <p className="flex items-center pl-3 text-xs text-white/50">
            <InfoIcon className="mr-1 h-3 w-3" /> {hint}
          </p>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
