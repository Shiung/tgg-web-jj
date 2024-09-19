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
    <div className="container rounded-t-xl bg-black px-0 py-3">
      <h1 className="pl-4 text-2xl font-bold">Playground</h1>
      <Tabs value={currentTab} className="mt-4 w-full">
        <TabsList variant="cardTab" className="w-full overflow-x-auto">
          <TabsTrigger variant="cardTab" value="telegram-sdk" className="flex-1" asChild>
            <Link to="/playground/telegram-sdk">Telegram SDK</Link>
          </TabsTrigger>
          <TabsTrigger variant="cardTab" value="ui" className="flex-1" asChild>
            <Link to="/playground/ui">Ui</Link>
          </TabsTrigger>
          <TabsTrigger variant="cardTab" value="i18next" className="flex-1" asChild>
            <Link to="/playground/i18next">i18next</Link>
          </TabsTrigger>
          <TabsTrigger variant="cardTab" value="svg-icon" className="flex-1" asChild>
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
