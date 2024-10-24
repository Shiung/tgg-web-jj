import { useTranslation } from 'react-i18next'

import { Button } from '~/components/ui/button'
import { Link } from '@remix-run/react'

const TeamMemberEmpty: React.FC = () => {
  const { t } = useTranslation()
  return (
    <div className="flex min-h-56 flex-1 flex-col items-center justify-center">
      <img src="/images/share/dobule-cats.png" alt="progress" className="h-32 w-44" />
      <Link prefetch="viewport" to="/share-invite" className="w-full">
        <Button catEars className="mt-4 w-full">
          <div className="text-sm font-ultra">{t('InviteFriendsToJoinKaton')}</div>
        </Button>
      </Link>
    </div>
  )
}

export default TeamMemberEmpty
