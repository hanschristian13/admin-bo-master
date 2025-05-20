import { useCallback, useRef, useState } from 'react'
import { useRouter, usePathname, useSearchParams, useParams } from 'next/navigation'
import { PaginationState } from '@tanstack/react-table'
type FormState<T> = {
  formData: T
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  resetForm: () => void
}

export function useForm<T extends Record<string, string>>(initialState: T): FormState<T> {
  const [formData, setFormData] = useState<T>(initialState)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  const resetForm = () => setFormData(initialState)

  return { formData, handleChange, resetForm }
}

export const useUpdateSearchParams = (key: string) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const value = searchParams.get(key)
  const updatedSearchParams = new URLSearchParams(searchParams.toString())

  const setSearchParam = (newValue: string) => {
    updatedSearchParams.set(key, newValue)
    router.replace(`${pathname}?${updatedSearchParams.toString()}`)
  }

  return { value, setSearchParam }
}

export const useGetUpdateParams = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const urlParams = useParams()
  const getValue = (key: string) => searchParams.get(key) ?? ''
  const getUrlParams = (key: string) => urlParams[key]?.toString() ?? ''

  const setSearchParams = (params: Record<string, string | number>) => {
    const updatedSearchParams = new URLSearchParams(searchParams.toString())

    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        updatedSearchParams.set(key, value?.toString())
      } else {
        updatedSearchParams.delete(key)
      }
    })

    router.replace(`${pathname}?${updatedSearchParams.toString()}`)
  }

  return { getValue, setSearchParams, getUrlParams }
}

export const useDebouncedCallback = <T extends (...args: unknown[]) => void>(
  callback: T,
  delay: number
) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const debouncedFunction = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args)
      }, delay)
    },
    [callback, delay]
  )

  return debouncedFunction
}

export const useHandlePagination = () => {
  const { getValue, setSearchParams } = useGetUpdateParams()
  const page = getValue('page')
  const limit = getValue('limit')
  const pagination = {
    pageSize: limit ? parseInt(limit) : 10,
    pageIndex: page ? parseInt(page) - 1 : 0
  }
  const { pageSize, pageIndex } = pagination

  const handleChange = (x: PaginationState) => {
    setSearchParams({ limit: x?.pageSize, page: x?.pageIndex + 1 })
  }

  return {
    limit: pageSize,
    onPaginationChange: handleChange,
    pagination,
    skip: pageSize * pageIndex
  }
}
export function useHandlePaginationClient({ initPageSize = 10 }: { initPageSize?: number }) {
  const [pagination, setPagination] = useState({
    pageSize: initPageSize,
    pageIndex: 0
  })
  const { pageSize, pageIndex } = pagination

  return {
    limit: pageSize,
    onPaginationChange: setPagination,
    pagination,
    skip: pageSize * pageIndex
  }
}
