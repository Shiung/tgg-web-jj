import styles from './index.module.scss'

export default function Footer() {
  return (
    <>
      <div className="flex items-center justify-evenly">
        <img className="inline-block h-[33px] w-[52px]" src="/images/smash-egg/winner.png" alt="" />
        <span className="text-[16px] font-extrabold">WINNER</span>
        <img className="inline-block h-[33px] w-[52px]" src="/images/smash-egg/winner.png" alt="" />
      </div>

      <div className="rounded-[8px] bg-[#F54798] px-4 py-1 text-sm">
        <div className="flex gap-1 overflow-x-hidden">
          <p className={styles.marquee}>
            Users2 just broke a <span className="text-[#FFF200]">Silver egg</span> with{' '}
            <span className="text-4 px-1 font-extrabold">537</span>USD!
          </p>
          <p className={styles.marquee}>
            Users2 just broke a <span className="text-[#FFF200]">Silver egg</span> with{' '}
            <span className="text-4 px-1 font-extrabold">537</span>USD!
          </p>
        </div>
      </div>
    </>
  )
}
