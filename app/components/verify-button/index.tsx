import React, { memo, useState, useCallback, useRef, useImperativeHandle, useEffect } from 'react'
import { Button } from '~/components/ui/button'
import { cn } from '~/lib/utils'
import useStore from '~/stores/useStore'

import CountDown, { type Ref } from './count-down'
import { ValidCode } from './constants'
import { useActions } from './hooks'
import { errorToast } from '~/lib/toast'
import { useTranslation } from 'react-i18next'

type Props = {
  kind: ValidCode
  className?: string
  email?: string
  disabled?: boolean
  successCallBack?: () => void
  errorCallBack?: (e: unknown) => void
}

export type VerifyButtonExpose = {
  resetTimer: () => void
}

export { ValidCode }

const VerifyButton = React.forwardRef<VerifyButtonExpose, Props>(
  (
    {
      kind,
      className,
      email,
      disabled = false,
      successCallBack = () => {},
      errorCallBack = () => {},
    },
    ref
  ) => {
    const { t } = useTranslation()
    const {
      userInfo: { email: storeEmail },
      verificationTs,
      setVerificationTs,
    } = useStore(state => state)
    const [isCount, setIsCount] = useState<boolean>(false)
    const countRef = useRef<Ref>(null)

    const { validEmailHandler } = useActions()

    const handleSendCode = useCallback(() => {
      // send Verify request
      const sendEmail = email || storeEmail
      if (!sendEmail) {
        errorToast(t('EmailNotSet'))
        return
      }
      setVerificationTs(Date.now() + 60 * 1000)
      countRef.current?.handler(60)
      validEmailHandler(sendEmail, kind, successCallBack, errorCallBack)
    }, [
      kind,
      email,
      storeEmail,
      validEmailHandler,
      successCallBack,
      errorCallBack,
      setVerificationTs,
      t,
    ])

    useImperativeHandle(ref, () => ({
      resetTimer: () => {
        countRef.current?.handler(0)
      },
    }))

    useEffect(() => {
      if (verificationTs === 0) return
      const remainingTime = Math.max(0, Math.floor((verificationTs - Date.now()) / 1000))
      if (remainingTime > 0) {
        countRef.current?.handler(remainingTime)
      } else {
        setVerificationTs(0)
      }
    }, [verificationTs, setVerificationTs])

    return (
      <Button
        className={cn('w-full', className)}
        variant="outline"
        type="button"
        onClick={handleSendCode}
        disabled={isCount || disabled}
      >
        {t('SendVerificationCode')}
        <CountDown
          ref={countRef}
          timeEnd={useCallback(() => setIsCount(false), [])}
          timeStart={useCallback(() => setIsCount(true), [])}
        />
      </Button>
    )
  }
)

VerifyButton.displayName = 'VerifyButton'

export default memo(VerifyButton)
