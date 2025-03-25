import React, { JSX } from 'react'
import PagePlayerActive from '@/components/page/player-active'
import type { Metadata } from 'next'
import { getOverviewUserByParent, getPlayerActive } from '@/service/report'
import { defaultStartAndEndDateReport } from '@/constant/date'
export const metadata: Metadata = {
  title: 'Player Active',
  description: 'report player active'
}
interface PageProps {
  params: Promise<Record<string, string | string[] | undefined>>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

const page = async ({ searchParams }: PageProps): Promise<JSX.Element> => {
  const currentSearchParams = await searchParams

  const date = currentSearchParams?.date?.toString().split('|')
  const limit = currentSearchParams?.limit as string
  const page = currentSearchParams?.page as string
  const q = currentSearchParams?.q as string

  const startDate = date?.[0] ?? defaultStartAndEndDateReport?.startDate
  const endDate = date?.[1] ?? defaultStartAndEndDateReport?.endDate
  const summary = await getPlayerActive({
    start_date: startDate,
    end_date: endDate,
    group: 'all'
  })

  const overview = await getOverviewUserByParent({
    start_date: startDate,
    end_date: endDate,
    page,
    limit,
    q
  })

  return <PagePlayerActive reportSummary={summary?.data} tabelData={overview} />
}

export default page
