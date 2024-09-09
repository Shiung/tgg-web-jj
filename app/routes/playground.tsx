import { useEffect, useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from '@remix-run/react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'

const DEFAULT_TAB = 'telegram-sdk'

export default function Playground() {
  const location = useLocation()
  const navigate = useNavigate()
  const [currentTab, setCurrentTab] = useState(DEFAULT_TAB)

  useEffect(() => {
    const pathTab = location.pathname.split('/').pop() || DEFAULT_TAB
    if (location.pathname === '/playground') {
      navigate('/playground/telegram-sdk', { replace: true })
    } else if (pathTab && currentTab !== pathTab) {
      setCurrentTab(pathTab)
    }
  }, [location.pathname, currentTab, navigate])

  return (
    <div className="container p-4 pb-safe">
      <h1 className="text-2xl font-bold">Playground</h1>
      <Tabs value={currentTab} className="mt-4 w-full">
        <TabsList className="max-w-full overflow-x-auto">
          <TabsTrigger value="telegram-sdk">
            <Link to="/playground/telegram-sdk">Telegram SDK</Link>
          </TabsTrigger>
          <TabsTrigger value="ui">
            <Link to="/playground/ui">Ui</Link>
          </TabsTrigger>
          <TabsTrigger value="i18next">
            <Link to="/playground/i18next">i18next</Link>
          </TabsTrigger>
          <TabsTrigger value="svg-icon">
            <Link to="/playground/svg-icon">svg icon</Link>
          </TabsTrigger>
        </TabsList>
        <TabsContent value={currentTab}>
          <Outlet />
        </TabsContent>
      </Tabs>
    </div>
  )
}
