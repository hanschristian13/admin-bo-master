"use client"

import * as React from "react"
import { Check } from "lucide-react"
import { IconArrowDown } from "@/components/icon"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import US from 'country-flag-icons/react/3x2/US'
import ID from 'country-flag-icons/react/3x2/ID'
// import TH from 'country-flag-icons/react/3x2/TH'
// import VN from 'country-flag-icons/react/3x2/VN'
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
import { useLocale } from "next-intl"
import { usePathname, useRouter } from '@/i18n/navigation'
import { useSearchParams } from 'next/navigation'

const langs = [
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
  // {
  //   value: "th",
  //   label: "TH",
  //   icon: <TH title="Thailand" />
  // },
  // {
  //   value: "vn",
  //   label: "VN",
  //   icon: <VN title="Vietnam" />
  // }
]

export function ComboboxLang() {
  const pathname = usePathname()
  const params = useSearchParams()
  const [open, setOpen] = React.useState(false)
  const [lang, setLang] = React.useState({
    name: "id",
    icon: <ID title="Indonesia" />
  })

  // i18n implementation
  // 1. Import next-intl hooks

  const locale = useLocale()
  const router = useRouter()

  // 4. Set initial lang state based on current locale
  React.useEffect(() => {
    const found = langs.find(l => l.value === locale) || langs[0]
    setLang({ name: found.value, icon: found.icon })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale])

  // 5. Handle language change
  const handleLangChange = (currentValue: string) => {
    console.log(params)
    const selected = langs.find(l => l.value === currentValue)
    if (selected) {
      setLang({ name: selected.value, icon: selected.icon })

      router.replace({ pathname: pathname + '?' + params?.toString() }, { locale: selected.value })
    }
    setOpen(false)
  }

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
              {langs.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={handleLangChange}
                >
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
