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
  suffix?: React.ReactNode
  onClear?: () => void
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      value,
      clearable = false,
      error,
      label,
      id,
      hint,
      suffix,
      onClear,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const [inputType, setInputType] = useState(type)
    const [isFocused, setIsFocused] = useState(false)
    const suffixRef = useRef<HTMLDivElement>(null)
    const [suffixWidth, setSuffixWidth] = useState(0)

    const showClearButton = useMemo(() => {
      return clearable && isFocused
    }, [clearable, isFocused])

    const paddingRight = useMemo(() => {
      let padding = 12
      if (suffixWidth) {
        padding += suffixWidth + 8
      }
      return `${padding}px`
    }, [suffixWidth])

    const handleTogglePassword = () => {
      setInputType(inputType === 'password' ? 'text' : 'password')
    }

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true)
      if (onFocus) {
        onFocus(e)
      }
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false)
      if (onBlur) {
        onBlur(e)
      }
    }

    useEffect(() => {
      if (suffixRef.current) {
        console.log('suffixRef.current.offsetWidth', suffixRef.current.offsetWidth)

        setSuffixWidth(suffixRef.current.offsetWidth)
      }
    }, [suffix])

    return (
      <div className="space-y-1">
        {label && <Label htmlFor={id}>{label}</Label>}
        <div className="relative w-full">
          <input
            type={inputType}
            id={id}
            className={cn(
              'flex h-10 w-full rounded-full border-[0.5px] border-white/20 bg-[#333] px-3 py-2 text-sm font-ultra file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:font-ultra placeholder:text-white/50 focus-within:ring-1 focus-within:ring-primary focus-within:ring-offset-0 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
              error ? 'input-error' : '',
              className
            )}
            style={{ paddingRight }}
            ref={ref}
            value={value}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />
          {/* suffix */}
          <div className="absolute inset-y-0 right-3 flex items-center space-x-1" ref={suffixRef}>
            {suffix && (
              <div ref={suffixRef} className="text-xs font-normal text-white/50 focus:outline-none">
                {suffix}
              </div>
            )}
            {showClearButton && (
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
          <p className="flex items-center pl-3 text-app-red">
            <WarningIcon className="mr-1 h-3 w-3" />
            {error}
          </p>
        )}
        {hint && (
          <p className="flex items-center pl-3 text-white/50">
            <InfoIcon className="mr-1 h-3 w-3" /> {hint}
          </p>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
