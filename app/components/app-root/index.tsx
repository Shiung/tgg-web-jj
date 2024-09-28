import { type PropsWithChildren, useEffect, useMemo } from 'react'
import { useNavigate } from '@remix-run/react'
import {
  SDKProvider,
  useLaunchParams,
  useMiniApp,
  useSwipeBehavior,
} from '@telegram-apps/sdk-react'
import { TonConnectUIProvider } from '@tonconnect/ui-react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import useStore from '~/stores/useStore'
import { useTelegramMock } from '~/hooks/useTelegramMock'
import useTelegramNavigate from '~/hooks/useTelegramNavigate'
import { useAutoLogin } from '~/hooks/api/useAuth'
import { useTranslation } from 'react-i18next'
import { cn, mapSystemLanguageCode } from '~/lib/utils'

import { useAppMinHeightClass } from './useAppMinHeightClass'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
    },
  },
})

const TelegramInit: React.FC = () => {
  useTelegramNavigate()
  const { i18n } = useTranslation()
  const setTelegramInitData = useStore(state => state.setTelegramInitData)
  const navigate = useNavigate()
  const swipeBehavior = useSwipeBehavior()
  const launchParams = useLaunchParams(true)
  const startParam = launchParams?.startParam
  const miniApp = useMiniApp()

  // 自動登入
  useAutoLogin()

  // 避免下滑意外關閉 miniapp
  useEffect(() => {
    swipeBehavior.disableVerticalSwipe()
    return () => swipeBehavior.enableVerticalSwipe()
  }, [swipeBehavior])

  // 設置 miniapp 的header和背景顏色
  useEffect(() => {
    miniApp.setHeaderColor('#000000')
    miniApp.setBgColor('#242424')
  }, [miniApp])

  // 設置系統語言 與 initData
  useEffect(() => {
    if (!launchParams?.initData) return

    const initData = launchParams.initData
    const systemLanguageCode = mapSystemLanguageCode(initData.user?.languageCode)
    setTelegramInitData(initData)
    i18n.changeLanguage(systemLanguageCode)
  }, [i18n, launchParams, miniApp, setTelegramInitData])

  useEffect(() => {
    if (startParam === 'debug') {
      import('eruda').then(lib => lib.default.init())
    } else if (startParam === 'wallet') {
      navigate('/wallet')
    } else if (startParam && /^r_/.test(startParam)) {
      // 實作分享邀請碼功能，預期以某字符開頭 例如r_ 開頭 eg: r_xdgYdr6
      const referralCode = startParam.replace(/^r_/, '') // 去掉前面的 r_
      console.log('referralCode: ', referralCode)
    }
  }, [navigate, startParam])

  return null
}

export default function AppRoot({ children }: PropsWithChildren) {
  useTelegramMock()
  const inTelegram = useStore(state => state.inTelegram)
  const minHClass = useAppMinHeightClass()
  const manifestUrl = useMemo(() => {
    if (typeof window !== 'undefined')
      return new URL('tonconnect-manifest.json', window.location.href).toString()
    return ''
  }, [])

  return (
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      <SDKProvider acceptCustomStyles>
        <QueryClientProvider client={queryClient}>
          <div className={cn('flex flex-col', minHClass)}>{children}</div>
          {inTelegram && <TelegramInit />}
          <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-right" />
        </QueryClientProvider>
      </SDKProvider>
    </TonConnectUIProvider>
  )
}
