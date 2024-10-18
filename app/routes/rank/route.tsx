import { Outlet, useNavigate, useLocation, Link } from '@remix-run/react'
import React, { useEffect, useState, useMemo } from 'react'
import { Tabs, TabsList, TabsTrigger } from '~/components/ui/tabs'

import { useRankProvider } from './provider'
import SkeletonBox from './components/skeleton'

import { useTranslation } from 'react-i18next'

type TabLS = Array<{
  value: 'crypto' | 'share'
  titleKey: string
  to: string
}>

const TabConf: TabLS = [
  {
    value: 'crypto',
    titleKey: 'rank.nav.crypto',
    to: '/rank/crypto',
  },
  {
    value: 'share',
    titleKey: 'rank.nav.share',
    to: '/rank/share',
  },
]

const LayOne: React.FC<{
  children?: React.ReactNode
  pathName?: string
  tabs?: TabLS
}> = props => {
  const { t } = useTranslation()
  const selectedTab = useMemo(() => props.pathName?.replace(/\/rank\//g, ''), [props.pathName])
  if (!props.tabs) return
  return (
    <>
      <Tabs defaultValue="crypto" value={selectedTab} className="px-1 pb-3">
        <TabsList className="w-full">
          {props.tabs.map(({ value, titleKey, to }) => {
            return (
              <TabsTrigger key={value} value={value} className="flex-1" asChild>
                <Link prefetch="viewport" to={to}>
                  {t(titleKey)}
                </Link>
              </TabsTrigger>
            )
          })}
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

  const { contextVal } = useRankProvider()

  const tabs = useMemo(() => {
    if (!contextVal.state.pageExist) return []
    return TabConf.filter(({ value }) => contextVal.state.pageExist?.[value] ?? false)
  }, [contextVal.state.pageExist])

  useEffect(() => {
    const setting = contextVal.state.pageExist
    if (!setting || init) return

    let needReplace = pathname === '/rank' || pathname.includes('coming-soon')

    if (!contextVal.state.pageExist?.crypto && !contextVal.state.pageExist?.share) {
      navigate('/rank/coming-soon', { replace: true })
    } else if (!contextVal.state.pageExist?.crypto) {
      needReplace = needReplace || pathname.includes('crypto')
      needReplace && navigate('/rank/share', { replace: true })
    } else if (!contextVal.state.pageExist?.share) {
      needReplace = needReplace || pathname.includes('share')
      needReplace && navigate('/rank/crypto', { replace: true })
    } else {
      needReplace && navigate('/rank/crypto', { replace: true })
    }
    setInit(true)
  }, [navigate, pathname, contextVal.state.pageExist, init])

  if (!init) return <SkeletonBox isInit />

  return (
    <div className="container mx-auto flex flex-1 flex-col rounded-t-xl p-0">
      <CompLayout pathName={pathname} tabs={tabs}>
        <Outlet context={contextVal} />
      </CompLayout>
    </div>
  )
}
