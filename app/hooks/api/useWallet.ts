import { useQuery } from '@tanstack/react-query'
import { WalletListResponse } from '~/api/codegen/data-contracts'
import { apis } from '~/api/index'
import useStore from '~/stores/useStore'

type UserWallet = NonNullable<WalletListResponse['wallets']>[number]

const useGetHeaderWallet = () => {
  const isLoggedIn = useStore(state => state.isLoggedIn)

  return useQuery({
    queryKey: ['getHeaderWallet'],
    queryFn: () => apis.header.headerWalletList(),
    enabled: !!isLoggedIn,
  })
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
export { useGetHeaderWallet, useGetWalletList }
