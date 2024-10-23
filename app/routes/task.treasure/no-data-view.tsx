import React from 'react'
import { useNavigate } from '@remix-run/react'
import { Button } from '~/components/ui/button'
import useStore from '~/stores/useStore'
import { useTranslation } from 'react-i18next'

interface NoDataViewProps {
  showButton?: boolean
  buttonText?: string
  message?: string
}

const NoDataView: React.FC<NoDataViewProps> = ({ showButton = true }) => {
  const { t } = useTranslation()
  const isLoggedIn = useStore(state => state.isLoggedIn)
  const openNeedLoginDialog = useStore(state => state.openNeedLoginDialog)
  const navigate = useNavigate()

  const handleGo = () => {
    if (isLoggedIn) navigate('/task/subtask')
    else openNeedLoginDialog()
  }
  return (
    <div className="absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center px-3">
      <img className="w-32" src="/images/system-error.png" alt="No data" />
      <p className="mt-2 text-xs font-semibold text-white/70">{t('ThereIsNoTreasureToUnlock')}</p>
      <p className="mt-0 text-xs font-semibold text-white/70">{t('GetTreasureFromTaskReward')}</p>
      {showButton && (
        <Button catEars className="mt-3 w-full" onClick={handleGo}>
          {t('Go')}
        </Button>
      )}
    </div>
  )
}

export default NoDataView
