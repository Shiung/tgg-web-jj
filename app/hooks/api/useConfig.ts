import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { apis } from '~/api'
import useStore from '~/stores/useStore'

const useGetTelegramConfigToStore = () => {
  const setTelegramConfig = useStore(state => state.setTelegramConfig)

  const { data } = useQuery({
    queryKey: ['configTelegramList'],
    queryFn: apis.config.configTelegramList,
  })

  useEffect(() => {
    if (data?.data) {
      setTelegramConfig(data.data)
    }
  }, [data, setTelegramConfig])
}

export { useGetTelegramConfigToStore }
