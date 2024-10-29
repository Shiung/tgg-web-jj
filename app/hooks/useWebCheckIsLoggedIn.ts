import { useEffect } from 'react'
import { checkIsLoggedIn } from '~/stores/authSlice'
import useStore from '~/stores/useStore'

/**
 * Web 環境 localStorage 檢查 token 確認是否已登入，
 * telegram miniApp 每次都入都會重新登入，所以不需要檢查
 */
export default function useWebCheckIsLoggedIn() {
  const setIsLoggedIn = useStore(state => state.setIsLoggedIn)
  const inTelegram = useStore(state => state.inTelegram)

  useEffect(() => {
    if (inTelegram) return
    if (checkIsLoggedIn()) {
      setIsLoggedIn(true)
    }
  }, [inTelegram, setIsLoggedIn])
}
