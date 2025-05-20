import { iQueryPayload } from '@/lib/definitions'
import Request from '.'
export const getPlayerList = (dealer_id: string, params: iQueryPayload) =>
  Request.get(`/games/superadmin/search-player/${dealer_id}`, { ...params })

export const getDetailPlayer = (dealer_id: string, params: iQueryPayload) =>
  Request.get(`games/superadmin/players/${dealer_id}`, { ...params })
export const getDetailPlayerSummary = (params: iQueryPayload) =>
  Request.get('/analytics/superadmin/summary-transactions-agent', { ...params })
