import React from 'react'
import CardDashboardToday from '@/components/page/dashboard/card-dashboard-today'
import PlayerBar from '@/components/page/dashboard/player-bar'
import { Separator } from '@/components/ui/separator'
import TopGames from '@/components/page/dashboard/top-games'
import { getOverviewDailyUser } from '@/service/dashboard'
import { timeFormat } from '@/lib/utils'
import { iDailyUserDashboard } from '@/lib/definitions'

function calculatePercentageDifference(
  today?: iDailyUserDashboard,
  yesterday?: iDailyUserDashboard
) {
  if (!today || !yesterday) return {}
  return {
    profit:
      yesterday.profit !== 0
        ? +(((today.profit - yesterday.profit) / yesterday.profit) * 100).toFixed(2)
        : 0,
    turnover:
      yesterday.turnover !== 0
        ? +(((today.turnover - yesterday.turnover) / yesterday.turnover) * 100).toFixed(2)
        : 0,
    win_player:
      yesterday.win_player !== 0
        ? +(((today.win_player - yesterday.win_player) / yesterday.win_player) * 100).toFixed(2)
        : 0
  }
}
const DasboardDaily = async () => {
  const today = timeFormat().format()
  const { data } = (await getOverviewDailyUser({
    start_date: timeFormat().subtract(1, 'days').format(),
    end_date: today
  })) as { data: iDailyUserDashboard[] }

  const todayData = data?.find(x => timeFormat(x?.date)?.isSame(new Date()))
  const yesterdayData = data?.find(x => timeFormat(x?.date)?.isBefore(new Date()))
  const percentage = calculatePercentageDifference(todayData, yesterdayData)

  const dataCard = [
    {
      title: 'turnover slot',
      amount: todayData?.turnover,
      Percent: percentage?.turnover ?? 0
    },
    {
      title: 'profit slot',
      amount: todayData?.profit,
      Percent: percentage?.profit ?? 0
    },
    {
      title: 'win slot',
      amount: todayData?.win_player,
      Percent: percentage?.win_player ?? 0
    }
  ]

  return (
    <React.Fragment>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        {dataCard.map(item => (
          <CardDashboardToday
            key={item.title}
            title={item.title}
            amount={item.amount!}
            progress={item.Percent!}
          />
        ))}
      </div>
      <PlayerBar
        newRegisterPlayer={todayData?.new_register_player ?? 0}
        activePlayer={todayData?.active_player ?? 0}
        newlyRegisteredPlayerfromYesterday={yesterdayData?.new_register_player ?? 0}
        newlyActivePlayerfromYesterday={yesterdayData?.active_player ?? 0}
      />
      <Separator orientation="horizontal" />
      <TopGames />
    </React.Fragment>
  )
}

export default DasboardDaily
