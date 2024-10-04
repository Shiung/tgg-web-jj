import type { WithdrawingListResponse } from '~/api/codegen/data-contracts'

export type UnitCard = WithdrawingListResponse['list'][0]
export type WPunitCard = UnitCard & {
  icon: React.FC<React.SVGProps<SVGSVGElement>>
}
