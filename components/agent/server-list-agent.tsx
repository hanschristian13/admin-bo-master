import React from 'react'
import ListAgent from '@/components/agent/list-agent'
import { DataSuperAgentType } from '@/types/super-agent'
import GetDetailTransaction from './get-detail-transaction'

interface Props {
  data: DataSuperAgentType | null
  superAgentId: string
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const ServerListAgent: React.FC<Props> = async ({ ...props }) => {
  const searchParams = await props.searchParams
  const mode = searchParams?.mode as string || ''
  const detailId = searchParams?.detailId as string || ''
  const transactionAgent = await GetDetailTransaction(detailId, mode)
  return (
    <ListAgent
      data={props.data}
      superAgentId={props.superAgentId}
      transactionAgent={transactionAgent}
    />
  )
}

export default ServerListAgent
