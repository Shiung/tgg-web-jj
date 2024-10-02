import { useMemo } from 'react'
import { useLocation } from '@remix-run/react'
import { Link as LinkIcon } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover'
import { Button } from '~/components/ui/button'

const CurrentUrlPopover: React.FC = () => {
  const location = useLocation()

  const currentUrl = useMemo(() => {
    return `${location.pathname}${location.search}`
  }, [location])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="icon" className="w-9 p-1">
          <LinkIcon size={24} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-3">{`~${currentUrl}`}</PopoverContent>
    </Popover>
  )
}

export default CurrentUrlPopover
