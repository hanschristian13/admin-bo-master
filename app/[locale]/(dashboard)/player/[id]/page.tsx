import React, { JSX } from 'react'
import PageWebsiteManagementPlayer from '@/components/page/website-management/player/detail'
import { PageProps } from '@/types/page'
import { getSearchParams } from '@/constant'
import { getDetailPlayer, getDetailPlayerSummary } from '@/service/player'
import { timeFormat } from '@/lib/utils'

const page = async ({ searchParams, params }: PageProps): Promise<JSX.Element> => {
  const currentSearchParams = await searchParams
  const { dealer_id, page, limit } = getSearchParams(currentSearchParams)
  const pars = await params

  const today = timeFormat().format()

  const username = pars?.id?.toString()
  const start_date = today
  const end_date = today

  const data = await getDetailPlayer(dealer_id || '', {
    username,
    start_date,
    end_date,
    page,
    limit: limit || 10
  })
  const summary = await getDetailPlayerSummary({
    username,
    dealer_id,
    start_date,
    end_date
  })

  return <PageWebsiteManagementPlayer data={data} summary={summary} />
}

export default page
