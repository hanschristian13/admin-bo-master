/* eslint-disable @typescript-eslint/no-explicit-any */
import { getWhitelistIp } from '@/service/setting'
import { useState, useCallback } from 'react'

export const useWhitelist = () => {
  const [list, setList] = useState<{ label: string; value: string }[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<null | string>(null)

  const fetchWhitelist = useCallback(async (parent_id: string) => {
    try {
      setLoading(true)
      setError(null)

      const data = (await getWhitelistIp(parent_id)) as any

      setList(data?.data || [])
    } catch (err: any) {
      setError(err?.message || 'Failed to fetch IP list')
    } finally {
      setLoading(false)
    }
  }, [])

  return { list, loading, error, fetchWhitelist }
}
