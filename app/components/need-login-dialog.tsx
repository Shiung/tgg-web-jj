import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog'
import { Button } from '~/components/ui/button'
import useStore from '~/stores/useStore'
import { useTelegramLogin } from '~/hooks/useTelegramLogin'

const NeedLoginDialog: React.FC = () => {
  const isOpen = useStore(state => state.needLoginDialogOpen)
  const closeDialog = useStore(state => state.closeNeedLoginDialog)
  const { handleLogin, scriptLoaded } = useTelegramLogin()

  const handleOk = () => {
    if (scriptLoaded) {
      handleLogin()
      closeDialog()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Notice</DialogTitle>
        </DialogHeader>
        <div className="flex aspect-[319/128] flex-col items-center justify-center space-y-3">
          <img
            src="/images/system-notice.png"
            alt="Notice"
            className="h-auto w-[100px] object-contain"
          />
          <p className="px-3 text-center text-white/70">
            Please log in your telegram account first.
          </p>
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

export default NeedLoginDialog
