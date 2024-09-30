import { useEffect, useMemo, useState } from 'react'
import type { UnitCard, WPunitCard } from './types'
import { Crypto, cryptoDetails } from '~/consts/crypto'

const fakeList: UnitCard[] = [
  {
    amount: '123456789.12345678999',
    currency: Crypto.USDT,
    memo: '',
    address: 'wueiofhwbnjqioe12783wueiofhwbnjqioe12783',
    submissionTime: '08-23 11:32',
  },
  {
    amount: '123456789.928',
    currency: Crypto.KOKON,
    memo: '',
    address: 'wueiofhwbnjqioe1278362hjfhjw89jwqefuhqwoie4219efhjewklfh1uipefjhnbwoikf',
    submissionTime: '08-23 11:32',
  },
  {
    amount: '123456789.12',
    currency: Crypto.TON,
    memo: '',
    address: 'wueiofhwbnjqioe12783wueiofhwbnjqioe12783',
    submissionTime: '08-23 11:32',
  },
]

const empty: WPunitCard[] = []

const useActions = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const ls = useMemo<WPunitCard[]>(() => {
    if (isLoading) return empty
    return fakeList.map(l => ({
      ...l,
      icon: cryptoDetails[l.currency].icon,
    }))
  }, [isLoading])

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }, [])

  return { ls, isLoading }
}

export { useActions }
