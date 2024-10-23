import React, { useEffect, useState } from 'react'
import useStore from '~/stores/useStore'
import { useNavigate } from '@remix-run/react'
import AlertDialog from '~/components/alert-dialog'

import { emitter } from '~/lib/emitter'
import { useTranslation } from 'react-i18next'

const WithdrawDeniedDialog: React.FC = () => {
  const { pin } = useStore(state => state.userInfo)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const navigate = useNavigate()
  const { t } = useTranslation()

  const onClose = () => {
    navigate(-1)
  }

  const onNextStep = () => {
    emitter.emit('openProfileDialog', true)
  }

  useEffect(() => {
    setIsOpen(!pin)
  }, [pin])

  return (
    <AlertDialog
      isOpen={isOpen}
      onClose={onClose}
      title={t('Notice')}
      message={t('WithdrawDeniedMessage')}
      onRightButtonClick={onNextStep}
      onLeftButtonClick={() => {}}
    />
  )
}

export default WithdrawDeniedDialog
