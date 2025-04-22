import React, { Suspense } from 'react'
import CardAgentDetail from '@/components/card-agent-detail'
import { DataSuperAgentType, SuperAgentType } from '@/types/super-agent'
import WrapperSearchAndButton from '@/components/super-agent/server-detail-super-agent-and-list-agent/wrapper-search-and-button'
import SkeletonListAgent from '@/components/agent/skeleton-list-agent'
import { PageProps } from '@/types/page'
import ServerListAgent from '@/components/agent/server-list-agent'
import { getWebRole } from '@/app/action/libs'

interface Props extends PageProps {
  data: SuperAgentType[] | undefined
  superAgentId: string
  listAgent: DataSuperAgentType | null
}

const ServerDetailSuperAgentAndListAgent: React.FC<Props> = async ({
  data,
  superAgentId,
  listAgent,
  searchParams
}) => {
  const getSuperAgentById = () => data?.find(agent => agent._id === superAgentId)

  const webRole = await getWebRole()

  return (
    <div className="space-y-6">
      <WrapperSearchAndButton isLabel={webRole === 'label'} superAgentId={superAgentId} />
      <div className="grid auto-rows-min gap-4 xl:grid-cols-3 2xl:grid-cols-4">
        <CardAgentDetail
          name={getSuperAgentById()?._id || ''}
          status={getSuperAgentById()?.active ? 'active' : 'inactive'}
          short_code={getSuperAgentById()?.short_code ? getSuperAgentById()?.short_code : '-'}
          total_agent={getSuperAgentById()?.subdealer_id?.length || 0}
        />
        <Suspense fallback={<SkeletonListAgent />}>
          <ServerListAgent
            webRole={webRole}
            searchParams={searchParams}
            data={listAgent}
            superAgentId={superAgentId}
          />
        </Suspense>
      </div>
    </div>
  )
}

export default ServerDetailSuperAgentAndListAgent
