import { useQuery } from '@tanstack/react-query'
import { WalletListResponse } from '~/api/codegen/data-contracts'
import { apis } from '~/api/index'
import useStore from '~/stores/useStore'

type UserWallet = NonNullable<WalletListResponse['wallets']>[number]

const useGetHeaderWallet = (query: { currency?: string } = {}) => {
  const token = useStore(state => state.token)

  return useQuery({
    queryKey: ['getHeaderWallet'],
    queryFn: () => apis.header.headerWalletList(query),
    enabled: !!token,
  })
}

const useGetWalletList = (query: { currency?: string } = {}) => {
  const token = useStore(state => state.token)

  return useQuery({
    queryKey: ['getWalletList'],
    queryFn: () => apis.wallet.walletListList(query),
    enabled: !!token,
  })
}

export type { UserWallet }
export { useGetHeaderWallet, useGetWalletList }
