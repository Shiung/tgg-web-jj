import React from 'react'
import { cn } from '~/lib/utils'

import { earColorVariants } from '~/components/ui/button'
import CatEarIcon from '~/icons/cat-ear.svg?react'

interface CatEarsCardProps {
  children: React.ReactNode
  className?: string
}

const CatEarsCard: React.FC<CatEarsCardProps> = ({ children, className }) => {
  return (
    <div
      className={cn('relative mt-4 w-full rounded-[12px] bg-[#1C1C1C] text-[#FFFFFFB2]', className)}
    >
      {children}
      <CatEarIcon
        className={cn('left-[18px] h-2 w-4', earColorVariants(), '-top-[8px]', 'text-[#333333]')}
      />
      <CatEarIcon
        className={cn('right-[18px] h-2 w-4', earColorVariants(), '-top-[8px]', 'text-[#333333]')}
      />
    </div>
  )
}

export default CatEarsCard
