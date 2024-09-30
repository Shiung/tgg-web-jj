// api/apiClient.ts
import { HttpClient } from './codegen/http-client'

interface SecurityDataType {
  token?: string
}

// 初始化全局的 HttpClient 实例
export const apiClient = new HttpClient<SecurityDataType>({
  baseURL: /* process.env.NODE_ENV === 'development' ? '/' : */ import.meta.env.VITE_API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  secure: true,
  withCredentials: true,
  // TODO: 待 session 管理方案实现后移除
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
    // 统一错误处理逻辑，例如检查 token 过期
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized, redirecting to login')
      // 可以在这里触发登出或跳转到登录页面
    }
    return Promise.reject(error)
  }
)

apiClient.instance.interceptors.response.use(
  response => response,
  async error => {
    if (error.response.status === 401 && !error.config._retry) {
      // TODO 實作 refresh token 邏輯
      // error.config._retry = true
      // const newToken = await refreshToken() // 請求新的 token
      // setApiToken(newToken) // 更新全局 token
      // error.config.headers['Authorization'] = `Bearer ${newToken}`
      // return apiClient.instance.request(error.config) // 重新发送请求
    }
    return Promise.reject(error)
  }
)

// TODO: 待 session 管理方案实现后移除
export const setHeaderToken = (token: string) => {
  apiClient.setSecurityData({ token })
}

if (typeof localStorage !== 'undefined') {
  const cacheToken = localStorage.getItem('token')

  if (cacheToken) {
    setHeaderToken(cacheToken)
  }
}
