import type { LottieComponentProps } from 'lottie-react'

// Game status enum
export enum Status {
  Init,
  Standby,
  BrokenEggPage,
  Playing,
  End,
}

// Egg level
export enum EggLevel {
  GOLD = 'GOLD',
  NORMAL = 'NORMAL',
  SILVER = 'SILVER',
}

// Prize pool type
export interface PrizePool {
  eggLevel: string
  displayUsdtPrizeMin: number | string
  displayUsdtPrizeMax: number | string
  hammerSpent: number
}

// Egg record type
export interface EggRecord {
  claimed?: boolean
  eggLevel?: string
  playStatus?: string
  productId?: number
  progress?: string
  reward?: string
  totalCount?: number
  transactionId?: string
}

// Marquee message type
export interface EggMarquee {
  customerName: string
  eggLevel: string
  reward: string
}

// API response type
export interface GameTransactionResponse {
  summary: {
    totalWinGold: number
    totalBetGold: number
    totalWinGoldPCoin: number
    totalBetGoldPCoin: number
  }
  pagination: {
    totalRecord: number
  }
}

export interface LottieAnimationData {
  v: string // Version
  fr: number // Frame rate
  ip: number // In point
  op: number // Out point
  w: number // Width
  h: number // Height
  nm: string // Name
  ddd: number // 3D flag
  assets: unknown[] // Assets
  layers: unknown[] // Layers
  markers?: unknown[] // Markers (optional)
}

export interface LottieAnimationProps extends Omit<LottieComponentProps, 'animationData'> {
  animationData: LottieAnimationData
}

export interface RulesDialogProps {
  prizePools: PrizePool[]
}

export interface AlertDialogProps {
  open?: boolean
  confirm: () => void
  cancel: () => void
}

export interface CardTemplateProps {
  children: React.ReactNode
  marqueeList?: EggMarquee[]
}

export interface FooterProps {
  marqueeList?: EggMarquee[]
}

export interface StandbyCardProps {
  prizePool: PrizePool | undefined
  handleStartButtonClick: () => void
  handleChangeEgg: (arg: boolean) => void
  hammerCount: number
}
