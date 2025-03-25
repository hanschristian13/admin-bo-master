import React from 'react'
import CardGames from './card-games'
import { timeFormat } from '@/lib/utils'
import { getOverviewDailyTransaction, getListGame } from '@/service/dashboard'

const TopGames = async () => {
  const today = timeFormat().format()
  const game = await getListGame()
  const dailyTransaction = await getOverviewDailyTransaction({
    start_date: today,
    end_date: today,
    parent_id: 'levelind'
  })

  const data = dailyTransaction?.data?.map(x => ({
    ...x,
    game_detail: game?.data?.find(y => y?.game_name === x?.game_name)
  }))

  return (
    <div className="space-y-4">
      <div>
        <h5 className="text-sm font-medium text-neutral-400 capitalize">top games</h5>
        <p className="text-xs font-medium text-neutral-300 capitalize">
          Here are the most popular game apps
        </p>
      </div>
      <div className="grid-container relative grid auto-rows-min space-x-5 space-y-2 md:grid-cols-3">
        {data?.map((item, index) => (
          <CardGames key={item?.game_name + index} data={item} />
        ))}
      </div>
    </div>
  )
}

export default TopGames
