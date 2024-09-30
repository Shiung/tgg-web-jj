import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { InitDataParsed } from '@telegram-apps/sdk-react'
import { type AxiosResponse } from 'axios'
import { LoginRequest, LoginResponse } from '~/api/codegen/data-contracts'
import { apis } from '~/api/index'
import { detectOS } from '~/lib/utils'
import useStore, { getState } from '~/stores/useStore'

function prepareLoginRequest(telegramInitData: InitDataParsed): LoginRequest | null {
  const user = telegramInitData?.user

  if (!telegramInitData || !user) return null
  return {
    avatar: user?.photoUrl || '',
    device: 'Mini App',
    deviceId: getState().deviceId || '',
    firstName: user?.firstName,
    id: user?.id,
    languageCode: user?.languageCode,
    lastName: user?.lastName,
    os: detectOS(),
    productId: 1,
    startapp: '',
    userName: user?.username,
    version: 'v0.0.0',
  }
}

type MutationFn = (variables: LoginRequest) => Promise<AxiosResponse<LoginResponse>>

interface UseLoginOptions
  extends Partial<UseMutationOptions<AxiosResponse<LoginResponse>, Error, LoginRequest>> {}

const useLogin = (options?: UseLoginOptions) => {
  const { setToken } = useStore(state => state)

  return useMutation({
    mutationFn: apis.customer.customerLoginCreate as MutationFn,
    onSuccess: (data, variables, context) => {
      const token = data?.data.token
      if (token) {
        setToken(token)
        // setHeaderToken(token)
      }

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
