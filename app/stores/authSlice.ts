import { StateCreator } from 'zustand'
import { v4 as uuidv4 } from 'uuid'
import { setHeaderToken } from '~/api/api-client'

export interface AuthSlice {
  token?: string
  deviceId?: string
  isLoggedIn: boolean
  needLoginDialogOpen: boolean
  setToken: (token: string) => void
  clearToken: () => void
  openNeedLoginDialog: () => void
  closeNeedLoginDialog: () => void
}

const getCookie = (name: string): string | undefined => {
  if (typeof document === 'undefined') return undefined

  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift()
  }
  return undefined
}

const getStoredValue = (key: string): string | undefined => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(key) || undefined
  }
  return undefined
}

// TODO: 待 session 管理方案实现后移除
const initialLoginStatus = !!getCookie('website_session') || !!getStoredValue('token')
const initialToken: string | undefined = getStoredValue('token')
let initialDeviceId: string | undefined = getStoredValue('deviceId')

// 處使 deviceId
if (!initialDeviceId) {
  initialDeviceId = uuidv4()
  if (typeof window !== 'undefined') {
    localStorage.setItem('deviceId', initialDeviceId)
  }
}

const createAuthSlice: StateCreator<AuthSlice, [], [], AuthSlice> = set => ({
  token: initialToken,
  deviceId: initialDeviceId,
  isLoggedIn: initialLoginStatus,
  needLoginDialogOpen: false,
  // TODO: 待 session 管理方案实现后移除
  setToken: (token: string) => {
    set({ token })
    setHeaderToken(token)
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token)
    }
  },
  clearToken: () => {
    set({ token: undefined })
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token')
    }
  },
  openNeedLoginDialog: () => set({ needLoginDialogOpen: true }),
  closeNeedLoginDialog: () => set({ needLoginDialogOpen: false }),
})

export default createAuthSlice
