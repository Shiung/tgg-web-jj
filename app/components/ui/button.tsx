import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '~/lib/utils'

const buttonVariants = cva(
  'group relative inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium font-black ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50  transition-transform transform active:scale-95',
  {
    variants: {
      variant: {
        default: 'bg-primary text-black hover:bg-[#FFF871]',
        gray: 'bg-white/20 text-primary hover:bg-white/30',
        danger: 'bg-[#FF4D48] text-white hover:bg-[#FF716D]',
        outline: 'border border-primary text-primary hover:border-[#FFF871] hover:text-[#FFF871]',
        outlineSoft: 'border border-primary text-primary hover:bg-[#FFF871]/30',
      },
      size: {
        default: 'h-9 rounded-full py-1 px-4',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
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
        danger: 'text-[#FF4D48] group-hover:text-[#FF716D]',
        outline: 'text-primary',
        outlineSoft: 'text-primary',
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
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size, asChild = false, catEars = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    const earColorClass = earColorVariants({ variant })

    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
        {catEars && (
          <>
            {/* 左右貓耳 */}
            <CatEar className={cn('left-[18px]', earColorClass)} />
            <CatEar className={cn('right-[18px]', earColorClass)} />
          </>
        )}
        {props.children}
      </Comp>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
