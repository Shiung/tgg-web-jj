import { Button } from '~/components/ui/button'

interface NoDataViewProps {
  showButton?: boolean
  buttonText?: string
  message?: string
}

export default function NoDataView({
  showButton = false,
  buttonText = 'Play Game',
  message = 'No data available',
}: NoDataViewProps) {
  return (
    <div className="absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center space-y-2">
      <img className="w-32" src="/images/system-no-data.png" alt="No data" />
      <p className="text-xs font-semibold text-white/70">{message}</p>
      {showButton && buttonText && (
        <Button catEars className="w-full">
          {buttonText}
        </Button>
      )}
    </div>
  )
}
