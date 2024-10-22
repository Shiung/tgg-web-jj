import { useCallback } from 'react'
import { apis } from '~/api/index'
import { useMutation } from '@tanstack/react-query'
import Lottie from 'lottie-react'
import { useTranslation } from 'react-i18next'

// 元件
import { Dialog, DialogContent } from '~/components/ui/dialog'
import { Button } from '~/components/ui/button'

// lottie
import LVto2 from './lottie/levelup1to2.json'
import LVto3 from './lottie/levelup2to3.json'
import LVto4 from './lottie/levelup3to4.json'
import LVto5 from './lottie/levelup4to5.json'

const levelAnimations = {
  2: LVto2,
  3: LVto3,
  4: LVto4,
  5: LVto5,
}

interface LevelupDialogProps {
  finalClass: number
  isOpen: boolean
  onClose: () => void
}

const LevelupDialog: React.FC<LevelupDialogProps> = ({ isOpen, onClose, finalClass }) => {
  const { t } = useTranslation()
  const { mutate } = useMutation({
    mutationFn: (finalClass: number) =>
      apis.customer.customerUpgradeAnimationDelete({ finalClass }),
  })

  const handleOK = useCallback(() => {
    mutate(finalClass)
    onClose()
  }, [mutate, finalClass, onClose])

  if (!finalClass) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent defaultClose={false} className="bg-transparent">
        <div className="relative flex flex-col items-center justify-center text-center text-lg font-ultra">
          <div>{t('Congratulations')},</div>
          <div>{t('YourTeamHasUpgraded')}</div>
          <Lottie
            className="w-full"
            animationData={levelAnimations[finalClass as keyof typeof levelAnimations]}
          ></Lottie>
          <Button
            className="absolute bottom-0 flex w-full items-center justify-center"
            onClick={handleOK}
            catEars
          >
            <span className="text-sm font-ultra">{t('Ok')}</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default LevelupDialog
