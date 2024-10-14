import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import { WalletListResponse } from '~/api/codegen/data-contracts'
import { apis } from '~/api/index'
import useStore from '~/stores/useStore'
import { isValidCrypto } from '~/consts/crypto'

type UserWallet = NonNullable<WalletListResponse['wallets']>[number]

const getHeaderWalletQueryKey = 'getHeaderWallet'
const getWalletListQueryKey = 'getWalletList'

/**
 * Header 中錢包 popover 使用錢包資訊 api 的 hook
 */
const useGetHeaderWallet = () => {
  const isLoggedIn = useStore(state => state.isLoggedIn)

  return useQuery({
    queryKey: [getHeaderWalletQueryKey],
    queryFn: () => apis.header.headerWalletList(),
    enabled: !!isLoggedIn,
    staleTime: 30 * 1000, // 緩存 30 秒
  })
}

/**
 * 取得特定幣種的錢包資訊，與 useGetHeaderWallet
 * 使用相同的 queryKey
 * TODO: 確認使用內建快取機制避免而不是重複請求
 */
const useGetCryptoWallet = (crypto: string) => {
  const { data } = useQuery({
    queryKey: [getHeaderWalletQueryKey],
    queryFn: () => apis.header.headerWalletList(),
    enabled: false,
  })

  return useMemo(() => {
    const wallets = data?.data?.wallets
    if (!isValidCrypto(crypto) || wallets?.length === 0) return undefined

    return wallets?.find(wallet => wallet.currency === crypto)
  }, [crypto, data?.data?.wallets])
}

/**
 * Wallet 頁面使用錢包列表 api 的 hook
 */
const useGetWalletList = () => {
  const isLoggedIn = useStore(state => state.isLoggedIn)

  return useQuery({
    queryKey: [getWalletListQueryKey],
    queryFn: () => apis.wallet.walletListList(),
    enabled: !!isLoggedIn,
  })
}

const useRefreshWalletList = () => {
  const queryClient = useQueryClient()

  const refresh = async () => {
    await queryClient.ensureQueryData({
      queryKey: [getWalletListQueryKey],
      queryFn: () => apis.wallet.walletListList(),
    })
  }

  return {
    refresh,
  }
}

export type { UserWallet }
export {
  useGetHeaderWallet,
  useGetCryptoWallet,
  useGetWalletList,
  useRefreshWalletList,
  getHeaderWalletQueryKey,
  getWalletListQueryKey,
}
