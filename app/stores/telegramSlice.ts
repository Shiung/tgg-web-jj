import { StateCreator } from 'zustand'

export interface TelegramSlice {
  inTelegram: boolean
  checkInTelegram: (inTelegram: boolean) => void
}

const createTelegramSlice: StateCreator<TelegramSlice, [], [], TelegramSlice> = set => ({
  inTelegram: false,
  checkInTelegram: inTelegram => set({ inTelegram }),
})

export default createTelegramSlice
