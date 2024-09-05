import { type PropsWithChildren, useEffect } from 'react'
import { SDKProvider, useLaunchParams } from '@telegram-apps/sdk-react'
import { TonConnectUIProvider } from '@tonconnect/ui-react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useTelegramMock } from '~/hooks/useTelegramMock'

const queryClient = new QueryClient()

// test
const manifestUrl =
  'https://raw.githubusercontent.com/ton-community/tutorials/main/03-client/test/public/tonconnect-manifest.json'

export default function AppRoot({ children }: PropsWithChildren) {
  useTelegramMock()

  const debug = useLaunchParams(true)?.startParam === 'debug'
  // Enable debug mode to see all the methods sent and events received.
  useEffect(() => {
    console.log('debug', debug)

    if (debug) {
      import('eruda').then(lib => lib.default.init())
    }
  }, [debug])

  return (
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      <SDKProvider acceptCustomStyles debug={debug}>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </SDKProvider>
    </TonConnectUIProvider>
  )
}
