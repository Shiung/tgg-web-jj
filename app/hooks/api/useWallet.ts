import { useQuery } from '@tanstack/react-query'
import { apis } from '~/api/index'
import useStore from '~/stores/useStore'

const useHeaderWallet = (query: { currency?: string } = {}) => {
  const token = useStore(state => state.token)

  return useQuery({
    queryKey: ['headerWalletList'],
    queryFn: () => apis.header.headerWalletList(query),
    enabled: !!token,
  })
}

export { useHeaderWallet }
