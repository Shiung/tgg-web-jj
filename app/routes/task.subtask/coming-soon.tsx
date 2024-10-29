import { useTranslation } from 'react-i18next'

export default function ComingSoon() {
  const { t } = useTranslation()
  return (
    <div className="flex flex-1 items-center justify-center rounded-xl bg-black bg-[url('/images/system-bg.png')] bg-[length:100%_auto] bg-no-repeat">
      <div className="flex flex-col items-center">
        <img src="/images/system-comingSoon.png" className="h-auto w-[128px]" alt="coming-soon" />
        <div className="text-[24px] font-ultra">{t('rank.comingSoon')}</div>
      </div>
    </div>
  )
}
