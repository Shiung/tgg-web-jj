import { create } from 'zustand'
import createLayoutSlice, { LayoutSlice } from './layoutSlice'
import createTelegramSlice, { TelegramSlice } from './telegramSlice'
import createUserSlice, { UserSlice } from './userSlice'
import createAuthSlice, { AuthSlice } from './authSlice'

type Store = LayoutSlice & TelegramSlice & UserSlice & AuthSlice

const useStore = create<Store>((...a) => ({
  ...createLayoutSlice(...a),
  ...createTelegramSlice(...a),
  ...createAuthSlice(...a),
  ...createUserSlice(...a),
}))

export default useStore
