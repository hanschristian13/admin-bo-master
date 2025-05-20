import React, { JSX } from 'react'
import type { Metadata } from 'next'
import PagePlayerPendingTransaction from '@/components/page/player-pending-transaction'
import { PageProps } from '@/types/page'
import { getSearchParams } from '@/constant'
import { getBetStateTransactions } from '@/service/transaction'

export const metadata: Metadata = {
  title: 'Player Pending Transaction',
  description: 'player pending transaction'
}

const page = async ({ searchParams }: PageProps): Promise<JSX.Element> => {
  const currentSearchParams = await searchParams

  const { startDate, endDate, page, limit, q } = getSearchParams(currentSearchParams)
  const bet_state = currentSearchParams?.bet_state?.toString() ?? 'unsettle'
  const data = await getBetStateTransactions({
    start_date: startDate,
    end_date: endDate,
    bet_state,
    page,
    limit,
    username: q
  })

  return <PagePlayerPendingTransaction data={data} />
}

page.displayName = 'PageSlot'

export default page
