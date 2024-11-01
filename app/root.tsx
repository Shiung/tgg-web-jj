import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react'
import type { LinksFunction } from '@remix-run/node'
import { useTranslation } from 'react-i18next'
import { Toaster } from 'react-hot-toast'
import MainNav from '~/components/main-nav'
import Header from '~/components/header/index'
import AppRoot from '~/components/app-root/index'
import ParticleBackground from '~/components/particle-background'
import AppLoading from '~/components/app-loading/index'
import NeedLoginDialog from '~/components/need-login-dialog'
import DevTool from '~/components/dev-tool/index'
import GetLuckyMoneyDialog from '~/components/get-lucky-money-dialog'
import { useAppMaxWidth } from '~/hooks/useAppMaxWidth'
import useRouteGuard from '~/hooks/useRouteGuard'
import { cn } from '~/lib/utils'
import { iconsLinks, prefetchAssetsLinks } from '~/consts/prefetch'
import { fallbackLng } from '~/consts/i18n'
import useStore from '~/stores/useStore'

import './tailwind.css'

export const links: LinksFunction = () => {
  return [...iconsLinks, ...prefetchAssetsLinks]
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation()
  const inTelegram = useStore(state => state.inTelegram)

  return (
    <html lang={i18n.language || fallbackLng}>
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <Meta />
        <Links />
      </head>
      <body
        className={cn(
          'dark relative bg-background font-sans antialiased',
          inTelegram ? 'overflow-hidden' : ''
        )}
      >
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  // route guard
  useRouteGuard()
  // layout settings
  const maxWidth = useAppMaxWidth()

  return (
    <>
      <AppRoot>
        <Header />
        <main
          className={cn(
            'main relative z-10 mx-auto flex w-full flex-1 flex-col overflow-y-auto overflow-x-hidden rounded-xl'
          )}
          style={{ maxWidth: maxWidth }}
        >
          <Outlet />
        </main>
        <MainNav />
        {/* 需要登入彈窗 */}
        <NeedLoginDialog />
        {/* 紅包 */}
        <GetLuckyMoneyDialog />
        {/* 開發使用工具 */}
        <DevTool />
      </AppRoot>
      <ParticleBackground />
      <Toaster
        // 居中
        containerStyle={{
          top: '50%',
        }}
      />
    </>
  )
}

export function HydrateFallback() {
  return <AppLoading variant="system" />
}
