import React from 'react'
import { useNavigate } from '@remix-run/react'
import AlertDialog from '~/components/alert-dialog'

interface WithdrawSuccessDialogProps {
  isOpen: boolean
  onClose: () => void
}

const WithdrawSuccessDialog: React.FC<WithdrawSuccessDialogProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate()

  return (
    <AlertDialog
      variant="success"
      isOpen={isOpen}
      onClose={onClose}
      title="Success"
      message={
        <div className="space-y-2">
          <p className="text-base font-ultra text-white">Submitted Successfully</p>
          <p>
            It may takes some time to process your withdrawal. You can go to History to check the
            status.
          </p>
        </div>
      }
      leftButtonText="Check Status"
      rightButtonText="Ok"
      onRightButtonClick={onClose}
      onLeftButtonClick={() => navigate('/wallet/withdrawal-processing')}
    />
  )
}

export default WithdrawSuccessDialog
