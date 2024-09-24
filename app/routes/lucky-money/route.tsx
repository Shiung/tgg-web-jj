import { useEffect } from 'react'
import useStore from '~/stores/useStore'

import { Outlet, Link } from '@remix-run/react'
import X from '~/icons/x.svg?react'

export default function LuckyMoney() {
  const setNavVisibility = useStore(state => state.setNavVisibility)
  useEffect(() => {
    setNavVisibility(false)
    return () => {
      setNavVisibility(true)
    }
  }, [setNavVisibility])

  return (
    <div className="container relative m-0 flex flex-1 flex-col bg-black p-0">
      <div className="flex h-[136px] w-full flex-col items-center rounded-t-lg bg-gradient-to-b from-[#FDCB04] to-[#FF4D00]">
        <div className="flex h-[136px] w-full flex-col bg-[url('/images/lucky-money/lucky-money-bg.svg')]">
          <div className="flex w-full items-center justify-center p-4 pb-0">
            <div className="text-lg font-ultra">Lucky Money</div>
            <Link to="/" className="absolute right-[16px]">
              <X className="h-6 w-6 text-[#FFFFFFB2]" />
            </Link>
          </div>
          <div className="ml-4 flex">
            <div className="mt-4 w-full text-sm font-ultra">
              <div>Invite your friends</div>
              <div>with Lucky Money!</div>
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
