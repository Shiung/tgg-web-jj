import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'

import { cn } from '~/lib/utils'

const buttonVariants = cva(
  'group relative inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium font-ultra transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed transition-transform transform active:scale-95',
  {
    variants: {
      variant: {
        default: 'bg-primary text-black hover:bg-[#FFF871]',
        gray: 'bg-white/20 text-primary hover:bg-white/30',
        danger: 'bg-app-red text-white hover:bg-[#FF716D]',
        outline: 'border border-primary text-primary hover:border-[#FFF871] hover:text-[#FFF871]',
        outlineSoft: 'border border-primary text-primary hover:bg-[#FFF871]/30',
        menu: 'bg-[#1C1C1C] rounded-xl border border-transparent text-white hover:border-primary hover:text-primary hover:bg-[#FFF871]/30',
        select: 'bg-[#333] border-[0.5px] border-white/20 text-white',
        icon: 'opacity-70 transition-opacity rounded-full hover:opacity-100',
      },
      size: {
        default: 'h-9 py-1 px-4', // 36px
        md: 'h-7 py-1 px-4', // 28px
        sm: 'h-6 px-3', // 24px
        xs: 'h-[18px] px-2', // 18px
        icon: 'h-6 w-6 p-0',
      },
      isSelected: {
        true: '!bg-[#FFF871]/30 !border-primary !text-primary', // 選中樣式
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      isSelected: false,
    },
  }
)

const earColorVariants = cva(
  'absolute -top-[6px] transform transition-transform group-active:scale-95',
  {
    variants: {
      variant: {
        default: 'text-primary group-hover:text-[#FFF871]',
        gray: 'text-white/20 group-hover:text-white/30',
        danger: 'text-app-red group-hover:text-[#FF716D]',
        outline: 'text-primary',
        outlineSoft: 'text-primary',
        menu: '',
        select: '',
        icon: '',
      },
    },
  }
)

const CatEar: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="6"
    viewBox="0 0 12 6"
    fill="none"
    className={cn(className)}
  >
    <path
      d="M4.93934 1.06066C5.52513 0.474874 6.47487 0.474874 7.06066 1.06066L12 6H0L4.93934 1.06066Z"
      fill="currentColor"
    />
  </svg>
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  catEars?: boolean
  isSelected?: boolean
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'default',
      size,
      isSelected = false,
      asChild = false,
      catEars = false,
      loading = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button'
    const earColorClass = earColorVariants({ variant })
    const isDisabled = loading || disabled

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, isSelected, className }))}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        <>
          {catEars && (
            <>
              {/* 左右貓耳 */}
              <CatEar className={cn('left-[18px]', earColorClass)} />
              <CatEar className={cn('right-[18px]', earColorClass)} />
            </>
          )}
          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : props.children}
        </>
      </Comp>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
