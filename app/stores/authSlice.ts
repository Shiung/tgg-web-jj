import { StateCreator } from 'zustand'
import { setHeaderToken } from '~/api/api-client'

export interface AuthSlice {
  token?: string
  needLoginDialogOpen: boolean
  setToken: (token: string) => void
  clearToken: () => void
  openNeedLoginDialog: () => void
  closeNeedLoginDialog: () => void
}

let initialToken: string | undefined = undefined

if (typeof window !== 'undefined') {
  // 仅在浏览器环境中访问 localStorage
  initialToken = localStorage.getItem('token') || undefined
}

const createAuthSlice: StateCreator<AuthSlice, [], [], AuthSlice> = set => ({
  token: initialToken,
  needLoginDialogOpen: false,
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
