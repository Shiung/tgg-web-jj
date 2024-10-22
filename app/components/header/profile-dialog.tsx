import { useEffect, useMemo, useState } from 'react'
import { useCopyToClipboard } from 'react-use'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Button } from '~/components/ui/button'
import { TwitterIcon } from '~/components/color-icons'
import CopyIcon from '~/icons/copy.svg?react'
import LogoutIcon from '~/icons/logout.svg?react'
import EmailDialog from './email-dialog'
import LanguageDialog from './language-dialog'
import { languages } from './constants'
import FundPasswordDialog from './fund-password-dialog'
import { apis } from '~/api/index'
import useStore from '~/stores/useStore'
import type { UserSlice } from '~/stores/userSlice'
import { successToast } from '~/lib/toast'
import { emitter } from '~/lib/emitter'

const links = {
  support: {
    title: 'Support',
    value: 'www.kokon.io', // TODO: replace with real link
    text: 'kokon.io',
  },
  officialLinks: {
    title: 'Official Links',
    value: [
      { icon: TwitterIcon, url: '' },
      // { icon: GlobalIcon, url: '' },
    ],
  },
}

const empty: UserSlice['userInfo'] = {}

const ProfileDialog: React.FC = () => {
  const [state, copyToClipboard] = useCopyToClipboard()
  const [open, setIsOpen] = useState(false)
  const { i18n, t } = useTranslation()
  const { inTelegram, isLoggedIn, telegramUserData, setUserInfo, logout } = useStore(state => state)
  const { data, refetch } = useQuery({
    queryKey: ['customerInfo'],
    queryFn: apis.customer.customerInfoList,
    enabled: !!isLoggedIn,
  })
  const userData = useMemo(() => data?.data ?? empty, [data])

  useEffect(() => {
    emitter.on('openProfileDialog', v => setIsOpen(v))
    return () => {
      emitter.off('openProfileDialog')
    }
  }, [])

  useEffect(() => {
    setUserInfo(userData)
  }, [userData, setUserInfo])

  useEffect(() => {
    if (!state.value) return
    successToast(t('Copied'))
  }, [state, t])

  return (
    <Dialog open={open} onOpenChange={o => setIsOpen(o)}>
      <DialogTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={telegramUserData?.photoUrl || ''} />
          <AvatarFallback delayMs={600} />
        </Avatar>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="relative flex aspect-[343/130] w-full flex-col items-center justify-center bg-colorLinear-orange">
          <DialogTitle />
          <img src="/images/long-wave.png" alt="profile" className="absolute inset-0 top-3" />
          <div className="relative h-20 w-20">
            <img
              src="/images/header/profile.png"
              alt="profile"
              className="h-full w-full object-contain"
            />
            {telegramUserData?.photoUrl && (
              <img
                className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 transform rounded-full border-[2px] border-primary"
                src={telegramUserData?.photoUrl}
                alt="avatar"
              />
            )}
          </div>
          <span className="mt-1 text-base font-ultra">{`${telegramUserData?.firstName || ''} ${telegramUserData?.lastName || ''}`}</span>
        </DialogHeader>
        <div className="flex flex-col space-y-4 p-3 text-sm text-white/70">
          {/* Player ID */}
          <div className="flex items-center justify-between">
            <span>{t('PlayerId')}</span>
            <div className="flex items-center space-x-2">
              <span className="font-ultra text-white">{userData.customerId}</span>
              <Button
                variant="icon"
                size="icon"
                className="h-4 w-4 text-white"
                onClick={() => copyToClipboard(`${userData.customerId || ''}`)}
              >
                <CopyIcon className="h-full w-full" />
              </Button>
            </div>
          </div>
          {/* Email */}
          <div className="flex items-center justify-between">
            <span>{t('Email')}</span>
            <div className="flex items-center justify-end space-x-2">
              {userData.email && (
                <div className="w-5/6 truncate font-ultra text-white">{userData.email}</div>
              )}
              <EmailDialog infoRefetch={refetch} />
            </div>
          </div>
          {/* Fund Password */}
          <div className="flex items-center justify-between">
            <span>{t('FundPassword')}</span>
            <div className="flex items-center justify-end space-x-2">
              {userData.pin && (
                <div className="w-5/6 truncate font-ultra text-white">{userData.pin}</div>
              )}
              <FundPasswordDialog infoRefetch={refetch} />
            </div>
          </div>
          {/* Language */}
          <div className="flex items-center justify-between">
            <span>{t('Language')}</span>
            <div className="flex items-center space-x-2">
              {useMemo(() => {
                const getLang = languages.find(({ value }) => value === i18n.language)
                if (!getLang) return ''
                return (
                  <>
                    <img src={getLang.icon} alt={`${getLang.name} icon`} className="h-6 w-6" />
                    <span className="font-ultra text-white">{getLang?.name}</span>
                  </>
                )
              }, [i18n.language])}
              <LanguageDialog />
            </div>
          </div>

          <hr className="border-white/20" />

          {/* Support */}
          <div className="flex items-center justify-between">
            <span>{t('Support')}</span>
            <a href={links.support.value} className="font-ultra text-app-blue">
              {links.support.text}
            </a>
          </div>

          {/* Official Links */}
          <div className="flex items-center justify-between">
            <span>{t('OfficialLinks')}</span>
            <div className="flex space-x-2">
              {links.officialLinks.value.map((link, index) => (
                <a key={index} href={link.url}>
                  <link.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Logout for web */}
          {!inTelegram && (
            <>
              <hr className="border-white/20" />
              <div className="flex items-center justify-between">
                <span>{t('LogOut')}</span>
                <Button variant="icon" size="icon" onClick={logout}>
                  <LogoutIcon className="h-4 w-4" />
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ProfileDialog
