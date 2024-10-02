// hooks/useAuthGuard.ts
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useMatches, useSearchParams } from '@remix-run/react'
import useStore from '~/stores/useStore'

interface RouteHandle {
  requiresAuth?: boolean
}

export default function useAuthGuard() {
  const matches = useMatches()
  const token = useStore(state => state.token)
  const openNeedLoginDialog = useStore(state => state.openNeedLoginDialog)
  const [nextLocation, setNextLocation] = useState<string | null>(null)
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
      const referralCode = _startParam.replace(/^r_/, '') // 去掉前面的 r_
      console.log('referralCode: ', referralCode)
    } else if (_startParam === 'debug') {
      import('eruda').then(lib => lib.default.init())
    } else {
      console.warn(`Unknown startapp param: ${startApp || tgWebAppStartParam}`)
    }
  }, [searchParams, navigate])

  useEffect(() => {
    const needsLogin = matches.some(match => (match.handle as RouteHandle)?.requiresAuth)
    if (needsLogin && !token) {
      setNextLocation(currentLocation.pathname) // 保存当前路径为目标路径
      openNeedLoginDialog() // 打开登录对话框
    }
  }, [matches, token, openNeedLoginDialog, currentLocation])

  // 当用户成功登录后，执行原本的导航操作
  useEffect(() => {
    if (token && nextLocation) {
      navigate(nextLocation) // 导航到用户登录前尝试访问的页面
      setNextLocation(null) // 清空保存的目标路径
    }
  }, [token, nextLocation, navigate])

  return null
}
