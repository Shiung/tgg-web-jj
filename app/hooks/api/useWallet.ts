import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { WalletListResponse } from '~/api/codegen/data-contracts'
import { apis } from '~/api/index'
import useStore from '~/stores/useStore'
import { isValidCrypto } from '~/consts/crypto'

type UserWallet = NonNullable<WalletListResponse['wallets']>[number]

const getHeaderWalletQueryKey = ['getHeaderWallet']

const useGetHeaderWallet = () => {
  const isLoggedIn = useStore(state => state.isLoggedIn)

  return useQuery({
    queryKey: getHeaderWalletQueryKey,
    queryFn: () => apis.header.headerWalletList(),
    enabled: !!isLoggedIn,
  })
}

/**
 * 取得特定幣種的錢包資訊，與 useGetHeaderWallet
 * 使用相同的 queryKey，使用內建快取機制避免而不是重複請求
 */
const useGetCryptoWallet = (crypto: string) => {
  const isLoggedIn = useStore(state => state.isLoggedIn)

  const { data } = useQuery({
    queryKey: getHeaderWalletQueryKey,
    queryFn: () => apis.header.headerWalletList(),
    enabled: !!isLoggedIn,
  })

  return useMemo(() => {
    const wallets = data?.data?.wallets
    if (!isValidCrypto(crypto) || wallets?.length === 0) return undefined

    return wallets?.find(wallet => wallet.currency === crypto)
  }, [crypto, data?.data?.wallets])
}

const useGetWalletList = () => {
  const isLoggedIn = useStore(state => state.isLoggedIn)

  return useQuery({
    queryKey: ['getWalletList'],
    queryFn: () => apis.wallet.walletListList(),
    enabled: !!isLoggedIn,
  })
}

export type { UserWallet }
export { useGetHeaderWallet, useGetCryptoWallet, useGetWalletList, getHeaderWalletQueryKey }
