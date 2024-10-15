import { useQuery } from '@tanstack/react-query'
import { apis } from '~/api/index'
import useStore from '~/stores/useStore'

export function useGetTask() {
  const isLoggedIn = useStore(state => state.isLoggedIn)

  const { data: tasks, isLoading: isTasksLoading } = useQuery({
    queryKey: ['tasks', isLoggedIn],
    queryFn: isLoggedIn ? apis.tasks.tasksList : apis.public.publicTasksList,
    refetchOnWindowFocus: true, // 當窗口重新獲得焦點時刷新
    retry: false,
  })

  return { tasks, isTasksLoading }
}
