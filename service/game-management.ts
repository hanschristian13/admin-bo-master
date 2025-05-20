import { iQueryPayload } from '@/lib/definitions'
import Request from '.'

export const getSummaryGameTransaction = (params: iQueryPayload) =>
  Request.get('analytics/superadmin/summary-transactions', { ...params })
export const getDailyGameTransactions = (params: iQueryPayload) =>
  Request.get('analytics/superadmin/daily-game-transactions', { ...params })
