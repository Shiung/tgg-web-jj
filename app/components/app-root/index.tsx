import { type PropsWithChildren, useEffect } from 'react'
import { useNavigate } from '@remix-run/react'
import { SDKProvider, useLaunchParams, useMiniApp } from '@telegram-apps/sdk-react'
import { TonConnectUIProvider } from '@tonconnect/ui-react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import useStore from '~/stores/useStore'
import { useTelegramMock } from '~/hooks/useTelegramMock'
import useTelegramNavigate from '~/hooks/useTelegramNavigate'
import { useAutoLogin } from '~/hooks/api/useAuth'
import { useTranslation } from 'react-i18next'
import { mapSystemLanguageCode } from '~/lib/utils'

const queryClient = new QueryClient()

// test
const manifestUrl =
  'https://raw.githubusercontent.com/ton-community/tutorials/main/03-client/test/public/tonconnect-manifest.json'

const TelegramInit: React.FC = () => {
  useTelegramNavigate()
  const { i18n } = useTranslation()
  const navigate = useNavigate()
  const setTelegramInitData = useStore(state => state.setTelegramInitData)
  const launchParams = useLaunchParams(true)
  const startParam = launchParams?.startParam
  const miniApp = useMiniApp()

  // 自動登入
  useAutoLogin()

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

  return (
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      <SDKProvider acceptCustomStyles>
        <QueryClientProvider client={queryClient}>
          <div className="flex min-h-dvh flex-col">{children}</div>
          {inTelegram && <TelegramInit />}
          <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-right" />
        </QueryClientProvider>
      </SDKProvider>
    </TonConnectUIProvider>
  )
}
