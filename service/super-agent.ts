import Request from '@/service'
import { DataSuperAgentType, ResDetailSuperAgent } from '@/types/super-agent'

export const getSuperAgent = async (params: {
  type: string
  q?: string
  limit?: number
  page?: number
}): Promise<DataSuperAgentType | null> => {
  const url = 'dealers/superadmin/agents'
  return Request.get(url, params)
}

export const getDetailSuperAgent = async (params: {
  id: string
}): Promise<ResDetailSuperAgent | null> => {
  const url = `dealers/superadmin/agents/${params?.id}`
  return Request.get(url, params)
}

export const getListAgentByParentId = async (params : {
  type: string,
  parent_id: string,
  q?: string
}): Promise<DataSuperAgentType | null> => {
  const url = `dealers/superadmin/agents`
  return Request.get(url, params)
}
