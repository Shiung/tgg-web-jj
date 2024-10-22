import { useMemo } from 'react'
import {
  Dialog,
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
  message: string | React.ReactNode
  variant?: 'notice' | 'success'
  onRightButtonClick?: () => void
  onLeftButtonClick?: () => void
  leftButtonText?: string
  rightButtonText?: string
}

const AlertDialog: React.FC<AlertDialogProps> = ({
  isOpen,
  onClose,
  title = 'Notice',
  message,
  variant = 'notice',
  onRightButtonClick,
  onLeftButtonClick,
  leftButtonText = 'Cancel',
  rightButtonText = 'Ok',
}) => {
  const imageSrc = useMemo(
    () => (variant === 'notice' ? '/images/system-notice.png' : '/images/system-success.png'),
    [variant]
  )

  const handleRightButtonClick = () => {
    if (onRightButtonClick) {
      onRightButtonClick()
    }
    onClose()
  }

  const handleLeftButtonClick = () => {
    if (onLeftButtonClick) {
      onLeftButtonClick()
    }
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-stretch justify-center px-3 py-4">
          <img
            src={imageSrc}
            alt="Notice"
            className="h-auto w-[100px] self-center object-contain"
          />
          <div className="mt-3 text-center text-xs text-white/70">{message}</div>
          <DialogFooter className="mt-6 flex flex-row space-x-2">
            {onLeftButtonClick && (
              <Button
                className="flex-1"
                variant="gray"
                catEars
                type="button"
                onClick={handleLeftButtonClick}
              >
                {leftButtonText}
              </Button>
            )}
            {onRightButtonClick && (
              <Button className="flex-1" catEars type="button" onClick={handleRightButtonClick}>
                {rightButtonText}
              </Button>
            )}
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AlertDialog
