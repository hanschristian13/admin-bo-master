import Request from '@/service'

interface detailTransaction {
  date: string,
  turnover: number,
  win_player: number,
  profit: number,
  total_player: number,
  total_client: number
}

export interface resAgentTransaction{
  data: detailTransaction[]
}

export const getTransactionAgent = async (params: {
  start_date: string
  end_date: string
  parent_id: string
  dealer_id: string
}): Promise<resAgentTransaction | null> => {
  const url = 'analytics/superadmin/detail-transactions-super-agent'
  return Request.get(url, params)
}
