/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useEffect, useState } from 'react'
import { DatePickerWithRange } from '../form/date-picker'
import { timeFormat } from '@/lib/utils'
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
  const { setSearchParams, getValue } = useGetUpdateParams()
  const value = getValue('date')
  const [date, setDate] = useState<any>({})

  const debouncedDate = useDebounce(date, 800)

  useEffect(() => {
    if (value) {
      setDate(formatRange(value))
    } else {
      setDate({
        from: new Date(),
        to: new Date()
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
  }, [debouncedDate, setSearchParams])

  return <DatePickerWithRange onChange={setDate} value={date} />
}

export default FilterDateRange
