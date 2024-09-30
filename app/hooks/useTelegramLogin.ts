import { useCallback, useEffect, useState } from 'react'
import { type AxiosResponse } from 'axios'
import { prepareLoginRequest, useLogin } from '~/hooks/api/useAuth'
import { LoginRequest, LoginResponse } from '~/api/codegen/data-contracts'
import { detectOS } from '~/lib/utils'
import { TelegramUser } from '~/components/telegram-login-button/types'
import { InitDataParsed } from '@telegram-apps/sdk-react'
import useStore from '~/stores/useStore'

const BOT_ID = import.meta.env.VITE_BOT_ID

interface UseTelegramLoginProps {
  onSuccess?: (data: AxiosResponse<LoginResponse>, telegramUserData?: TelegramUser) => void // 新增的 callback 类型
}

export const useTelegramLogin = ({ onSuccess }: UseTelegramLoginProps = {}) => {
  const [scriptLoaded, setScriptLoaded] = useState(false)
  const setTelegramInitDataByWidgetLogin = useStore(state => state.setTelegramInitDataByWidgetLogin)
  const { mutate: doLogin } = useLogin({
    onSuccess(data) {
      console.log('useTelegramLogin success:', data, onSuccess)
      if (onSuccess) onSuccess(data)
    },
  })

  const handleLogin = useCallback(() => {
    if (scriptLoaded && window.Telegram?.Login) {
      window.Telegram.Login.auth(
        {
          bot_id: BOT_ID,
          request_access: 'write',
        },
        async user => {
          if (user) {
            setTelegramInitDataByWidgetLogin(user)
            console.log('login tg data', user)
            const loginData: LoginRequest = {
              avatar: user?.photo_url || '',
              device: 'Web',
              deviceId: 'device-id',
              firstName: user?.first_name || '',
              id: user?.id,
              languageCode: '',
              lastName: user?.last_name || '',
              os: detectOS(),
              productId: 1,
              startapp: '',
              userName: user?.username,
              version: 'v0.0.0',
            }
            try {
              await doLogin(loginData)
            } catch (error) {
              console.error('Login failed:', error)
            }
          } else {
            console.log('User not logged in')
          }
        }
      )
    }
  }, [doLogin, scriptLoaded, setTelegramInitDataByWidgetLogin])

  useEffect(() => {
    // 避免重複載入
    if (document.getElementById('telegram-widget')) {
      setScriptLoaded(true)
      return
    }

    // 加载 Telegram 登录 Widget
    const script = document.createElement('script')
    script.id = 'telegram-widget'
    script.src = 'https://telegram.org/js/telegram-widget.js?22'
    script.async = true

    script.onload = () => {
      setScriptLoaded(true)
    }

    document.body.appendChild(script)

    return () => {
      if (script && document.getElementById('telegram-widget')) {
        document.body.removeChild(script)
      }
    }
  }, [])

  return { handleLogin, scriptLoaded }
}

export const useTelegramAutoLogin = (initData: InitDataParsed | undefined) => {
  const token = useStore(state => state.token)
  const isLoggedIn = useStore(state => state.isLoggedIn)

  const { mutate: doLogin } = useLogin()

  useEffect(() => {
    if (!initData || isLoggedIn) return

    // 有 telegram launch params 时，自動登入
    const handleLogin = async () => {
      const loginData = prepareLoginRequest(initData)
      if (!loginData) return
      try {
        await doLogin(loginData)
      } catch (error) {
        console.error('Login failed inline:', error)
      }
    }

    handleLogin()
  }, [doLogin, token, initData, isLoggedIn])
}
