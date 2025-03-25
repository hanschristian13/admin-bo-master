import React, { JSX } from 'react'
import PageClientSharedDetail from '@/components/page/client-shared/detail'
import { profitSharingSlotDetail } from '@/service/report'
import { PageProps } from '@/types/page'
import { getSearchParams } from '@/constant'
const page = async ({ searchParams, params }: PageProps): Promise<JSX.Element> => {
  const currentSearchParams = await searchParams
  const url = await params
  const { page, limit, parent_id } = getSearchParams(currentSearchParams)
  // const data = await profitSharingSlotDetail({

  //   parent_id: currentSearchParams?.parent_id?.toString(),
  //   q: currentSearchParams?.q?.toString(),
  //   page,
  //   limit
  // })
  const data = await profitSharingSlotDetail(
    {
      start_date: url?.id?.toString(),
      end_date: url?.id?.toString(),
      page,
      limit
    },
    parent_id || ''
  )

  console.log(data)
  return <PageClientSharedDetail data={data} />
}

export default page
