import { Links, Meta, Outlet, Scripts, ScrollRestoration, useRouteError } from '@remix-run/react'
import type { LinksFunction } from '@remix-run/node'
import { Toaster } from 'react-hot-toast'
import MainNav from '~/components/main-nav'
import Header from '~/components/header/index'
import AppRoot from '~/components/app-root/index'
import ParticleBackground from '~/components/particle-background'
import AppLoading from '~/components/app-loading'
import NeedLoginDialog from '~/components/need-login-dialog'
import DevTool from '~/components/dev-tool/index'
import GetLuckyMoneyDialog from '~/components/get-lucky-money-dialog'
import { useAppMaxWidth } from '~/hooks/useAppMaxWidth'
import { useSafePaddingClass } from '~/hooks/useSafePaddingClass'
import useRouteGuard from '~/hooks/useRouteGuard'
import { cn } from '~/lib/utils'
import { iconsLinks, prefetchAssetsLinks } from '~/consts/prefetch'

import './tailwind.css'

export const links: LinksFunction = () => {
  return [...iconsLinks, ...prefetchAssetsLinks]
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <Meta />
        <Links />
      </head>
      <body className="dark bg-background font-sans antialiased">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export function ErrorBoundary() {
  const error = useRouteError()
  console.error(error)
  return (
    <html lang="en">
      <head>
        <title>Oh no!</title>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <Meta />
        <Links />
      </head>
      <body className="dark bg-background font-sans antialiased">
        Somethings went wrong !
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
  const safePaddingClass = useSafePaddingClass()

  return (
    <>
      <AppRoot>
        <Header />
        <main
          className={cn(
            'main relative z-10 mx-auto flex w-full flex-1 flex-col overflow-y-auto overflow-x-hidden rounded-xl',
            safePaddingClass
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
