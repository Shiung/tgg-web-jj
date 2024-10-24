import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

import { Button } from '~/components/ui/button'
import { apis } from '~/api'
import { errorToast } from '~/lib/toast'
import Amount from '~/components/amount'
import { Crypto } from '~/consts/crypto'

interface TerminateSharingDialogProps {
  id?: string
  remaining?: string
  onTerminateSuccess?: () => void
}

const TerminateSharingDialog: React.FC<TerminateSharingDialogProps> = ({
  id = '',
  remaining = '',
  onTerminateSuccess,
}) => {
  const { t } = useTranslation()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: () => apis.packet.packetDelete(id, {}),
    onError: error => {
      console.error('packetDelete failed:', error)
      error.message && errorToast(error.message)
    },
  })

  const handleTerminate = async () => {
    await mutateAsync()
    onTerminateSuccess?.()
  }

  if (!id || !remaining) return null
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="p-4">
          <Button catEars variant="danger" className="w-full">
            {t('StopSharing')}
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('StopSharing')}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-2 px-3 pb-0 pt-4 text-sm text-white/70">
          <div className="flex items-center justify-between rounded-xl bg-[#1C1C1C] p-3 font-ultra">
            <div>{t('Remaining')}</div>
            <div className="text-2xl text-primary">
              <Amount value={remaining} crypto={Crypto.KATON} />
            </div>
          </div>
          <div className="whitespace-pre-wrap text-start text-sm">
            {t('StopSharingDescription')}
          </div>
        </div>
        <DialogFooter className="flex flex-row space-x-2 px-3 pb-4 pt-6">
          <DialogClose asChild>
            <Button className="flex-1" variant="gray" catEars>
              {t('Cancel')}
            </Button>
          </DialogClose>
          <Button className="flex-1" loading={isPending} catEars onClick={handleTerminate}>
            {t('Ok')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default TerminateSharingDialog
