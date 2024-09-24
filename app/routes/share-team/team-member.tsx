import React, { useState } from 'react'

import CatEarsCard from '~/components/cat-ears-card'
import { UsdtIcon } from '~/components/color-icons'
import InfoIcon from '~/icons/info.svg?react'
import SortAscIcon from '~/icons/sort-asc.svg?react'
// import SortDescIcon from '~/icons/sort-desc.svg?react'
import InfoTooltip from '~/components/info-tooltip'
import SearchIcon from '~/icons/search.svg?react'
import ArrowLineDownIcon from '~/icons/arrow-line-down.svg?react'
import TeamMemberEmpty from './team-member-empty'
import TeamMemberTableList from './team-member-tableList'

const TeamMember: React.FC = () => {
  const teamRating = 2

  const [isSearchExpanded, setIsSearchExpanded] = useState(false)

  return (
    <div className="flex flex-1 flex-col p-4">
      {/* My Team Rating Section */}
      <CatEarsCard>
        <div className="flex items-center justify-between rounded-t-[12px] bg-[#333333] px-6 py-2">
          <span className="font-ultra text-primary">My Team Rating: {teamRating}</span>
          <div className="flex space-x-1">
            {Array.from({ length: teamRating }).map((_, index) => (
              <img
                key={`teamRating-${index}`}
                className="h-4 w-4"
                src="/images/3D-star.png"
                alt="3D-star"
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center p-3">
          <div className="flex w-full space-x-2 rounded-lg bg-[#333333] px-3 py-2 text-xs font-ultra">
            <div className="flex min-h-[60px] flex-1 flex-col items-center justify-center text-center">
              <div className="flex flex-1 items-center text-[#999999]">Total Member</div>
              <div className="flex items-center space-x-1 text-sm text-white">
                <div>210</div>
              </div>
            </div>
            <div className="flex min-h-[60px] flex-1 flex-col items-center justify-between">
              <div className="flex flex-1 items-center text-[#999999]">
                <span className="mr-1">Total Bets</span>
                <InfoTooltip
                  content="Bet amount are defined as valid bets in crypto games (Mines, Crash).Valid bets will only
                  be calculated for bets that have been settled and produced a win or loss result. Any
                  games played, tied, or canceled will not be counted in valid bets."
                />
              </div>
              <div className="flex items-center space-x-1 text-sm text-white">
                <UsdtIcon className="h-4 w-4" />
                <div>1,234,567.12</div>
              </div>
            </div>
            <div className="flex min-h-[60px] flex-1 flex-col items-center justify-between">
              <div className="flex flex-1 items-center text-[#999999]">Total Deposit</div>
              <div className="flex items-center space-x-1 text-sm text-white">
                <UsdtIcon className="h-4 w-4" />
                <div>1,234,567.12</div>
              </div>
            </div>
          </div>
        </div>
      </CatEarsCard>

      {/* All Members Section */}
      <div className="flex flex-1 flex-col">
        <div className="mt-6 flex items-center space-x-1 font-ultra text-white">
          <div>All Members</div>
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
          {/* TODO: 須與美術討論用戶交互行為如何呈現 */}
          <div className="mr-1 mt-2 flex min-w-[120px] flex-1 items-center justify-between rounded-full bg-[#FFFFFF33] px-3 py-2 transition-all duration-1000 ease-in-out">
            <SortAscIcon className="h-6 w-6 flex-shrink-0 text-[#FFFFFFB2]" />
            <ArrowLineDownIcon className="h-4 w-4" />
          </div>
          <div className="mt-2 flex min-w-[120px] flex-1 items-center justify-between rounded-full bg-[#FFFFFF33] px-3 py-2 transition-all duration-300 ease-in-out">
            <div className="text-[#FFFFFFB2]">Date</div>
            <ArrowLineDownIcon className="h-4 w-4" />
          </div>
        </div>
        {/* Table Section */}
        {false && <TeamMemberTableList />}
        {true && <TeamMemberEmpty />}
      </div>
    </div>
  )
}

export default TeamMember
