import { useEffect } from 'react'
import { useTonConnectUI, useTonConnectModal, ConnectedWallet } from '@tonconnect/ui-react'
import { Button } from '~/components/ui/button'

interface TonConnectButtonProps {
  onWalletConnect?: (wallet: ConnectedWallet) => void
  onWalletDisconnect?: () => void
}

export default function TonConnectButton({
  onWalletConnect,
  onWalletDisconnect,
}: TonConnectButtonProps) {
  const [tonConnectUI] = useTonConnectUI()
  const { open, state } = useTonConnectModal()

  useEffect(() => {
    console.log('TonConnectButton state:', state)
  }, [state])

  useEffect(() => {
    const unsubscribe = tonConnectUI.onStatusChange(wallet => {
      if (wallet) {
        console.log('TonConnectButton 連接成功:', wallet)
        onWalletConnect?.(wallet)
      } else {
        console.error('TonConnectButton 連接失敗')
        onWalletDisconnect?.()
      }
    })

    return () => unsubscribe()
  }, [onWalletConnect, onWalletDisconnect, tonConnectUI])

  return (
    <Button type="button" onClick={open}>
      Connect Wallet
    </Button>
  )
}
