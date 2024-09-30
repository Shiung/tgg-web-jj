import React, { memo, useState, useCallback, useRef, useImperativeHandle } from 'react'
import { Button } from '~/components/ui/button'
import { cn } from '~/lib/utils'
import useStore from '~/stores/useStore'

import CountDown, { type Ref } from './count-down'
import { ValidCode } from './constants'
import { useActions } from './hooks'

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
    const {
      info: { email: storeEmail },
    } = useStore(state => state)
    const [isCount, setIsCount] = useState<boolean>(false)
    const countRef = useRef<Ref>(null)

    const { validEmailHandler } = useActions()

    const handleSendCode = useCallback(() => {
      countRef.current?.handler(60)
      // send Verify reqest
      const sendEmail = email || storeEmail
      if (!sendEmail) return
      validEmailHandler(sendEmail, kind, successCallBack, errorCallBack)
    }, [kind, email, storeEmail, validEmailHandler, successCallBack, errorCallBack])

    useImperativeHandle(ref, () => ({
      resetTimer: () => {
        countRef.current?.handler(0)
      },
    }))

    return (
      <Button
        className={cn('w-full', className)}
        variant="outline"
        type="button"
        onClick={handleSendCode}
        disabled={isCount || disabled}
      >
        Send Verification Code
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
