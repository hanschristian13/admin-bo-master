'use client'
import { getAgentList } from '@/service/report'
import React, { useEffect } from 'react'
import SelectForFilter from './select-for-filter'
import { DataSuperAgentType, SuperAgentType } from '@/types/super-agent'

const FilterDealerId = () => {
  const [dealerList, setDealerList] = React.useState<{ label: string; value: string }[]>([])

  const fetchDealerList = async () => {
    const data = (await getAgentList()) as DataSuperAgentType
    if (data?.data) {
      setDealerList(data.data.map((x: SuperAgentType) => ({ label: x._id, value: x._id })))
    }
  }
  useEffect(() => {
    fetchDealerList()
  }, [])

  return <SelectForFilter placeholder="Filter Agent" keys="dealer_id" option={dealerList} />
}

export default FilterDealerId
