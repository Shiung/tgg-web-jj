import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '~/components/ui/button'
import useStore from '~/stores/useStore'

export default function Maintenance() {
  const { t } = useTranslation()
  const setHeaderVisibility = useStore(state => state.setHeaderVisibility)
  const setNavVisibility = useStore(state => state.setNavVisibility)

  useEffect(() => {
    setNavVisibility(false)
    setHeaderVisibility(false)
    return () => {
      setNavVisibility(true)
      setHeaderVisibility(true)
    }
  }, [setHeaderVisibility, setNavVisibility])

  return (
    <div className="container flex flex-1 flex-col items-stretch justify-center space-y-5 rounded-2xl bg-black bg-[url('/images/system-bg.png')] bg-[length:100%_auto] bg-top bg-no-repeat p-0">
      <img
        width={128}
        height={128}
        src="/images/system-maintenance.png"
        alt="system-maintenance"
        className="self-center"
      />
      <span className="self-center text-2xl font-ultra text-white">System Maintenance</span>
      <span className="self-center whitespace-pre-wrap px-4 text-center text-sm font-normal text-white/70">
        {t('MaintenanceDescription')}
      </span>
      <div className="px-4">
        <Button className="w-full" catEars>
          {t('ContactSupport')}
        </Button>
      </div>
    </div>
  )
}
