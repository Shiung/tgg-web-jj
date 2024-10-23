import { useMemo } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { useTranslation } from 'react-i18next'
import { cn } from '~/lib/utils'
import useStore from '~/stores/useStore'
import { systemBgImgBase64, systemLoadingImgBase64 } from './base64-imgs'

const appLoadingVariants = cva(
  'mx-auto z-50 flex flex-col items-center justify-center overflow-hidden rounded-xl',
  {
    variants: {
      variant: {
        blur: 'absolute inset-0 bg-[#333333]/50 backdrop-blur',
        system: 'fixed inset-x-0 inset-y-3 bg-black bg-top bg-no-repeat',
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
  const { t } = useTranslation()
  const maxWidth = useStore(state => state.maxWidth)
  const systemStyle = useMemo(() => {
    return variant === 'system'
      ? {
          backgroundImage: `url(${systemBgImgBase64})`,
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
        src={systemLoadingImgBase64}
        alt="loading"
        className="animate-spin-with-pause"
      />
      <span className="mt-10 text-2xl font-ultra">{t('Loading')}</span>
    </div>
  )
}
