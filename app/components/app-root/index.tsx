import { type PropsWithChildren, useEffect, useMemo } from 'react'
import {
  SDKProvider,
  useLaunchParams,
  useMiniApp,
  useSwipeBehavior,
  useViewport,
  useMainButton,
} from '@telegram-apps/sdk-react'
import { TonConnectUIProvider } from '@tonconnect/ui-react'
import { QueryClientProvider } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import useStore from '~/stores/useStore'
import { useTelegramMock } from '~/hooks/useTelegramMock'
import useTelegramNavigate from '~/hooks/useTelegramNavigate'
import { useTelegramMiniAppAutoLogin } from '~/hooks/useTelegramLogin'
import { useGetActiveGameListToStore } from '~/hooks/api/useGame'
import { useMaintenancePolling, usePingPolling } from '~/hooks/api/usePolling'
import { useGetTelegramConfigToStore } from '~/hooks/api/useConfig'
import { useGetCustomerInfoToStore } from '~/hooks/api/useCustomer'
import useWebCheckIsLoggedIn from '~/hooks/useWebCheckIsLoggedIn'
import { useAppLayoutClass } from '~/hooks/useAppLayoutClass'
import { cn, mapSystemLanguageCode } from '~/lib/utils'

import { TonClientProvider } from './ton-client-context'
import queryClient from './queryClient'

import classes from './index.module.scss'

const TelegramInit: React.FC = () => {
  useTelegramNavigate()
  const { i18n } = useTranslation()
  const { setTelegramPlatform, setTelegramInitDataByInitData, toggleMainButton } = useStore(
    state => ({
      setTelegramPlatform: state.setTelegramPlatform,
      setTelegramInitDataByInitData: state.setTelegramInitDataByInitData,
      toggleMainButton: state.toggleMainButton,
    })
  )

  const swipeBehavior = useSwipeBehavior()
  const launchParams = useLaunchParams(true)
  const miniApp = useMiniApp()
  const viewport = useViewport()
  const mainButton = useMainButton()

  // 自動登入
  useTelegramMiniAppAutoLogin(launchParams?.initData)

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

  // viewport
  useEffect(() => {
    if (!viewport) return
    if (!viewport.isExpanded) {
      viewport.expand()
    }
  }, [viewport])

  // mainButton, TODO: 待測試
  useEffect(() => {
    if (launchParams?.platform !== 'ios') return
    if (!mainButton) return

    const handleMainButtonClick = () => {
      const activeElement = document.activeElement as HTMLElement
      console.log('handleMainButtonClick', activeElement)
      if (activeElement && activeElement.tagName === 'INPUT') {
        activeElement.blur() // 取消 focus 並收起鍵盤
      }
    }

    if (toggleMainButton) {
      mainButton.setParams({
        bgColor: '#00000000',
        textColor: '#00000000',
        text: 'close',
        isVisible: true,
      })
      mainButton.on('click', handleMainButtonClick)
    } else {
      mainButton.hide()
      mainButton.off('click', handleMainButtonClick)
    }
  }, [mainButton, toggleMainButton, launchParams?.platform])

  // 設置系統語言 與 initData
  useEffect(() => {
    if (!launchParams) return
    if (launchParams.platform) {
      setTelegramPlatform(launchParams.platform)
    }

    if (!launchParams.initData) return
    const initData = launchParams.initData

    const systemLanguageCode = mapSystemLanguageCode(initData.user?.languageCode)
    initData?.user && setTelegramInitDataByInitData(initData.user)
    i18n.changeLanguage(systemLanguageCode)
  }, [i18n, setTelegramInitDataByInitData, setTelegramPlatform, launchParams])

  return null
}

const AppInit = () => {
  // init (data)
  useWebCheckIsLoggedIn()
  useGetTelegramConfigToStore()
  useGetActiveGameListToStore()
  useGetCustomerInfoToStore()
  // polling
  usePingPolling()
  useMaintenancePolling()

  return null
}

export default function AppRoot({ children }: PropsWithChildren) {
  // init telegram related hooks
  useTelegramMock()
  const inTelegram = useStore(state => state.inTelegram)

  // prepare layout params
  const isHeaderVisible = useStore(state => state.isHeaderVisible)
  const maxWidth = useStore(state => state.maxWidth)
  const appLayoutClass = useAppLayoutClass()

  // prepare manifestUrl
  const manifestUrl = useMemo(() => {
    if (process.env.NODE_ENV === 'development')
      return 'https://tgg-web.ljbdev.site/tonconnect-manifest.json'
    if (typeof window !== 'undefined')
      return new URL('tonconnect-manifest.json', window.location.href).toString()
    return ''
  }, [])

  return (
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      <TonClientProvider>
        <SDKProvider acceptCustomStyles>
          <QueryClientProvider client={queryClient}>
            {/* 上方模擬圓角遮罩 */}
            <div
              className={cn(classes['top-corner'], isHeaderVisible ? 'top-[60px]' : 'top-3')}
              style={{ maxWidth }}
            />
            {/* app框容器 */}
            <div className={cn('flex flex-col', appLayoutClass)}>{children}</div>
            {/* app初始相關數據獲取 */}
            <AppInit />
            {/* Telegram 相關初始化 */}
            {inTelegram && <TelegramInit />}
            <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-right" />
          </QueryClientProvider>
        </SDKProvider>
      </TonClientProvider>
    </TonConnectUIProvider>
  )
}
