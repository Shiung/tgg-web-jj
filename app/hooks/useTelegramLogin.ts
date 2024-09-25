import { useCallback, useEffect, useState } from 'react'
import { type AxiosResponse } from 'axios'
import { useLogin } from '~/hooks/api/useAuth'
import { LoginRequest, LoginResponse } from '~/api/codegen/data-contracts'
import { detectOS } from '~/lib/utils'
import { TelegramUser } from '~/components/telegram-login-button/types'

const BOT_ID = /* import.meta.env.VITE_BOT_ID */ '5000868057'

interface UseTelegramLoginProps {
  onSuccess?: (data: AxiosResponse<LoginResponse>, telegramUserData?: TelegramUser) => void // 新增的 callback 类型
}

export const useTelegramLogin = ({ onSuccess }: UseTelegramLoginProps = {}) => {
  const [scriptLoaded, setScriptLoaded] = useState(false)
  const [telegramUserData, setTelegramUserData] = useState<TelegramUser>()
  const { mutate: doLogin } = useLogin({
    onSuccess(data) {
      console.log('useTelegramLogin success:', data, onSuccess)

      if (onSuccess) onSuccess(data, telegramUserData)
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
            setTelegramUserData(user)
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
  }, [doLogin, scriptLoaded])

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
