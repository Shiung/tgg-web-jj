import { useTranslation } from 'react-i18next'
import { Button } from '~/components/ui/button'
import { useCustomSupport } from '~/hooks/useCustomSupport'

const SystemMaintenance: React.FC = () => {
  const { t } = useTranslation()
  const { handleCustomSupport } = useCustomSupport()

  return (
    <div className="flex aspect-square flex-col items-stretch justify-center space-y-2 p-4">
      <img
        src="/images/system-maintenance.png"
        alt="system maintenance"
        className="h-auto w-32 self-center object-contain"
      />
      <div className="space-y-1 text-center">
        <p className="text-base font-ultra text-white">{t('SystemMaintenance')}</p>
        <p className="text-xs font-normal text-white/70">{t('SystemMaintenanceContent')}</p>
      </div>
      <Button catEars onClick={handleCustomSupport}>
        {t('ContactSupport')}
      </Button>
    </div>
  )
}

export default SystemMaintenance
