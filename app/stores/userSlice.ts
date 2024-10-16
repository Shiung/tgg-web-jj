import { StateCreator } from 'zustand'
import type { InfoResponse } from '~/api/codegen/data-contracts'

export interface UserSlice {
  userInfo: InfoResponse
  verificationTs: number
  setUserInfo: (info: InfoResponse) => void
  setVerificationTs: (ts: number) => void
}

const createUserSlice: StateCreator<UserSlice, [], [], UserSlice> = set => ({
  userInfo: {
    customerId: 0,
    email: '',
    pin: '',
    avatar: '',
  },
  verificationTs: 0,
  setUserInfo: info => {
    const updateInfo = {
      ...('customerId' in info && { customerId: info.customerId }),
      ...('email' in info && { email: info.email }),
      ...('pin' in info && { pin: info.pin }),
      ...('avatar' in info && { avatar: info.avatar }),
      ...('referralCode' in info && { referralCode: info.referralCode }),
    }
    if (!Object.keys(updateInfo)) return
    set(state => ({
      userInfo: {
        ...state.userInfo,
        ...updateInfo,
      },
    }))
  },
  setVerificationTs: ts => {
    set({ verificationTs: ts })
  },
})

export default createUserSlice
