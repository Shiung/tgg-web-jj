import { useMemo } from 'react'
import type { WPunitCard } from './types'
import { Crypto, cryptoDetails } from '~/consts/crypto'

import { useQuery } from '@tanstack/react-query'
import { apis } from '~/api'

const empty: WPunitCard[] = []

const useActions = () => {
  const { data, isFetching: isLoading } = useQuery({
    queryKey: ['walletWithdrawingList'],
    queryFn: apis.wallet.walletWithdrawingListList,
  })

  const dataLs = data?.data.list || empty
  const ls = useMemo<WPunitCard[]>(() => {
    if (isLoading) return empty
    return dataLs
      .filter(({ currency }) => currency in Crypto)
      .map(l => ({
        ...l,
        icon: cryptoDetails[l.currency].icon,
      }))
  }, [isLoading, dataLs])

  return { ls, isLoading }
}

export { useActions }
