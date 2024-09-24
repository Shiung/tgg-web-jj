import { useCallback, useEffect, useState } from 'react'
import { Link, useLocation } from '@remix-run/react'
import { useHapticFeedback } from '@telegram-apps/sdk-react'
import { useTranslation } from 'react-i18next'
import useStore from '~/stores/useStore'
import { cn } from '~/lib/utils'
import NavGame from './icons/game'
import NavRank from './icons/rank'
import NavTask from './icons/task'
import NavShare from './icons/share'
import NavWallet from './icons/wallet'

export const links = [
  { href: '/', i18n: 'game', SvgComponent: NavGame },
  { href: '/rank', i18n: 'rank', SvgComponent: NavRank },
  { href: '/task', i18n: 'task', SvgComponent: NavTask },
  { href: '/share-invite', i18n: 'share', SvgComponent: NavShare },
  { href: '/wallet', i18n: 'wallet', SvgComponent: NavWallet },
] as const

const MainNav: React.FC = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const hapticFeedback = useHapticFeedback(true)
  const maxWidth = useStore(state => state.maxWidth)
  const [activeLink, setActiveLink] = useState(location.pathname)

  const isActive = useCallback(
    (href: (typeof links)[number]['href']) => href === activeLink,
    [activeLink]
  )

  const handleClick = useCallback(
    (href: string) => {
      setActiveLink(href)
      hapticFeedback?.impactOccurred('medium')
    },
    [hapticFeedback]
  )

  useEffect(() => {
    setActiveLink(location.pathname)
  }, [location.pathname])

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex h-nav justify-center p-3">
      <div
        className="flex h-full w-full rounded-lg bg-black px-2 py-4 shadow backdrop-blur-md backdrop-saturate-150"
        style={{ maxWidth: maxWidth }}
      >
        {links.map((link, index) => (
          <Link
            key={index}
            to={link.href}
            prefetch="viewport"
            className="relative flex shrink-0 grow basis-0 flex-col items-center justify-center"
            onClick={() => handleClick(link.href)}
          >
            <div className="flex flex-col items-center">
              <link.SvgComponent
                width={25}
                height={24}
                className={cn(
                  'transition-all duration-300',
                  isActive(link.href) ? 'opacity-100 grayscale-0' : 'opacity-50 grayscale'
                )}
              />
              <span
                className={cn(
                  'mt-1 text-xs font-ultra',
                  isActive(link.href) ? 'text-primary' : 'text-while'
                )}
              >
                {t(link.i18n)}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </nav>
  )
}

export default MainNav
