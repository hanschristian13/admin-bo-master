'use client'

import * as React from 'react'
import { Check } from 'lucide-react'
import { IconArrowDown } from '@/components/icon'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useRouter } from 'next/navigation'

const frameworks = [
  {
    value: 'logout',
    label: 'logout'
  }
]

export function ComboboxUserMenu() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState('')

  const router = useRouter()

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="link"
          // role="combobox"
          aria-expanded={open}
          className="w-fit h-6 justify-between hover:no-underline cursor-pointer">
          <Avatar>
            <AvatarFallback className="bg-orange-100 text-orange-950 text-sm">CY</AvatarFallback>
          </Avatar>
          {'USER'}
          <IconArrowDown className="text-base" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-28 p-0" align="end">
        <Command>
          <CommandList>
            <CommandEmpty>No Language found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map(framework => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={currentValue => {
                    router.push(`/${currentValue}`)
                    setValue(currentValue === value ? '' : currentValue)
                    setOpen(false)
                  }}
                  className="capitalize">
                  {framework.label}
                  <Check
                    className={cn(
                      'ml-auto',
                      value === framework.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
