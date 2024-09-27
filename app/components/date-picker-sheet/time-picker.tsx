import React, { useEffect, useState } from 'react'
import { usePrevious } from 'react-use'
import IosPickerItem from './ios-picker-item'
import classes from './embla.module.scss'
import { cn } from '~/lib/utils'

interface TimePickerProps {
  value?: string
  onChange?: (value: string) => void
  className?: string
}

const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0')) // 00 - 23 小时
const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0')) // 00 - 59 分钟

export const TimePicker: React.FC<TimePickerProps> = ({ value = '00:00', className, onChange }) => {
  const [selectedHour, setSelectedHour] = useState(value.split(':')[0] || '00')
  const [selectedMinute, setSelectedMinute] = useState(value.split(':')[1] || '00')

  const handleHourChange = (hour: string) => {
    if (hour !== selectedHour) {
      setSelectedHour(hour)
      const newTime = `${hour}:${selectedMinute}`
      if (onChange) {
        onChange(newTime)
      }
    }
  }

  const handleMinuteChange = (minute: string) => {
    if (minute !== selectedMinute) {
      setSelectedMinute(minute)
      const newTime = `${selectedHour}:${minute}`
      if (onChange) {
        onChange(newTime)
      }
    }
  }

  useEffect(() => {
    // 解析传入的 value，并更新内部状态
    const [hour, minute] = value.split(':')
    setSelectedHour(hour || '00')
    setSelectedMinute(minute || '00')
  }, [value])

  return (
    <div className={cn(classes.embla, className)}>
      <IosPickerItem
        slides={hours}
        value={selectedHour}
        loop
        perspective="left"
        onChange={handleHourChange}
      />
      <span className="mx-2 text-base font-ultra text-white">:</span>
      <IosPickerItem
        slides={minutes}
        value={selectedMinute}
        loop
        perspective="right"
        onChange={handleMinuteChange}
      />
    </div>
  )
}

export default TimePicker
