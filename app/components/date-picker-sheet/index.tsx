import { useEffect, useMemo, useState, ReactNode } from 'react'
import { type DateRange } from 'react-day-picker'
import { format, isAfter, isBefore, setHours, setMinutes } from 'date-fns'
import { useTranslation } from 'react-i18next'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '~/components/ui/sheet'
import { Calendar } from '~/components/ui/calendar'
import { Button } from '~/components/ui/button'
import ArrowLineDownIcon from '~/icons/arrow-line-down.svg?react'
import LightArrowRightIcon from '~/icons/light-arrow-right.svg?react'
import { TimePicker } from './time-picker'
import { Input } from '../ui/input'

interface DatePickerSheetProps {
  id?: string
  title: string
  value: Date | DateRange | undefined
  customTrigger?: (props: { displayTriggerDate: string | ReactNode | undefined }) => ReactNode
  onChange?: (date: Date | DateRange | undefined) => void
  range?: boolean // 是否为日期范围选择
  showTimePicker?: boolean // 是否显示时间选择器
  placeholder?: string
  rangeLimits?: { minDate?: Date; maxDate?: Date }
}

// type guard
const isDateRange = (val?: Date | DateRange): val is DateRange => {
  return !!val && (val as DateRange).from !== undefined
}

const DEFAULT_START_TIME = '00:00'
const DEFAULT_END_TIME = '23:59'

const updateTimes = (date: Date | undefined, setTime: (time: string) => void) => {
  setTime(date ? format(date, 'HH:mm') : DEFAULT_START_TIME)
}

const applyTimeToDate = (
  date: Date | undefined,
  time: string = DEFAULT_START_TIME
): Date | undefined => {
  if (!date) return undefined
  const [hours, minutes] = time.split(':').map(Number)
  if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
    throw new RangeError('Invalid time value')
  }

  return setMinutes(setHours(date, hours), minutes)
}

