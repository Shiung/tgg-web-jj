import { Button } from '~/components/ui/button'
import InfoSheet from './info-sheet'
import TwitterIcon from '~/components/color-icons/twitter'
import TelegramIcon from '~/icons/telegram.svg?react'

const Footer: React.FC = () => {
  return (
    <footer className="container flex flex-col rounded-b-xl bg-black px-4 pb-4">
      <div className="flex items-center justify-center space-x-6 text-center">
        <InfoSheet type="responsibleGamblingInfo" />
        <InfoSheet type="privacyPolicyInfo" />
        <Button
          variant="link"
          size="link"
          className="whitespace-pre-wrap text-center text-xs font-normal text-white/70"
        >
          Contact Support
        </Button>
      </div>
      <div className="my-3 flex items-center justify-center space-x-4">
        <TwitterIcon className="h-6 w-6" />
        <TelegramIcon className="h-6 w-6 text-app-blue" />
        <img src="/images/home/footer/18+.png" alt="logo" className="h-7 w-7 object-contain" />
        <img src="/images/home/footer/gcb.png" alt="logo" className="h-6 w-auto object-contain" />
      </div>
      <p className="text-xs font-normal text-white/70">
        KATON is the play-to-earn games platform and offers multiple cryptocurrencies wallet
        connection service. Designed for a global player, we ensure every game is transparent and
        fair. Every bet is verified in all the games at KATON. Dive into a massive selection of
        games where the fun keeps rolling.
      </p>
    </footer>
  )
}

export default Footer
