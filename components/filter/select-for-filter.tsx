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
  defaultValue,
  required = false
}: {
  keys: string
  placeholder: string
  option: { value: string; label: string | number }[]
  defaultValue?: string
  required?: boolean
}) => {
  const { getValue, setSearchParams } = useGetUpdateParams()

  const value = getValue(keys) || defaultValue
  
  const handleValueChange = (newValue: string) => {
    // If "all" is selected, set the parameter to an empty string
    // which effectively removes the filter when processed by your backend
    if (newValue === "all") {
      // Pass an empty string to effectively clear the filter
      setSearchParams({ [keys]: "", page: 1 })
    } else {
      // Otherwise, apply the filter
      setSearchParams({ [keys]: newValue, page: 1 })
    }
  }
  
  return (
    <Select
      value={value}
      onValueChange={handleValueChange}
      required={required}
      aria-label={placeholder}>
      <SelectTrigger className="w-fit whitespace-nowrap capitalize">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {option.map(item => (
          <SelectItem key={item.value} value={item.value} className="capitalize">
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default SelectForFilter