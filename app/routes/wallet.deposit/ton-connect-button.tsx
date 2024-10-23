import { useEffect } from 'react'
import { useTonConnectUI, useTonConnectModal, ConnectedWallet } from '@tonconnect/ui-react'
import { Button } from '~/components/ui/button'
import { errorToast, successToast } from '~/lib/toast'
import { useTranslation } from 'react-i18next'

interface TonConnectButtonProps {
  onWalletConnect?: (wallet: ConnectedWallet) => void
  onWalletDisconnect?: () => void
}

const toastMessage = {
  success: 'ConnectedSuccessfully',
  fail: 'ConnectedUnsuccessfully',
}

export default function TonConnectButton({
  onWalletConnect,
  onWalletDisconnect,
}: TonConnectButtonProps) {
  const [tonConnectUI] = useTonConnectUI()
  const { open } = useTonConnectModal()
  const { t } = useTranslation()

  useEffect(() => {
    const unsubscribe = tonConnectUI.onStatusChange(wallet => {
      if (wallet) {
        successToast(t(toastMessage.success))
        onWalletConnect?.(wallet)
      } else {
        errorToast(t(toastMessage.fail))
        onWalletDisconnect?.()
      }
    })

    return () => unsubscribe()
  }, [onWalletConnect, onWalletDisconnect, tonConnectUI, t])

  return (
    <Button type="button" onClick={open}>
      {t('ConnectWallet')}
    </Button>
  )
}
