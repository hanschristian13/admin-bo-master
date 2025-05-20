import { getAgentList } from '@/service/report'
import { DataSuperAgentType, SuperAgentType } from '@/types/super-agent'
import { useEffect, useState } from 'react'

export const useDealerList = () => {
  const [dealerList, setDealerList] = useState<{ label: string; value: string }[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<null | string>(null)

  useEffect(() => {
    const fetchDealerList = async () => {
      try {
        setLoading(true)
        const data = (await getAgentList()) as DataSuperAgentType
        if (data?.data) {
          const formatted = data.data.map((x: SuperAgentType) => ({
            label: x._id,
            value: x._id
          }))
          setDealerList(formatted)
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err?.message || 'Failed to fetch dealer list')
      } finally {
        setLoading(false)
      }
    }

    fetchDealerList()
  }, [])

  return { data: dealerList, loading, error }
}
