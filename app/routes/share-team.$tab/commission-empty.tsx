import { useTranslation } from 'react-i18next'

const CommissionEmpty: React.FC = () => {
  const { t } = useTranslation()
  return (
    <div className="flex min-h-56 flex-1 flex-col items-center justify-center">
      <img src="/images/system-no-data.png" alt="progress" className="h-32 w-32" />
      <div className="mt-2 text-xs text-[#FFFFFFB2]">{t('NoDataAvailable')}</div>
    </div>
  )
}

export default CommissionEmpty
