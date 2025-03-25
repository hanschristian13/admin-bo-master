import React, { JSX } from 'react'
import PageClientDetail from '@/components/page/client/detail'
import { getOverviewSuperAgent } from '@/service/report'
import { PageProps } from '@/types/page'
import { getSearchParams } from '@/constant'
const page = async ({ searchParams, params }: PageProps): Promise<JSX.Element> => {
  const currentSearchParams = await searchParams
  const url = await params

  const { limit, page, dealer_id } = getSearchParams(currentSearchParams)
  const data = await getOverviewSuperAgent({
    start_date: url?.id?.toString(),
    end_date: url?.id?.toString(),
    parent_id: currentSearchParams?.parent_id?.toString(),
    limit,
    page,
    dealer_id
  })

  return <PageClientDetail data={data} />
}

page.displayName = 'PageClientDetail'

export default page