export default function DatePickerSheet({
  id,
  title,
  value,
  customTrigger,
  onChange,
  range = false,
  showTimePicker = false,
  placeholder,
  rangeLimits,
}: DatePickerSheetProps) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [internalDate, setInternalDate] = useState<Date | DateRange | undefined>(value)
  const [internalTimeFrom, setInternalTimeFrom] = useState(DEFAULT_START_TIME)
  const [internalTimeTo, setInternalTimeTo] = useState(DEFAULT_END_TIME)

  const handleConfirm = () => {
    if (onChange) {
      if (range && isDateRange(internalDate)) {
        const updatedFrom = applyTimeToDate(
          internalDate.from,
          internalTimeFrom || DEFAULT_START_TIME
        )
        const updatedTo = applyTimeToDate(internalDate.to, internalTimeTo || DEFAULT_END_TIME)
        onChange({ from: updatedFrom, to: updatedTo })
      } else if (internalDate instanceof Date) {
        const updatedDate = applyTimeToDate(internalDate, internalTimeFrom || DEFAULT_START_TIME)
        onChange(updatedDate)
      }
    }
    setOpen(false)
  }

  // 清空选择
  const handleClear = () => {
    setInternalDate(undefined)
    setInternalTimeFrom(DEFAULT_START_TIME)
    setInternalTimeTo(DEFAULT_END_TIME)
  }

  const displayDate = useMemo(() => {
    // console.log('displayDate', internalDate, internalTimeFrom)

    if (internalDate instanceof Date) {
      return format(internalDate, 'MM-dd-yyyy') + (showTimePicker ? ` ${internalTimeFrom}` : '')
    }
  }, [internalDate, internalTimeFrom, showTimePicker])

  const displayRangeDate = useMemo(() => {
    // console.log('displayRangeDate', internalDate, internalTimeFrom, internalTimeTo)

    if (range && isDateRange(internalDate)) {
      const { from, to } = internalDate
      return {
        from: from
          ? format(from, 'MM-dd-yyyy') + (showTimePicker ? ` ${internalTimeFrom}` : '')
          : '',
        to: to ? format(to, 'MM-dd-yyyy') + (showTimePicker ? ` ${internalTimeTo}` : '') : '',
      }
    }
  }, [internalDate, internalTimeFrom, internalTimeTo, range, showTimePicker])

  const displayTriggerDate = useMemo(() => {
    if (!value) return placeholder || t('SelectDate')

    if (range && isDateRange(value)) {
      const { from, to } = value
      const formatDate = (date: Date | undefined) => (date ? format(date, 'MM-dd-yyyy') : '')
      const formatTime = (date: Date | undefined) =>
        date && showTimePicker ? ` ${format(date, 'HH:mm')}` : ''

      return `${formatDate(from)}${formatTime(from)} ~ ${formatDate(to)}${formatTime(to)}`
    }

    if (value instanceof Date) {
      const formatDate = format(value, 'MM-dd-yyyy')
      const formatTime = showTimePicker ? ` ${format(value, 'HH:mm')}` : ''
      return `${formatDate}${formatTime}`
    }
  }, [placeholder, range, showTimePicker, t, value])

  const disabledDates = useMemo(() => {
    if (!rangeLimits) return undefined

    const { minDate, maxDate } = rangeLimits

    const disabled: any = {}
    if (minDate) disabled.before = minDate
    if (maxDate) disabled.after = maxDate

    return disabled
  }, [rangeLimits])

  const isDateInRange = (date: Date | DateRange | undefined): boolean => {
    if (!rangeLimits) return true
    const { minDate, maxDate } = rangeLimits

    if (date instanceof Date) {
      if (minDate && isBefore(date, minDate)) return false
      if (maxDate && isAfter(date, maxDate)) return false
      return true
    }

    if (isDateRange(date)) {
      const { from, to } = date
      if (from && minDate && isBefore(from, minDate)) return false
      if (to && maxDate && isAfter(to, maxDate)) return false
      return true
    }

    return false
  }

  useEffect(() => {
    if (open || value) {
      setInternalDate(value)
      if (range && isDateRange(value)) {
        updateTimes(value?.from, setInternalTimeFrom)
        updateTimes(value?.to, setInternalTimeTo)
      } else if (value instanceof Date) {
        updateTimes(value, setInternalTimeFrom)
      }
    }
  }, [open, range, value])

  const triggerContent = useMemo(
    () =>
      customTrigger ? (
        customTrigger({
          displayTriggerDate,
        })
      ) : (
        <Button id={id} variant="select" className="flex items-center justify-between space-x-2">
          <span>{displayTriggerDate}</span>
          <ArrowLineDownIcon className="h-4 w-4 text-white/70" />
        </Button>
      ),
    [customTrigger, displayTriggerDate, id]
  )

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{triggerContent}</SheetTrigger>
      <SheetContent
        side="bottom"
        className="max-h-[calc(100vh_-_48px)]"
        onOpenAutoFocus={e => e.preventDefault()}
      >
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>
        <div className="flex max-h-[calc(100vh_-_48px-_44px-_60px)] flex-col items-stretch overflow-y-auto px-4 pb-6 pt-4">
          {/* Selected */}
          {range && isDateRange(internalDate) ? (
            <div className="flex flex-1 items-center space-x-2">
              <Input readOnly value={displayRangeDate?.from} />
              <LightArrowRightIcon className="h-2 w-[13px] shrink-0 text-white" />
              <Input readOnly value={displayRangeDate?.to} />
            </div>
          ) : (
            <Input readOnly value={displayDate} className="flex-1" />
          )}
          {/* Calendar */}
          {range ? (
            <Calendar
              mode="range"
              selected={internalDate as DateRange}
              disabled={disabledDates}
              onSelect={date => isDateInRange(date) && setInternalDate(date)}
              className="mt-2 p-0"
            />
          ) : (
            <Calendar
              mode="single"
              selected={internalDate as Date}
              disabled={disabledDates}
              onSelect={date => isDateInRange(date) && setInternalDate(date)}
              className="mt-2 p-0"
            />
          )}
          {/* TimePicker */}
          {showTimePicker && (
            <div className="flex flex-1 flex-shrink-0 flex-col items-stretch overflow-hidden rounded-lg bg-[#1C1C1C]">
              <div className="flex border-b-[0.5px] border-white/20 bg-[#1C1C1C] py-1 text-center text-base font-normal text-white/70">
                <div className="flex-1">{t('From')}</div>
                {range && <div className="flex-1">{t('To')}</div>}
              </div>
              <div className="flex flex-1 items-center justify-between">
                <TimePicker
                  value={internalTimeFrom}
                  onChange={setInternalTimeFrom} // 同步更新选中的时间
                />
                {range && (
                  <TimePicker
                    value={internalTimeTo}
                    onChange={setInternalTimeTo} // 同步更新选中的时间
                  />
                )}
              </div>
            </div>
          )}
        </div>
        <SheetFooter className="px-4 pb-4 pt-2">
          <Button className="flex-1" variant="gray" catEars onClick={handleClear}>
            {t('Clear')}
          </Button>
          <Button className="flex-1" catEars onClick={handleConfirm}>
            {t('Confirm')}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
