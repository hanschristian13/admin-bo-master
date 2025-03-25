import React, { JSX } from 'react'
import type { Metadata } from 'next'
import PageWebsiteManagementInvoice from '@/components/page/website-management/invoice'
import { PageProps } from '@/types/page'
import { getInvoice } from '@/service/invoice'
export const metadata: Metadata = {
  title: 'Management Invoice',
  description: 'management invoice'
}

const page = async ({ searchParams }: PageProps): Promise<JSX.Element> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const currentSearchParams = await searchParams
  const data = await getInvoice({})

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <PageWebsiteManagementInvoice data={data as any} />
}

page.displayName = 'PageSlot'

export default page
