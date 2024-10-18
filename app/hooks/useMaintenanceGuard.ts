import { useLocation, useNavigate } from '@remix-run/react'
import { useEffect } from 'react'
import { emitter } from '~/lib/emitter'

const useMaintenanceGuard = () => {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const handleNavigateMaintenancePage = (visible: boolean) => {
      const isOnMaintenancePage = location.pathname === '/maintenance'
      if (visible && !isOnMaintenancePage) {
        navigate('/maintenance')
      } else if (!visible && isOnMaintenancePage) {
        navigate('/')
      }
    }

    emitter.on('openMaintenance', handleNavigateMaintenancePage)

    return () => {
      emitter.off('openMaintenance', handleNavigateMaintenancePage)
    }
  }, [navigate, location])
}

export { useMaintenanceGuard }
