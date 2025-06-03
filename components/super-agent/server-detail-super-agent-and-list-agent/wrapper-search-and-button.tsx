'use client'

import React from 'react'
import ButtonBack from '@/components/form/button-back'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import SearchInput from '@/components/form/search-input'
import { useRouter } from 'next/navigation'

interface Props {
  superAgentId: string
  isLabel?: boolean
}

const WrapperSearchAndButton: React.FC<Props> = ({ superAgentId, isLabel = true }) => {
  const router = useRouter()
  return (
    <React.Fragment>
      <ButtonBack url="/super-agent" />
      {isLabel && (
        <div className="flex justify-between items-center gap-x-2.5">
          <SearchInput param="agentId" placeholder="Search Agent..." />
          <Button
            variant="default"
            onClick={() =>
              router.push(`/super-agent/?superAgentId=${superAgentId}&mode=create-agent`)
            }>
            <Plus />
            Create agent
          </Button>
        </div>
      )}
    </React.Fragment>
  )
}

export default WrapperSearchAndButton
