'use client'
import React from 'react'
import SelectForFilter from './select-for-filter'
import { useDealerList } from '@/hooks/useDealerList'

const FilterDealerId = () => {
  const { data } = useDealerList()

  return <SelectForFilter placeholder="Filter Agent" keys="dealer_id" option={data} />
}

export default FilterDealerId