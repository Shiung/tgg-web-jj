export interface TelegramLoginOptions {
  bot_id: string // 你的 Telegram Bot ID
  request_access?: 'write' // 可选，默认不设置，表示请求写入权限
  origin?: string // 可选，默认是当前页面的 origin
  embed?: boolean // 可选，设置为 true 时弹窗嵌入在页面内，而不是跳转到新页面
  lang?: string // 可选，设置语言，例如 'en', 'zh', 'ru' 等
  onAuth: (user: TelegramUser) => void // 当用户授权登录时的回调函数，返回 Telegram 用户信息
}

export type AuthOptions = Pick<TelegramLoginOptions, 'bot_id' | 'request_access' | 'lang'>

export interface TelegramUser {
  id: number
  first_name: string
  last_name: string
  username: string
  photo_url: string
  auth_date: number
  hash: string
}

export interface TelegramLogin {
  init: (options: TelegramLoginOptions) => void // 初始化并弹出/嵌入登录窗口
  auth: (options: AuthOptions, callback: (user: TelegramUser | false) => void) => void // 用于手动认证用户信息
  open: (options: TelegramLoginOptions) => void // 手动打开登录窗口
}

export interface WindowTelegram {
  Login: TelegramLogin
}

declare global {
  interface Window {
    Telegram: WindowTelegram
  }
}
