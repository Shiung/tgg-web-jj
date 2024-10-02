import { StateCreator } from 'zustand'
import Cookies from 'js-cookie'
import { v4 as uuidv4 } from 'uuid'

export interface AuthSlice {
  deviceId?: string
  isLoggedIn: boolean
  needLoginDialogOpen: boolean
  setIsLoggedIn: (loggedIn: boolean) => void
  checkIsLoggedIn: () => void
  logout: () => void
  openNeedLoginDialog: () => void
  closeNeedLoginDialog: () => void
}

const getCookieValue = (name: string): string | undefined => {
  if (typeof document === 'undefined') return undefined
  return Cookies.get(name)
}

const getStoredValue = (key: string): string | undefined => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(key) || undefined
  }
  return undefined
}

const initialLoginStatus = !!getCookieValue('website_session')
let initialDeviceId: string | undefined = getStoredValue('deviceId')

// 初始化 deviceId
if (!initialDeviceId) {
  initialDeviceId = uuidv4()
  if (typeof window !== 'undefined') {
    localStorage.setItem('deviceId', initialDeviceId)
  }
}

const createAuthSlice: StateCreator<AuthSlice, [], [], AuthSlice> = set => ({
  deviceId: initialDeviceId,
  isLoggedIn: initialLoginStatus,
  needLoginDialogOpen: false,
  setIsLoggedIn: (loggedIn: boolean) => set({ isLoggedIn: loggedIn }),
  checkIsLoggedIn: () => {
    const hasSessionCookie = !!getCookieValue('website_session')
    set({ isLoggedIn: hasSessionCookie })
  },
  logout: () => {
    set({ isLoggedIn: false })
    // TODO: 待 session 管理方案实现后移除
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token')
    }
    if (typeof document !== 'undefined') {
      // TODO: logout api
      Cookies.remove('website_session', { path: '/' })
    }
  },
  openNeedLoginDialog: () => set({ needLoginDialogOpen: true }),
  closeNeedLoginDialog: () => set({ needLoginDialogOpen: false }),
})

export default createAuthSlice
