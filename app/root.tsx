import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react'
import type { LinksFunction } from '@remix-run/node'
import { Toaster } from '~/components/ui/toaster'
import MainNav from '~/components/main-nav'
import Header from '~/components/header/index'
import AppRoot from '~/components/app-root/index'
import ParticleBackground from '~/components/particle-background'
import AppLoading from '~/components/app-loading'
import CurrentUrlPopover from '~/components/current-url-popover'
import NeedLoginDialog from '~/components/need-login-dialog'
import { useAppMaxWidth } from '~/hooks/useAppMaxWidth'
import { useMainMaxHeightClass } from '~/hooks/useMainMaxHeightClass'
import useAuthGuard from './hooks/useAuthGuard'
import { cn } from '~/lib/utils'

// import './tailwind.css'
import stylesheet from '~/tailwind.css?url'

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: stylesheet },
    { rel: 'icon', href: '/favicon.ico', sizes: '16x16', type: 'image/x-icon' },
    {
      rel: 'icon',
      href: '/favicon-32x32.png',
      sizes: '32x32',
      type: 'image/png',
    },
    {
      rel: 'icon',
      href: '/favicon-48x48.png',
      sizes: '48x48',
      type: 'image/png',
    },
    {
      rel: 'icon',
      href: '/favicon-64x64.png',
      sizes: '64x64',
      type: 'image/png',
    },
    {
      rel: 'apple-touch-icon',
      href: '/apple-touch-icon.png',
      sizes: '180x180',
    },
    {
      rel: 'icon',
      href: '/android-chrome-192x192.png',
      sizes: '192x192',
      type: 'image/png',
    },
    {
      rel: 'icon',
      href: '/android-chrome-512x512.png',
      sizes: '512x512',
      type: 'image/png',
    },
  ]
}

export function Layout({ children }: { children: React.ReactNode }) {
  useAuthGuard()
  const maxWidth = useAppMaxWidth()
  const mainMaxHClass = useMainMaxHeightClass()

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
        <AppRoot>
          <Header />
          <main
            className={cn(
              'relative z-10 mx-auto flex w-full flex-1 flex-col overflow-y-auto overflow-x-hidden rounded-xl pt-3',
              mainMaxHClass
            )}
            style={{ maxWidth: maxWidth }}
          >
            {children}
          </main>
          <ParticleBackground />
          <MainNav />
          <NeedLoginDialog />
          <Toaster />
          {/* 開發使用 */}
          <CurrentUrlPopover />
        </AppRoot>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}

export function HydrateFallback() {
  return <AppLoading variant="system" />
}
