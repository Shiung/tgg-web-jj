import { create } from 'zustand'
import createTelegramSlice, { TelegramSlice } from './telegramSlice'

const useStore = create<TelegramSlice>((...a) => ({
  ...createTelegramSlice(...a),
}))

export default useStore
