import { ComponentProps } from 'react'
import { DayPicker } from 'react-day-picker'

import { cn } from '~/lib/utils'
import ArrowLineLeftIcon from '~/icons/arrow-line-left.svg?react'
import ArrowLineRightIcon from '~/icons/arrow-line-right.svg?react'
import { buttonVariants } from '~/components/ui/button'

export type CalendarProps = ComponentProps<typeof DayPicker>

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-4', className)}
      classNames={{
        months: 'flex flex-col justify-center',
        month: 'flex flex-col items-center space-y-2',
        month_caption: 'h-9 flex justify-center relative items-center',
        caption_label: 'text-base font-ultra',
        nav: 'relative space-x-2 flex items-center',
        button_previous: cn(
          buttonVariants({ variant: 'icon' }),
          'h-5 w-5 bg-transparent p-0 text-white absolute left-5 top-2'
        ),
        button_next: cn(
          buttonVariants({ variant: 'icon' }),
          'h-5 w-5 bg-transparent p-0 text-white absolute right-5 top-2'
        ),
        month_grid: 'w-full border-collapse space-y-1',
        weekdays: 'flex',
        weekday: 'text-white/70 rounded-md flex-auto font-normal text-[0.8rem]', // w-12
        week: 'grid grid-cols-7 w-full mt-2', // flex
        day: 'aspect-square text-white text-center text-base font-normal p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-primary/50 [&:has([aria-selected])]:bg-primary first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
        day_button: 'h-full w-full p-0 aria-selected:opacity-100 hover:bg-white/10',
        range_start: 'bg-primary rounded-s-md aria-selected:text-black aria-selected:font-ultra',
        range_end: 'bg-primary rounded-e-md aria-selected:text-black aria-selected:font-ultra',
        selected: '',
        today: 'bg-[#1C1C1C] text-accent-foreground rounded-md',
        outside:
          'day-outside text-muted-foreground opacity-50 aria-selected:bg-primary/10 aria-selected:text-muted-foreground aria-selected:opacity-30',
        disabled: 'text-muted-foreground opacity-50',
        range_middle: 'bg-primary/20 last:rounded-e-md first:rounded-s-md',
        hidden: 'invisible',
        ...classNames,
      }}
      components={{
        Chevron: ({ ...props }) =>
          props.orientation === 'left' ? (
            <ArrowLineLeftIcon className="h-4 w-4" />
          ) : (
            <ArrowLineRightIcon className="h-4 w-4" />
          ),
      }}
      {...props}
    />
  )
}
Calendar.displayName = 'Calendar'

export { Calendar }
