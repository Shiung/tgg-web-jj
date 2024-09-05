import { Link, useLocation } from '@remix-run/react'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { cn } from '~/lib/utils'

const links = [
  { href: '/', i18n: 'game', svgSrc: '/svg/nav-game.svg' },
  { href: '/rank', i18n: 'rank', svgSrc: '/svg/nav-rank.svg' },
  { href: '/task', i18n: 'task', svgSrc: '/svg/nav-task.svg' },
  { href: '/share', i18n: 'share', svgSrc: '/svg/nav-share.svg' },
  { href: '/wallet', i18n: 'wallet', svgSrc: '/svg/nav-wallet.svg' },
] as const

const MainNav: React.FC = () => {
  const { t } = useTranslation()
  const location = useLocation()

  const isActive = useCallback(
    (href: (typeof links)[number]['href']) => href === location.pathname,
    [location.pathname]
  )

  return (
    <nav className="fixed inset-x-4 bottom-4 z-40 flex h-16 justify-center">
      <div className="flex h-full w-full max-w-screen-sm rounded-lg bg-black px-2 py-4 shadow backdrop-blur-md backdrop-saturate-150">
        {links.map((link, index) => (
          <Link
            key={index}
            to={link.href}
            className="relative flex shrink-0 grow basis-0 flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center">
              <img
                className={cn(
                  'transition-all duration-300',
                  isActive(link.href) ? 'opacity-100 grayscale-0' : 'opacity-50 grayscale'
                )}
                width={24}
                height={24}
                src={link.svgSrc}
                alt={t(link.i18n)}
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
