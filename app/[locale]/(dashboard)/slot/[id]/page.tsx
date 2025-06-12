import React, { JSX } from 'react'
import PageSlotDetail from '@/components/page/slot/detail'
import type { Metadata } from 'next'
import { getDailyUserTransactions } from '@/service/report'
import { PageProps } from '@/types/page'
import { getSearchParams } from '@/constant'

export const metadata: Metadata = {
  title: 'Slot',
  description: 'slot'
}

const page = async ({ searchParams, params }: PageProps): Promise<JSX.Element> => {
  const currentSearchParams = await searchParams
  const url = await params
  const { page, limit, dealer_id } = getSearchParams(currentSearchParams)
  const data = await getDailyUserTransactions({
    start_date: url?.id?.toString(),
    end_date: url?.id?.toString(),
    parent_id: currentSearchParams?.parent_id?.toString(),
    q: currentSearchParams?.q?.toString(),
    game_type: 'slot',
    page,
    limit,
    dealer_id
  })

  return <PageSlotDetail data={data} />
}

export default page
