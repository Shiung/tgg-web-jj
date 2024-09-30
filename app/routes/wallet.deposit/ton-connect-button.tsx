import { useEffect } from 'react'
import { useTonConnectUI, useTonConnectModal, ConnectedWallet } from '@tonconnect/ui-react'
import { Button } from '~/components/ui/button'
import { useToast } from '~/hooks/use-toast'

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
  const { open, state } = useTonConnectModal()
  const { toast } = useToast()

  useEffect(() => {
    console.log('TonConnectButton state:', state)
  }, [state])

  useEffect(() => {
    const unsubscribe = tonConnectUI.onStatusChange(wallet => {
      if (wallet) {
        toast({
          title: toastMessage.success,
          variant: 'success',
        })
        onWalletConnect?.(wallet)
      } else {
        toast({
          title: toastMessage.fail,
          variant: 'error',
        })
        onWalletDisconnect?.()
      }
    })

    return () => unsubscribe()
  }, [onWalletConnect, onWalletDisconnect, toast, tonConnectUI])

  return (
    <Button type="button" onClick={open}>
      Connect Wallet
    </Button>
  )
}
