import { InitDataParsed } from '@telegram-apps/sdk-react'
import { StateCreator } from 'zustand'

export interface TelegramSlice {
  inTelegram: boolean
  telegramInitData: InitDataParsed | undefined
  checkInTelegram: (inTelegram: boolean) => void
  setTelegramInitData: (telegramInitData: InitDataParsed) => void
}

const createTelegramSlice: StateCreator<TelegramSlice, [], [], TelegramSlice> = set => ({
  inTelegram: false,
  telegramInitData: undefined,
  checkInTelegram: inTelegram => set({ inTelegram }),
  setTelegramInitData: telegramInitData => set({ telegramInitData }),
})

export default createTelegramSlice
