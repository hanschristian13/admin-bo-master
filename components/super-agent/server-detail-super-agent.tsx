import React from 'react'
import dynamic from 'next/dynamic'
import { SuperAgentType } from '@/types/super-agent'
import { getListAgentByParentId } from '@/service/super-agent'
import { PageProps } from '@/types/page'
import SkeletonDetailSuperAgent from '@/components/super-agent/skeleton-detail-super-agent'
import ServerDetailSuperAgentAndListAgent from '@/components/super-agent/server-detail-super-agent-and-list-agent'

const FormCreateAgent = dynamic(() => import('@/components/form/agent/form-agent'), {
  loading: () => <SkeletonDetailSuperAgent />
})
interface ClientListSuperAgentProps extends PageProps {
  data: SuperAgentType[] | undefined
  superAgentId: string
}

const DetailSuperAgent: React.FC<ClientListSuperAgentProps> = async ({ ...props }) => {
  const searchParams = await props.searchParams
  const superAgentId = searchParams.superAgentId as string
  const agentId = searchParams.agentId as string
  const mode = searchParams.mode as string
  const params = {
    type: 'agent',
    parent_id: props.superAgentId,
    q: agentId,
    limit: 6
  }
  const dataListAgent = await getListAgentByParentId(params)

  return (
    <React.Fragment>
      {(superAgentId && mode !== 'update-agent' && mode !== 'create-agent') ||
      mode === 'detail-agent' ? (
        <ServerDetailSuperAgentAndListAgent
          {...props}
          data={props.data}
          superAgentId={props.superAgentId}
          listAgent={dataListAgent}
        />
      ) : null}

      {mode === 'update-agent' || mode === 'create-agent' ? (
        <FormCreateAgent
          data={mode === 'update-agent' ? dataListAgent?.data : undefined}
          agentId={agentId}
          superAgentId={superAgentId}
        />
      ) : null}
    </React.Fragment>
  )
}

export default DetailSuperAgent
