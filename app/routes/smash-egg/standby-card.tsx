import { Button } from '~/components/ui/button'
import styles from './index.module.scss'

export default function StandbyCard({
  handleStartButtonClick,
  handleChangeEgg,
}: {
  handleStartButtonClick: () => void
  handleChangeEgg: (arg: boolean) => void
}) {
  return (
    <div>
      {/* Game pannel */}
      <div className="relative z-10 mt-5 flex justify-center px-6">
        <div className="flex h-[94px] w-[100%] flex-col gap-1 rounded-xl bg-black bg-opacity-50 px-4 py-2 text-center">
          <p className="text-center text-base font-extrabold leading-[22px] text-app-yellow">
            GOLDEN EGG
          </p>
          <div className="flex h-[20px] items-center justify-center gap-2">
            <span className="color-white text-xs font-extrabold leading-[16px]">
              ONE SMASH NEED
            </span>
            <i className="inline-block h-5 w-7 bg-[url('/images/smash-egg/hammer.png')] bg-contain bg-no-repeat"></i>
            <span className="color-white text-sm font-extrabold leading-[18px]">X15</span>
          </div>

          <p className="flex h-[] items-center justify-center gap-1 rounded-xl bg-black bg-opacity-70 px-3 text-sm">
            PRIZE POOL <span className="text-lg font-extrabold tracking-[-2px]"> 500-1000</span>{' '}
            USDT
          </p>
        </div>

        <button
          onClick={() => handleChangeEgg(false)}
          className="absolute left-2 top-[50%] h-[30px] w-[30px] translate-y-[-50%] rounded-full bg-[#FDCB04] p-2"
        >
          <img src="/images/smash-egg/icon-arrow-left.png" alt="" />
        </button>
        <button
          onClick={() => handleChangeEgg(true)}
          className="absolute right-2 top-[50%] h-[30px] w-[30px] translate-y-[-50%] rounded-full bg-[#FDCB04] p-2"
        >
          <img src="/images/smash-egg/icon-arrow-right.png" alt="" />
        </button>
      </div>
      <div className="relative mt-3 text-black">
        <Button catEars className="w-full" onClick={handleStartButtonClick}>
          Start
        </Button>
      </div>
    </div>
  )
}
