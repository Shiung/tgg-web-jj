import { Link } from '@remix-run/react'
import useStore from '~/stores/useStore'
import TelegramLoginButton from '~/components/telegram-login-button/index'
import ProfileDialog from './profile-dialog'
import TreasurePopOver from './treasure-popover'
import WalletPopOver from './wallet-popover'

const UserActions: React.FC = () => {
  const { inTelegram, token } = useStore(state => state)

  if (!inTelegram && !token) return <TelegramLoginButton />
  return (
    <div className="flex items-center">
      {/* Wallet */}
      <WalletPopOver className="px-1" />
      {/* User Profile (Avatar) */}
      <ProfileDialog />
      {/* Treasure */}
      <TreasurePopOver className="ml-2" />
    </div>
  )
}

const Header: React.FC = () => {
  const isHeaderVisible = useStore(state => state.isHeaderVisible)

  if (!isHeaderVisible) return null
  return (
    <header className="sticky top-0 z-40 bg-black backdrop-blur">
      <div className="mx-auto flex h-12 w-full items-center justify-between px-4 py-2">
        <Link to="/">
          <img src="/logo.svg" alt="Kokon Logo" width={90} height={24} />
        </Link>
        <UserActions />
      </div>
    </header>
  )
}

export default Header
