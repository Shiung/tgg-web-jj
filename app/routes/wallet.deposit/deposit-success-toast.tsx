import { motion, useAnimation } from 'framer-motion'
import toast, { Toast } from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { Button } from '~/components/ui/button'
import { cn } from '~/lib/utils'
import CloseIcon from '~/icons/x.svg?react'
import { useEffect } from 'react'

const DepositSuccessToast = ({ props }: { props: Toast }) => {
  const { t } = useTranslation()
  const controls = useAnimation()

  const handleClose = () => {
    toast.remove(props.id)
  }

  useEffect(() => {
    if (props.visible) {
      const duration = (props.duration || 5000) / 1000
      controls.start({ width: '0%' }, { duration, ease: 'linear' })
    }
    return () => {
      controls.stop()
    }
  }, [props.visible, controls, props.duration])

  return (
    <div
      className={cn(
        'pointer-events-auto relative mx-3 mt-[calc(100vh_/_2_-_172px)] flex w-full max-w-md flex-col overflow-hidden rounded-lg bg-black shadow-lg ring-1 ring-app-green',
        props.visible ? 'animate-toast-enter' : 'animate-toast-leave'
      )}
    >
      <div className="flex flex-1 items-center justify-between space-x-2 p-3">
        <img
          className="h-12 w-12 flex-shrink-0 object-contain"
          src="/images/wallet/deposit/confirm.png"
          alt=""
        />
        <div className="flex-1">
          <p className="text-base font-ultra text-white">{t('DepositedSuccessfully')}</p>
          <p className="text-xs text-white/70">{t('DepositedSuccessfullyContent')}</p>
        </div>
      </div>
      <div className="mt-2 h-1 rounded bg-[#333333]">
        <motion.div
          className="h-full rounded bg-app-green"
          initial={{ width: '100%' }}
          animate={controls}
        />
      </div>
      <Button variant="icon" size="icon" onClick={handleClose} className="absolute right-1 top-1">
        <CloseIcon className="h-4 w-4 text-white/70" />
      </Button>
    </div>
  )
}

export default DepositSuccessToast
