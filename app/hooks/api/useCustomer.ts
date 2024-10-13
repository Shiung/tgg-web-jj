import { useMutation } from '@tanstack/react-query'
import { apis } from '~/api/index'

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

export { useValidCodeEmail, useVerifyCodeEmail, useBindEmail, useBindFundPin }
