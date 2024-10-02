import { useCallback, useEffect, useState } from 'react'
import { type AxiosResponse } from 'axios'
import { prepareLoginRequest, useLogin } from '~/hooks/api/useAuth'
import { LoginResponse } from '~/api/codegen/data-contracts'
import { TelegramOAuthUser } from '~/components/telegram-login-button/types'
import { InitDataParsed } from '@telegram-apps/sdk-react'
import useStore from '~/stores/useStore'

const BOT_ID = import.meta.env.VITE_BOT_ID

interface UseTelegramLoginProps {
  onSuccess?: (data: AxiosResponse<LoginResponse>, telegramUserData?: TelegramOAuthUser) => void // 新增的 callback 类型
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
            const loginData = prepareLoginRequest(user)
            if (!loginData) return
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

export const useTelegramMiniAppAutoLogin = (initData: InitDataParsed | undefined) => {
  const { mutate: doLogin } = useLogin()

  useEffect(() => {
    if (!initData) return

    // 有 telegram launch params 时，自動登入
    const handleLogin = async () => {
      const loginData = prepareLoginRequest(initData.user)
      if (!loginData) return
      try {
        await doLogin(loginData)
      } catch (error) {
        console.error('Login failed inline:', error)
      }
    }

    handleLogin()
  }, [doLogin, initData])
}
