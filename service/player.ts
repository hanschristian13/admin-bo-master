import { iQueryPayload } from '@/lib/definitions'
import Request from '.'
export const getPlayerList = (dealer_id: string, params: iQueryPayload) =>
  Request.get(`/games/superadmin/search-player/${dealer_id}`, { ...params })
