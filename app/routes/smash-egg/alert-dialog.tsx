import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Button } from '~/components/ui/button'

import AddIcon from '~/icons/add.svg?react'
import EditIcon from '~/icons/edit.svg?react'

interface AlertDialogProps {
  open?: boolean | undefined
  comfirm: () => void
  cancel: () => void
}

const AlertDialog: React.FC<AlertDialogProps> = ({ open, comfirm, cancel }) => {
  return (
    <Dialog open={open}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="px-4 py-4">
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
          <Button className="flex-1" catEars onClick={comfirm}>
            Ok
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AlertDialog
