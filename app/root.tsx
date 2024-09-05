import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react'
import type { LinksFunction } from '@remix-run/node'
import MainNav from '~/components/main-nav'
import Header from '~/components/header'
import AppRoot from '~/components/app-root'
import ParticleBackground from '~/components/particle-background'
import AppLoading from '~/components/app-loading'

import './tailwind.css'

export const links: LinksFunction = () => {
  return [
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
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="dark bg-background font-sans antialiased">
        <AppRoot>
          <Header />
          <main className="main-container">{children}</main>
          <ParticleBackground />
          <MainNav />
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
  return <AppLoading />
  // return <p className="absolute inset-0 overflow-hidden bg-background">Loading...</p>
}
