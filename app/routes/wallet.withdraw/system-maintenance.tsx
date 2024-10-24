import { useTranslation } from 'react-i18next'
import { Button } from '~/components/ui/button'
import { useCustomSupport } from '~/hooks/useCustomSupport'

const SystemMaintenance = () => {
  const { t } = useTranslation()
  const { handleCustomSupport } = useCustomSupport()

  return (
    <div className="m-4 flex flex-col items-center justify-center space-y-2 pt-10">
      <img className="h-32 w-32" src="/images/system-maintenance.png" alt="maintenance" />
      <div className="flex flex-col space-y-1 px-3 text-center">
        <div className="text-base font-ultra">{t('SystemMaintenance')}</div>
        <div className="text-xs text-[#FFFFFFB2]">{t('SystemMaintenanceContent')}</div>
      </div>
      <Button catEars className="w-full text-sm font-ultra" onClick={handleCustomSupport}>
        {t('ContactSupport')}
      </Button>
    </div>
  )
}

export default SystemMaintenance
