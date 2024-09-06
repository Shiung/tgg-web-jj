import { Link, useLocation } from '@remix-run/react'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import useStore from '~/stores/useStore'
import { cn } from '~/lib/utils'
import NavGame from '~/icons/nav-game.svg?react'
import NavRank from '~/icons/nav-rank.svg?react'
import NavTask from '~/icons/nav-task.svg?react'
import NavShare from '~/icons/nav-share.svg?react'
import NavWallet from '~/icons/nav-wallet.svg?react'

const links = [
  { href: '/', i18n: 'game', SvgComponent: NavGame },
  { href: '/rank', i18n: 'rank', SvgComponent: NavRank },
  { href: '/task', i18n: 'task', SvgComponent: NavTask },
  { href: '/share', i18n: 'share', SvgComponent: NavShare },
  { href: '/wallet', i18n: 'wallet', SvgComponent: NavWallet },
] as const

const MainNav: React.FC = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const maxWidth = useStore(state => state.maxWidth)

  const isActive = useCallback(
    (href: (typeof links)[number]['href']) => href === location.pathname,
    [location.pathname]
  )

  return (
    <nav className="fixed inset-x-4 bottom-4 z-40 flex h-16 justify-center">
      <div
        className="flex h-full w-full rounded-lg bg-black px-2 py-4 shadow backdrop-blur-md backdrop-saturate-150"
        style={{ maxWidth: `${maxWidth}px` }}
      >
        {links.map((link, index) => (
          <Link
            key={index}
            to={link.href}
            className="relative flex shrink-0 grow basis-0 flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center">
              <link.SvgComponent
                className={cn(
                  'transition-all duration-300',
                  isActive(link.href) ? 'opacity-100 grayscale-0' : 'opacity-50 grayscale'
                )}
              />
              <span
                className={cn(
                  'mt-1 text-xs font-black',
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
