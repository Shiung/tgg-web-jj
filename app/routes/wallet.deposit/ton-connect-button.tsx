import { useEffect } from 'react'
import { useTonConnectUI, useTonConnectModal, ConnectedWallet } from '@tonconnect/ui-react'
import { Button } from '~/components/ui/button'
import { errorToast, successToast } from '~/lib/toast'

interface TonConnectButtonProps {
  onWalletConnect?: (wallet: ConnectedWallet) => void
  onWalletDisconnect?: () => void
}

const toastMessage = {
  success: 'Connected successfully',
  fail: 'Connected unsuccessfully',
}

export default function TonConnectButton({
  onWalletConnect,
  onWalletDisconnect,
}: TonConnectButtonProps) {
  const [tonConnectUI] = useTonConnectUI()
  const { open } = useTonConnectModal()

  useEffect(() => {
    const unsubscribe = tonConnectUI.onStatusChange(wallet => {
      if (wallet) {
        successToast(toastMessage.success)
        onWalletConnect?.(wallet)
      } else {
        errorToast(toastMessage.fail)
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
