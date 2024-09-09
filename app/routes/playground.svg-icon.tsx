// ~/components/color-icons 複雜多色 Icon
import * as Icons from '~/components/color-icons'
// ~/icons 單色 Icon
import ArrowLeftIcon from '~/icons/arrow-left.svg?react'
import ArrowLineDownIcon from '~/icons/arrow-line-down.svg?react'
import ArrowLineLeftIcon from '~/icons/arrow-line-left.svg?react'
import ArrowLineRightIcon from '~/icons/arrow-line-right.svg?react'
import ArrowLineUpIcon from '~/icons/arrow-line-up.svg?react'
import ArrowLineDoubleLeftIcon from '~/icons/arrow-lineDouble-left.svg?react'
import ArrowLineDoubleRightIcon from '~/icons/arrow-lineDouble-right.svg?react'
import BetIcon from '~/icons/bet.svg?react'
import CatIcon from '~/icons/cat.svg?react'
import CheckIcon from '~/icons/check.svg?react'
import CommissionIcon from '~/icons/commission.svg?react'
import CopyIcon from '~/icons/copy.svg?react'
import EditIcon from '~/icons/edit.svg?react'
import HelpIcon from '~/icons/help.svg?react'
import HistoryIcon from '~/icons/history.svg?react'
import InfoIcon from '~/icons/info.svg?react'
import InviteIcon from '~/icons/invite.svg?react'
import MinusIcon from '~/icons/minus.svg?react'
import RefreshIcon from '~/icons/refresh.svg?react'
import SearchIcon from '~/icons/search.svg?react'
import SettingIcon from '~/icons/setting.svg?react'
import SwapIcon from '~/icons/swap.svg?react'
import TreeIcon from '~/icons/tree.svg?react'
import WarningIcon from '~/icons/warning.svg?react'
import XIcon from '~/icons/x.svg?react'

const singleColorIcons = [
  { name: 'arrow-left.svg', Component: ArrowLeftIcon },
  { name: 'arrow-line-down.svg', Component: ArrowLineDownIcon },
  { name: 'arrow-line-left.svg', Component: ArrowLineLeftIcon },
  { name: 'arrow-line-right.svg', Component: ArrowLineRightIcon },
  { name: 'arrow-line-up.svg', Component: ArrowLineUpIcon },
  { name: 'arrow-lineDouble-left.svg', Component: ArrowLineDoubleLeftIcon },
  { name: 'arrow-lineDouble-right.svg', Component: ArrowLineDoubleRightIcon },
  { name: 'bet.svg', Component: BetIcon },
  { name: 'cat.svg', Component: CatIcon },
  { name: 'check.svg', Component: CheckIcon },
  { name: 'commission.svg', Component: CommissionIcon },
  { name: 'copy.svg', Component: CopyIcon },
  { name: 'edit.svg', Component: EditIcon },
  { name: 'help.svg', Component: HelpIcon },
  { name: 'history.svg', Component: HistoryIcon },
  { name: 'info.svg', Component: InfoIcon },
  { name: 'invite.svg', Component: InviteIcon },
  { name: 'minus.svg', Component: MinusIcon },
  { name: 'refresh.svg', Component: RefreshIcon },
  { name: 'search.svg', Component: SearchIcon },
  { name: 'setting.svg', Component: SettingIcon },
  { name: 'swap.svg', Component: SwapIcon },
  { name: 'tree.svg', Component: TreeIcon },
  { name: 'warning.svg', Component: WarningIcon },
  { name: 'x.svg', Component: XIcon },
]

export default function SvgIcon() {
  return (
    <div className="container px-0 py-4 pb-safe">
      <h1 className="text-xl font-bold">svg-icon</h1>
      <h2 className="mt-4 text-lg font-bold">複雜多色 Icon</h2>
      <div className="mt-2 grid grid-cols-3 gap-4 md:grid-cols-5">
        {Object.entries(Icons).map(([name, Icon]) => (
          <div key={name} className="flex flex-col items-start">
            <Icon className="h-6 w-6" />
            <p className="break-word mt-2 text-start">{name}</p>
          </div>
        ))}
      </div>
      <h2 className="mt-4 text-lg font-bold">單色 Icon</h2>
      <div className="mt-2 grid grid-cols-3 gap-4 md:grid-cols-5">
        {singleColorIcons.map(({ name, Component }) => (
          <div key={name} className="flex flex-col items-start">
            <Component className="h-6 w-6" />
            <p className="break-word mt-2 text-start">{name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
