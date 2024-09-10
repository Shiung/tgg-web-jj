import { create } from 'zustand'
import createLayoutSlice, { LayoutSlice } from './layoutSlice'
import createTelegramSlice, { TelegramSlice } from './telegramSlice'

const useStore = create<LayoutSlice & TelegramSlice>((...a) => ({
  ...createLayoutSlice(...a),
  ...createTelegramSlice(...a),
}))

export default useStore
