import { StateCreator } from 'zustand'
import { persist } from 'zustand/middleware'
import { User } from '@telegram-apps/sdk-react'
import { TelegramUser } from '~/components/telegram-login-button/types'

export interface TelegramSlice {
  inTelegram: boolean
  telegramUserData: User | undefined
  checkInTelegram: (inTelegram: boolean) => void
  /** Telegram Mini App 啟動參數同步 user data */
  setTelegramInitDataByInitData: (user: User) => void
  /** 透過 Telegram Widget 登入同步 user data */
  setTelegramInitDataByWidgetLogin: (user: TelegramUser) => void
}

const createTelegramSlice: StateCreator<
  TelegramSlice,
  [],
  [['zustand/persist', Partial<TelegramSlice>]]
> = persist(
  set => ({
    inTelegram: false,
    telegramUserData: undefined, // 初始状态

    checkInTelegram: inTelegram => set({ inTelegram }),

    setTelegramInitDataByInitData: user => {
      set({ telegramUserData: user }) // 更新 telegramUserData
    },

    setTelegramInitDataByWidgetLogin: user => {
      const formattedUserData: User = {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        username: user.username,
        photoUrl: user.photo_url,
      }
      set({ telegramUserData: formattedUserData })
    },
  }),
  {
    name: 'telegram-user-data', // localStorage key
    partialize: state => ({ telegramUserData: state.telegramUserData }), // 只持久化 telegramUserData
  }
)

export default createTelegramSlice
