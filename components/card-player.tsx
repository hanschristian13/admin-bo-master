import React from 'react'
import { Card } from '@/components/ui/card'
import InitialAvatar from '@/components/initial-avatar'
import DotStatus from '@/components/dot-status'
import { Player } from '@/types/user'
import { timeFormat } from '@/lib/utils'

interface CardPlayerProps {
  data: Player
}

const CardPlayer: React.FC<CardPlayerProps> = ({ data }) => {
  return (
    <Card className="flex flex-col overflow-hidden text-sm text-neutral-400 cursor-pointer">
      <div className="flex items-center space-x-3 p-5">
        <InitialAvatar name={data?.username} />
        <div className="flex flex-col text-sm font-medium">
          <span>{data?.username}</span>
        </div>
      </div>
      <div className="bg-neutral-100  border-t border-neutral-200 p-4 flex flex-col items-start justify-between gap-x-4 text-neutral-400">
        <div className="flex gap-x-2 items-center text-sm font-medium text-neutral-300">
          <DotStatus style="green" />
          Register Date
        </div>
        <div className="text-xs">{timeFormat(data?.registered_at).format('dd MMM, yyyy')}</div>
      </div>
    </Card>
  )
}

export default CardPlayer
