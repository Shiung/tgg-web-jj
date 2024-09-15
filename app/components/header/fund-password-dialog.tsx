import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'
import { Button } from '~/components/ui/button'

import AddIcon from '~/icons/add.svg?react'
import EditIcon from '~/icons/edit.svg?react'

interface FundPasswordDialog {
  password: string
}

const FundPasswordDialog: React.FC<FundPasswordDialog> = ({ password }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {password ? (
          <Button variant="icon" size="icon" className="h-4 w-4 text-white">
            <EditIcon className="h-full w-full" />
          </Button>
        ) : (
          <Button variant="icon" size="icon" className="h-4 w-4 text-white">
            <AddIcon className="h-full w-full" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{password ? 'Change Your Password' : 'Set Your Password'}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col px-3 pb-6 pt-4 text-sm text-white/70"></div>
        <DialogFooter className="flex flex-row space-x-2 px-3 pb-4">
          <Button className="flex-1" variant="gray" catEars>
            Cancel
          </Button>
          <Button className="flex-1" catEars>
            Ok
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default FundPasswordDialog
