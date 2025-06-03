/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'

type FetchState<T> = {
  data: T | null
  loading: boolean
  error: string | null
}

type FetchFunction<T> = () => Promise<T>

export function useFetch<T = any>(fetchFunction: FetchFunction<T>, deps: any[] = []) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null
  })
  useEffect(() => {
    let isMounted = true
    const fetchData = async () => {
      setState({ data: null, loading: true, error: null })
      try {
        const result = await fetchFunction()
        if (isMounted) {
          setState({ data: result, loading: false, error: null })
        }
      } catch (err: any) {
        if (isMounted) {
          setState({ data: null, loading: false, error: err.message || 'Something went wrong' })
        }
      }
    }

    fetchData()
    return () => {
      isMounted = false
    }
  }, [fetchFunction, JSON.stringify(deps)]) // eslint-disable-line react-hooks/exhaustive-deps

  return state
}
