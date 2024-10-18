import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { apis } from '~/api'
import { emitter } from '~/lib/emitter'
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

/**
 * 維護設定
 */
const useMaintenancePolling = () => {
  const { data } = useQuery({
    queryKey: ['systemMaintenanceList'],
    queryFn: apis.system.systemMaintenanceList,
    refetchInterval: 1000 * 60, // 1 分鐘
  })

  useEffect(() => {
    const isUnderMaintenance = data?.data?.maintenance
    emitter.emit('openMaintenance', !!isUnderMaintenance)
  }, [data?.data?.maintenance])
}

export { usePingPolling, useMaintenancePolling }
