import { StateCreator } from 'zustand'
import { v4 as uuidv4 } from 'uuid'
import { setHeaderToken } from '~/api/api-client'

export interface AuthSlice {
  token?: string
  deviceId?: string
  isLoggedIn: boolean
  needLoginDialogOpen: boolean
  setToken: (token: string) => void
  setIsLoggedIn: (loggedIn: boolean) => void
  logout: () => void
  openNeedLoginDialog: () => void
  closeNeedLoginDialog: () => void
}

const getStoredValue = (key: string): string | undefined => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(key) || undefined
  }
  return undefined
}

export const checkIsLoggedIn = () => !!getStoredValue('token')

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
  isLoggedIn: false,
  needLoginDialogOpen: false,
  setIsLoggedIn: (loggedIn: boolean) => set({ isLoggedIn: loggedIn }),
  setToken: (token: string) => {
    set({ token, isLoggedIn: true })
    setHeaderToken(token)
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token)
    }
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
