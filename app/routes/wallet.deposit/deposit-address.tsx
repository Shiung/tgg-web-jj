import { useTonConnectUI, useTonWallet } from '@tonconnect/ui-react'
import AlertDialog from '~/components/alert-dialog'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { convertToUserFriendlyAddress } from '~/lib/ton'
import UnlinkIcon from '~/icons/unlink.svg?react'
import { useState } from 'react'

const DepositAddress: React.FC = () => {
  const [tonConnectUI] = useTonConnectUI()
  const tonWallet = useTonWallet()
  const [isAlertOpen, setIsAlertOpen] = useState(false)

  const openDialog = () => setIsAlertOpen(true)
  const closeDialog = () => setIsAlertOpen(false)

  const handleOk = async () => {
    if (tonConnectUI.connected) {
      await tonConnectUI.disconnect()
    }
    closeDialog()
  }

  const handleWalletDisconnect = () => {
    openDialog()
  }

  return (
    <>
      {tonConnectUI.connected && (
        <Input
          readOnly
          className="h-9"
          id="address"
          label="Deposit address"
          value={convertToUserFriendlyAddress(tonWallet?.account?.address || '')}
          suffix={
            <Button
              variant="icon"
              size="icon"
              type="button"
              className="h-4 w-4"
              onClick={handleWalletDisconnect}
            >
              <UnlinkIcon className="h-4 w-4" />
            </Button>
          }
        />
      )}
      <AlertDialog
        isOpen={isAlertOpen}
        onClose={closeDialog}
        title="Notice"
        message="Are you sure you want to disconnect this address?"
        onConfirm={handleOk}
      />
    </>
  )
}

export default DepositAddress
