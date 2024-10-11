import { useQuery } from '@tanstack/react-query'
import { apis } from '~/api'
import useStore from '~/stores/useStore'

/**
 * 在線狀態輪詢
 */
const usePingPolling = () => {
  const isLoggedIn = useStore(state => state.isLoggedIn)

  useQuery({
    queryKey: ['customerPingList'],
    queryFn: apis.customer.customerPingList,
    enabled: !!isLoggedIn,
    refetchInterval: 1000 * 60, // 1 分鐘
  })
}

export { usePingPolling }
