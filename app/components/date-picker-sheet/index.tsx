import { useEffect, useMemo, useState, ReactNode } from 'react'
import { type DateRange } from 'react-day-picker'
import { format, setHours, setMinutes } from 'date-fns'
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
  range?: boolean // 是否选择日期范围
  showTimePicker?: boolean // 控制是否显示时间选择器
  placeholder?: string
}

// type guard
const isDateRange = (val?: Date | DateRange): val is DateRange => {
  return !!val && (val as DateRange).from !== undefined
}

const updateTimes = (date: Date | undefined, setTime: (time: string) => void) => {
  setTime(date ? format(date, 'HH:mm') : '00:00')
}

const applyTimeToDate = (date: Date | undefined, time: string): Date | undefined => {
  if (!date) return undefined
  const [hours, minutes] = time.split(':').map(Number)
  return setMinutes(setHours(date, hours), minutes)
}

export default function DatePickerSheet({
  id,
  title,
  value,
  customTrigger,
  onChange,
  range = false, // 默认为单个日期
  showTimePicker = false, // 默认为不显示时间选择器
  placeholder = 'Select Date',
}: DatePickerSheetProps) {
  const [open, setOpen] = useState(false)
  const [internalDate, setInternalDate] = useState<Date | DateRange | undefined>(value)
  const [internalTimeFrom, setInternalTimeFrom] = useState('00:00')
  const [internalTimeTo, setInternalTimeTo] = useState('00:00')

  const handleConfirm = () => {
    if (onChange) {
      if (range && isDateRange(internalDate)) {
        const updatedFrom = applyTimeToDate(internalDate.from, internalTimeFrom)
        const updatedTo = applyTimeToDate(internalDate.to, internalTimeTo)
        onChange({ from: updatedFrom, to: updatedTo })
      } else if (internalDate instanceof Date) {
        const updatedDate = applyTimeToDate(internalDate, internalTimeFrom)
        onChange(updatedDate)
      }
    }
    setOpen(false)
  }

  // 清空选择
  const handleClear = () => {
    setInternalDate(undefined)
    setInternalTimeFrom('00:00')
    setInternalTimeTo('00:00')
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
    if (!value) return placeholder

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
  }, [placeholder, range, showTimePicker, value])

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

  const triggerContent = customTrigger ? (
    customTrigger({
      displayTriggerDate,
    })
  ) : (
    <Button id={id} variant="select" className="flex items-center justify-between space-x-2">
      <span>{displayTriggerDate}</span>
      <ArrowLineDownIcon className="h-4 w-4 text-white/70" />
    </Button>
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
              onSelect={date => setInternalDate(date)}
              className="mt-2 p-0"
            />
          ) : (
            <Calendar
              mode="single"
              selected={internalDate as Date}
              onSelect={date => setInternalDate(date)}
              className="mt-2 p-0"
            />
          )}
          {/* TimePicker */}
          {showTimePicker && (
            <div className="flex flex-1 flex-col items-stretch overflow-hidden rounded-lg bg-[#1C1C1C]">
              <div className="flex border-b-[0.5px] border-white/20 bg-[#1C1C1C] py-1 text-center text-base font-normal text-white/70">
                <div className="flex-1">From</div>
                {range && <div className="flex-1">To</div>}
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
            Clear
          </Button>
          <Button className="flex-1" catEars onClick={handleConfirm}>
            Confirm
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
