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

/**
 * Getting non-reactive fresh state
 * https://github.com/pmndrs/zustand?tab=readme-ov-file#readingwriting-state-and-reacting-to-changes-outside-of-components
 */
export const getState = useStore.getState
export default useStore
