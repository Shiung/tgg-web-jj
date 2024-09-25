import React, { useState } from 'react'
import { Link } from '@remix-run/react'

import { Button } from '~/components/ui/button'
import SvgCopy from '~/icons/copy.svg?react'
import SvgHistory from '~/icons/history.svg?react'
import SvgCommission from '~/icons/commission.svg?react'
import SvgInvite from '~/icons/invite.svg?react'
import { KokonIcon, StarIcon } from '~/components/color-icons'
import CatEarsCard from '~/components/cat-ears-card'
import InfoTooltip from '~/components/info-tooltip'
import { Tabs, TabsList, TabsTrigger } from '~/components/ui/tabs'
import ProgressBar from './progress-bar'
import TeamLevelCarousel from './teamlevel-carousel'
import RuleSheet from './rule-sheet'

const ShareInvite: React.FC = () => {
  const [teamLevel, setTeamLevel] = useState(0)

  const images = [
    '/images/share/teamStar-1.png',
    '/images/share/teamStar-2.png',
    '/images/share/teamStar-3.png',
    '/images/share/teamStar-4.png',
    '/images/share/teamStar-5.png',
  ]

  const handleTeamLevelChange = (newLevel: number) => {
    console.log('New Team Level:', newLevel)
    setTeamLevel(newLevel)
  }
  const generateRandomProgress = (baseProgress: number) => {
    const maxProgress = Math.min(baseProgress + teamLevel * 20, 100)
    return Math.floor(Math.random() * (maxProgress - baseProgress + 1)) + baseProgress
  }

  return (
    <div className="container flex flex-1 flex-col p-0">
      {/* Top Navigation */}
      <Tabs defaultValue="Invite">
        <TabsList className="w-full">
          <TabsTrigger value="Invite" className="flex-1" asChild>
            <Link prefetch="viewport" to="/share-invite">
              Invite
            </Link>
          </TabsTrigger>
          <TabsTrigger value="My Team" className="flex-1" asChild>
            <Link prefetch="viewport" to="/share-team">
              My Team
            </Link>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Invite Section */}
      <div className="mt-3 w-full rounded-lg bg-gradient-to-b from-[#92EE6D] to-[#007E36] pt-[18px]">
        <div className="mb-4 flex items-center justify-between px-4 text-xs font-ultra">
          <div className="flex flex-col items-center">
            <img src="/images/share/step-1.png" alt="step-1" className="h-[72px] w-[100px]" />
            <span className="mt-1 text-xs">Invite</span>
          </div>
          <div className="mx-1 flex-1 border-t border-dashed border-black"></div>
          <div className="flex flex-col items-center">
            <img src="/images/share/step-2.png" alt="step-2" className="h-[72px] w-[100px]" />
            <span className="mt-1 text-center text-xs">Make Them Play</span>
          </div>
          <div className="mx-1 flex-1 border-t border-dashed border-black"></div>
          <div className="flex flex-col items-center">
            <img src="/images/share/step-3.png" alt="step-3" className="h-[72px] w-[100px]" />
            <span className="mt-1 text-xs">Earn</span>
          </div>
        </div>

        <div className="flex h-[126px] w-full flex-col items-center justify-center bg-[url('/images/lucky-money/lucky-money-bg.svg')] px-4 pb-8 pt-2">
          <div className="flex w-full items-center justify-center">
            <div className="mr-1 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-b from-[#FFF200] to-[#FFF2004D]">
              <div className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-black">
                <img
                  src="/images/lucky-money/lucky-money.png"
                  alt="lucky-money"
                  className="h-5 w-5"
                />
              </div>
            </div>
            <div className="flex flex-1 items-center rounded-full border-[0.5px] border-[#FFFFFF33] bg-[#333333] px-3 px-4 py-2 py-[10px] font-ultra text-white">
              <div className="flex-1 text-sm">http://kokon.com/=3782038u219</div>
              <SvgCopy className="h-4 w-4 text-[#FFFFFFB2]" />
            </div>
          </div>
          <Button catEars className="mt-4 w-full font-ultra">
            Share
          </Button>
        </div>
      </div>

      <div className="mt-[-16px] flex w-full flex-1 flex-col items-center rounded-[12px] bg-black p-4">
        {/* My Commission Section */}
        <CatEarsCard>
          <div className="flex items-center justify-between rounded-t-[12px] bg-[#333333] px-6 py-2">
            <span className="font-ultra text-primary">My Commission</span>
            <Button variant="icon" size="icon">
              <SvgHistory className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center justify-between space-x-2 p-3 text-xs">
            <SvgCommission className="h-8 w-8" />
            <div className="flex flex-col items-center space-y-1">
              <div className="flex h-7 items-center">Team Rating</div>
              <div className="flex items-center space-x-1">
                <StarIcon className="h-4 w-4" />
                <div className="font-ultra text-white">2</div>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <div className="flex h-7 items-center">Today</div>
              <div className="flex items-center space-x-1">
                <KokonIcon className="h-4 w-4" />
                <div className="font-ultra text-white">12.234</div>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <div className="flex h-7 items-center">Total Received</div>
              <div className="flex items-center space-x-1">
                <KokonIcon className="h-4 w-4" />
                <div className="font-ultra text-white">12.23K</div>
              </div>
            </div>
          </div>
        </CatEarsCard>
        {/* My Invitations Section */}
        <CatEarsCard className="text-center">
          <div className="flex items-center justify-between rounded-t-[12px] bg-[#333333] px-6 py-2">
            <span className="font-ultra text-primary">My Invitations</span>
            <Button variant="icon" size="icon">
              <SvgHistory className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center justify-between space-x-2 p-3 text-xs">
            <SvgInvite className="h-8 w-8" />
            <div className="flex flex-col items-center space-y-1">
              <div className="flex h-7 items-center">Registered Friends</div>
              <div className="flex items-center space-x-1">
                <div className="font-ultra text-white">15</div>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <div className="flex h-7 items-center">Valid Friends</div>
              <div className="flex items-center space-x-1">
                <div className="font-ultra text-white">5</div>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <div className="flex h-7 items-center">Total Team Member</div>
              <div className="flex items-center space-x-1">
                <div className="font-ultra text-white">32</div>
              </div>
            </div>
          </div>
        </CatEarsCard>
        {/* Team Star Rating Section */}
        <div className="mt-6 flex w-full items-center space-x-1 text-base font-ultra">
          <div>Team Star Rating</div>
          <InfoTooltip content="The star rating will be upgraded based on betting amount of your team. Higher star ratings lead to higher commission percentages." />
        </div>
        <div className="mt-2 w-full rounded-xl bg-colorLinear-green p-3">
          {/* 團隊層級輪播 */}
          <TeamLevelCarousel
            images={images}
            teamLevel={2}
            onTeamLevelChange={handleTeamLevelChange}
          />
          {/* Team's Commission Ratio Section */}
          <CatEarsCard className="relative mt-8 w-full rounded-[12px] bg-[#1C1C1C] text-center text-[#FFFFFFB2]">
            <div className="flex items-center justify-between rounded-t-[12px] bg-[#333333] px-6 py-2">
              <div className="font-ultra text-primary">Team's Commission Ratio</div>
            </div>
            <div className="flex items-center justify-between space-x-2 p-3 text-xs">
              {[1, 2, 3, 4].map(el => (
                <div key={`level-${el}`} className="flex flex-1 flex-col items-center space-y-1">
                  <div className="flex h-7 items-center">Level {el}</div>
                  <div className="flex items-center space-x-1">
                    <div className="font-ultra text-white">0.7%</div>
                  </div>
                </div>
              ))}
            </div>
          </CatEarsCard>
          {/* Upgrade Conditions Section */}
          <CatEarsCard className="relative mt-4 w-full rounded-[12px] bg-[#1C1C1C] text-[#FFFFFFB2]">
            <div className="flex items-center justify-between rounded-t-[12px] bg-[#333333] px-6 py-2">
              <div className="font-ultra text-primary">Upgrade Conditions</div>
            </div>
            <div className="flex w-full flex-col items-center space-y-3 p-3 text-xs">
              {[0, 30, 50].map(el => (
                <div key={`level-${el}`} className="flex w-full flex-col">
                  <ProgressBar
                    progress={generateRandomProgress(el)}
                    total={100}
                    label={`Task-${el}`}
                  />
                </div>
              ))}
            </div>
          </CatEarsCard>
        </div>
      </div>

      {/* 規則說明 */}
      <RuleSheet />
    </div>
  )
}

export default ShareInvite
