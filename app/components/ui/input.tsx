import { forwardRef } from 'react'
import { cn } from '~/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'flex h-10 w-full rounded-full border-[0.5px] border-white/20 bg-[#333] px-3 py-2 text-sm font-ultra file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:font-ultra placeholder:text-white/50 focus-within:ring-1 focus-within:ring-primary focus-within:ring-offset-0 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = 'Input'

export { Input }
