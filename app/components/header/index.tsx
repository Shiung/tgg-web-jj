import { Link, useLocation } from '@remix-run/react'
import { useMemo } from 'react'
import { Link as LinkIcon } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover'
import ProfileDialog from './profile-dialog'
import TreasurePopOver from './treasure-popover'
import WalletPopOver from './wallet-popover'

const Header: React.FC = () => {
  const location = useLocation()

  const currentUrl = useMemo(() => {
    return `${location.pathname}${location.search}`
  }, [location])

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
          <WalletPopOver className="px-1" />
          {/* User Profile (Avatar)  */}
          <ProfileDialog />
          {/* Treasure */}
          <TreasurePopOver className="ml-2" />
        </div>
      </div>
    </header>
  )
}

export default Header
