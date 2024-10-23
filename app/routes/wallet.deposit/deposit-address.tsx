import { useState } from 'react'
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react'
import { MiddleTruncate } from '@re-dev/react-truncate'

import AlertDialog from '~/components/alert-dialog'
import { Button } from '~/components/ui/button'
import UnlinkIcon from '~/icons/unlink.svg?react'
import { Label } from '~/components/ui/label'
import { useTranslation } from 'react-i18next'

const DepositAddress: React.FC = () => {
  const [tonConnectUI] = useTonConnectUI()
  const userFriendlyAddress = useTonAddress()
  const [isAlertOpen, setIsAlertOpen] = useState(false)

  const { t } = useTranslation()

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
        <>
          <Label className="ml-3">{t('DepositAddress')}</Label>
          <div className="relative flex h-9 w-full items-center justify-between rounded-full border-[0.5px] border-white/20 bg-[#333] px-3 py-2 text-sm font-ultra">
            <div className="flex-1">
              <MiddleTruncate end={4}>{userFriendlyAddress}</MiddleTruncate>
            </div>
            <Button
              variant="icon"
              size="icon"
              type="button"
              className="h-8 w-6"
              onClick={handleWalletDisconnect}
            >
              <UnlinkIcon className="h-4 w-4" />
            </Button>
          </div>
        </>
      )}
      <AlertDialog
        isOpen={isAlertOpen}
        onClose={closeDialog}
        title={t('Notice')}
        message={t('AreYouSureYouWantToDisconnectThisAddress')}
        onRightButtonClick={handleOk}
        onLeftButtonClick={closeDialog}
      />
    </>
  )
}

export default DepositAddress
