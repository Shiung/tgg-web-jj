import { useLocation, useNavigate } from '@remix-run/react'
import useStore from '~/stores/useStore'
import { useTelegramLogin } from '~/hooks/useTelegramLogin'
import AlertDialog from './alert-dialog'

const NeedLoginDialog: React.FC = () => {
  const navigate = useNavigate() // 初始化導航
  const location = useLocation() // 獲取當前路由
  const isOpen = useStore(state => state.needLoginDialogOpen)
  const closeDialog = useStore(state => state.closeNeedLoginDialog)
  const { handleLogin, scriptLoaded } = useTelegramLogin()

  const handleClose = () => {
    closeDialog()
    if (location.pathname !== '/') {
      // 檢查當前路由是否為首頁
      navigate('/') // 導航回首頁
    }
  }

  const handleOk = () => {
    if (scriptLoaded) {
      handleLogin()
      handleClose()
    }
  }

  return (
    <AlertDialog
      isOpen={isOpen}
      onClose={handleClose}
      title="Notice"
      message="Please log in your telegram account first."
      onConfirm={handleOk}
    />
  )
}

export default NeedLoginDialog
