import { useState } from 'react'

type Callbacks<TResult> = {
  onSuccess?: (data: TResult) => void
  onError?: (error: string) => void
}

export function usePost<TParams, TResult>(postFn: (params: TParams) => Promise<TResult>) {
  const [data, setData] = useState<TResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const post = async (params: TParams, callbacks?: Callbacks<TResult>) => {
    setIsLoading(true)
    setError(null)

    try {
      const res = await postFn(params)
      setData(res)
      callbacks?.onSuccess?.(res)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const message = err.response?.data?.message || err.message || 'Something went wrong'
      setError(message)
      callbacks?.onError?.(message)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    data,
    error,
    isLoading,
    post
  }
}
