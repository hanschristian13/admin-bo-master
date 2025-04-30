import React from 'react'
import { Card } from '@/components/ui/card'
import { CalendarDays } from 'lucide-react'
import ProgressStatus from '@/components/progress-status'
import { iDailyUserDashboard } from '@/lib/definitions'
import { timeFormat } from '@/lib/utils'
import { getOverviewDailyUser } from '@/service/dashboard'
import { formatNumber } from '@/lib/format-number'

const DashboardWeekly = async () => {
  const { data } = (await getOverviewDailyUser({
    start_date: timeFormat().subtract(8, 'days').format(),
    end_date: timeFormat().format()
  })) as { data: iDailyUserDashboard[] }

  console.log(data, 'data')
  function getPercentageChange(curr: number, prev: number): number {
    // Switch the parameters - we want to calculate (current - previous) / previous
    if (prev === 0) return 0
    const change = ((curr - prev) / Math.abs(prev)) * 100
    return change
  }

  // Sort the data by date in ascending order (oldest first)
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  )

  // Calculate percentage differences based on chronological order
  const finalData = sortedData.map((current, index, arr) => {
    if (index === 0) return { ...current, percentage_difference: null } // First element has no previous

    const previous = arr[index - 1]

    return {
      ...current,
      percentage_difference: {
        new_register_player: getPercentageChange(
          current.new_register_player,
          previous.new_register_player
        ),
        active_player: getPercentageChange(current.active_player, previous.active_player),
        turnover: getPercentageChange(current.turnover, previous.turnover),
        win_player: getPercentageChange(current.win_player, previous.win_player),
        profit: getPercentageChange(current.profit, previous.profit)
      }
    }
  })

  // Reverse the array to display most recent first, but keep the correct percentage calculations
  const displayData = [...finalData].reverse()
  displayData.pop()

  return (
    <div className="space-y-5">
      {displayData.map((item, index) => (
        <div key={item.date + index} className="flex items-center">
          <Card className="relative flex items-center px-[10px] h-[28px] space-x-[6px] text-neutral-400 whitespace-nowrap rounded-md">
            <CalendarDays className="size-4" />
            <span>{item.date}</span>
          </Card>
          <div className="w-6 h-[1px] bg-yellow-500"></div>
          <Card className="w-full grid auto-rows-min md:grid-cols-4 divide-x-[2px] divide-neutral-200 rounded-xl">
            <div className="flex flex-col px-5 py-4">
              <h5 className="text-sm font-medium text-neutral-300 capitalize">Turnover Slot</h5>
              <div className="flex space-x-2">
                <span>Rp {formatNumber(item?.turnover)}</span>
                <ProgressStatus progress={item?.percentage_difference?.turnover ?? 0} />
              </div>
            </div>
            <div className="flex flex-col px-5 py-4">
              <h5 className="text-sm font-medium text-neutral-300 capitalize">Profit Slot</h5>
              <div className="flex space-x-2">
                <span>Rp {formatNumber(item?.profit)}</span>
                <ProgressStatus progress={item?.percentage_difference?.profit ?? 0} />
              </div>
            </div>
            <div className="flex flex-col px-5 py-4">
              <h5 className="text-sm font-medium text-neutral-300 capitalize">
                New Register Player
              </h5>
              <div className="flex space-x-2">
                <span>{formatNumber(item?.new_register_player)} Player</span>
                <ProgressStatus progress={item?.percentage_difference?.new_register_player ?? 0} />
              </div>
            </div>
            <div className="flex flex-col px-5 py-4">
              <h5 className="text-sm font-medium text-neutral-300 capitalize">Active Player</h5>
              <div className="flex space-x-2">
                <span>{formatNumber(item?.active_player)} Player</span>
                <ProgressStatus progress={item?.percentage_difference?.active_player ?? 0} />
              </div>
            </div>
          </Card>
        </div>
      ))}
    </div>
  )
}

export default DashboardWeekly
