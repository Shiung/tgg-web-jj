import ArrowLineLeftIcon from '~/icons/arrow-line-left.svg?react'
import { Link } from '@remix-run/react'

import UnitCard from './unit-card'
import { useActions } from './hooks'

export default function WithdrawalProcessing() {
  const { ls, isLoading } = useActions()
  return (
    <div className="container m-0 flex flex-1 flex-col rounded-t-xl bg-black p-0 text-white">
      <div className="relative flex h-14 items-center justify-center p-4">
        <Link
          className="absolute left-4 top-1/2 -translate-y-1/2"
          prefetch="viewport"
          to="/wallet/deposit"
        >
          <ArrowLineLeftIcon className="h-6 w-6 text-[#FFFFFFB2]" />
        </Link>
        <div className="text-lg font-ultra">Processing Withdrawal</div>
        <div />
      </div>
      <div className="space-y-4 p-4">
        {isLoading && <UnitCard.Skeleton />}
        {!isLoading &&
          ls.map((l, index) => {
            return <UnitCard {...l} key={index} />
          })}
      </div>
      <div className="flex-1"></div>
      <div className="sticky bottom-0 mb-4 text-center text-[12px] text-white/70">
        Have question? Please contact our&nbsp;
        <Link className="font-ultra text-primary" to="/">
          Support
        </Link>
      </div>
    </div>
  )
}
