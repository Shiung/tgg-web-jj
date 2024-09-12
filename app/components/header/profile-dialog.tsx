import { useCopyToClipboard } from 'react-use'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '~/components/ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { TwitterIcon, GlobalIcon } from '~/components/color-icons'
import CopyIcon from '~/icons/copy.svg?react'
import AddIcon from '~/icons/add.svg?react'
import SettingIcon from '~/icons/setting.svg?react'
import { useToast } from '~/hooks/use-toast'

import EmailDialog from './eamil-dialog'
import { useEffect } from 'react'

const userData = {
  playerId: {
    title: 'Player ID',
    value: '1234567890',
  },
  name: {
    title: 'Name',
    value: 'Name',
  },
  email: {
    title: 'Email',
    value: 'test@test.com',
  },
  fundPassword: {
    title: 'Fund Password Set',
    value: false,
  },
  language: {
    title: 'Language',
    value: 'en',
  },
  support: {
    title: 'Support',
    value: 'www.kokon.io',
    text: 'kokon.io',
  },
  officialLinks: {
    title: 'Official Links',
    value: [
      { icon: TwitterIcon, url: '' },
      { icon: GlobalIcon, url: '' },
    ],
  },
}

const ProfileDialog: React.FC = () => {
  const [state, copyToClipboard] = useCopyToClipboard()
  const { toast } = useToast()

  useEffect(() => {
    console.log('state', state)
    if (!state.value) return
    toast({
      title: 'Copied',
    })
  }, [state, toast])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback delayMs={600} />
        </Avatar>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader className="relative flex aspect-[343/130] w-full flex-col items-center justify-center bg-colorLinear-orange">
          <img src="/images/long-wave.png" alt="profile" className="absolute inset-0 top-3" />
          <img
            src="/images/header/profile.png"
            alt="profile"
            className="h-20 w-20 object-contain"
          />
          <span className="mt-1 text-base font-extrabold">Name</span>
        </DialogHeader>
        <div className="flex flex-col space-y-4 p-3 text-sm text-white/70">
          {/* Player ID */}
          <div className="flex items-center justify-between">
            <span>{userData.playerId.title}</span>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-white">{userData.playerId.value}</span>
              <CopyIcon
                className="h-4 w-4 cursor-pointer"
                onClick={() => copyToClipboard(userData.playerId.value)}
              />
            </div>
          </div>
          {/* Email */}
          <div className="flex items-center justify-between">
            <span>{userData.email.title}</span>
            <EmailDialog email={userData.email.value} />
          </div>
          {/* Fund Password */}
          <div className="flex items-center justify-between">
            <span>{userData.fundPassword.title}</span>
            <AddIcon className="h-4 w-4" />
          </div>
          {/* Language */}
          <div className="flex items-center justify-between">
            <span>{userData.language.title}</span>
            <SettingIcon className="h-4 w-4" />
          </div>

          <hr className="border-white/20" />

          {/* Support */}
          <div className="flex items-center justify-between">
            <span>{userData.support.title}</span>
            <a href={userData.support.value} className="font-extrabold text-[#2D9BE6]">
              {userData.support.text}
            </a>
          </div>

          {/* Official Links */}
          <div className="flex items-center justify-between">
            <span>Official Links</span>
            <div className="flex space-x-2">
              {userData.officialLinks.value.map((link, index) => (
                <a key={index} href={link.url}>
                  <link.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ProfileDialog
