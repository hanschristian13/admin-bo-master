/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React from 'react'
import SelectForFilter from './select-for-filter'
import { useDealerList } from '@/hooks/useDealerList'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

const FilterDealerId = ({
  isClient = false,
  value,
  onChange,
  withAll = true
}: {
  isClient?: boolean
  value?: string | undefined
  withAll?: boolean
  onChange?: any
}) => {
  const { data } = useDealerList()

  const finalList = withAll
    ? ([{ label: 'All Agent', value: 'all' }, ...data] as any[])
    : ((data ?? []) as any[])
  if (isClient)
    return (
      <Select
        value={finalList?.find(x => x?.value === value)?.value ?? undefined}
        onValueChange={onChange}
        aria-label="Results per page">
        <SelectTrigger className="w-full whitespace-nowrap capitalize">
          <SelectValue placeholder={'Select Agent'} />
        </SelectTrigger>
        <SelectContent>
          {finalList.map((item, index) => (
            <SelectItem key={index} value={item?.value.toString()} className="capitalize">
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    )

  return (
    <SelectForFilter
      defaultValue={withAll ? 'all' : undefined}
      placeholder={withAll ? '' : 'Filter Agent'}
      keys="dealer_id"
      option={finalList}
    />
  )
}

export default FilterDealerId
