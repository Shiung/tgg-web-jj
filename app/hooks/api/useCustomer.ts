import { useEffect } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { apis } from '~/api/index'
import useStore from '~/stores/useStore'

const customerInfoQueryKey = 'customerInfo'

const useGetCustomerInfoToStore = () => {
  const isLoggedIn = useStore(state => state.isLoggedIn)
  const setUserInfo = useStore(state => state.setUserInfo)
  const { data } = useQuery({
    queryKey: [customerInfoQueryKey],
    queryFn: apis.customer.customerInfoList,
    enabled: isLoggedIn,
  })

  useEffect(() => {
    if (!data?.data) return
    setUserInfo(data.data)
  }, [setUserInfo, data?.data])
}

const useValidCodeEmail = () => {
  return useMutation({
    mutationFn: apis.customer.customerValidcodeCreate,
    onError: error => {
      console.error('ValidcodeCreate failed, onError:', error)
    },
  })
}

const useVerifyCodeEmail = () => {
  return useMutation({
    mutationFn: apis.customer.customerVerifycodeCreate,
    onError: error => {
      console.error('customerVerifycodeCreate failed, onError:', error)
    },
  })
}

const useBindEmail = () => {
  return useMutation({
    mutationFn: apis.customer.customerBindemailUpdate,
    onError: error => {
      console.error('customerBindemailUpdate failed, onError:', error)
    },
  })
}

const useBindFundPin = () => {
  return useMutation({
    mutationFn: apis.customer.customerBindpinUpdate,
    onError: error => {
      console.error('customerBindpinUpdate failed, onError:', error)
    },
  })
}

export {
  useGetCustomerInfoToStore,
  useValidCodeEmail,
  useVerifyCodeEmail,
  useBindEmail,
  useBindFundPin,
  customerInfoQueryKey,
}
