/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import CardDashboardToday from '@/components/page/dashboard/card-dashboard-today'
import CardGameSlot from '@/components/page/slot-games/card-game-slot'
// import PaginationCustomize from '@/components/pagination'

interface Summary {
  title: string
  amount: number
  percen: number
}

const Page = ({ summary, gameSummary }: { summary: Summary[]; gameSummary: any }) => {
  console.log(gameSummary)
  return (
    <div className="space-y-6">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        {summary.map(item => (
          <CardDashboardToday
            key={item.title}
            title={item.title}
            amount={item.amount}
            progress={item.percen}
          />
        ))}
      </div>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        {gameSummary.map((item: any, index: number) => (
          <CardGameSlot number={index + 1} key={item.game_name} data={item} />
        ))}
      </div>
      {/* <PaginationCustomize totalPages={2} paginationItemsToDisplay={12} /> */}
    </div>
  )
}

export default Page
