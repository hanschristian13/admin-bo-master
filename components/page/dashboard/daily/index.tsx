import React from 'react'
import CardDashboardToday from '@/components/page/dashboard/card-dashboard-today'
import PlayerBar from '@/components/page/dashboard/player-bar'
import { Separator } from '@/components/ui/separator'
import TopGames from '@/components/page/dashboard/top-games'
import { getOverviewDailyUser } from '@/service/dashboard'
import { timeFormat } from '@/lib/utils'
import { iDailyUserDashboard } from '@/lib/definitions'

function calculatePercentageDifference(
  today: Partial<iDailyUserDashboard>, 
  yesterday: Partial<iDailyUserDashboard>
) {
  // Safe percentage calculation that handles zero values
  const calcPercent = (curr: number, prev: number) => {
    if (prev === 0) return curr > 0 ? 100 : 0
    return +((curr - prev) / Math.abs(prev) * 100).toFixed(2)
  }

  return {
    profit: calcPercent(today?.profit || 0, yesterday?.profit || 0),
    turnover: calcPercent(today?.turnover || 0, yesterday?.turnover || 0),
    win_player: calcPercent(today?.win_player || 0, yesterday?.win_player || 0)
  }
}

const DasboardDaily = async () => {
  const today = timeFormat().format()
  const { data = [] } = (await getOverviewDailyUser({
    start_date: timeFormat().subtract(1, 'days').format(),
    end_date: today
  })) as { data: iDailyUserDashboard[] }

  // Get current date and yesterday in format used for comparison - using lowercase yyyy for date-fns
  const currentDate = timeFormat().format('yyyy-MM-dd')
  const yesterdayDate = timeFormat().subtract(1, 'days').format('yyyy-MM-dd')

  // Create empty default data with proper types
  const emptyData: Partial<iDailyUserDashboard> = {
    turnover: 0,
    profit: 0,
    win_player: 0,
    new_register_player: 0,
    active_player: 0
  }

  // Find today and yesterday data, defaulting to typed empty objects if not found
  const todayData: Partial<iDailyUserDashboard> = 
    data.find(x => timeFormat(x?.date).format('yyyy-MM-dd') === currentDate) || emptyData
    
  const yesterdayData: Partial<iDailyUserDashboard> = 
    data.find(x => timeFormat(x?.date).format('yyyy-MM-dd') === yesterdayDate) || emptyData
  
  // Calculate percentage changes
  const percentage = calculatePercentageDifference(todayData, yesterdayData)

  const dataCard = [
    {
      title: 'turnover slot',
      amount: todayData.turnover || 0,
      Percent: percentage.turnover
    },
    {
      title: 'win player slot',
      amount: todayData.win_player || 0,
      Percent: percentage.win_player
    },
    {
      title: 'profit slot',
      amount: todayData.profit || 0,
      Percent: percentage.profit
    }
  ]

  return (
    <React.Fragment>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        {dataCard.map(item => (
          <CardDashboardToday
            key={item.title}
            title={item.title}
            amount={item.amount}
            progress={item.Percent}
          />
        ))}
      </div>
      <PlayerBar
        newRegisterPlayer={todayData.new_register_player || 0}
        activePlayer={todayData.active_player || 0}
        newlyRegisteredPlayerfromYesterday={yesterdayData.new_register_player || 0}
        newlyActivePlayerfromYesterday={yesterdayData.active_player || 0}
      />
      <Separator orientation="horizontal" />
      <TopGames />
    </React.Fragment>
  )
}

export default DasboardDaily