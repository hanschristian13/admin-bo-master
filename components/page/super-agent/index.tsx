import React, { Suspense } from 'react'
import ListSuperAgent from '@/components/super-agent/server-list-super-agent'
import { PageProps } from '@/types/page'
import SkeletonListSuperAgent from '@/components/super-agent/skeleton-list-super-agent'

import dynamic from 'next/dynamic'
import { getSuperAgent } from '@/service/super-agent'
import SkeletonDetailSuperAgent from '@/components/super-agent/skeleton-detail-super-agent'
const DetailSuperAgent = dynamic(
  () => import('@/components/super-agent/server-detail-super-agent'),
  {
    loading: () => <SkeletonDetailSuperAgent />
  }
)

const Page: React.FC<PageProps> = async ({ ...props }) => {
  const searchParams = await props.searchParams
  const query = searchParams.q || ''
  const limit = Number(searchParams.limit) || 12
  const page = Number(searchParams.page) || 1
  const superAgentId = searchParams.superAgentId as string

  const params = {
    type: 'superagent',
    q: (query as string) || undefined,
    limit: limit || undefined,
    page: superAgentId ? 1 : page || undefined
  }

  const dataSuperAgent = await getSuperAgent(params)

  return (
    <React.Fragment>
      {!superAgentId ? (
        <Suspense fallback={<SkeletonListSuperAgent />}>
          <ListSuperAgent
            data={dataSuperAgent?.data}
            total_page={dataSuperAgent?.total_page || 0}
            total_items={dataSuperAgent?.total_page || 0}
          />
        </Suspense>
      ) : null}
      {superAgentId ? (
        <Suspense fallback={<SkeletonDetailSuperAgent />}>
          <DetailSuperAgent data={dataSuperAgent?.data} superAgentId={superAgentId} {...props} />
        </Suspense>
      ) : null}
    </React.Fragment>
  )
}

export default Page
