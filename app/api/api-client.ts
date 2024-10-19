// api/apiClient.ts
import { HttpClient } from './codegen/http-client'

interface SecurityDataType {
  token?: string
}

// 初始化全局的 HttpClient 实例
export const apiClient = new HttpClient<SecurityDataType>({
  baseURL: process.env.NODE_ENV === 'development' ? '/' : import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  secure: true,
  withCredentials: true,
  securityWorker: securityData => {
    if (securityData && securityData.token) {
      return {
        headers: {
          Authorization: `Bearer ${securityData.token}`,
        },
      }
    }
  },
})

// 全局错误处理
apiClient.instance.interceptors.response.use(
  response => response,
  error => {
    // 统一错误处理逻辑
    // TODO 全局錯誤處理
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized, redirecting to login')
      // 可以在这里触发登出或跳转到登录页面等操作
      // TODO 處理 401 错误
    }
    return Promise.reject(error)
  }
)

apiClient.instance.interceptors.response.use(
  response => response,
  async error => {
    if (error.response.status === 401 && !error.config._retry) {
      // TODO 待確認實作 refresh token 邏輯
    }
    return Promise.reject(error)
  }
)

export const setHeaderToken = (token: string | null) => {
  apiClient.setSecurityData(token ? { token } : null)
}

if (typeof localStorage !== 'undefined') {
  const cacheToken = localStorage.getItem('token')

  if (cacheToken) {
    setHeaderToken(cacheToken)
  }
}
