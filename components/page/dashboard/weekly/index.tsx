import React from 'react'

import { Card } from '@/components/ui/card'
import { CalendarDays } from 'lucide-react'
import ProgressStatus from '@/components/progress-status'
import { iDailyUserDashboard } from '@/lib/definitions'
import { timeFormat } from '@/lib/utils'
import { getOverviewDailyUser } from '@/service/dashboard'
const DashboardWeekly = async () => {
  const { data } = (await getOverviewDailyUser({
    start_date: timeFormat().subtract(7, 'days').format(),
    end_date: timeFormat().format()
  })) as { data: iDailyUserDashboard[] }

  function getPercentageChange(prev: number, curr: number): number {
    if (prev === 0) return 0
    const change = ((curr - prev) / Math.abs(prev)) * 100
    return change
  }

  const finalData = data?.map((current, index, arr) => {
    if (index === 0) return { ...current, percentage_difference: null } // Tidak menghitung elemen pertama

    const previous = arr[index - 1]

    return {
      ...current,
      percentage_difference: {
        new_register_player: getPercentageChange(
          previous.new_register_player,
          current.new_register_player
        ),
        active_player: getPercentageChange(previous.active_player, current.active_player),
        turnover: getPercentageChange(previous.turnover, current.turnover),
        win_player: getPercentageChange(previous.win_player, current.win_player),
        profit: getPercentageChange(previous.profit, current.profit)
      }
    }
  })
  finalData?.pop()
  return (
    <div className="space-y-5">
      {finalData?.map((item, index) => (
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
                <span>Rp{item?.turnover}</span>
                <ProgressStatus progress={item?.percentage_difference?.turnover ?? 0} />
              </div>
            </div>
            <div className="flex flex-col px-5 py-4">
              <h5 className="text-sm font-medium text-neutral-300 capitalize">Profit Slot</h5>
              <div className="flex space-x-2">
                <span>Rp{item?.profit}</span>
                <ProgressStatus progress={item?.percentage_difference?.profit ?? 0} />
              </div>
            </div>
            <div className="flex flex-col px-5 py-4">
              <h5 className="text-sm font-medium text-neutral-300 capitalize">
                New Register Player
              </h5>
              <div className="flex space-x-2">
                <span>{item?.new_register_player} Player</span>
                <ProgressStatus progress={item?.percentage_difference?.new_register_player ?? 0} />
              </div>
            </div>
            <div className="flex flex-col px-5 py-4">
              <h5 className="text-sm font-medium text-neutral-300 capitalize">Active Player</h5>
              <div className="flex space-x-2">
                <span>{item?.active_player} Player</span>
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
