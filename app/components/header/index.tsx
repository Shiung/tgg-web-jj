import { Link } from '@remix-run/react'
import { useQuery } from '@tanstack/react-query'
import useStore from '~/stores/useStore'
import TelegramLoginButton from '~/components/telegram-login-button/index'
import Image from '~/components/image'
import { apis } from '~/api'
import { buildResourceImageUrl } from '~/lib/utils'

import ProfileDialog from './profile-dialog'
import TreasurePopOver from './treasure-popover'
import WalletPopOver from './wallet-popover'

const FALLBACK_LOGO = '/logo.svg'

const UserActions: React.FC = () => {
  const { inTelegram, isLoggedIn } = useStore(state => state)

  if (!inTelegram && !isLoggedIn) return <TelegramLoginButton />
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
  const isLoggedIn = useStore(state => state.isLoggedIn)
  const isHeaderVisible = useStore(state => state.isHeaderVisible)

  const { data: logoData, isLoading } = useQuery({
    queryKey: ['bannerLogoList'],
    queryFn: isLoggedIn ? apis.banner.bannerLogoList : apis.public.publicBannerLogoList,
  })

  if (!isHeaderVisible) return null
  return (
    <header className="fixed inset-x-0 top-0 z-40 h-header bg-background">
      <div className="mx-auto flex h-full w-full items-center justify-between bg-black px-4 py-2">
        <Link to="/">
          <Image
            srcList={[buildResourceImageUrl(logoData?.data.image), FALLBACK_LOGO]}
            alt="logo"
            className="aspect-[90/24] h-full max-h-6 w-auto object-cover"
            skeletonClassName="w-[90px] h-6"
            isFetching={isLoading}
          />
        </Link>
        <UserActions />
      </div>
    </header>
  )
}

export default Header
