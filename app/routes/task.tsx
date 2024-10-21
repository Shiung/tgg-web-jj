import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'
import { Link, Outlet, useLocation, useNavigate } from '@remix-run/react'
import { useEffect, useState } from 'react'

const DEFAULT_TAB = 'subtask'
export default function Task() {
  const [currentTab, setCurrentTab] = useState(DEFAULT_TAB)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const pathToTab = location.pathname.split('/').pop() || DEFAULT_TAB

    if (location.pathname === '/task') {
      navigate('/task/subtask', { replace: true })
    } else {
      // currentTab 和 URL 同步
      setCurrentTab(pathToTab)
    }
  }, [location.pathname, navigate])
  return (
    <div className="container flex flex-1 flex-col p-0">
      {/* Top Navigation */}
      <Tabs defaultValue="task" value={currentTab} className="flex flex-1 flex-col">
        <TabsList className="relative left-[50%] mb-3 w-[94%] -translate-x-[50%]">
          <TabsTrigger value="subtask" className="flex-1" asChild>
            <Link prefetch="viewport" to="subtask">
              Task
            </Link>
          </TabsTrigger>
          <TabsTrigger value="treasure" className="flex-1" asChild>
            <Link prefetch="viewport" to="treasure">
              Treasure
            </Link>
          </TabsTrigger>
        </TabsList>
        <TabsContent value={currentTab} className="flex flex-1 flex-col">
          <Outlet />
        </TabsContent>
      </Tabs>
    </div>
  )
}
