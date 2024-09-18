import { useEffect, useState } from 'react'
import { format } from 'date-fns'
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
import { HoursPicker } from './hours-picker'
import { Input } from '../ui/input'
import LightArrowRightIcon from '~/icons/light-arrow-right.svg?react'

interface DatePickerBottomSheetProps {
  title: string
  value: Date | undefined
  onChange?: (date: Date | undefined) => void
}

export default function DatePickerBottomSheet({
  title,
  value,
  onChange,
}: DatePickerBottomSheetProps) {
  const [open, setOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(value)
  const [selectedHour, setSelectedHour] = useState('12:00')

  useEffect(() => {
    if (!open) {
      setSelectedDate(value) // 当 Sheet 关闭时恢复为已确认的日期
    }
  }, [open, value])

  const handleConfirm = () => {
    setOpen(false)
    if (onChange) {
      onChange(selectedDate)
    }
  }

  const handleClear = () => {
    setSelectedDate(undefined)
    if (onChange) {
      onChange(undefined)
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="select">
          <div className="flex items-center justify-between space-x-2">
            <span>{selectedDate ? format(selectedDate, 'yyyy/MM/dd') : 'Date'}</span>
            <ArrowLineDownIcon className="h-4 w-4 text-white/70" />
          </div>
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col items-stretch p-4">
          {/* selected */}
          <div className="flex items-center space-x-2">
            <Input readOnly />
            <LightArrowRightIcon className="h-2 w-[13px] shrink-0 text-white/70" />
            <Input readOnly />
          </div>
          {/* Calendar */}
          <Calendar
            mode="range"
            // selected={selectedDate}
            selected={{ from: new Date(), to: new Date() }}
            // onSelect={date => setSelectedDate(date)}
            onSelect={date => console.log('date', date)}
            className="mt-2 p-0"
          />
          {/* HoursPicker */}
          <HoursPicker
            value={selectedHour}
            onChange={selected => {
              console.log('selectedHour', selected)
            }}
            className="mt-2"
          />
          <SheetFooter className="px-4 pb-4">
            <Button className="flex-1" variant="gray" catEars onClick={handleClear}>
              Clear
            </Button>
            <Button className="flex-1" catEars onClick={handleConfirm}>
              Confirm
            </Button>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  )
}
