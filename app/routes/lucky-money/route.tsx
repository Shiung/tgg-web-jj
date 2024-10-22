import { useEffect } from 'react'
import { Outlet, Link } from '@remix-run/react'
import { useTranslation } from 'react-i18next'

import useStore from '~/stores/useStore'
import X from '~/icons/x.svg?react'
import { Button } from '~/components/ui/button'

export default function LuckyMoney() {
  const { t } = useTranslation()
  const setNavVisibility = useStore(state => state.setNavVisibility)

  useEffect(() => {
    setNavVisibility(false)
    return () => {
      setNavVisibility(true)
    }
  }, [setNavVisibility])

  return (
    <div className="container relative m-0 flex flex-1 flex-col bg-black p-0">
      <div className="flex aspect-[375/130] w-full flex-col items-center rounded-t-lg bg-gradient-to-b from-[#FDCB04] to-[#FF4D00]">
        <div className="mt-1 flex aspect-[375/126] w-full flex-col bg-[url('/images/long-wave.png')] bg-contain">
          <div className="relative flex w-full items-center justify-center p-4 pb-0">
            <div className="text-lg font-ultra">{t('LuckyMoney')}</div>
            <Button variant="icon" className="absolute right-0 top-0">
              <Link to="/">
                <X className="h-6 w-6" />
              </Link>
            </Button>
          </div>
          <div className="ml-4 flex">
            <div className="mt-4 w-full text-sm font-ultra">
              <div className="whitespace-pre-wrap text-start">{t('LuckyMoneyDescription')}</div>
            </div>
            <img
              src="/images/lucky-money/cat-hand.png"
              className="h-[100px] w-[160px]"
              alt="catHand"
            />
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  )
}
