import React, { useEffect, useState } from 'react'
import { useParams, Link } from '@remix-run/react'
import { useQuery } from '@tanstack/react-query'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'

import Commission from './commission'
import TeamMember from './team-member'
import { apis } from '~/api'

const ShareTeam: React.FC = () => {
  const params = useParams()
  const [activeTab, setActiveTab] = useState('Commission')

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

  useEffect(() => {
    if (params?.tab) {
      setActiveTab(params.tab)
    }
  }, [params])

  return (
    <div className="container flex flex-1 flex-col p-0">
      {/* Top Navigation */}
      <Tabs defaultValue="My Team" className="px-3">
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

      <div className="mt-3 flex flex-1 flex-col">
        {/* Tabs Navigation */}
        <Tabs defaultValue="Commission" value={activeTab} className="flex w-full flex-1 flex-col">
          <TabsList variant="cardTab" className="w-full overflow-x-auto">
            <TabsTrigger variant="cardTab" value="Commission" className="flex-1" asChild>
              <Link prefetch="viewport" to="/share-team/Commission">
                Team Commission
              </Link>
            </TabsTrigger>
            <TabsTrigger variant="cardTab" value="TeamMember" className="flex-1" asChild>
              <Link prefetch="viewport" to="/share-team/TeamMember">
                Team Member
              </Link>
            </TabsTrigger>
          </TabsList>
          <TabsContent value={activeTab} className="mt-0 flex flex-1 bg-black">
            {activeTab === 'Commission' && (
              <Commission
                customerTeamInfo={customerTeamInfo?.data}
                teamSettingList={teamSettingList?.data}
                loading={customerTeamInfoLoading || teamSettingListLoading}
              />
            )}
            {activeTab === 'TeamMember' && (
              <TeamMember
                customerTeamInfo={customerTeamInfo?.data}
                teamSettingList={teamSettingList?.data}
                loading={customerTeamInfoLoading || teamSettingListLoading}
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default ShareTeam
