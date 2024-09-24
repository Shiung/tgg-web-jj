import { Link } from '@remix-run/react'
import { Button } from '~/components/ui/button'
import LuckyMoneyItem from './lucky-money-item'

export default function LuckyMoneyList() {
  const fakeLuckyMoneyList: Array<{ type: 0 | 1; status: 2 }> = [
    { type: 0, status: 2 },
    { type: 1, status: 2 },
    { type: 0, status: 2 },
    { type: 0, status: 2 },
    { type: 0, status: 2 },
  ]

  return (
    <div className="mt-[-7px] flex w-full flex-1 flex-col items-center justify-between rounded-[12px] bg-black p-4">
      <div className="flex w-full flex-1 flex-col">
        <div className="flex w-full space-x-2">
          <Link to="/lucky-money/list" className="flex-1">
            <Button
              variant="outlineSoft"
              className="h-7 w-full bg-[#FFF2004D] text-xs font-ultra text-primary"
            >
              My share
            </Button>
          </Link>
          <Link to="/lucky-money/share" className="flex-1">
            <Button variant="outlineSoft" className="h-7 w-full text-xs font-ultra text-primary">
              Share New Bags
            </Button>
          </Link>
        </div>
        <div className="mt-6 w-full flex-1 overflow-y-auto">
          {fakeLuckyMoneyList.map((el, index) => (
            <LuckyMoneyItem key={index} type={el.type} status={el.status} />
          ))}
          {/* Empty List */}
          {true || (
            <div className="flex h-full flex-col items-center justify-center text-xs font-semibold text-[#FFFFFFB2]">
              <img src="/images/list-empty.png" className="mb-2 h-32 w-32" alt="list-empty" />
              <div>Empty. </div>
              <div>Share New Bags to invite friends to join Kokon!</div>
            </div>
          )}
        </div>
      </div>
      <div className="mt-6 w-full">
        <Link to="/lucky-money-history">
          <Button className="w-full" catEars>
            History
          </Button>
        </Link>
      </div>
    </div>
  )
}
