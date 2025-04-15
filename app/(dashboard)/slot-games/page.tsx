import React from 'react'
import type { Metadata } from 'next'
import PageSlotGames from '@/components/page/slot-games'
import { calculatePercentageChange, timeFormat } from '@/lib/utils'
import { getDailyGameTransactions, getSummaryGameTransaction } from '@/service/game-management'
import { getListGame, iResponseGetOverviewDailyTransaction } from '@/service/dashboard'
import { iDailyUserDashboard } from '@/lib/definitions'
export const metadata: Metadata = {
  title: 'Slot Games',
  description: 'Slot Games'
}

const page = async () => {
  const start_date = timeFormat().subtract(1, 'days').format()
  const end_date = timeFormat().format()
  const response = await getSummaryGameTransaction({ start_date, end_date })
  const listGame = await getListGame()

  const dailyTransaction = (await getDailyGameTransactions({
    start_date,
    end_date
  })) as { data: iResponseGetOverviewDailyTransaction[] }

  const sum = response?.data as iDailyUserDashboard[]

  const mergeDataDailyTransactionAndGameList = dailyTransaction?.data?.map(x => ({
    ...x,
    game_detail: listGame?.data?.find(y => y?.game_name === x?.game_name)
  }))

  const todayData = sum?.find(x => timeFormat(x?.date)?.isSame(new Date())) as iDailyUserDashboard
  const yesterdayData = sum?.find(x =>
    timeFormat(x?.date)?.isBefore(new Date())
  ) as iDailyUserDashboard

  console.log("dashboard todayData.turnover "+todayData.turnover)
  console.log("dashboard yesterdayData.turnover "+yesterdayData.turnover)
  console.log("dashboard todayData.win_player "+todayData.win_player)
  console.log("dashboard yesterdayData.win_player "+yesterdayData.win_player)
  console.log("dashboard todayData.profit "+todayData.profit)
  console.log("dashboard yesterdayData.profit "+yesterdayData.profit)

  const dataProfit = [
    {
      title: 'turnover slot',
      amount: todayData?.turnover ?? 0,
      percen: calculatePercentageChange(todayData?.turnover ?? 0, yesterdayData?.turnover ?? 0)
    },
    {
      title: 'win player slot',
      amount: todayData?.win_player ?? 0,
      percen: calculatePercentageChange(todayData?.win_player ?? 0, yesterdayData?.win_player ?? 0)
    },
    {
      title: 'profit slot',
      amount: todayData?.profit ?? 0,
      percen: calculatePercentageChange(todayData?.profit ?? 0, yesterdayData?.profit ?? 0)
    }
  ]

  return <PageSlotGames summary={dataProfit} gameSummary={mergeDataDailyTransactionAndGameList} />
}

page.displayName = 'PageSlot'

export default page
