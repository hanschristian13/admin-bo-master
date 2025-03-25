import React from 'react'
import SelectForFilter from './select-for-filter'
import { statusBet } from '@/constant/general'
const FilterStatusBet = () => {
  return <SelectForFilter placeholder="Filter status" keys="bet_state" option={statusBet} />
}

export default FilterStatusBet
