/* eslint-disable @typescript-eslint/no-explicit-any */
import { getListRoles } from '@/service/setting'
import { useState, useEffect } from 'react'

type FetchRolesState = {
  data: any[] | null
  error: string | null
  isLoading: boolean
}

const useRoles = (parentId: string): FetchRolesState => {
  const [data, setData] = useState<any[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = (await getListRoles(parentId)) as any
        setData(response?.data)
      } catch (err: any) {
        setError(err.message || 'Failed to fetch roles')
      } finally {
        setIsLoading(false)
      }
    }

    if (parentId) {
      fetchRoles()
    }
  }, [parentId])

  return { data, error, isLoading }
}

export default useRoles
