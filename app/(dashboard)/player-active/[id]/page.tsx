import PagePlayerActiveDetail from '@/components/page/player-active/detail'
import { getSearchParams } from '@/constant'
import { getOverviewTransactionByParent } from '@/service/report'
import { PageProps } from '@/types/page'
import type { Metadata } from 'next'
import { JSX } from 'react'

export const metadata: Metadata = {
  title: 'Player Active',
  description: 'report player active'
}
const page = async ({ searchParams, params }: PageProps): Promise<JSX.Element> => {
  const currentSearchParams = await searchParams
  const url = await params
  const { page, limit, dealer_id } = getSearchParams(currentSearchParams)
  const data = await getOverviewTransactionByParent({
    start_date: url?.id?.toString(),
    end_date: url?.id?.toString(),
    parent_id: currentSearchParams?.parent_id?.toString(),
    q: currentSearchParams?.q?.toString(),
    page,
    limit,
    dealer_id
  })
  return <PagePlayerActiveDetail data={data} />
}

export default page
