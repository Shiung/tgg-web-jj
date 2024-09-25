import {
  type PropsWithChildren,
  cloneElement,
  isValidElement,
  MouseEvent,
  ReactElement,
  useState,
} from 'react'
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

interface NeedLoginDialogProps extends PropsWithChildren {}

export default function NeedLoginDialog({ children }: NeedLoginDialogProps) {
  const [open, setOpen] = useState(false)
  const [pendingClick, setPendingClick] = useState<(() => void) | null>(null)
  const isLoggedin = useStore(state => !!state.token)
  const { handleLogin, scriptLoaded } = useTelegramLogin({
    onSuccess() {
      // 登入成功后，执行原始的 onClick 事件
      if (pendingClick) {
        pendingClick?.()
        setPendingClick(null)
      }
    },
  })

  const handleTriggerClick = (e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    if (!isLoggedin) {
      e.preventDefault()
      setOpen(true)

      // 如果 children 有 onClick，保存它以便登入成功后执行
      if (isValidElement(children) && children.props.onClick) {
        setPendingClick(() => () => {
          children.props.onClick(e)
        })
      }
    }
  }

  const handleOk = () => {
    if (scriptLoaded) {
      setOpen(false)
      handleLogin()
    }
  }

  if (isLoggedin) return children

  const enhancedChildren =
    isValidElement(children) && typeof children.type !== 'string'
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        cloneElement(children as ReactElement<any>, {
          onClick: handleTriggerClick,
        })
      : children

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{enhancedChildren}</DialogTrigger>
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
