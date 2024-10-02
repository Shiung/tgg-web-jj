import { useMemo } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog'
import { Button } from '~/components/ui/button'

interface AlertDialogProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  message: string
  variant?: 'notice' | 'success'
  onConfirm?: () => void
}

const AlertDialog: React.FC<AlertDialogProps> = ({
  isOpen,
  onClose,
  title = 'Notice',
  message,
  variant = 'notice',
  onConfirm,
}) => {
  const imageSrc = useMemo(
    () => (variant === 'notice' ? '/images/system-notice.png' : '/images/system-success.png'),
    [variant]
  )
  const handleOk = () => {
    if (onConfirm) {
      onConfirm()
    }
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="flex aspect-[319/128] flex-col items-center justify-center space-y-3">
          <img src={imageSrc} alt="Notice" className="h-auto w-[100px] object-contain" />
          <p className="px-3 text-center text-white/70">{message}</p>
        </div>
        <DialogFooter className="flex flex-row space-x-2 px-3 pb-4">
          <DialogClose asChild>
            <Button className="flex-1" variant="gray" catEars>
              Cancel
            </Button>
          </DialogClose>
          <Button className="flex-1" catEars type="button" onClick={handleOk}>
            Ok
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AlertDialog
