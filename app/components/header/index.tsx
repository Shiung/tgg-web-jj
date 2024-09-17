import { Link } from '@remix-run/react'
import ProfileDialog from './profile-dialog'
import TreasurePopOver from './treasure-popover'
import WalletPopOver from './wallet-popover'

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 bg-black backdrop-blur">
      <div className="mx-auto flex h-12 w-full items-center justify-between px-4 py-2">
        <Link to="/">
          <img src="/logo.svg" alt="Kokon Logo" width={90} height={24} />
        </Link>

        <div className="flex items-center">
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
