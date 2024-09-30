import { useQuery } from '@tanstack/react-query'
import { WalletListResponse } from '~/api/codegen/data-contracts'
import { apis } from '~/api/index'
import useStore from '~/stores/useStore'

type UserWallet = NonNullable<WalletListResponse['wallets']>[number]

const useGetHeaderWallet = (query: { currency?: string } = {}) => {
  const isLoggedIn = useStore(state => state.isLoggedIn)

  return useQuery({
    queryKey: ['getHeaderWallet'],
    queryFn: () => apis.header.headerWalletList(query),
    enabled: !!isLoggedIn,
  })
}

const useGetWalletList = (query: { currency?: string } = {}) => {
  const isLoggedIn = useStore(state => state.isLoggedIn)

  return useQuery({
    queryKey: ['getWalletList'],
    queryFn: () => apis.wallet.walletListList(query),
    enabled: !!isLoggedIn,
  })
}

export type { UserWallet }
export { useGetHeaderWallet, useGetWalletList }
