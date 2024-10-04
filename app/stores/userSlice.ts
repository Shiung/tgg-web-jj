import { StateCreator } from 'zustand'
import type { InfoResponse } from '~/api/codegen/data-contracts'

export interface UserSlice {
  info: Pick<InfoResponse, 'customerId' | 'email' | 'pin' | 'avatar'>
  verificationTs: number
  setInfo: (info: InfoResponse) => void
  setVerificationTs: (ts: number) => void
}

const createUserSlice: StateCreator<UserSlice, [], [], UserSlice> = set => ({
  info: {
    customerId: 0,
    email: '',
    pin: '',
    avatar: '',
  },
  verificationTs: 0,
  setInfo: info => {
    const updateInfo = {
      ...('customerId' in info && { customerId: info.customerId }),
      ...('email' in info && { email: info.email }),
      ...('pin' in info && { pin: info.pin }),
      ...('avatar' in info && { avatar: info.avatar }),
    }
    if (!Object.keys(updateInfo)) return
    set(state => ({
      info: {
        ...state.info,
        ...updateInfo,
      },
    }))
  },
  setVerificationTs: ts => {
    set({ verificationTs: ts })
  },
})

export default createUserSlice
