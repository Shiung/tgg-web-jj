import { Link } from '@remix-run/react'

import ArrowLineRight from '~/icons/arrow-line-right.svg?react'
import { KokonIcon } from '~/components/color-icons'
import { PacketsResponse } from '~/api/codegen/data-contracts'
import { formatDate } from '~/lib/date'
import Amount from '~/components/amount'
import { Crypto } from '~/consts/crypto'
import { useMemo } from 'react'
import { cn } from '~/lib/utils'
import { parseAmount } from '~/lib/amount'

type LuckyMoneyItemProps = NonNullable<PacketsResponse['list']>[number]

const State = ({ state }: { state: NonNullable<PacketsResponse['list']>[number]['state'] }) => {
  const stateInfo = useMemo(() => {
    const info = {
      className: '',
      text: '',
    }
    if (state === 2) {
      info.className = 'text-app-red'
      info.text = 'Terminated'
    } else if (state === 3) {
      info.className = 'text-app-green'
      info.text = 'Completed'
    } else {
      return null
    }
    return info
  }, [state])

  if (!stateInfo) return null
  return (
    <div className="-mb-3 -mr-3 mt-3 h-5 rounded-br-lg rounded-tl-lg bg-[#333333] px-2 py-1">
      <div className={cn('text-[10px] font-ultra leading-3 text-app-green', stateInfo.className)}>
        {stateInfo.text}
      </div>
    </div>
  )
}

const LuckyMoneyItem: React.FC<LuckyMoneyItemProps> = ({
  state,
  packetId,
  distributeKind,
  createdAt,
  distributedAmount,
  remainingAmount,
}) => {
  return (
    <Link
      to={{
        pathname: '/lucky-money-detail',
        search: `?id=${packetId}&state=${state}&kind=${distributeKind}`,
      }}
      className="mb-2 flex w-full items-center justify-between rounded-[12px] bg-[#1C1C1C] p-3"
    >
      <div className="flex items-center">
        <img
          src={`/images/lucky-money/${distributeKind === 'FIXED' ? 'normal' : 'luck-battle'}.png`}
          className="h-[38px] w-[38px]"
          alt="normal"
        />
        <div className="ml-2 flex flex-col items-start justify-center">
          <div className="text-sm font-ultra">
            {distributeKind === 'FIXED' ? 'Normal' : 'Luck Battle'}
          </div>
          <div className="mt-1 text-xs font-normal text-[#FFFFFFB2]">
            {formatDate(createdAt, 'yyyy-MM-dd')}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <div className="flex items-center">
          <div className="flex flex-col items-end">
            <div className="flex items-center space-y-1 text-sm font-ultra">
              <KokonIcon className="h-4 w-4" />
              <Amount
                crypto={Crypto.KOKON}
                value={parseAmount(distributedAmount) + parseAmount(remainingAmount)}
                useKM
                className="ml-1"
              />
            </div>
            {state === 0 && (
              <div className="text-xs font-normal text-white/70">
                <Amount crypto={Crypto.KOKON} value={remainingAmount} useKM /> remaining
              </div>
            )}
          </div>
          <ArrowLineRight className="ml-2 h-3 w-3 text-[#FFFFFFB2]" />
        </div>
        <State state={state} />
      </div>
    </Link>
  )
}

export default LuckyMoneyItem
