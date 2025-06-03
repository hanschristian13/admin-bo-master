import React, { JSX } from 'react'
import type { Metadata } from 'next'
import PageWebsiteManagementInvoice from '@/components/page/website-management/invoice'
import { PageProps } from '@/types/page'
import { getInvoice } from '@/service/invoice'
import { getSearchParams } from '@/constant'
import { timeFormat } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Management Invoice',
  description: 'management invoice'
}

const page = async ({ searchParams }: PageProps): Promise<JSX.Element> => {
  const currentSearchParams = await searchParams
  const { startDate, status, dealer_id } = getSearchParams(currentSearchParams)

  const data = await getInvoice({
    start_date: timeFormat(startDate).startOf('months').format('yyyy-MM-dd'),
    ...(status && {
      statuses: [status]
    }),
    ...(dealer_id && {
      dealer_id: [dealer_id]
    })
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <PageWebsiteManagementInvoice data={data as any} />
}

page.displayName = 'PageSlot'

export default page
