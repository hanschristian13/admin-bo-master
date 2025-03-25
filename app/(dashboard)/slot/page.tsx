import React, { JSX } from 'react'
import PageSlot from '@/components/page/slot'
import type { Metadata } from 'next'
import { getSummaryDetailTransactionSuperAgent, profitSharingSlotOverview } from '@/service/report'
import { PageProps } from '@/types/page'
import { getSearchParams } from '@/constant'

export const metadata: Metadata = {
  title: 'Slot',
  description: 'slot'
}

const page = async ({ searchParams }: PageProps): Promise<JSX.Element> => {
  const currentSearchParams = await searchParams

  const { startDate, endDate, page, limit } = getSearchParams(currentSearchParams)
  const superAgent = await profitSharingSlotOverview({
    start_date: startDate,
    end_date: endDate
  })

  const detailData = currentSearchParams?.parent_id
    ? await getSummaryDetailTransactionSuperAgent({
        start_date: startDate,
        end_date: endDate,
        parent_id: currentSearchParams?.parent_id.toString(),
        page,
        limit
      })
    : null

  return <PageSlot superAgent={superAgent} detail={detailData} />
}

page.displayName = 'PageSlot'

export default page
