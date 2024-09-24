import React, { useState } from 'react'

import CatEarsCard from '~/components/cat-ears-card'
import { UsdtIcon, KokonIcon } from '~/components/color-icons'
import InfoIcon from '~/icons/info.svg?react'
import InfoTooltip from '~/components/info-tooltip'
import SearchIcon from '~/icons/search.svg?react'
import ArrowLineDownIcon from '~/icons/arrow-line-down.svg?react'
import CommissionEmpty from './commission-empty'
import CommissionTableList from './commission-tableList'

const Commission: React.FC = () => {
  const teamRating = 2
  const teamCommissionRatioMock = [
    { name: 'Level1', val: '0.7%' },
    { name: 'Level2', val: '2.5%' },
    { name: 'Level3', val: '0.08%' },
    { name: 'Level4', val: '0.04%' },
  ]

  const [isSearchExpanded, setIsSearchExpanded] = useState(false)

  return (
    <div className="flex flex-1 flex-col p-4">
      {/* My Team Rating Section */}
      <CatEarsCard>
        <div className="flex items-center justify-between rounded-t-[12px] bg-[#333333] px-6 py-2">
          <span className="font-ultra text-primary">My Team Rating: {teamRating}</span>
          <div className="flex space-x-1">
            {Array.from({ length: teamRating }).map((el, index) => (
              <img
                key={`teamRating-${index}`}
                className="h-4 w-4"
                src="/images/3D-star.png"
                alt="3D-star"
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center space-y-2 p-3">
          <div className="flex w-full flex-col space-y-2 rounded-lg bg-[#333333] px-3 py-2 text-xs font-ultra">
            <div className="border-b-[0.5px] border-[#FFFFFF33] pb-2 text-white">
              Team Commission Ratio
            </div>
            <div className="flex space-x-2">
              {teamCommissionRatioMock.map(el => (
                <div className="flex flex-1 flex-col items-center space-y-1" key={el.name}>
                  <div>{el.name}</div>
                  <div className="text-sm text-white">{el.val}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex w-full flex-col space-y-2 rounded-lg bg-[#333333] px-3 py-2 text-xs font-ultra">
            <div className="border-b-[0.5px] border-[#FFFFFF33] pb-2 text-white">Summary</div>
            <div className="flex space-x-2">
              <div className="flex flex-1 flex-col items-center space-y-1">
                <div className="flex space-x-1">
                  <div>Total Bets</div>
                  <InfoTooltip
                    content="Bet amount are defined as valid bets in crypto games (Mines, Crash).Valid bets will only
                  be calculated for bets that have been settled and produced a win or loss result. Any
                  games played, tied, or canceled will not be counted in valid bets."
                  />
                </div>
                <div className="flex items-center space-x-1 text-sm text-white">
                  <UsdtIcon className="h-4 w-4" />
                  <div>1,234,567.123456</div>
                </div>
              </div>
              <div className="flex flex-1 flex-col items-center space-y-1">
                <div>Total Commissions</div>
                <div className="flex items-center space-x-1 text-sm text-white">
                  <KokonIcon className="h-4 w-4" />
                  <div>120,219</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CatEarsCard>
      {/* Commission Details Section */}
      <div className="flex flex-1 flex-col">
        <div className="mt-6 flex items-center space-x-1 font-ultra text-white">
          <div>Commission Details</div>
          <InfoIcon className="h-[14px] w-[14px]" />
        </div>
        {/* Search Section */}
        <div className="flex w-full flex-wrap text-xs font-ultra">
          <div
            className={`mt-2 flex items-center justify-start overflow-hidden rounded-full bg-[#333333] p-[6px] transition-all duration-300 ease-in-out ${
              isSearchExpanded ? 'h-9 w-full' : 'mr-1 h-9 w-9 cursor-pointer'
            }`}
            role="button"
            tabIndex={0}
            onKeyDown={() => {}}
            onClick={() => setIsSearchExpanded(prev => !prev)}
          >
            <SearchIcon className="h-6 w-6 flex-shrink-0 text-[#FFFFFFB2]" />
            <input
              type="text"
              disabled={!isSearchExpanded}
              className={`w-full bg-transparent py-2 pl-2 pr-2 text-white outline-none transition-all duration-300 ease-in-out ${
                isSearchExpanded ? 'ml-2 opacity-100' : 'h-0 w-0 opacity-0'
              }`}
              placeholder="Search..."
              onClick={e => e.stopPropagation()}
            />
          </div>
          <div className="mr-1 mt-2 flex min-w-[120px] flex-1 items-center justify-between rounded-full bg-[#FFFFFF33] px-3 py-2 transition-all duration-1000 ease-in-out">
            <div>LV: all</div>
            <ArrowLineDownIcon className="h-4 w-4" />
          </div>
          <div className="mt-2 flex min-w-[120px] flex-1 items-center justify-between rounded-full bg-[#FFFFFF33] px-3 py-2 transition-all duration-300 ease-in-out">
            <div className="text-[#FFFFFFB2]">Date</div>
            <ArrowLineDownIcon className="h-4 w-4" />
          </div>
        </div>
        {/* Table Section */}
        <CommissionTableList />
        {false && <CommissionEmpty />}
      </div>
    </div>
  )
}

export default Commission
