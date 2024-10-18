/* eslint-disable @typescript-eslint/no-explicit-any */
import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query'
import { emitter } from '~/lib/emitter'

const ERROR_CODE_WEBSITE_UNDER_MAINTENANCE = 'website.under.maintenance'

const errorHandler = (error: any) => {
  if (
    error?.response?.status === 503 &&
    error?.response?.data?.errorCode === ERROR_CODE_WEBSITE_UNDER_MAINTENANCE
  ) {
    emitter.emit('openMaintenance', true)
  }
  // 其他錯誤處理邏輯
  console.error(error)
}

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: err => errorHandler(err),
  }),
  mutationCache: new MutationCache({
    onError: error => errorHandler(error),
  }),
  defaultOptions: {
    queries: {
      retry: (failureCount, error: any) => {
        // 如果遇到特定的維護錯誤代碼，就停止重試
        if (
          error?.response?.status === 503 &&
          error?.response?.data?.errorCode === ERROR_CODE_WEBSITE_UNDER_MAINTENANCE
        ) {
          return false
        }
        // 否則預設重試 3 次
        return failureCount < 3
      },
    },
  },
})

export default queryClient
