import { Button } from '~/components/ui/button'

const TeamMemberEmpty: React.FC = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <img src="/images/share/dobule-cats.png" alt="progress" className="h-32 w-44" />
      <Button catEars className="mt-4 w-full">
        <div className="text-sm font-ultra">Invite friends to join KOKON</div>
      </Button>
    </div>
  )
}

export default TeamMemberEmpty
