import React from 'react'
import type { WPunitCard } from './types'
import Amount from '~/components/amount'
import { Skeleton } from '~/components/ui/skeleton'
import { parseAmount } from '~/lib/amount'

const Layout: React.FC<{
  header: React.ReactNode
  contentSubmissionTime: React.ReactNode
  contentAddress: React.ReactNode
  contentMemo: React.ReactNode
}> = ({ header, contentSubmissionTime, contentAddress, contentMemo }) => {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl bg-[#1C1C1C]">
      <div className="flex items-center justify-start space-x-1 bg-[#333] px-3 py-2 font-ultra">
        {header}
      </div>
      <div className="space-y-2 p-[12px]">
        <div className="flex items-start justify-between text-[12px]">
          <div className="text-white/70">Submission time:</div>
          <div className="ml-5 flex-1 break-all text-right font-ultra text-white">
            {contentSubmissionTime}
          </div>
        </div>
        <div className="flex items-start justify-between text-[12px]">
          <div className="text-white/70">Address:</div>
          <div className="ml-5 flex-1 break-all text-right font-ultra text-white">
            {contentAddress}
          </div>
        </div>
        <div className="flex items-start justify-between text-[12px]">
          <div className="text-white/70">memo:</div>
          <div className="ml-5 flex-1 break-all text-right font-ultra text-white">
            {contentMemo}
          </div>
        </div>
      </div>
    </div>
  )
}

const UnitSkeleton: React.FC = () => {
  return (
    <Layout
      header={<Skeleton className="h-[20px] w-[150px] bg-white/90" />}
      contentSubmissionTime={
        <div className="flex flex-1 justify-end">
          <Skeleton className="h-[15px] w-[100px]" />
        </div>
      }
      contentAddress={
        <div className="flex flex-1 justify-end">
          <Skeleton className="h-[15px] w-[100px]" />
        </div>
      }
      contentMemo={
        <div className="flex flex-1 justify-end">
          <Skeleton className="h-[15px] w-[100px]" />
        </div>
      }
    />
  )
}

const UnitCard: React.FC<WPunitCard> & { Skeleton: React.FunctionComponent } = props => {
  return (
    <Layout
      header={
        <>
          <props.icon className="h-4 w-4" />
          <Amount
            value={parseAmount(props.amount)}
            crypto={props.currency}
            customMaxDec={9}
            thousandSeparator
          />
        </>
      }
      contentSubmissionTime={props.submissionTime}
      contentAddress={props.address}
      contentMemo={props.memo || 'none'}
    />
  )
}

UnitCard.Skeleton = UnitSkeleton
export default UnitCard
