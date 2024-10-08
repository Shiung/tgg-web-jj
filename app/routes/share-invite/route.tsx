import React, { useState, useMemo, useEffect } from 'react'
import { Link } from '@remix-run/react'
import { apis } from '~/api'
import { useQuery } from '@tanstack/react-query'
import { parseAmount } from '~/lib/amount'
import { useCopyToClipboard } from 'react-use'
import { useTelegramUtils } from '~/hooks/useShare'

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
import Amount from '~/components/amount'
import ShareInviteSkeleton from './share-invite-skeleton'
import { successToast } from '~/lib/toast'
import { Input } from '~/components/ui/input'

const teamLevelCarouselImages = [
  '/images/share/teamStar-1.png',
  '/images/share/teamStar-2.png',
  '/images/share/teamStar-3.png',
  '/images/share/teamStar-4.png',
  '/images/share/teamStar-5.png',
]

const ShareInvite: React.FC = () => {
  // 剪貼簿 與分享功能
  const { shareUrl } = useTelegramUtils()
  const [state, copyToClipboard] = useCopyToClipboard()
  useEffect(() => {
    if (!state.value) return
    successToast('Copied')
  }, [state])
  const handleShareURL = () => {
    shareUrl('http://kokon.com/=3782038u219', 'Join my team to play the game and earn Kokon coin.')
  }

  // 當前選擇的 teamLevel
  const [teamLevel, setTeamLevel] = useState(0)
  const handleTeamLevelChange = (newLevel: number) => {
    setTeamLevel(newLevel)
  }

  // 取得用戶的團隊資訊
  const { data: customerTeamInfo, isLoading: customerTeamInfoLoading } = useQuery({
    queryKey: ['customerTeamInfoList'],
    queryFn: () => apis.customer.customerTeamInfoList(),
  })

  // 取得各分級設定
  const { data: teamSettingList, isLoading: teamSettingListLoading } = useQuery({
    queryKey: ['teamSettingList'],
    queryFn: () => apis.team.teamSettingList(),
  })

  // 所選 teamLevel 的 升級設定
  const currentClassSetting = useMemo(() => {
    if (!teamSettingList?.data?.classSetting) {
      return null
    }
    return teamSettingList.data.classSetting.find(setting => setting.class === teamLevel)
  }, [teamSettingList, teamLevel])

  // 所選 teamLevel 的 佣金設定
  const currentCommissionSetting = useMemo(() => {
    if (!teamSettingList?.data?.commissionSetting) {
      return null
    }
    const currentSetting = teamSettingList.data.commissionSetting.find(
      setting => setting.class === teamLevel
    )
    if (!currentSetting) {
      return null
    }

    return Object.entries(currentSetting)
      .filter(([key]) => key.startsWith('level'))
      .map(([key, value]) => ({
        level: key,
        commission: value,
      }))
  }, [teamSettingList, teamLevel])

  // 展示所選 teamLevel 的任務進度條
  const taskProgress = useMemo(() => {
    if (!currentClassSetting || !customerTeamInfo?.data) {
      return []
    }

    if (!currentClassSetting) {
      return []
    }

    return [
      {
        name: 'Team member numbers',
        progress: parseAmount(customerTeamInfo?.data?.teamSize),
        total: currentClassSetting?.activeMember,
      },
      {
        name: 'Team member betting amount',
        progress: parseAmount(customerTeamInfo?.data?.totalBets),
        total: currentClassSetting?.totalBet,
      },
      {
        name: 'Team member deposit amount',
        progress: parseAmount(customerTeamInfo?.data?.totalDeposit),
        total: currentClassSetting?.totalDeposit,
      },
    ]
  }, [currentClassSetting, customerTeamInfo])

  return (
    <div className="container flex flex-1 flex-col p-0">
      {/* Top Navigation */}
      <Tabs defaultValue="Invite" className="px-3">
        <TabsList className="w-full">
          <TabsTrigger value="Invite" className="flex-1" asChild>
            <Link prefetch="viewport" to="/share-invite">
              Invite
            </Link>
          </TabsTrigger>
          <TabsTrigger value="My Team" className="flex-1" asChild>
            <Link prefetch="viewport" to="/share-team/Commission">
              My Team
            </Link>
          </TabsTrigger>
        </TabsList>
      </Tabs>
      {customerTeamInfoLoading || teamSettingListLoading ? (
        <ShareInviteSkeleton />
      ) : (
        <>
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
                    <Link prefetch="viewport" to="/lucky-money/share">
                      <img
                        src="/images/lucky-money/lucky-money.png"
                        alt="lucky-money"
                        className="h-5 w-5"
                      />
                    </Link>
                  </div>
                </div>
                <div className="flex-1">
                  <Input
                    readOnly
                    className="h-9 w-full"
                    id="address"
                    value={'http://kokon.com/=3782038u219'}
                    fieldSuffix={
                      <Button
                        variant="icon"
                        size="icon"
                        className="h-6 w-6 text-white"
                        onClick={() => copyToClipboard('http://kokon.com/=3782038u219')}
                      >
                        <SvgCopy className="h-4 w-4" />
                      </Button>
                    }
                  />
                </div>
              </div>
              <Button catEars className="mt-4 w-full font-ultra" onClick={handleShareURL}>
                Share
              </Button>
            </div>
          </div>

          <div className="mt-[-16px] flex w-full flex-1 flex-col items-center rounded-[12px] bg-black p-4">
            {/* My Commission Section */}
            <CatEarsCard>
              <div className="flex items-center justify-between rounded-t-[12px] bg-[#333333] px-6 py-2">
                <span className="font-ultra text-primary">My Commission</span>
                <Link prefetch="viewport" to="/share-team/Commission">
                  <Button variant="icon" size="icon">
                    <SvgHistory className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="flex items-center justify-between space-x-2 p-3 text-xs">
                <SvgCommission className="h-8 w-8" />
                <div className="flex flex-col items-center space-y-1">
                  <div className="flex h-7 items-center">Team Rating</div>
                  <div className="flex items-center space-x-1">
                    <StarIcon className="h-4 w-4" />
                    <div className="font-ultra text-white">{customerTeamInfo?.data?.class}</div>
                  </div>
                </div>
                <div className="flex flex-col items-center space-y-1">
                  <div className="flex h-7 items-center">Today</div>
                  <div className="flex items-center space-x-1">
                    <KokonIcon className="h-4 w-4" />
                    <Amount
                      className="font-ultra text-white"
                      value={customerTeamInfo?.data?.todayCommission}
                      crypto="KOKON"
                      useKM
                    />
                  </div>
                </div>
                <div className="flex flex-col items-center space-y-1">
                  <div className="flex h-7 items-center">Total Received</div>
                  <div className="flex items-center space-x-1">
                    <KokonIcon className="h-4 w-4" />
                    <Amount
                      className="font-ultra text-white"
                      value={customerTeamInfo?.data?.totalCommission}
                      crypto="KOKON"
                      useKM
                    />
                  </div>
                </div>
              </div>
            </CatEarsCard>
            {/* My Invitations Section */}
            <CatEarsCard className="text-center">
              <div className="flex items-center justify-between rounded-t-[12px] bg-[#333333] px-6 py-2">
                <span className="font-ultra text-primary">My Invitations</span>
                <Link prefetch="viewport" to="/share-team/TeamMember">
                  <Button variant="icon" size="icon">
                    <SvgHistory className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="flex items-center justify-between space-x-2 p-3 text-xs">
                <SvgInvite className="h-8 w-8" />
                <div className="flex flex-col items-center space-y-1">
                  <div className="flex h-7 items-center">Registered Friends</div>
                  <div className="flex items-center space-x-1">
                    <div className="font-ultra text-white">
                      {customerTeamInfo?.data?.inviteSize}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center space-y-1">
                  <div className="flex h-7 items-center">Valid Friends</div>
                  <div className="flex items-center space-x-1">
                    <div className="font-ultra text-white">{customerTeamInfo?.data?.validSize}</div>
                  </div>
                </div>
                <div className="flex flex-col items-center space-y-1">
                  <div className="flex h-7 items-center">Total Team Member</div>
                  <div className="flex items-center space-x-1">
                    <div className="font-ultra text-white">{customerTeamInfo?.data?.teamSize}</div>
                  </div>
                </div>
              </div>
            </CatEarsCard>
            {/* Team Star Rating Section */}
            <div className="mt-6 flex w-full items-center space-x-1 text-base font-ultra">
              <div>Team Star Rating</div>
              <InfoTooltip content="The star rating will be upgraded based on betting amount of your team. Higher star ratings lead to higher commission percentages." />
            </div>
            <div className="relative mt-2 w-full rounded-xl bg-colorLinear-green p-3">
              <div className="absolute bottom-0 left-0 h-[126px] w-full bg-[url('/images/lucky-money/lucky-money-bg.svg')]"></div>
              {/* 團隊層級輪播 */}
              <TeamLevelCarousel
                images={teamLevelCarouselImages}
                teamLevel={customerTeamInfo?.data?.class ?? 0}
                onTeamLevelChange={handleTeamLevelChange}
              />
              {/* Team's Commission Ratio Section */}
              <CatEarsCard className="relative mt-8 w-full rounded-[12px] bg-[#1C1C1C] text-center text-[#FFFFFFB2]">
                <div className="flex items-center justify-between rounded-t-[12px] bg-[#333333] px-6 py-2">
                  <div className="font-ultra text-primary">Team's Commission Ratio</div>
                </div>
                <div className="flex items-center justify-between space-x-2 p-3 text-xs">
                  {currentCommissionSetting &&
                    currentCommissionSetting?.map(el => (
                      <div key={el.level} className="flex flex-1 flex-col items-center space-y-1">
                        <div className="flex h-7 items-center">{el.level}</div>
                        <div className="flex items-center space-x-1">
                          <div className="font-ultra text-white">{el.commission}%</div>
                        </div>
                      </div>
                    ))}
                </div>
              </CatEarsCard>
              {/* Upgrade Conditions Section */}
              {teamLevel > 1 && (
                <CatEarsCard className="relative mt-4 w-full rounded-[12px] bg-[#1C1C1C] text-[#FFFFFFB2]">
                  <div className="flex items-center justify-between rounded-t-[12px] bg-[#333333] px-6 py-2">
                    <div className="font-ultra text-primary">Upgrade Conditions</div>
                  </div>
                  <div className="flex w-full flex-col items-center space-y-3 p-3 text-xs">
                    {taskProgress.map(el => (
                      <div key={`level-${el}`} className="flex w-full flex-col">
                        <ProgressBar progress={el.progress} total={el.total} label={el.name} />
                      </div>
                    ))}
                  </div>
                </CatEarsCard>
              )}
            </div>
          </div>
        </>
      )}

      {/* 規則說明 */}
      <RuleSheet
        teamSettingList={teamSettingList?.data ?? { classSetting: [], commissionSetting: [] }}
      />
    </div>
  )
}

export default ShareInvite
