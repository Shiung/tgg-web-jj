import { Dialog, DialogContent, DialogFooter } from '~/components/ui/dialog'
import { Button } from '~/components/ui/button'
import type { AlertDialogProps } from './types'
import { useTranslation } from 'react-i18next'

const AlertDialog = ({ open, confirm, cancel }: AlertDialogProps): JSX.Element => {
  const { t } = useTranslation()
  return (
    <Dialog open={open}>
      <DialogContent className="px-4 py-4" defaultClose={false}>
        <div className="text-center">
          <p className="mb-6 text-base text-white/70">{t('eggGiveup.desc1')}</p>
          <p className="mb-6 text-lg font-ultra text-white">{t('eggGiveup.desc2')}</p>
        </div>
        <DialogFooter className="flex flex-row space-x-2">
          <Button className="flex-1" variant="gray" catEars onClick={cancel}>
            {t('cancel')}
          </Button>
          <Button className="flex-1" catEars onClick={confirm}>
            {t('giveup')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AlertDialog
