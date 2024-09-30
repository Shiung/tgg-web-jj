import { useCallback } from 'react'
import { useValidCodeEmail } from '~/hooks/api/useCustomer'
import { ValidCode } from './constants'

export const useActions = () => {
  const { mutateAsync: validCodeAPI } = useValidCodeEmail()

  const validEmailHandler = useCallback(
    async (
      email: string,
      valid: ValidCode,
      successCallBack?: () => void,
      errorCallBack?: (e: unknown) => void
    ) => {
      try {
        const { data } = await validCodeAPI({ email, kind: valid })
        if (data.succeed) {
          typeof successCallBack === 'function' && successCallBack()
        } else {
          typeof errorCallBack === 'function' && errorCallBack(data)
        }
      } catch (error) {
        const { response } = error as { response: { data: { errorCode: string } } }
        console.log('validEmailHandler error try catch message ==> ', response?.data?.errorCode)
        typeof errorCallBack === 'function' && errorCallBack(error)
      }
    },
    [validCodeAPI]
  )
  return { validEmailHandler }
}
