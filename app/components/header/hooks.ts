import { useCallback, useState, useMemo } from 'react'
import { useBindEmail, useBindFundPin, useVerifyCodeEmail } from '~/hooks/api/useCustomer'
import { EmailBindStep } from './constants'

const useEmailActions = (infoRefetch: () => void) => {
  const { mutateAsync: bindEmailAPI } = useBindEmail()
  const { mutateAsync: verifyCodeEmailAPI } = useVerifyCodeEmail()

  const addBindEmailHandler = useCallback(
    async (
      email: string,
      code: string,
      successCallBack: () => void,
      errorCallBack?: (e: unknown) => void
    ) => {
      try {
        const { data } = await bindEmailAPI({ email, code })
        if (data.succeed) {
          infoRefetch()
          typeof successCallBack === 'function' && successCallBack()
        } else {
          typeof errorCallBack === 'function' && errorCallBack(data)
        }
      } catch (error) {
        const { response } = error as { response: { data: { errorCode: string } } }
        console.log('addBindEmailHandler error try catch message ==> ', response?.data?.errorCode)
        typeof errorCallBack === 'function' && errorCallBack(response?.data?.errorCode)
      }
    },
    [bindEmailAPI, infoRefetch]
  )

  const verifyCodeEmailHandler = useCallback(
    async (code: string, successCallBack: () => void, errorCallBack?: (e: unknown) => void) => {
      try {
        const { data } = await verifyCodeEmailAPI({ code })
        if (data.succeed) {
          typeof successCallBack === 'function' && successCallBack()
        } else {
          typeof errorCallBack === 'function' && errorCallBack(data)
        }
      } catch (error) {
        typeof errorCallBack === 'function' && errorCallBack(error)
      }
    },
    [verifyCodeEmailAPI]
  )

  return {
    addBindEmailHandler,
    verifyCodeEmailHandler,
  }
}

const useEmailStatus = ({ email }: { email: string }) => {
  const [isVerifyCurrent, setIsVerifyCurrent] = useState(false)
  const isEditEmail = !!email

  const stepStatus = useMemo<EmailBindStep>(() => {
    return !isEditEmail
      ? EmailBindStep.addEmail
      : isVerifyCurrent
        ? EmailBindStep.updateNewEmail
        : EmailBindStep.validOldEmail
  }, [isEditEmail, isVerifyCurrent])

  return {
    isEditEmail,
    isVerifyCurrent,
    stepStatus,
    isVerifyCurrentHandler: useCallback((b: boolean) => setIsVerifyCurrent(b), []),
  }
}

const useFundActions = (infoRefetch: () => void) => {
  const { mutateAsync: bindPinAPI } = useBindFundPin()

  const addBindPinHandler = useCallback(
    async (
      pin: string,
      code: string,
      successCallBack: () => void,
      errorCallBack?: (e: unknown) => void
    ) => {
      try {
        const { data } = await bindPinAPI({ pin, code })
        if (data.succeed) {
          infoRefetch()
          typeof successCallBack === 'function' && successCallBack()
        } else {
          typeof errorCallBack === 'function' && errorCallBack(data)
        }
      } catch (error) {
        const { response } = error as { response: { data: { errorCode: string } } }
        console.log('addBindPinHandler error try catch message ==> ', response?.data?.errorCode)
        typeof errorCallBack === 'function' && errorCallBack(response?.data?.errorCode)
      }
    },
    [bindPinAPI, infoRefetch]
  )

  return { addBindPinHandler }
}

export { useEmailActions, useEmailStatus, useFundActions }
