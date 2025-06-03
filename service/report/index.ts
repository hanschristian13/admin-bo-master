import { iQueryPayload } from '@/lib/definitions'
import Request from '..'

export interface iResponsePlayerActiveOverveiw {
  active_player?: number
  game_type?: string
  profit: number
  turnover: number
  win_player: number
  date: string
}
export const getPlayerActive = (params: {
  start_date: string
  end_date: string
  group: string
}): Promise<{ data: iResponsePlayerActiveOverveiw } | null> =>
  Request.get('analytics/superadmin/overview-users', { ...params })
export const getOverviewUserByParent = (params: iQueryPayload) =>
  Request.get('analytics/superadmin/overview-users-by-parent', { ...params })
export const getOverviewSuperAgent = (params: iQueryPayload) =>
  Request.get('/analytics/superadmin/overview-super-agent', { ...params })
export const getSummaryTransactionSuperAgent = (params: iQueryPayload) =>
  Request.get('/analytics/superadmin/summary-transactions-super-agent', { ...params })
export const getSummaryDetailTransactionSuperAgent = (params: iQueryPayload) =>
  Request.get('/analytics/superadmin/detail-transactions-super-agent', { ...params })
export const getDailyUserTransactions = (params: iQueryPayload) =>
  Request.get('/analytics/superadmin/daily-user-transactions', { ...params })
export const getProfitInvoiceReportProfit = (params: iQueryPayload) =>
  Request.get('/dealers/superadmin/invoice/report/profit', { ...params })
export const profitSharingSlotOverview = (params: iQueryPayload) =>
  Request.get(`analytics/superadmin/profit-sharing-slot-overview`, { ...params })
export const profitSharingSlotDetail = (params: iQueryPayload, parent: string) =>
  Request.get(`analytics/superadmin/profit-sharing-slot/${parent}`, { ...params })
export const getAgentList = (params?: iQueryPayload) =>
  Request.get('/dealers/superadmin/agents', { ...params })
export const getOverviewTransactionByParent = (params: iQueryPayload) =>
  Request.get('analytics/superadmin/overview-transactions-by-parent', { ...params })
export const getProfitReportAsAgent = (params: iQueryPayload, parent: string) =>
  Request.get(`dealers/admin/invoice/report/profit/${parent}`, { ...params })
