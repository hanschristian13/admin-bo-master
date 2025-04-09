import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useGetUpdateParams } from '@/hooks'

const SelectForFilter = ({
  keys,
  placeholder,
  option,
  defaultValue
}: {
  keys: string
  placeholder: string
  option: { value: string; label: string | number }[]
  defaultValue?: string
}) => {
  const { getValue, setSearchParams } = useGetUpdateParams()

  const value = getValue(keys) || defaultValue
  
  return (
    <Select
      value={option?.find(x => x?.value === value)?.value ?? undefined}
      onValueChange={x => setSearchParams({ [keys]: x, page: 1 })}
      aria-label="Results per page">
      <SelectTrigger className="w-fit whitespace-nowrap capitalize">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {option.map(item => (
          <SelectItem key={item.value} value={item.value.toString()} className="capitalize">
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default SelectForFilter