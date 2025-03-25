import { z } from 'zod'

export const LoginFormSchema = z.object({
  username: z.string().min(2, { message: 'username must be at least 2 characters long.' }).trim(),
  password: z.string().min(2, { message: 'username must be at least 2 characters long.' }).trim()
})
export type AuthState =
  | {
      errors?: {
        username?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined
export interface iQueryPayload {
  start_date?: string
  end_date?: string
  limit?: string
  page?: string
  parent_id?: string
  dealer_id?: string
  q?: string
  game_type?: string
  group?: string
}

export interface iDailyUserDashboard {
  date: string
  game_type: string
  profit: number
  turnover: number
  win_player: number
  new_register_player: number
  active_player: number
}
