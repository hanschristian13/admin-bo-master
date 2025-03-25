'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useGetUpdateParams, useUpdateSearchParams } from '@/hooks'
import { debounce } from '@/lib/utils'

import { LoaderCircle, Search, X } from 'lucide-react'
import { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react'

interface SearchInputType {
  label?: string
  placeholder?: string
  param: string
}

export default function SearchInput({ label, placeholder, param = 'q' }: SearchInputType) {
  const [isLoading] = useState<boolean>(false)
  const { value } = useUpdateSearchParams(param)
  const { setSearchParams } = useGetUpdateParams()
  const inputRef = useRef<HTMLInputElement>(null)
  const debouncedHandleChange = useMemo(() => {
    return debounce((value: string) => {
      setSearchParams({ [param]: value, page: 1 })
    }, 800)
  }, [setSearchParams, param])
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = value ?? ''
    }
  }, [value])

  const handleChanges = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      debouncedHandleChange(e?.target?.value)
    },
    [debouncedHandleChange]
  )

  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      <div className="relative">
        <Input
          ref={inputRef}
          onChange={handleChanges}
          className="peer pe-2 ps-9"
          placeholder={placeholder ?? 'Search...'}
          type="text"
        />
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
          {isLoading ? (
            <LoaderCircle
              className="animate-spin"
              size={16}
              strokeWidth={2}
              role="status"
              aria-label="Loading..."
            />
          ) : (
            <Search size={16} strokeWidth={2} aria-hidden="true" />
          )}
        </div>
        {value && (
          <button
            className="text-muted-foreground/80 hover:text-red-950 focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Submit search"
            type="button"
            onClick={() => {
              setSearchParams({ [param]: '' })
            }}>
            <X size={16} aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  )
}
