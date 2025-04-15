'use client'

import * as React from 'react'
import { CalendarIcon } from 'lucide-react'
import { DateRange } from 'react-day-picker'

import { cn, timeFormat } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { toast } from 'sonner'

export function DatePickerWithRange({
  className,
  value,
  onChange
}: {
  className?: string
  value: DateRange | undefined
  onChange: (value: DateRange | undefined) => void
}) {
  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'w-[250px] justify-start text-left font-normal',
              !value && 'text-muted-foreground'
            )}>
            <CalendarIcon />
            {value?.from ? (
              value?.to ? (
                <>
                  {timeFormat(value?.from).format('LLL dd, y')} -{' '}
                  {timeFormat(value?.to).format('LLL dd, y')}
                </>
              ) : (
                timeFormat(value.from).format('LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={value?.from}
            selected={value}
            onSelect={selectedRange => {
              if (
                selectedRange?.from &&
                selectedRange?.to &&
                (selectedRange.to.getTime() - selectedRange.from.getTime()) /
                  (1000 * 60 * 60 * 24) >
                  31
              ) {
                toast.error('The selected range cannot exceed 31 days.')
                onChange({
                  from: selectedRange?.from,
                  to: new Date(selectedRange.from.getTime() + 31 * 24 * 60 * 60 * 1000)
                })
              } else {
                onChange(selectedRange)
              }
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
