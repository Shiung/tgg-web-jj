import ArrowLineLeftIcon from '~/icons/arrow-line-left.svg?react'
import { Link, useNavigate } from '@remix-run/react'

import UnitCard from './unit-card'
import { useActions } from './hooks'

export default function WithdrawalProcessing() {
  const { ls, isLoading } = useActions()
  const navigate = useNavigate()
  return (
    <div className="container m-0 flex flex-1 flex-col rounded-t-xl bg-black p-0 text-white">
      <div className="relative flex h-14 items-center justify-center p-4">
        <Link
          className="absolute left-4 top-1/2 -translate-y-1/2"
          prefetch="viewport"
          to="/wallet/deposit"
          onClick={e => {
            e.preventDefault()
            navigate(-1)
          }}
        >
          <ArrowLineLeftIcon className="h-6 w-6 text-[#FFFFFFB2]" />
        </Link>
        <div className="text-lg font-ultra">Processing Withdrawal</div>
        <div />
      </div>
      {isLoading && (
        <div className="flex flex-1 flex-col space-y-4 p-4 [&>div]:flex-1">
          <UnitCard.Skeleton />
        </div>
      )}
      {!isLoading && !!ls.length && (
        <>
          <div className="space-y-4 p-4">
            {ls.map((l, index) => {
              return <UnitCard {...l} key={index} />
            })}
          </div>
          <div className="flex-1"></div>
        </>
      )}
      {!isLoading && !ls.length && (
        <div className="flex flex-1 flex-col items-center justify-center">
          <img src="/images/system-no-data.png" alt="progress" className="h-32 w-32" />
          <div className="mt-2 text-xs text-[#FFFFFFB2]">No data available</div>
        </div>
      )}

      <div className="sticky bottom-0 mb-4 text-center text-[12px] text-white/70">
        Have question? Please contact our&nbsp;
        <Link className="font-ultra text-primary" to="/">
          Support
        </Link>
      </div>
    </div>
  )
}
