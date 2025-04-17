/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'
import Request from '@/service'

export async function changeGameSatatus(data: any) {
  if (data?.game_id) {
    const res = await Request.patch(`games/superadmin/game/${data?.game_id}`, {
      game_status: !data?.game_status
    })

    return res
  }
}
