import React, { useEffect, useState } from 'react'
import useStore from '~/stores/useStore'
import { useNavigate } from '@remix-run/react'
import AlertDialog from '~/components/alert-dialog'

import { emitter } from '~/lib/emitter'

const WithdrawDeniedDialog: React.FC = () => {
  const { pin } = useStore(state => state.userInfo)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const navigate = useNavigate()

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
      title="Notice"
      message="You have to enter your fund password for withdrawal. Please go to add your email and set your fund password."
      onRightButtonClick={onNextStep}
      onLeftButtonClick={() => {}}
    />
  )
}

export default WithdrawDeniedDialog
