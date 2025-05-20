import React from 'react'
import ChartNewPlayerRegister from '@/components/page/dashboard/monthly/chart-new-player-register'
import ChartActivePlayer from '@/components/page/dashboard/monthly/chart-active-player'
import ChartTurnoverAndProfit from '@/components/page/dashboard/monthly/chart-turnover-and-profit'

import { getOverviewDailyUser } from '@/service/dashboard'
import { timeFormat } from '@/lib/utils'
import { iDailyUserDashboard } from '@/lib/definitions'

const DashboardMonthly = async () => {
  const { data } = (await getOverviewDailyUser({
    start_date: timeFormat().subtract(6, 'months').startOf('months').format(),
    end_date: timeFormat().format(),
    period: 'monthly'
  })) as { data: iDailyUserDashboard[] }

  const finalData = data?.map(x => ({ month: timeFormat(x?.date).format('MMMM'), ...x }))

  return (
    <div className="grid grid-cols-2 gap-5">
      <div className="col-span-2">
        <ChartTurnoverAndProfit data={finalData} />
      </div>
      <div>
        <ChartNewPlayerRegister data={finalData} />
      </div>
      <div>
        <ChartActivePlayer data={finalData} />
      </div>
    </div>
  )
}

export default DashboardMonthly
