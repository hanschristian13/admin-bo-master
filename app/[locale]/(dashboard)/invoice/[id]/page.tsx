import React, { JSX } from 'react'
import PageInvoiceDetail from '@/components/page/website-management/invoice/detail'
import { PageProps } from '@/types/page'
import { getInvoiceDetail } from '@/service/invoice'
import { timeFormat } from '@/lib/utils'
const page = async ({ params, searchParams }: PageProps): Promise<JSX.Element> => {
  const url = await params
  const qParams = await searchParams
  const data = await getInvoiceDetail(url?.id?.toString() || '')
  const category = data?.data?.categories?.find(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (item: any) => item.game_type === qParams?.categories?.toString()
  )?.details

  const month = timeFormat(qParams.date?.toString()).format('MMMM')
  return <PageInvoiceDetail month={month} data={data} detail={category} />
}

export default page
