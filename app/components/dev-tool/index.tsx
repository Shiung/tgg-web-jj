import { Boxes, ChevronsLeft, ChevronsRight } from 'lucide-react'
import useStore from '~/stores/useStore'
import CurrentUrlPopover from './current-url-popover'
import DevLoginDialog from './dev-login-dialog'
import { useState } from 'react'
import { Button } from '../ui/button'
import { Link } from '@remix-run/react'
import { cn } from '~/lib/utils'

const Playground = () => (
  <Link to="/playground" className="w-9 p-1 opacity-70 transition-opacity hover:opacity-100">
    <Boxes size={24} />
  </Link>
)

const DevTool = () => {
  const maxWidth = useStore(state => state.maxWidth)
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpand = () => {
    setIsExpanded(prev => !prev)
  }

  return (
    <div
      className={cn(
        'fixed left-0 top-[45%] z-50 h-[130px] rounded-r-xl border border-l-0 border-white/50 bg-black/50 shadow backdrop-blur',
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
          <DevLoginDialog />
          <CurrentUrlPopover />
          <Playground />
        </div>
      )}
    </div>
  )
}

export default DevTool
