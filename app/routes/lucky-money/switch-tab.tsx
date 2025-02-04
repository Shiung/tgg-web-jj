import { Link, useLocation } from '@remix-run/react'
import { useTranslation } from 'react-i18next'
import { Button } from '~/components/ui/button'
import { cn } from '~/lib/utils'

const tabs = [
  { label: 'MyShare', path: '/lucky-money/list' },
  { label: 'ShareNewBags', path: '/lucky-money/share' },
]

/* 上方兩顆切換按鈕 */
const SwitchTab = () => {
  const { t } = useTranslation()
  const location = useLocation()

  return (
    <div className="flex w-full flex-shrink-0 space-x-2">
      {tabs.map(tab => (
        <Link key={tab.label} prefetch="viewport" to={tab.path} className="flex-1">
          <Button
            variant="outlineSoft"
            className={cn(
              'h-7 w-full text-xs',
              location.pathname === '/lucky-money/list' ? 'bg-primary/10 text-primary' : ''
            )}
            isSelected={location.pathname === tab.path}
          >
            {t(tab.label)}
          </Button>
        </Link>
      ))}
    </div>
  )
}

export default SwitchTab
