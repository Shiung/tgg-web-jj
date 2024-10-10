import React from 'react'
import InfoTooltip from '~/components/info-tooltip'
import Amount from '~/components/amount'
import { Button } from '~/components/ui/button'

interface TreasureContentProps {
  treasure: {
    type: string
    icon: string
    coinIcon: React.ComponentType<React.SVGProps<SVGSVGElement>>
    totalAmount: number
    unlockAmount: number
    readyToClaimAmount: number
    unlockRule: string[][]
    hint: string
  }
  onClaimBonus: () => void
}

const TreasureContent: React.FC<TreasureContentProps> = ({ treasure, onClaimBonus }) => {
  return (
    <div>
      <h2 className="pb-2 text-base font-ultra">{treasure.type}</h2>
      <div className="flex flex-col rounded-xl bg-[#1c1c1c] p-3">
        <div className="flex items-stretch rounded-b-xl">
          <div className="flex flex-1 items-center space-x-2">
            <div className="relative">
              <img src={treasure.icon} alt="" className="h-20 w-20" />
              <div className="absolute -right-2 bottom-1 flex items-center space-x-1 rounded-full border-[0.5px] border-solid border-[#FFF200] bg-black px-1">
                <treasure.coinIcon className="h-3 w-3" />
                <Amount
                  className="text-xs font-ultra -tracking-[1px]"
                  value={treasure.totalAmount}
                  crypto="KOKON"
                />
              </div>
            </div>
            <div className="flex-1 text-center">
              <Amount
                crypto="KOKON"
                className="text-xl font-ultra text-primary"
                value={treasure.unlockAmount}
              />
              <p className="text-xs text-white/70">Waiting for unlock</p>
            </div>
          </div>

          <div className="flex flex-[0_0_33%] flex-col items-center justify-center border-l border-dashed border-white/20 px-2 py-1">
            <Amount
              crypto="KOKON"
              className="text-base font-ultra text-app-green"
              value={treasure.readyToClaimAmount}
            />
            <p className="text-xs text-white/70">Ready for claim</p>
          </div>
        </div>
        {treasure.unlockRule.map((rules, index) => (
          <div key={index} className="mt-2 rounded-xl bg-[#333] p-3 text-sm font-ultra">
            <div className="flex items-center justify-between">
              <h3 className="mb-1">Unlock Rule</h3>
              <InfoTooltip content={treasure.hint} />
            </div>
            <ul className="list-disc pl-6 text-white/70">
              {rules.map((rule, ruleIndex) => (
                <li key={ruleIndex} className="text-sm font-normal">
                  {rule}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {treasure.type !== 'Standby' && (
        <Button catEars className="mt-4 w-full" onClick={onClaimBonus}>
          Claim Bonus
        </Button>
      )}
    </div>
  )
}

export default TreasureContent
