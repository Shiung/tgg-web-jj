import { Link } from '@remix-run/react'
import { useTranslation } from 'react-i18next'
import { Button } from '~/components/ui/button'

interface NoDataViewProps {
  showButton?: boolean
  buttonText?: string
  message?: string
}

export default function NoDataView({
  showButton = false,
  buttonText = 'playGame',
  message = 'NoDataAvailable',
}: NoDataViewProps) {
  const { t } = useTranslation()
  return (
    <div className="absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 transform flex-col items-stretch justify-center space-y-2">
      <img className="w-32 self-center" src="/images/system-no-data.png" alt="No data" />
      <p className="self-center text-xs font-semibold text-white/70">{t(message)}</p>
      {showButton && buttonText && (
        <Link to="/" className="w-full">
          <Button catEars className="mt-2 w-full">
            {t(buttonText)}
          </Button>
        </Link>
      )}
    </div>
  )
}
