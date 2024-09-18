import React from 'react'
import IosPickerItem from './ios-picker-item'
import classes from './embla.module.scss'
import { cn } from '~/lib/utils'

interface TimePickerProps {
  value?: string
  onChange?: (value: string) => void
  className?: string
}

const hours = Array.from({ length: 25 }, (_, i) => `${String(i).padStart(2, '0')}:00`)

export const HoursPicker: React.FC<TimePickerProps> = ({
  value = '00:00',
  className,
  onChange,
}) => {
  const handleHourChange = (selectedHour: string) => {
    if (onChange) {
      onChange(selectedHour)
    }
  }

  return (
    <div className={cn(classes.embla, 'mx-auto px-4', className)}>
      <IosPickerItem
        slides={hours}
        label={value}
        loop
        perspective="left"
        onChange={handleHourChange}
      />
      <IosPickerItem
        slides={hours}
        label={value}
        loop
        perspective="right"
        onChange={handleHourChange}
      />
    </div>
  )
}

export default HoursPicker
