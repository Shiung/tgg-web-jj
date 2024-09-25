import TelegramIcon from '~/icons/telegram.svg?react'
import { Skeleton } from '~/components/ui/skeleton'
import { useTelegramLogin } from '~/hooks/useTelegramLogin'

const TelegramLoginButton: React.FC = () => {
  const { handleLogin, scriptLoaded } = useTelegramLogin()

  if (!scriptLoaded) return <Skeleton className="h-7 w-[95px] rounded-full" />
  return (
    <button
      onClick={handleLogin}
      className="inline-flex h-7 transform items-center justify-center whitespace-nowrap rounded-full bg-app-blue px-3 py-1 text-xs font-ultra text-white transition-transform hover:bg-app-blue/90 focus-visible:outline-none active:scale-95"
    >
      <TelegramIcon className="mr-1 h-4 w-4" />
      Connect
    </button>
  )
}

export default TelegramLoginButton
