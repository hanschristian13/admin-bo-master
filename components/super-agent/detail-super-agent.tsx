import React from 'react'
import SearchInput from '@/components/form/search-input'
import { useParams, useRouter } from 'next/navigation'
import ButtonBack from '@/components/form/button-back'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import CardAgentDetail from '@/components/card-agent-detail'
import { dataDetailSuperAgent } from '@/types/super-agent'

interface ClientDetailSuperAgentProps {
  data: dataDetailSuperAgent | undefined
}
const ClientDetailSuperAgent: React.FC<ClientDetailSuperAgentProps> = ({
  data
}) => {
  const params = useParams()
  const superAgentId = params.id
  const router = useRouter()
  return (
    <div className='space-y-6'>
      <ButtonBack url='/super-agent' />
      <div className='flex justify-between items-center gap-x-2.5'>
        <SearchInput
          param='agentId'
          placeholder='Seacrh Agent...' />
        <Button
          variant='default'
          onClick={() => router.push(`/super-agent/${superAgentId}/new`)}
        >
          <Plus />
          Create agent
        </Button>
      </div>
      <div className='grid auto-rows-min gap-4 xl:grid-cols-3 2xl:grid-cols-4'>
        <CardAgentDetail
          name={data?._id || ''}
          status={data?.active ? 'active' : 'inactive'}
          short_code={data?.short_code ? data?.short_code : '-'}
          total_agent={0}
        />
      </div>
    </div>
  )
}

ClientDetailSuperAgent.displayName = 'ClientDetailSuperAgent'

export default ClientDetailSuperAgent
