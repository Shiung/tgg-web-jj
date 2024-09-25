import { type PropsWithChildren, MouseEvent, useState } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'
import { Button } from '~/components/ui/button'
import useStore from '~/stores/useStore'
import { useTelegramLogin } from '~/hooks/useTelegramLogin'

export default function NeedLoginDialog({ children }: PropsWithChildren) {
  const [open, setOpen] = useState(false)
  const isLoggedin = useStore(state => !!state.token)
  const { handleLogin, scriptLoaded } = useTelegramLogin()

  const handleTriggerClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (!isLoggedin) {
      e.preventDefault()
      setOpen(true)
    }
  }

  const handleOk = () => {
    if (scriptLoaded) {
      setOpen(false)
      handleLogin()
    }
  }

  if (isLoggedin) return children
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild onClick={handleTriggerClick}>
        {children}
      </DialogTrigger>
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
