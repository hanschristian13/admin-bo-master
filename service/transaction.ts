import { iQueryPayload } from '@/lib/definitions'
import Request from '.'

interface iPayloadGetBetStateTransaction extends iQueryPayload {
  bet_state: string
  username?: string
}
export const getBetStateTransactions = (params: iPayloadGetBetStateTransaction) =>
  Request.get('/games/superadmin/bet-state-transactions', { ...params })
