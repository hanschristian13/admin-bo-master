import * as React from 'react'
import { CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn, timeFormat } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { IoIosArrowDown } from 'react-icons/io'
type Month = {
  number: number
  name: string
}

const MONTHS: Month[][] = [
  [
    { number: 0, name: 'Jan' },
    { number: 1, name: 'Feb' },
    { number: 2, name: 'Mar' },
    { number: 3, name: 'Apr' }
  ],
  [
    { number: 4, name: 'May' },
    { number: 5, name: 'Jun' },
    { number: 6, name: 'Jul' },
    { number: 7, name: 'Aug' }
  ],
  [
    { number: 8, name: 'Sep' },
    { number: 9, name: 'Oct' },
    { number: 10, name: 'Nov' },
    { number: 11, name: 'Dec' }
  ]
]

type MonthCalProps = {
  selectedMonth?: Date
  onMonthSelect?: (date: Date) => void
  onYearForward?: () => void
  onYearBackward?: () => void
  callbacks?: {
    yearLabel?: (year: number) => string
    monthLabel?: (month: Month) => string
  }
  variant?: {
    calendar?: {
      main?: ButtonVariant
      selected?: ButtonVariant
    }
    chevrons?: ButtonVariant
  }
  minDate?: Date
  maxDate?: Date
  disabledDates?: Date[]
  align?: 'center' | 'start' | 'end' | undefined
}

type ButtonVariant =
  | 'default'
  | 'outline'
  | 'ghost'
  | 'link'
  | 'destructive'
  | 'secondary'
  | null
  | undefined

function MonthPicker({
  onMonthSelect,
  selectedMonth,
  minDate,
  maxDate,
  disabledDates,
  callbacks,
  onYearBackward,
  onYearForward,
  variant,
  className,
  align = 'center',
  ...props
}: React.HTMLAttributes<HTMLDivElement> & MonthCalProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full justify-start text-left font-normal relative ',
            !selectedMonth && 'text-muted-foreground'
          )}>
          <CalendarIcon className="h-4 w-4" />
          <span className="pr-6">
            {selectedMonth ? timeFormat(selectedMonth).format('MMM yyyy') : 'Pick a month'}
          </span>
          <IoIosArrowDown className="absolute right-2" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-2" align={align}>
        <div className={cn('min-w-52 w-fit', className)} {...props}>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0">
            <div className="space-y-4 w-full">
              <MonthCal
                onMonthSelect={onMonthSelect}
                callbacks={callbacks}
                selectedMonth={selectedMonth}
                onYearBackward={onYearBackward}
                onYearForward={onYearForward}
                variant={variant}
                minDate={minDate}
                maxDate={maxDate}
                disabledDates={disabledDates}></MonthCal>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

function MonthCal({
  selectedMonth,
  onMonthSelect,
  callbacks,
  variant,
  minDate,
  maxDate,
  disabledDates,
  onYearBackward,
  onYearForward
}: MonthCalProps) {
  const [year, setYear] = React.useState<number>(
    selectedMonth?.getFullYear() ?? new Date().getFullYear()
  )
  const [month, setMonth] = React.useState<number>(
    selectedMonth?.getMonth() ?? new Date().getMonth()
  )
  const [menuYear, setMenuYear] = React.useState<number>(year)

  if (minDate && maxDate && minDate > maxDate) minDate = maxDate

  const disabledDatesMapped = disabledDates?.map(d => {
    return { year: d.getFullYear(), month: d.getMonth() }
  })
  // const [date, setDate] = React.useState<DateRange | undefined>({
  //   from: new Date(2022, 0, 20),
  //   to: addDays(new Date(2022, 0, 20), 20),
  // })
  return (
    <>
      <div className="flex justify-center pt-1 relative items-center">
        <div className="text-sm font-medium">
          {callbacks?.yearLabel ? callbacks?.yearLabel(menuYear) : menuYear}
        </div>
        <div className="space-x-1 flex items-center">
          <button
            onClick={() => {
              setMenuYear(menuYear - 1)
              if (onYearBackward) onYearBackward()
            }}
            className={cn(
              buttonVariants({ variant: variant?.chevrons ?? 'outline' }),
              'inline-flex items-center justify-center h-7 w-7 p-0 absolute left-1'
            )}>
            <ChevronLeft className="opacity-50 h-4 w-4" />
          </button>
          <button
            onClick={() => {
              setMenuYear(menuYear + 1)
              if (onYearForward) onYearForward()
            }}
            className={cn(
              buttonVariants({ variant: variant?.chevrons ?? 'outline' }),
              'inline-flex items-center justify-center h-7 w-7 p-0 absolute right-1'
            )}>
            <ChevronRight className="opacity-50 h-4 w-4" />
          </button>
        </div>
      </div>
      <table className="w-full border-collapse space-y-1">
        <tbody>
          {MONTHS.map((monthRow, a) => {
            return (
              <tr key={'row-' + a} className="flex w-full mt-2">
                {monthRow.map(m => {
                  return (
                    <td
                      key={m.number}
                      className="h-10 w-1/4 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20">
                      <button
                        onClick={() => {
                          setMonth(m.number)
                          setYear(menuYear)
                          if (onMonthSelect) onMonthSelect(new Date(menuYear, m.number))
                        }}
                        disabled={
                          (maxDate
                            ? menuYear > maxDate?.getFullYear() ||
                              (menuYear == maxDate?.getFullYear() && m.number > maxDate.getMonth())
                            : false) ||
                          (minDate
                            ? menuYear < minDate?.getFullYear() ||
                              (menuYear == minDate?.getFullYear() && m.number < minDate.getMonth())
                            : false) ||
                          (disabledDatesMapped
                            ? disabledDatesMapped?.some(
                                d => d.year == menuYear && d.month == m.number
                              )
                            : false)
                        }
                        className={cn(
                          buttonVariants({
                            variant:
                              month == m.number && menuYear == year
                                ? variant?.calendar?.selected ?? 'default'
                                : variant?.calendar?.main ?? 'ghost'
                          }),
                          'h-full w-full p-2 font-normal aria-selected:opacity-100'
                        )}>
                        {callbacks?.monthLabel ? callbacks.monthLabel(m) : m.name}
                      </button>
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

MonthPicker.displayName = 'MonthPicker'

export default MonthPicker
