import { Outlet, useNavigate, useLocation, Link } from '@remix-run/react'
import React, { useEffect, useState, useMemo } from 'react'
import { Tabs, TabsList, TabsTrigger } from '~/components/ui/tabs'

import { useRankProvider } from './provider'
import SkeletonBox from './components/skeleton'

const LayOne: React.FC<{ children?: React.ReactNode; pathName?: string }> = props => {
  const selectedTab = useMemo(() => props.pathName?.replace(/\/rank\//g, ''), [props.pathName])
  return (
    <>
      <Tabs defaultValue="crypto" value={selectedTab} className="px-1 pb-3">
        <TabsList className="w-full">
          <TabsTrigger value="crypto" className="flex-1" asChild>
            <Link prefetch="viewport" to="/rank/crypto">
              Crypto Rank
            </Link>
          </TabsTrigger>
          <TabsTrigger value="share" className="flex-1" asChild>
            <Link prefetch="viewport" to="/rank/share">
              Share Rank
            </Link>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {React.isValidElement(props?.children) && props?.children}
    </>
  )
}

const LayTwo: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return <>{React.isValidElement(children) && children}</>
}

export default function Layout() {
  const [init, setInit] = useState<boolean>(false)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const CompLayout = useMemo(() => {
    if (pathname.includes('coming-soon')) return LayTwo
    return LayOne
  }, [pathname])

  useEffect(() => {
    if (!init) return

    // setting close
    // navigate('/rank/coming-soon', { replace: true })

    if (pathname === '/rank') {
      navigate('/rank/crypto', { replace: true })
    }
  }, [navigate, pathname, init])

  useEffect(() => {
    setTimeout(() => {
      setInit(true)
    }, 3000)
  }, [])

  const { contextVal } = useRankProvider()

  if (!init) return <SkeletonBox isInit />

  return (
    <div className="container mx-auto flex flex-1 flex-col rounded-t-xl p-0">
      <CompLayout pathName={pathname}>
        <Outlet context={contextVal} />
      </CompLayout>
    </div>
  )
}
