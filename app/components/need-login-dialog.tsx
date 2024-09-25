import {
  type PropsWithChildren,
  cloneElement,
  isValidElement,
  MouseEvent,
  ReactElement,
  useState,
} from 'react'
import { useNavigate } from '@remix-run/react'
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
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null)
  const isLoggedin = useStore(state => !!state.token)
  const { handleLogin, scriptLoaded } = useTelegramLogin({
    onSuccess() {
      // 登入成功后，执行原始的 onClick 事件
      if (pendingAction) {
        pendingAction()
        setPendingAction(null)
      }
    },
  })
  const navigate = useNavigate()

  const handleTriggerClick = (e: MouseEvent<HTMLElement>) => {
    if (!isLoggedin) {
      e.preventDefault() // 阻止默认行为，等待登录成功
      setOpen(true)

      if (isValidElement(children)) {
        if (children.props.to) {
          // 如果 children 是 Link 组件，保存导航操作
          setPendingAction(() => navigate(children.props.to))
        } else if (children.props.onClick) {
          // 如果有 onClick 事件，保存原始的点击行为
          setPendingAction(() => children.props.onClick(e))
        }
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
