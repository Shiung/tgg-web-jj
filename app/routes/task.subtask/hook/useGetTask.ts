import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { apis } from '~/api/index'
import useStore from '~/stores/useStore'

import { emitter } from '~/lib/emitter'
import { useEffect } from 'react'

export function useGetTask() {
  const isLoggedIn = useStore(state => state.isLoggedIn)
  const { i18n } = useTranslation()

  const {
    data: tasks,
    isLoading: isTasksLoading,
    refetch,
  } = useQuery({
    queryKey: ['tasks', i18n.language, isLoggedIn],
    queryFn: () => {
      const headers = { 'Accept-Language': i18n.language }
      return isLoggedIn
        ? apis.tasks.tasksList({ headers })
        : apis.public.publicTasksList({ headers })
    },
    refetchOnWindowFocus: true, // 當窗口重新獲得焦點時刷新
    retry: false,
  })

  useEffect(() => {
    emitter.on('refetchTaskList', v => v && refetch())
    return () => {
      emitter.off('refetchTaskList')
    }
  }, [refetch])

  return { tasks, isTasksLoading }
}
