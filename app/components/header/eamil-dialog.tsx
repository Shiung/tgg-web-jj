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

interface EmailDialogProps {
  email: string
}

const EmailDialog: React.FC<EmailDialogProps> = ({ email }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {email ? (
          <div className="flex items-center space-x-2">
            <span className="font-extrabold text-white">{email}</span>
            <EditIcon className="h-4 w-4" />
          </div>
        ) : (
          <AddIcon className="h-4 w-4" />
        )}
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader className="">
          <DialogTitle className="">Add email</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col p-3 text-sm text-white/70">
          {/* Email */}
          <div className="w-full">
            <Label htmlFor="email">Email</Label>
            <Input className="mt-1" type="email" placeholder="Please enter" />
            <Button className="mt-2 w-full" variant="outline">
              Send Verification Code
            </Button>
          </div>
          <div className="mt-3 w-full space-y-1">
            <Label htmlFor="email">Verification Code</Label>
            <Input type="number" placeholder="Please enter" />
          </div>
        </div>
        <DialogFooter className="flex flex-row space-x-2 p-3">
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

export default EmailDialog
