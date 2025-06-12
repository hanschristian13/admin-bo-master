import React, { JSX } from 'react'
import type { Metadata } from 'next'
import PageClientShared from '@/components/page/client-shared'
import { profitSharingSlotDetail, profitSharingSlotOverview } from '@/service/report'
import { getSearchParams } from '@/constant'
import { PageProps } from '@/types/page'

export const metadata: Metadata = {
  title: 'Client Shared',
  description: 'client shared'
}

const page = async ({ searchParams }: PageProps): Promise<JSX.Element> => {
  const currentSearchParams = await searchParams

  const parentID = currentSearchParams?.parent_id

  const { startDate, endDate, page, limit, q } = getSearchParams(currentSearchParams)
  const data = await profitSharingSlotOverview({ start_date: startDate, end_date: endDate, q })

  const detail = parentID
    ? await profitSharingSlotDetail(
        {
          start_date: startDate,
          end_date: endDate,
          group: 'all',
          page,
          limit,
          q
        },
        parentID?.toString()
      )
    : null

  return <PageClientShared superAgentList={data} detail={detail} />
}

page.displayName = 'PageClients'

export default page
