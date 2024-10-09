import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { User as TelegramUser } from '@telegram-apps/sdk-react'
import { type AxiosResponse } from 'axios'
import { apis } from '~/api/index'
import { LoginRequest, LoginResponse } from '~/api/codegen/data-contracts'
import { TelegramOAuthUser } from '~/components/telegram-login-button/types'
import { detectOS, mapSystemLanguageCode } from '~/lib/utils'
import useStore, { getState } from '~/stores/useStore'
import { setHeaderToken } from '~/api/api-client'

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

  const effectiveReferralCode = referralCode || localStorage.getItem('referralCode') || ''

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
    referralCode: effectiveReferralCode,
    userName: user.username,
    version: import.meta.env.VITE_APP_VERSION || '',
  }
}

type MutationFn = (variables: LoginRequest) => Promise<AxiosResponse<LoginResponse>>

interface UseLoginOptions
  extends Partial<UseMutationOptions<AxiosResponse<LoginResponse>, Error, LoginRequest>> {}

const useLogin = (options?: UseLoginOptions) => {
  const setToken = useStore(state => state.setToken)

  return useMutation({
    mutationFn: apis.customer.customerLoginCreate as MutationFn,
    onSuccess: (data, variables, context) => {
      const token = data?.data.token
      if (token) {
        setToken(token)
        setHeaderToken(token)
      }

      // 清除邀請碼
      localStorage.removeItem('referralCode')

      if (options?.onSuccess) {
        options.onSuccess(data, variables, context)
      }
    },
    onError: (error, variables, context) => {
      console.error('Login failed, onError:', error)
      // 清除邀請碼
      localStorage.removeItem('referralCode')
      // 處理錯誤
      if (options?.onError) {
        options.onError(error, variables, context)
      }
    },
  })
}

export { prepareLoginRequest, useLogin }
