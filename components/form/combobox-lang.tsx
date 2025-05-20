"use client"

import * as React from "react"
import { Check } from "lucide-react"
import { IconArrowDown } from "@/components/icon"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import US from 'country-flag-icons/react/3x2/US'
import ID from 'country-flag-icons/react/3x2/ID'
import TH from 'country-flag-icons/react/3x2/TH'
import VN from 'country-flag-icons/react/3x2/VN'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const frameworks = [
  {
    value: "us",
    label: "US",
    icon: <US title="United State" />
  },
  {
    value: "id",
    label: "ID",
    icon: <ID title="Indonesia" />
  },
  {
    value: "th",
    label: "TH",
    icon: <TH title="Thailand" />
  },
  {
    value: "vn",
    label: "VN",
    icon: <VN title="Vietnam" />
  }
]

export function ComboboxLang() {
  const [open, setOpen] = React.useState(false)
  const [lang, setLang] = React.useState({
    name: "id",
    icon: <ID title="Indonesia" />
  })
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-fit h-6 justify-between"
        >
          {lang
            ? lang.icon
            : "Select Lang..."}
          <IconArrowDown className="text-base" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="center">
        <Command>
          <CommandInput placeholder="Search language..." className="h-9" />
          <CommandList>
            <CommandEmpty>No Language found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setLang({
                      name: currentValue === lang.name ? "" : currentValue,
                      icon: framework.icon
                    })
                    setOpen(false)
                  }}
                >
                  {/* <Flag 
                    code={framework.value.toUpperCase()}
                    className="rounded size-4"
                    fallback={ <span>Unknown</span> }/> */}
                  {framework.icon}
                  {framework.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      lang.name === framework.value ? "opacity-100" : "opacity-0"
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
