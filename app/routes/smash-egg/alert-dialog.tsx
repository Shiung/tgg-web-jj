import { Dialog, DialogContent, DialogFooter } from '~/components/ui/dialog'
import { Button } from '~/components/ui/button'

interface AlertDialogProps {
  open?: boolean | undefined
  confirm: () => void
  cancel: () => void
}

const AlertDialog: React.FC<AlertDialogProps> = ({ open, confirm, cancel }) => {
  return (
    <Dialog open={open}>
      <DialogContent className="px-4 py-4" defaultClose={false}>
        <div className="text-center">
          <p className="mb-6 text-base text-white/70">
            If you give up smashing the egg, the hammer you have consumed will not be returned.
          </p>
          <p className="mb-6 text-lg font-extrabold text-white">
            Are you sure you want to give up?
          </p>
        </div>
        <DialogFooter className="flex flex-row space-x-2">
          <Button className="flex-1" variant="gray" catEars onClick={cancel}>
            Cancel
          </Button>
          <Button className="flex-1" catEars onClick={confirm}>
            Ok
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AlertDialog
