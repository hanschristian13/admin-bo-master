'use client'
import React from 'react'
import { filterDateOptions } from '@/constant/date'
import SelectForFilter from './select-for-filter'

const FilterSelectDate = () => {
  return <SelectForFilter keys="date" placeholder="Filter Date" option={filterDateOptions} />
}

export default FilterSelectDate
