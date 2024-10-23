import React from 'react'
import { useNavigate } from '@remix-run/react'
import AlertDialog from '~/components/alert-dialog'
import { useTranslation } from 'react-i18next'

interface WithdrawSuccessDialogProps {
  isOpen: boolean
  onClose: () => void
}

const WithdrawSuccessDialog: React.FC<WithdrawSuccessDialogProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <AlertDialog
      variant="success"
      isOpen={isOpen}
      onClose={onClose}
      title={t('Success')}
      message={
        <div className="space-y-2">
          <p className="text-base font-ultra text-white">{t('SubmittedSuccessfully')}</p>
          <p>{t('SubmittedSuccessfullyContent')}</p>
        </div>
      }
      leftButtonText={t('CheckStatus')}
      rightButtonText={t('Ok')}
      onRightButtonClick={onClose}
      onLeftButtonClick={() => navigate('/wallet/withdrawal-processing')}
    />
  )
}

export default WithdrawSuccessDialog
