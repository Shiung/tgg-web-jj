import { useCallback } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { apis } from '~/api'
import type { TransferBalanceRequest } from '~/api/codegen/data-contracts'

const useActions = () => {
  const { data: walletTransferRateData } = useQuery({
    queryKey: ['walletTransferRate'],
    queryFn: apis.wallet.walletTransferRateList,
  })

  const { mutateAsync } = useMutation({
    mutationFn: apis.wallet.walletTransferCreate,
    onError: error => {
      console.error('walletTransferCreate failed, onError:', error)
    },
  })

  const postTransfer = useCallback(
    async (
      params: TransferBalanceRequest,
      successCallBack?: () => void,
      errorCallBack?: (e: unknown) => void
    ) => {
      try {
        await mutateAsync(params)
        typeof successCallBack === 'function' && successCallBack()
      } catch (error) {
        const { response } = error as { response: { data: { errorCode: string } } }
        console.log('addBindPinHandler error try catch message ==> ', response?.data?.errorCode)
        typeof errorCallBack === 'function' && errorCallBack(response?.data?.errorCode)
      }
    },
    [mutateAsync]
  )

  return { walletTransferRateData: walletTransferRateData?.data, postTransfer }
}

export { useActions }
