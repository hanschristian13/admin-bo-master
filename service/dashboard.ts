import { iQueryPayload } from '@/lib/definitions'
import Request from '.'

interface iQueryDashboard extends iQueryPayload {
  period?: string
}
interface iQueryOverviewDailyTransaction extends iQueryDashboard {
  parent_id: string
}

export interface iResponseGetTopGame {
  game_id: string
  game_name: string
  game_status: boolean
  game_type: string
  game_url: string
}

export interface iResponseGetOverviewDailyTransaction {
  date: string
  game_name: string
  game_type: string
  total_player: number
  turnover: number
  win_player: number
}
export const getOverviewDailyUser = (params: iQueryDashboard) =>
  Request.get('/analytics/superadmin/overview-daily-users', { ...params })
export const getListGame = (): Promise<{ data: iResponseGetTopGame[] } | null> =>
  Request.get('/games/superadmin/game-list-setting')
export const getOverviewDailyTransaction = (
  params: iQueryOverviewDailyTransaction
): Promise<{ data: iResponseGetOverviewDailyTransaction[] } | null> =>
  Request.get('/analytics/superadmin/overview-daily-transactions', { ...params })
