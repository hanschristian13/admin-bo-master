import React from 'react'
import PageClient from '@/components/page/client/page'
import type { Metadata } from 'next'
import { getOverviewUserByParent } from '@/service/report'
import { defaultStartAndEndDateReport } from '@/constant/date'
import { PageProps } from '@/types/page'

export const metadata: Metadata = {
  title: 'Clients',
  description: 'report clients'
}

const page = async ({ searchParams }: PageProps) => {
  const currentSearchParams = await searchParams
  const date = currentSearchParams?.date?.toString().split('|')
  const startDate = date?.[0] ?? defaultStartAndEndDateReport?.startDate
  const endDate = date?.[1] ?? defaultStartAndEndDateReport?.endDate
  const limit = currentSearchParams?.limit as string
  const page = currentSearchParams?.page as string
  const q = currentSearchParams?.q as string
  const data = await getOverviewUserByParent({
    start_date: startDate,
    end_date: endDate,
    limit,
    page,
    q
  })

  return <PageClient data={data} />
}

page.displayName = 'PageClients'

export default page
