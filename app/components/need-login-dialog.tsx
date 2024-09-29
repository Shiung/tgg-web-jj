import useStore from '~/stores/useStore'
import { useTelegramLogin } from '~/hooks/useTelegramLogin'
import AlertDialog from './alert-dialog'

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
    <AlertDialog
      isOpen={isOpen}
      onClose={closeDialog}
      title="Notice"
      message="Please log in your telegram account first."
      onConfirm={handleOk}
    />
  )
}

export default NeedLoginDialog
