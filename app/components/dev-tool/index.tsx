import { useMemo, useState } from 'react'
import { Link } from '@remix-run/react'
import { Boxes, ChevronsLeft, ChevronsRight } from 'lucide-react'
import useStore from '~/stores/useStore'
import { cn } from '~/lib/utils'
import InfoTooltip from '~/components/info-tooltip'

import CurrentUrlPopover from './current-url-popover'
import DevLoginDialog from './dev-login-dialog'
import { Button } from '../ui/button'

const Playground = () => (
  <Link to="/playground" className="w-9 p-1 opacity-70 transition-opacity hover:opacity-100">
    <Boxes size={24} />
  </Link>
)

const DevTool = () => {
  const maxWidth = useStore(state => state.maxWidth)
  const [isExpanded, setIsExpanded] = useState(false)

  const notShow = useMemo(
    () => process.env.NODE_ENV === 'production' && import.meta.env.VITE_ENV === 'prod',
    []
  )

  const toggleExpand = () => {
    setIsExpanded(prev => !prev)
  }

  if (notShow) return null

  return (
    <div
      className={cn(
        'fixed left-0 top-[45%] z-50 h-[170px] rounded-r-xl border border-l-0 border-white/50 bg-black/50 py-2 shadow backdrop-blur',
        isExpanded ? 'w-14' : 'w-1',
        'transition-width duration-300 ease-in-out'
      )}
      style={{ left: `calc((100vw - ${maxWidth}) / 2)` }}
    >
      <Button
        onClick={toggleExpand}
        className={cn(
          'absolute right-0 top-1/2 h-10 w-5 -translate-y-1/2 transform rounded-l-xl rounded-r-none opacity-70 transition-opacity hover:opacity-100',
          isExpanded
            ? 'right-0'
            : '-right-5 rounded-l-none rounded-r-xl border-gray-600 bg-black/50 shadow backdrop-blur'
        )}
        variant="link"
        size="icon"
      >
        {isExpanded ? <ChevronsLeft size={20} /> : <ChevronsRight size={20} />}
      </Button>
      {isExpanded && (
        <div className="flex flex-col items-start space-y-2">
          <div className="flex w-full animate-bounce px-2">
            <InfoTooltip content="這是開發測試用工具，請忽略，正式環境將會隱藏" />
          </div>
          <DevLoginDialog />
          <CurrentUrlPopover />
          <Playground />
        </div>
      )}
    </div>
  )
}

export default DevTool
