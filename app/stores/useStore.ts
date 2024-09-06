import { create } from 'zustand'
import createAppSlice, { AppSlice } from './appSlice'
import createTelegramSlice, { TelegramSlice } from './telegramSlice'

const useStore = create<AppSlice & TelegramSlice>((...a) => ({
  ...createAppSlice(...a),
  ...createTelegramSlice(...a),
}))

export default useStore
