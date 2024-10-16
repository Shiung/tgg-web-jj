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

import { Button } from '~/components/ui/button'
import { apis } from '~/api'
import { errorToast } from '~/lib/toast'

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
            Stop Sharing
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Stop Sharing</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-2 px-3 pb-0 pt-4 text-sm text-white/70">
          <div className="flex items-center justify-between rounded-xl bg-[#1C1C1C] p-3 font-ultra">
            <div>Remaining</div>
            <div className="text-2xl text-primary">500</div>
          </div>
          <div className="text-sm">
            <div>The unused budget will be refunded in an hour.</div>
            <div>Are you sure to terminate sending lucky bags?</div>
          </div>
        </div>
        <DialogFooter className="flex flex-row space-x-2 px-3 pb-4 pt-6">
          <DialogClose asChild>
            <Button className="flex-1" variant="gray" catEars>
              Cancel
            </Button>
          </DialogClose>
          <Button className="flex-1" loading={isPending} catEars onClick={handleTerminate}>
            Ok
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default TerminateSharingDialog
