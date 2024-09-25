import React, { useEffect, useState } from 'react'
import useStore from '~/stores/useStore'

import { Link } from '@remix-run/react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'
import Commission from './commission'
import TeamMember from './team-member'

const ShareTeam: React.FC = () => {
  const setNavVisibility = useStore(state => state.setNavVisibility)
  useEffect(() => {
    setNavVisibility(false)
    return () => {
      setNavVisibility(true)
    }
  }, [setNavVisibility])

  const [actvieTab, setActvieTab] = useState('Commission')

  return (
    <div className="container flex flex-1 flex-col p-0">
      {/* Top Navigation */}
      <Tabs defaultValue="My Team">
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

      <div className="mt-3 flex flex-1 flex-col">
        {/* Tabs Navigation */}
        <Tabs defaultValue="Commission" value={actvieTab} className="flex w-full flex-1 flex-col">
          <TabsList variant="cardTab" className="w-full overflow-x-auto">
            <TabsTrigger variant="cardTab" value="Commission" className="flex-1" asChild>
              <div
                onClick={() => {
                  setActvieTab('Commission')
                }}
                role="button"
                tabIndex={0}
                onKeyDown={() => {}}
              >
                Commission
              </div>
            </TabsTrigger>
            <TabsTrigger variant="cardTab" value="Team Member" className="flex-1" asChild>
              <div
                onClick={() => {
                  setActvieTab('Team Member')
                }}
                role="button"
                tabIndex={0}
                onKeyDown={() => {}}
              >
                Team Member
              </div>
            </TabsTrigger>
          </TabsList>
          <TabsContent value={actvieTab} className="mt-0 flex flex-1 bg-black">
            {actvieTab === 'Commission' && <Commission />}
            {actvieTab === 'Team Member' && <TeamMember />}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default ShareTeam
