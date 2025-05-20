'use client'
import React from 'react'
import { filterDateOptions } from '@/constant/date'
import SelectForFilter from './select-for-filter'

const FilterSelectDate = () => {
  // Get the value for "Today" from the options array
  const todayValue = filterDateOptions[0].value
  
  return (
    <SelectForFilter 
      keys="date" 
      placeholder="Filter Date" 
      option={filterDateOptions} 
      defaultValue={todayValue} 
    />
  )
}

export default FilterSelectDate
