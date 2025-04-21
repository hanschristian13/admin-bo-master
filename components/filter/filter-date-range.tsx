/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { DatePickerWithRange } from '../form/date-picker'
import { debounce, timeFormat } from '@/lib/utils'
import { useGetUpdateParams } from '@/hooks'

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

  const debouncedDateRange = useMemo(
    () =>
      debounce((x: any) => {
        if (x?.from) {
          setSearchParams({
            date: `${timeFormat(x?.from).format()}|${timeFormat(x?.to)?.format()}`,
            page: 1
          })
        }
      }, 2000),
    []
  )

  const handleDateChange = useCallback(
    (date: any) => {
      debouncedDateRange(date)
      setDate(date)
    },
    [debouncedDateRange]
  )

  return <DatePickerWithRange onChange={handleDateChange} value={date} />
}

export default FilterDateRange
