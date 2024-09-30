import { CryptoUnion, Crypto } from '~/consts/crypto'

export { Crypto }

export type UnitCard = {
  amount: string
  currency: CryptoUnion
  memo: string
  address: string
  submissionTime: string
}

export type WPunitCard = UnitCard & {
  icon: React.FC<React.SVGProps<SVGSVGElement>>
}
