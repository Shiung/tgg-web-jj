import { useEffect } from 'react'
import { useLocation, useNavigate, useMatches, useSearchParams } from '@remix-run/react'
import useStore from '~/stores/useStore'

interface RouteHandle {
  requiresAuth?: boolean
}

export default function useRouteGuard() {
  const matches = useMatches()
  const isLoggedIn = useStore(state => state.isLoggedIn)
  const inTelegram = useStore(state => state.inTelegram)
  const openNeedLoginDialog = useStore(state => state.openNeedLoginDialog)
  const currentLocation = useLocation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  /**
   * 處理 ?startapp 參數 (用於 Telegram Miniapp 開後會轉換成 ?tgWebAppStartParam)
   */
  useEffect(() => {
    const tgWebAppStartParam = searchParams.get('tgWebAppStartParam')
    const startApp = searchParams.get('startapp')
    const _startParam = tgWebAppStartParam || startApp || ''
    if (!_startParam) return

    // 開啟錢包頁面
    if (_startParam === 'wallet') {
      navigate('/wallet/deposit', { replace: true })
    } else if (/^r_/.test(_startParam)) {
      // 實作分享邀請碼功能，預期以某字符開頭 例如r_ 開頭 eg: r_xdgYdr6
      localStorage.setItem('referralCode', _startParam)
    } else if (_startParam === 'debug') {
      import('eruda').then(lib => lib.default.init())
    } else {
      console.warn(`Unknown startapp param: ${startApp || tgWebAppStartParam}`)
    }
  }, [searchParams, navigate])

  useEffect(() => {
    if (inTelegram) return
    const needsLogin = matches.some(match => (match.handle as RouteHandle)?.requiresAuth)
    if (needsLogin && !isLoggedIn) {
      openNeedLoginDialog()
    }
  }, [matches, isLoggedIn, openNeedLoginDialog, currentLocation, inTelegram])

  return null
}
