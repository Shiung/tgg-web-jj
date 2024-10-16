import { StateCreator } from 'zustand'
import { persist } from 'zustand/middleware'
import { User } from '@telegram-apps/sdk-react'
import { TelegramOAuthUser } from '~/components/telegram-login-button/types'
import { TelegramConfigGetResponse } from '~/api/codegen/data-contracts'

export interface TelegramSlice {
  inTelegram: boolean
  telegramUserData: User | undefined
  telegramConfig: TelegramConfigGetResponse
  checkInTelegram: (inTelegram: boolean) => void
  /** Telegram Mini App 啟動參數同步 user data */
  setTelegramInitDataByInitData: (user: User) => void
  /** 透過 Telegram Widget 登入同步 user data */
  setTelegramInitDataByWidgetLogin: (user: TelegramOAuthUser) => void
  setTelegramConfig: (config: TelegramConfigGetResponse) => void
}

const createTelegramSlice: StateCreator<
  TelegramSlice,
  [],
  [['zustand/persist', Partial<TelegramSlice>]]
> = persist(
  set => ({
    inTelegram: false,
    telegramUserData: undefined,
    telegramConfig: {},
    checkInTelegram: inTelegram => set({ inTelegram }),
    setTelegramInitDataByInitData: user => {
      set({ telegramUserData: user })
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
    setTelegramConfig: config => set({ telegramConfig: config }),
  }),
  {
    name: 'telegram-user-data', // localStorage key
    partialize: state => ({ telegramUserData: state.telegramUserData }), // 只持久化 telegramUserData
  }
)

export default createTelegramSlice
