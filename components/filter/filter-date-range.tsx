'use client'
import React, { useEffect, useState } from 'react'
import { DatePickerWithRange } from '../form/date-picker'
import { timeFormat } from '@/lib/utils'
import { DateRange } from 'react-day-picker'
import { useGetUpdateParams } from '@/hooks'
import { useDebounce } from '@/hooks/useDebounce'

const formatRange = (dateRange: string) => {
  if (!dateRange) return undefined
  const [startDate, endDate] = dateRange.split('|').map(date => new Date(date))
  return {
    from: startDate ? timeFormat(startDate)?.toDate() : undefined,
    to: endDate ? timeFormat(endDate)?.toDate() : undefined
  }
}

const FilterDateRange = () => {
  // Initialize with today's date
  const today = new Date()
  const [date, setDate] = useState<DateRange | undefined>({
    from: today,
    to: today
  })

  const { setSearchParams, getValue } = useGetUpdateParams()
  const value = getValue('date')
  const debouncedDate = useDebounce(date, 800)

  useEffect(() => {
    // Only update from URL if there's a value
    if (value) {
      setDate(formatRange(value))
    } else if (!value && date?.from) {
      // If no URL value but we have a default date, update the URL
      setSearchParams({
        date: `${timeFormat(date.from).format()}|${timeFormat(date.to).format()}`,
        page: 1
      })
    }
  }, [value])

  useEffect(() => {
    if (debouncedDate?.from) {
      setSearchParams({
        date: `${timeFormat(debouncedDate?.from).format()}|${timeFormat(
          debouncedDate?.to
        )?.format()}`,
        page: 1
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedDate])
  
  return <DatePickerWithRange onChange={setDate} value={date} />
}

export default FilterDateRange