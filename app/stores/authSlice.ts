import { StateCreator } from 'zustand'
import Cookies from 'js-cookie'
import { v4 as uuidv4 } from 'uuid'
import { setHeaderToken } from '~/api/api-client'

export interface AuthSlice {
  token?: string
  deviceId?: string
  isLoggedIn: boolean
  needLoginDialogOpen: boolean
  setToken: (token: string) => void
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

const initialLoginStatus = !!getStoredValue('token')
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
  setToken: (token: string) => {
    set({ token, isLoggedIn: true })
    setHeaderToken(token)
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token)
    }
  },
  checkIsLoggedIn: () => {
    const hasSessionCookie = !!getCookieValue('website_session')
    set({ isLoggedIn: hasSessionCookie })
  },
  logout: () => {
    set({ token: undefined, isLoggedIn: false })
    setHeaderToken(null)
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token')
    }
  },
  openNeedLoginDialog: () => set({ needLoginDialogOpen: true }),
  closeNeedLoginDialog: () => set({ needLoginDialogOpen: false }),
})

export default createAuthSlice
