import { Link } from '@remix-run/react'

import ArrowLineRight from '~/icons/arrow-line-right.svg?react'
import { KokonIcon } from '~/components/color-icons'
import { PacketsResponse } from '~/api/codegen/data-contracts'
import { formatDate } from '~/lib/date'

type LuckyMoneyItemProps = NonNullable<PacketsResponse['list']>[number]

const LuckyMoneyItem: React.FC<LuckyMoneyItemProps> = ({ state, distributeKind, createdAt }) => {
  return (
    <Link
      to={{
        pathname: '/lucky-money-detail',
        // TODO: 缺少 id
        search: `?id=1&state=${state}&kind=${distributeKind}`,
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
            <div className="flex items-center text-sm font-ultra">
              <KokonIcon className="h-4 w-4" />
              <div className="ml-1">18.88K</div>
            </div>
            {state === 2 && (
              <div className="mt-1 text-xs font-normal text-[#FFFFFFB2]">10.02k remaining</div>
            )}
          </div>
          <ArrowLineRight className="ml-2 h-3 w-3 text-[#FFFFFFB2]" />
        </div>
        {state === 0 && (
          <div className="-mb-3 -mr-3 mt-3 h-5 rounded-br-lg rounded-tl-lg bg-[#333333] px-2 py-1">
            <div className="text-[10px] font-ultra leading-3 text-app-red">Terminated</div>
          </div>
        )}
        {state === 1 && (
          <div className="-mb-3 -mr-3 mt-3 h-5 rounded-br-lg rounded-tl-lg bg-[#333333] px-2 py-1">
            <div className="text-[10px] font-ultra leading-3 text-app-green">Completed</div>
          </div>
        )}
      </div>
    </Link>
  )
}

export default LuckyMoneyItem
