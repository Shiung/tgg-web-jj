import { Link, useLocation } from '@remix-run/react'
import { useMemo } from 'react'
import { Link as LinkIcon } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import Amount from '~/components/amount'
import { KokonIcon } from '~/components/color-icons'
import RefreshIcon from '~/icons/refresh.svg?react'

const Header: React.FC = () => {
  const location = useLocation()

  const currentUrl = useMemo(() => {
    return `${location.pathname}${location.search}`
  }, [location])

  const handleRefresh = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
    event.stopPropagation()
    console.log('handleRefresh')
  }

  return (
    <header className="sticky top-0 z-50 bg-black backdrop-blur">
      <div className="mx-auto flex h-12 w-full items-center justify-between px-4 py-2">
        <Link to="/">
          <img src="/logo.svg" alt="Kokon Logo" width={90} height={24} />
        </Link>

        <div className="flex items-center">
          {/* Url display for test */}
          <Popover>
            <PopoverTrigger>
              <LinkIcon className="mr-1 h-4 w-4" />
            </PopoverTrigger>
            <PopoverContent className="w-auto p-3">{`~${currentUrl}`}</PopoverContent>
          </Popover>
          {/* Wallet */}
          <Popover>
            <PopoverTrigger>
              <div className="mr-1 flex h-8 items-center justify-center space-x-1 rounded-full bg-[#1C1C1C] px-1">
                <KokonIcon className="h-4 w-4" />
                <Amount className="text-sm font-extrabold" value={10020000} useKMBT />
                <RefreshIcon className="h-4 w-4 text-primary" onClick={handleRefresh} />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-3">Wallet Area</PopoverContent>
          </Popover>
          {/* Avatar */}
          <Avatar>
            {/* test https://github.com/shadcn.png */}
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback delayMs={600} />
          </Avatar>
        </div>
      </div>
    </header>
  )
}

export default Header
