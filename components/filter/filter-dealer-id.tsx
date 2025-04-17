'use client'
import React from 'react'
import SelectForFilter from './select-for-filter'
import { useDealerList } from '@/hooks/useDealerList'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

const FilterDealerId = ({
  isClient = false,
  value,
  onChange
}: {
  isClient?: boolean
  value?: string | undefined
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: any
}) => {
  const { data } = useDealerList()

  if (isClient)
    return (
      <Select
        value={data?.find(x => x?.value === value)?.value ?? undefined}
        onValueChange={onChange}
        aria-label="Results per page">
        <SelectTrigger className="w-full whitespace-nowrap capitalize">
          <SelectValue placeholder={'Select Agent'} />
        </SelectTrigger>
        <SelectContent>
          {data.map(item => (
            <SelectItem key={item.value} value={item.value.toString()} className="capitalize">
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    )

  return <SelectForFilter placeholder="Filter Agent" keys="dealer_id" option={data} />
}

export default FilterDealerId
