import { StateCreator } from 'zustand'
import type { InfoResponse } from '~/api/codegen/data-contracts'

import { type ValidCode } from '~/components/verify-button'

export interface UserSlice {
  userInfo: InfoResponse
  packet: NonNullable<InfoResponse['packet']>
  verificationEventTs: Partial<Record<ValidCode, number>>
  baseTreasure: { [id: number]: string } | null
  setUserInfo: (info: InfoResponse) => void
  clearPacket: () => void
  setVerificationEventTs: (event: Partial<Record<ValidCode, number>>) => void
  setBaseTreasure: (data: { [id: number]: string } | null) => void
}

const createUserSlice: StateCreator<UserSlice, [], [], UserSlice> = set => ({
  userInfo: {
    customerId: 0,
    email: '',
    pin: '',
    avatar: '',
    referralCode: '',
  },
  packet: {},
  verificationEventTs: {},
  baseTreasure: null,
  setUserInfo: info => {
    const updateInfo = {
      ...('customerId' in info && { customerId: info.customerId }),
      ...('email' in info && { email: info.email }),
      ...('pin' in info && { pin: info.pin }),
      ...('avatar' in info && { avatar: info.avatar }),
      ...('referralCode' in info && { referralCode: info.referralCode }),
      ...('packet' in info && { packet: info.packet }),
    }
    if (!Object.keys(updateInfo)) return
    set(state => ({
      userInfo: {
        ...state.userInfo,
        ...updateInfo,
      },
    }))
    set(state => ({
      packet: {
        ...state.packet,
        ...updateInfo.packet,
      },
    }))
  },
  clearPacket: () => {
    set({ packet: {} })
  },
  setVerificationEventTs: event => {
    set(state => ({
      verificationEventTs: {
        ...state.verificationEventTs,
        ...event,
      },
    }))
  },
  setBaseTreasure: baseTreasure => {
    set({ baseTreasure })
  },
})

export default createUserSlice
