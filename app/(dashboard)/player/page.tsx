import React, { JSX } from 'react'
import type { Metadata } from 'next'
import PageWebsiteManagementPlayer from '@/components/page/website-management/player'
import { getPlayerList } from '@/service/player'
import { PageProps } from '@/types/page'
import { getSearchParams } from '@/constant'

export const metadata: Metadata = {
  title: 'Management Player',
  description: 'management player'
}

const page = async ({ searchParams }: PageProps): Promise<JSX.Element> => {
  const currentSearchParams = await searchParams
  const { startDate, endDate, page } = getSearchParams(currentSearchParams)

  const dealerID = currentSearchParams?.dealer_id

  const list = dealerID
    ? await getPlayerList(dealerID?.toString(), {
        start_date: startDate,
        end_date: endDate,
        page,
        limit: '12'
      })
    : null

  console.log(list)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <PageWebsiteManagementPlayer list={list as any} />
}

page.displayName = 'PageSlot'

export default page
