// hooks/useAuthGuard.ts
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useMatches } from '@remix-run/react'
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
