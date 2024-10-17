import React from 'react'
import { GetTreasuresResponse } from '../../api/codegen/data-contracts'
import { useGenerateRuleList } from './hook/useGenerateRuleList'

import InfoTooltip from '~/components/info-tooltip'
import Amount from '~/components/amount'
import { CurrencyIcon } from '~/components/currency-icon'

interface TreasureContentProps {
  treasure: GetTreasuresResponse['list'][0]
}

const TreasureContent: React.FC<TreasureContentProps> = ({ treasure }) => {
  const generateRuleList = useGenerateRuleList()

  const ruleList = generateRuleList({
    betRequirement: treasure?.betRequirement,
    directSubBetRequirement: treasure?.directSubBetRequirement,
  })

  return (
    <div>
      <div className="flex flex-col rounded-xl bg-[#1c1c1c] p-3">
        <div className="flex items-stretch rounded-b-xl">
          <div className="flex flex-1 items-center space-x-2">
            <div className="relative">
              <img src="/images/header/treasure.png" alt="" className="h-20 w-20" />
              <div className="absolute -right-2 bottom-1 flex items-center space-x-1 rounded-full border-[0.5px] border-solid border-[#FFF200] bg-black px-1">
                <CurrencyIcon currency={treasure?.rewardType} className="h-3 w-3" />
                <Amount
                  className="text-xs font-ultra -tracking-[1px]"
                  value={treasure?.rewardAmount}
                  crypto={treasure?.rewardType}
                  useKM={treasure?.rewardType === 'KOKON'}
                />
              </div>
            </div>
            <div className="flex-1 text-center">
              {treasure?.remainingUnlockAmount && Number(treasure?.remainingUnlockAmount) > 0 ? (
                <>
                  <Amount
                    crypto={treasure?.rewardType}
                    className="text-xl font-ultra text-primary"
                    value={treasure?.remainingUnlockAmount}
                    useKM={treasure?.rewardType === 'KOKON'}
                  />
                </>
              ) : (
                <span className="text-xl font-ultra text-primary"> - </span>
              )}
              <p className="text-xs text-white/70">Waiting for unlock</p>
            </div>
          </div>

          <div className="flex flex-[0_0_33%] flex-col items-center justify-center border-l border-dashed border-white/20 px-2 py-1">
            {treasure?.remainingClaimAmount && Number(treasure?.remainingClaimAmount) > 0 ? (
              <>
                <Amount
                  crypto={treasure?.rewardType}
                  className="text-base font-ultra text-[#3AE45A]"
                  value={treasure?.remainingClaimAmount}
                  useKM={treasure?.rewardType === 'KOKON'}
                />
              </>
            ) : (
              <span className="text-base font-ultra text-[#3AE45A]"> - </span>
            )}
            <p className="text-xs text-white/70">Ready for claim</p>
          </div>
        </div>
        <div className="mt-2 rounded-xl bg-[#333] p-3 text-sm font-ultra">
          <div className="flex items-center justify-between">
            <h3 className="mb-1">Unlock Rule</h3>
            <InfoTooltip content="Only valid bets in the crypto game（Mines, Crash） can unlock treasure. Valid bets will only be calculated for bets that have been settled and produced a win or loss result. Any games played, tied, or canceled will not be counted in valid bets." />
          </div>
          <ul className="list-disc pl-6 text-white/70">
            {ruleList.map((rule, ruleIndex) => (
              <li key={ruleIndex} className="text-sm font-normal">
                {rule}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default TreasureContent
