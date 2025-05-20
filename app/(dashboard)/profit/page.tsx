import React, { JSX } from 'react'
import type { Metadata } from 'next'
import PageProfit from '@/components/page/profit'
import { getProfitInvoiceReportProfit, getProfitReportAsAgent } from '@/service/report'
import { getSearchParams } from '@/constant'
import { PageProps } from '@/types/page'
import { timeFormat } from '@/lib/utils'
import { getParentID, getWebRole } from '@/app/action/libs'

export const metadata: Metadata = {
  title: 'Profit',
  description: 'profit'
}

const page = async ({ searchParams }: PageProps): Promise<JSX.Element> => {
  const webRole = await getWebRole()
  const parentId = await getParentID()
  const currentSearchParams = await searchParams

  const { page, limit } = getSearchParams(currentSearchParams)

  const startDate = currentSearchParams?.date?.toString() ?? timeFormat().startOf('months').format()
  const params = {
    start_date: startDate,
    end_date: timeFormat(startDate).endOf('months').format(),
    page,
    limit
  }
  const data =
    webRole === 'label'
      ? await getProfitInvoiceReportProfit(params)
      : await getProfitReportAsAgent(params, parentId!)

  return <PageProfit data={data} />
}

page.displayName = 'PageProfit'

export default page
