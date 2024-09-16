import { useEffect } from 'react'
import useStore from '~/stores/useStore'

import ArrowLineLeftIcon from '~/icons/arrow-line-left.svg?react'
import X from '~/icons/x.svg?react'
import { Link } from '@remix-run/react'
import LuckyMoneyItem from '~/routes/lucky-money.list/lucky-money-item'

const LuckyMoneyHistory = () => {
  const fakeLuckyMoneyList: Array<{ type: 0 | 1; status: 0 | 1 }> = [
    { type: 0, status: 0 },
    { type: 1, status: 1 },
    { type: 0, status: 1 },
    { type: 0, status: 0 },
    { type: 0, status: 0 },
  ]

  const setNavVisibility = useStore(state => state.setNavVisibility)
  useEffect(() => {
    setNavVisibility(false)
    return () => {
      setNavVisibility(true)
    }
  }, [setNavVisibility])

  return (
    <div className="container m-0 flex flex-1 flex-col rounded-t-xl bg-black p-0 text-white">
      {/* 頭部 */}
      <div className="flex h-14 items-center justify-between p-4">
        <Link to="/lucky-money/list">
          <ArrowLineLeftIcon className="h-6 w-6 text-[#FFFFFFB2]" />
        </Link>
        <div className="text-lg font-[1000]">History</div>
        <Link to="/">
          <X className="h-6 w-6 text-[#FFFFFFB2]" />
        </Link>
      </div>

      {/* 用户列表 */}
      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {fakeLuckyMoneyList.map((el, index) => (
          <LuckyMoneyItem key={index} type={el.type} status={el.status} />
        ))}
      </div>
    </div>
  )
}

export default LuckyMoneyHistory
