import React, { useCallback, useEffect, useState } from 'react'
import TelegramIcon from '~/icons/telegram.svg?react'
import { Skeleton } from '~/components/ui/skeleton'
import { useLogin } from '~/hooks/api/useAuth'
import { LoginRequest } from '~/api/codegen/data-contracts'
import { detectOS } from '~/lib/utils'

const BOT_ID = import.meta.env.VITE_BOT_ID

const TelegramLoginButton: React.FC = () => {
  const [scriptLoaded, setScriptLoaded] = useState(false)

  const { mutate: doLogin } = useLogin()

  const handleLogin = useCallback(() => {
    if (scriptLoaded && window.Telegram?.Login) {
      window.Telegram.Login.auth(
        {
          bot_id: BOT_ID,
          request_access: 'write',
        },
        async user => {
          if (user) {
            console.log('login tg data', user)
            const loginData: LoginRequest = {
              avatar: user?.photo_url || '',
              device: 'Web',
              deviceId: 'device-id2',
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
    // 加载 Telegram 登录 Widget
    const script = document.createElement('script')
    script.src = 'https://telegram.org/js/telegram-widget.js?22'
    script.async = true

    script.onload = () => {
      setScriptLoaded(true)
    }

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  if (!scriptLoaded) return <Skeleton className="h-7 w-[95px] rounded-full" />
  return (
    <button
      onClick={handleLogin}
      className="inline-flex h-7 transform items-center justify-center whitespace-nowrap rounded-full bg-app-blue px-3 py-1 text-xs font-ultra text-white transition-transform hover:bg-app-blue/90 focus-visible:outline-none active:scale-95"
    >
      <TelegramIcon className="mr-1 h-4 w-4" />
      Connect
    </button>
  )
}

export default TelegramLoginButton
