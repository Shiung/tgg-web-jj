import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react'
import type { LinksFunction } from '@remix-run/node'
import { Toaster } from 'react-hot-toast'
import MainNav from '~/components/main-nav'
import Header from '~/components/header/index'
import AppRoot from '~/components/app-root/index'
import ParticleBackground from '~/components/particle-background'
import AppLoading from '~/components/app-loading'
import NeedLoginDialog from '~/components/need-login-dialog'
import DevTool from '~/components/dev-tool/index'
import { useAppMaxWidth } from '~/hooks/useAppMaxWidth'
import { useSafePaddingClass } from '~/hooks/useSafePaddingClass'
import { cn } from '~/lib/utils'

import useAuthGuard from '~/hooks/useAuthGuard'
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

export default function App() {
  useAuthGuard()
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
        <NeedLoginDialog />
        {/* 開發使用工具欄 */}
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
