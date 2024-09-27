import { cva, type VariantProps } from 'class-variance-authority'
import { useMemo } from 'react'
import { cn } from '~/lib/utils'
import useStore from '~/stores/useStore'

const appLoadingVariants = cva(
  'fixed inset-x-0 inset-y-3 mx-auto z-50 flex flex-col items-center justify-center overflow-hidden rounded-xl',
  {
    variants: {
      variant: {
        blur: 'bg-[#333333]/50 backdrop-blur',
        system: 'bg-black bg-top bg-no-repeat',
      },
    },
    defaultVariants: {
      variant: 'blur',
    },
  }
)

export interface AppLoadingProps extends VariantProps<typeof appLoadingVariants> {
  className?: string
}

export default function AppLoading({ className, variant = 'blur' }: AppLoadingProps) {
  const maxWidth = useStore(state => state.maxWidth)
  const systemStyle = useMemo(() => {
    return variant === 'system'
      ? {
          backgroundImage: `url('/images/system-bg.png')`,
          backgroundSize: '100% auto',
          maxWidth: maxWidth,
        }
      : {}
  }, [maxWidth, variant])

  return (
    <div className={cn(appLoadingVariants({ variant }), className)} style={systemStyle}>
      <img
        width={128}
        height={128}
        src="/images/loading.png"
        alt="loading"
        className="animate-spin-with-pause"
      />
      <span className="mt-10 text-2xl font-ultra">Loading</span>
    </div>
  )
}
