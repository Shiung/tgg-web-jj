import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from '@remix-run/react'
// import { useEffect } from 'react'
// import { SDKProvider, useLaunchParams } from '@telegram-apps/sdk-react'
import { TonConnectUIProvider } from '@tonconnect/ui-react'
import MainNav from '~/components/main-nav'
import Header from '~/components/header'
import './tailwind.css'

const manifestUrl =
  'https://raw.githubusercontent.com/ton-community/tutorials/main/03-client/test/public/tonconnect-manifest.json'

export function Layout({ children }: { children: React.ReactNode }) {
  // const debug = useLaunchParams().startParam === 'debug'

  // Enable debug mode to see all the methods sent and events received.
  // useEffect(() => {
  //   if (debug) {
  //     import('eruda').then((lib) => lib.default.init())
  //   }
  // }, [debug])

  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <Meta />
        <Links />
      </head>
      <body className='bg-background font-sans antialiased dark'>
        <TonConnectUIProvider manifestUrl={manifestUrl}>
          {/* <SDKProvider acceptCustomStyles debug={debug}> */}
          <Header />
          <main className='mx-auto w-full max-w-screen-sm flex-1'>
            {children}
          </main>
          <MainNav />
          {/* </SDKProvider> */}
        </TonConnectUIProvider>
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
  return (
    <p className='grid h-screen grid-cols-1 place-items-center'>Loading...</p>
  )
}
