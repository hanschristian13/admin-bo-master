import React from 'react'
import { DataSuperAgentType } from '@/types/super-agent'
import ClientListSuperAgent from '@/components/super-agent/client-list-super-agent'

const ListSuperAgent: React.FC<DataSuperAgentType> = async ({ data, total_page, total_items }) => {
  return <ClientListSuperAgent data={data} total_page={total_page} total_items={total_items} />
}

export default ListSuperAgent
