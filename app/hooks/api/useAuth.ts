import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { User as TelegramUser } from '@telegram-apps/sdk-react'
import { type AxiosResponse } from 'axios'
import { apis } from '~/api/index'
import { LoginRequest, LoginResponse } from '~/api/codegen/data-contracts'
import { TelegramOAuthUser } from '~/components/telegram-login-button/types'
import { detectOS, mapSystemLanguageCode } from '~/lib/utils'
import useStore, { getState } from '~/stores/useStore'

// Type Guards
function isTelegramUser(data: TelegramUser | TelegramOAuthUser): data is TelegramUser {
  return (data as TelegramUser).firstName !== undefined
}

function isTelegramOAuthUser(data: TelegramUser | TelegramOAuthUser): data is TelegramOAuthUser {
  return (data as TelegramOAuthUser).first_name !== undefined
}

function extractUserInfo(data?: TelegramUser | TelegramOAuthUser): TelegramUser | null {
  if (!data) return null
  try {
    if (isTelegramUser(data)) {
      return {
        id: data.id,
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        username: data.username || '',
        photoUrl: data.photoUrl || '',
        languageCode: mapSystemLanguageCode(data.languageCode),
      }
    } else if (isTelegramOAuthUser(data)) {
      return {
        id: data.id,
        firstName: data.first_name || '',
        lastName: data.last_name || '',
        username: data.username || '',
        photoUrl: data.photo_url || '',
        languageCode: 'en',
      }
    }
  } catch (error) {
    console.error('Error extracting user info:', error)
    return null
  }
  return null
}

function prepareLoginRequest(
  data?: TelegramUser | TelegramOAuthUser,
  referralCode = ''
): LoginRequest | null {
  const user = extractUserInfo(data)
  if (!user) return null

  return {
    avatar: user.photoUrl || '',
    device: getState().inTelegram ? 'Mini App' : 'Web',
    deviceId: getState().deviceId || '',
    firstName: user.firstName,
    id: user.id!,
    languageCode: user.languageCode,
    lastName: user.lastName,
    os: detectOS(),
    productId: 1,
    referralCode,
    userName: user.username,
    version: import.meta.env.VITE_APP_VERSION || '',
  }
}

type MutationFn = (variables: LoginRequest) => Promise<AxiosResponse<LoginResponse>>

interface UseLoginOptions
  extends Partial<UseMutationOptions<AxiosResponse<LoginResponse>, Error, LoginRequest>> {}

const useLogin = (options?: UseLoginOptions) => {
  const checkIsLoggedIn = useStore(state => state.checkIsLoggedIn)

  return useMutation({
    mutationFn: apis.customer.customerLoginCreate as MutationFn,
    onSuccess: (data, variables, context) => {
      checkIsLoggedIn()

      if (options?.onSuccess) {
        options.onSuccess(data, variables, context)
      }
    },
    onError: (error, variables, context) => {
      console.error('Login failed, onError:', error)
      // 處理錯誤
      if (options?.onError) {
        options.onError(error, variables, context)
      }
    },
  })
}

export { prepareLoginRequest, useLogin }
