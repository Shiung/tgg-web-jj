import { useMemo } from 'react'
import { useLocation } from '@remix-run/react'
import { Link as LinkIcon } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover'

const CurrentUrlPopover: React.FC = () => {
  const location = useLocation()

  const currentUrl = useMemo(() => {
    return `${location.pathname}${location.search}`
  }, [location])

  return (
    <Popover>
      <PopoverTrigger className="fixed left-0 top-[35%] z-50 rounded-r-2xl border border-l-0 border-gray-600 bg-black/50 p-2 py-2 pl-1 pr-3 shadow backdrop-blur">
        <LinkIcon className="h-6 w-6" />
      </PopoverTrigger>
      <PopoverContent className="w-auto p-3">{`~${currentUrl}`}</PopoverContent>
    </Popover>
  )
}

export default CurrentUrlPopover
