import { useEffect, useMemo, useState } from 'react'
import { isValid } from 'date-fns'
import { format, toDate } from 'date-fns-tz'
import { useTranslation } from 'react-i18next'
import { cn } from '~/lib/utils'

interface GameMainTenanceProps {
  /**
   * 維護狀態, 1:維護中 2:非維護中 3:預約維護
   */
  isGameMaintain?: number
  maintainStartAt?: string
  maintainEndAt?: string
  className?: string
}

const GameMainTenance = ({
  isGameMaintain,
  maintainStartAt,
  maintainEndAt,
  className,
}: GameMainTenanceProps) => {
  const { t } = useTranslation()
  const [isMaintenance, setIsMaintenance] = useState(false)

  const maintainEndDateInUTC8 = useMemo(
    () =>
      maintainEndAt && isGameMaintain === 3
        ? format(toDate(new Date(maintainEndAt), { timeZone: 'Asia/Taipei' }), 'MM-dd HH:mm') +
          ' (UTC+8)'
        : '',
    [maintainEndAt, isGameMaintain]
  )

  useEffect(() => {
    if (isGameMaintain === 1) {
      setIsMaintenance(true)
      return
    }

    if (isGameMaintain === 3) {
      // 若維護時間未定義或格式不正確則認定為不在維護中
      if (!maintainStartAt || !maintainEndAt) {
        setIsMaintenance(false)
        return
      }

      const start = new Date(maintainStartAt)
      const end = new Date(maintainEndAt)
      const now = new Date()

      // 檢查日期是否合法
      if (!isValid(start) || !isValid(end)) {
        console.warn('Invalid maintenance start or end time.')
        setIsMaintenance(false)
        return
      }

      setIsMaintenance(now >= start && now <= end)
    } else {
      // 非維護狀態 (2 或其他值)
      setIsMaintenance(false)
    }
  }, [isGameMaintain, maintainEndAt, maintainStartAt])

  if (!isMaintenance) return null

  return (
    <div
      className={cn(
        'pointer-events-auto absolute inset-0 z-10 flex flex-col items-stretch justify-center space-y-1 bg-black/70 px-4 text-base font-ultra',
        className
      )}
      onClick={e => e.stopPropagation()}
      onKeyDown={e => e.stopPropagation()}
      role="button"
      tabIndex={0}
    >
      <img src="/images/home/traffic-cone.png" alt="maintenance" className="h-6 w-6 self-center" />
      <p className="self-center whitespace-pre-wrap text-center text-primary">
        {t('UnderMainTenance')}
      </p>
      <p className="self-center text-center text-white">{maintainEndDateInUTC8}</p>
    </div>
  )
}

export default GameMainTenance
