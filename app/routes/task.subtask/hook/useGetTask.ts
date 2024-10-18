import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { apis } from '~/api/index'
import useStore from '~/stores/useStore'

export function useGetTask() {
  const isLoggedIn = useStore(state => state.isLoggedIn)
  const { i18n } = useTranslation()

  const { data: tasks, isLoading: isTasksLoading } = useQuery({
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

  return { tasks, isTasksLoading }
}
